import { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig } from '../data/siteData';
import { API_CONFIG } from '../data/apiConfig';

const SiteDataContext = createContext(null);

/* ═══════════════════════════════════════════════════════════
   Google Sheets Response Parser
   ═══════════════════════════════════════════════════════════
   Google Sheets gviz/tq mengembalikan format JSONP:
   google.visualization.Query.setResponse({...});

   Parser ini menangani kasus-kasus khusus:
   1. parsedNumHeaders=0 → baris pertama = header, bukan data
   2. Kolom bertipe number (misal WhatsApp) → pakai formatted value
   3. Cell null → default ke empty string
   ═══════════════════════════════════════════════════════════ */
function parseGoogleSheetsResponse(text) {
  // Extract JSON dari wrapper JSONP
  const match = text.match(
    /google\.visualization\.Query\.setResponse\(({.*})\)/s
  );
  if (!match) {
    throw new Error('Format response Google Sheets tidak valid');
  }

  const json = JSON.parse(match[1]);
  const table = json.table;

  // ── Tentukan nama kolom (header) ──
  // Cek apakah Google Sheets mendeteksi header otomatis
  const hasAutoHeaders = table.cols.some((col) => col.label && col.label.trim() !== '');

  let cols;
  let dataRows;

  if (hasAutoHeaders) {
    // Google mendeteksi header → ambil dari cols.label
    cols = table.cols.map((col) => col.label || '');
    dataRows = table.rows;
  } else {
    // parsedNumHeaders=0 → baris pertama adalah header
    // Ambil nama kolom dari row pertama
    cols = table.rows[0].c.map((cell) =>
      cell ? String(cell.v || '') : ''
    );
    dataRows = table.rows.slice(1); // Skip baris header
  }

  // ── Konversi setiap baris menjadi object { NamaKolom: nilai } ──
  return dataRows
    .map((row) => {
      const obj = {};
      row.c.forEach((cell, i) => {
        if (!cols[i]) return;

        if (!cell || cell.v == null) {
          obj[cols[i]] = '';
          return;
        }

        // Gunakan formatted value (f) jika ada, agar angka seperti
        // nomor WhatsApp (6.285E12) tetap tampil benar ("6285158424337")
        if (cell.f != null) {
          obj[cols[i]] = String(cell.f);
        } else {
          obj[cols[i]] = cell.v;
        }
      });
      return obj;
    })
    .filter((row) => {
      // Filter baris kosong (semua value empty string)
      return Object.values(row).some((v) => v !== '');
    });
}

/* ═══════════════════════════════════════════════════════════
   Auto-Refresh Config
   ═══════════════════════════════════════════════════════════
   POLLING_INTERVAL — Interval polling data dari Google Sheets.
   Semakin kecil = semakin cepat update, tapi lebih banyak request.
   Default: 3 detik.
   ═══════════════════════════════════════════════════════════ */
const POLLING_INTERVAL = 3 * 1000; // 3 detik

/**
 * Mengubah URL Google Drive sharing menjadi URL gambar langsung.
 *
 * Menggunakan endpoint thumbnail Google yang paling reliable
 * untuk ditampilkan di website (tidak diblokir CORS).
 *
 * Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://lh3.googleusercontent.com/d/FILE_ID=s800
 */
function toDirectImageUrl(url) {
  if (!url || typeof url !== 'string') return null;

  // Pattern: drive.google.com/file/d/{FILE_ID}/...
  const driveMatch = url.match(
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/
  );
  if (driveMatch) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}=s800`;
  }

  // Pattern: drive.google.com/open?id={FILE_ID}
  const openMatch = url.match(
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/
  );
  if (openMatch) {
    return `https://lh3.googleusercontent.com/d/${openMatch[1]}=s800`;
  }

  return url;
}

/* ── Mapper: row → format UMKM app ── */
function mapUmkmRow(row, index) {
  const rawImage = row['Foto'] || row['foto'] || null;

  return {
    id: index + 1,
    name: row['Nama'] || row['nama'] || '',
    description: row['Deskripsi'] || row['deskripsi'] || '',
    produk: row['Produk'] || row['produk'] || '',
    pemilik: row['Pemilik'] || row['pemilik'] || '',
    alamat: row['Alamat ( RT/RW )'] || row['Alamat (RT/RW)'] || row['Alamat'] || row['alamat'] || '',
    image: toDirectImageUrl(rawImage),
    whatsapp: String(row['WhatsApp'] || row['whatsapp'] || ''),
    gmaps: row['Gmaps'] || row['gmaps'] || null,
  };
}

/* ── Mapper: row → format statistik app ── */
function mapStatsRow(row) {
  return {
    id: String(row['ID'] || row['id'] || row['Label'] || '').toLowerCase(),
    label: row['Label'] || row['label'] || '',
    value: parseInt(row['Nilai'] || row['nilai'] || 0, 10),
    description: row['Deskripsi'] || row['deskripsi'] || '',
    icon: row['Icon'] || row['icon'] || 'home',
  };
}

/**
 * Fetch data dari Google Sheets langsung — selalu ambil data terbaru.
 * Tidak pakai cache supaya perubahan di spreadsheet langsung terlihat.
 */
async function fetchGoogleSheet(url) {
  // Tambahkan timestamp agar tidak ter-cache oleh browser
  const separator = url.includes('?') ? '&' : '?';
  const freshUrl = `${url}${separator}_t=${Date.now()}`;

  const res = await fetch(freshUrl);
  if (!res.ok) throw new Error(`Google Sheets: HTTP ${res.status}`);

  const text = await res.text();
  return parseGoogleSheetsResponse(text);
}

/**
 * SiteDataProvider — React Context yang:
 * 1. Mulai dengan data statis dari siteData.js (instant, tanpa loading)
 * 2. Jika API URL dikonfigurasi → fetch & replace data
 * 3. Auto-polling setiap POLLING_INTERVAL untuk update real-time
 * 4. Refetch otomatis saat user kembali ke tab browser
 * 5. Jika fetch gagal → tetap tampilkan data terakhir (fallback)
 */
export function SiteDataProvider({ children }) {
  const [data, setData] = useState(siteConfig);
  const [loading, setLoading] = useState(() =>
    Boolean(API_CONFIG.umkm || API_CONFIG.stats)
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    // Tidak ada API URL? Langsung pakai data statis.
    if (!API_CONFIG.umkm && !API_CONFIG.stats) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchAll() {
      try {
        const updates = {};

        // Fetch UMKM dari Google Sheets
        if (API_CONFIG.umkm) {
          const rows = await fetchGoogleSheet(API_CONFIG.umkm);
          if (Array.isArray(rows) && rows.length > 0) {
            updates.umkm = rows.map(mapUmkmRow);
          }
        }

        // Fetch Statistik dari Google Sheets
        if (API_CONFIG.stats) {
          const rows = await fetchGoogleSheet(API_CONFIG.stats);
          if (Array.isArray(rows) && rows.length > 0) {
            updates.stats = rows.map(mapStatsRow);
          }
        }

        if (!cancelled) {
          setData((prev) => ({ ...prev, ...updates }));
          setError(null);
        }
      } catch (err) {
        console.error('⚠️ Gagal memuat data dari Google Sheets:', err);
        if (!cancelled) setError(err.message);
        // Data terakhir yang berhasil di-load tetap tampil
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    // ── Fetch pertama kali ──
    fetchAll();

    // ── Auto-polling: refetch setiap POLLING_INTERVAL ──
    const intervalId = setInterval(() => {
      if (!cancelled) fetchAll();
    }, POLLING_INTERVAL);

    // ── Refetch saat user kembali ke tab browser ──
    function handleVisibility() {
      if (document.visibilityState === 'visible' && !cancelled) {
        fetchAll();
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <SiteDataContext.Provider value={{ ...data, loading, error }}>
      {children}
    </SiteDataContext.Provider>
  );
}

/**
 * Hook untuk mengakses data site dari context.
 * Gunakan di semua komponen yang butuh data:
 *
 *   const { umkm, stats, loading } = useSiteData();
 */
export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error('useSiteData() harus digunakan di dalam <SiteDataProvider>');
  }
  return ctx;
}
