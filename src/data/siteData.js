/**
 * Data konten website Padukuhan Kalisono.
 *
 * Struktur ini dirancang agar mudah di-replace dengan fetch() dari API eksternal.
 * Cukup ganti isi variabel atau ubah menjadi async fetch tanpa mengubah komponen.
 *
 * Contoh migrasi ke API:
 *   const res = await fetch('/api/site-config');
 *   export const siteConfig = await res.json();
 */

export const siteConfig = {
  /* ─── Info Padukuhan ─── */
  padukuhan: {
    name: 'Kalisono',
    desa: 'Tuksono',
    kecamatan: 'Sentolo',
    kabupaten: 'Kulon Progo',
    provinsi: 'Daerah Istimewa Yogyakarta',
  },

  /* ─── Hero Section ─── */
  hero: {
    title: 'Selamat Datang di Padukuhan Kalisono',
    subtitle:
      'Portal informasi resmi Padukuhan Kalisono, Desa Tuksono, Kecamatan Sentolo, Kabupaten Kulon Progo, Daerah Istimewa Yogyakarta. Temukan potensi desa, produk UMKM unggulan, dan informasi layanan masyarakat.',
    ctaText: 'Jelajahi Potensi',
    backgroundImage: null, // Ganti dengan path: '/images/hero.jpg'
  },

  /* ─── Statistik Demografi ─── */
  stats: [
    {
      id: 'kk',
      label: 'Jumlah KK',
      value: 245,
      description: 'Kepala Keluarga terdaftar',
      icon: 'home',
    },
    {
      id: 'male',
      label: 'Laki-laki',
      value: 520,
      description: 'Penduduk laki-laki',
      icon: 'male',
    },
    {
      id: 'female',
      label: 'Perempuan',
      value: 498,
      description: 'Penduduk perempuan',
      icon: 'female',
    },
  ],

  /* ─── Direktori UMKM ─── */
  umkm: [
    {
      id: 1,
      name: 'Contoh UMKM Kalisono',
      description: 'Deskripsi produk UMKM dari Padukuhan Kalisono.',
      produk: 'Produk Unggulan',
      pemilik: 'Nama Pemilik',
      alamat: 'RT 01/RW 01',
      image: null,
      whatsapp: '6281234567890',
      gmaps: null,
    },
  ],

  /* ─── Perangkat / Pimpinan ─── */
  leadership: [
    {
      name: '—', // Ganti dengan nama asli
      position: 'Kepala Padukuhan',
      phone: '6281234567800',
    },
  ],

  /* ─── Kontak ─── */
  contact: {
    address:
      'Padukuhan Kalisono, Desa Tuksono, Kec. Sentolo, Kab. Kulon Progo, Daerah Istimewa Yogyakarta',
  },

  /* ─── Peta ─── */
  map: {
    wilayah: {
      title: 'Peta Wilayah',
      description: 'Peta lokasi dan batas wilayah Padukuhan Kalisono',
      embedUrl: null, // Ganti dengan Google Maps embed URL
      image: null, // Atau: '/images/peta-wilayah.jpg'
    },
    administrasi: {
      title: 'Peta Administrasi',
      description: 'Peta administrasi wilayah',
      image: null, // Ganti: '/images/peta-administrasi.jpg'
    },
  },

  /* ─── Tentang Kami ─── */
  about: {
    title: 'Profil Padukuhan',
    subtitle: 'Sejarah, Visi & Misi Padukuhan Kalisono',
    sejarah: 'Padukuhan Kalisono merupakan salah satu wilayah di Desa Tuksono yang masyarakatnya terus menjaga identitas budaya dan tradisi lokal. Wilayah ini memiliki potensi pertanian dan UMKM yang berkembang, serta berkomitmen untuk melestarikan nilai-nilai lokal.',
    visi: 'Mewujudkan Desa Tuksono menjadi Desa Mandiri melalui bidang Pertanian dan Industri Kecil, serta menjadi Desa Budaya yang lestari.',
    misi: [
      'Meningkatkan perekonomian masyarakat melalui pemberdayaan UMKM dan kerajinan lokal.',
      'Memajukan sektor pertanian sebagai penopang utama ketahanan pangan.',
      'Melestarikan nilai-nilai tradisi dan seni budaya lokal.'
    ],
    image: null, // Ganti dengan gambar profil padukuhan
  },
};
