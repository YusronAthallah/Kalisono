/**
 * ═══════════════════════════════════════════════════════════════
 *  KONFIGURASI API — Google Sheets LANGSUNG (Tanpa SheetDB)
 * ═══════════════════════════════════════════════════════════════
 *
 *  CARA SETUP:
 *
 *  1. Buka Google Spreadsheet Anda di browser.
 *  2. Klik  File → Share → Publish to web → Klik "Publish".
 *  3. Copy Spreadsheet ID dari URL browser Anda:
 *     https://docs.google.com/spreadsheets/d/[INI_SPREADSHEET_ID]/edit
 *  4. Paste ID tersebut di variabel SPREADSHEET_ID di bawah.
 *
 *  CATATAN PENTING:
 *  - Spreadsheet ID SAMA untuk semua 12 dusun.
 *  - Yang BEDA hanya nama sheet (tab) per dusun.
 *  - Gratis tanpa batas request! (tidak pakai SheetDB lagi)
 *
 * ═══════════════════════════════════════════════════════════════
 */

// ┌───────────────────────────────────────────────────────────┐
// │  GANTI NILAI DI BAWAH DENGAN SPREADSHEET ID ANDA         │
// │  Contoh: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms'  │
// └───────────────────────────────────────────────────────────┘
const SPREADSHEET_ID = '1E7SBfDyWBZ6RXDo7rESduNuWayhB2NFKHGSoEN8qkSM';

// ┌───────────────────────────────────────────────────────────┐
// │  NAMA SHEET (TAB) DI SPREADSHEET UNTUK DUSUN INI         │
// │  Sesuaikan dengan nama tab yang ada di spreadsheet Anda.  │
// │  Untuk dusun lain, cukup ganti nama sheet-nya saja.       │
// └───────────────────────────────────────────────────────────┘
const SHEET_UMKM = 'UMKM Kalisono';
const SHEET_STATS = 'Statistik Kalisono';

/**
 * Membangun URL Google Sheets gviz/tq untuk mengambil data
 * langsung dari Google tanpa perantara SheetDB.
 */
function buildGoogleSheetsUrl(sheetName) {
  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
}

// Cek apakah Spreadsheet ID sudah dikonfigurasi
const isConfigured = SPREADSHEET_ID !== 'PASTE_SPREADSHEET_ID_DISINI';

export const API_CONFIG = {
  /**
   * URL untuk data UMKM (Tab: UMKM Kalisono).
   * Otomatis null jika Spreadsheet ID belum di-set → pakai data statis.
   */
  umkm: isConfigured ? buildGoogleSheetsUrl(SHEET_UMKM) : null,

  /**
   * URL untuk data statistik demografi (Tab: Statistik Kalisono).
   * Otomatis null jika Spreadsheet ID belum di-set → pakai data statis.
   */
  stats: isConfigured ? buildGoogleSheetsUrl(SHEET_STATS) : null,
};
