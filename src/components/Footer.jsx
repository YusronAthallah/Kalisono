import { useSiteData } from '../context/SiteDataContext';

const footerNav = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Demografi', href: '#demografi' },
  { label: 'UMKM', href: '#umkm' },
  { label: 'Peta', href: '#peta' },
];

export default function Footer() {
  const { padukuhan, contact, leadership } = useSiteData();
  const year = new Date().getFullYear();

  return (
    <footer id="alamat" className="bg-leaf-950 text-white">
      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* ── Column 1 : About ── */}
          <div>
            <p className="text-lg font-semibold mb-4">
              Padukuhan {padukuhan.name}
            </p>
            <p className="text-wood-300/60 text-sm leading-relaxed">
              Portal informasi resmi Padukuhan {padukuhan.name}, Desa{' '}
              {padukuhan.desa}, Kecamatan {padukuhan.kecamatan}, Kabupaten{' '}
              {padukuhan.kabupaten}, {padukuhan.provinsi}.
            </p>
          </div>

          {/* ── Column 2 : Navigation + Perangkat ── */}
          <div>
            <h3 className="text-xs font-semibold text-wood-400 uppercase tracking-widest mb-5">
              Navigasi
            </h3>
            <ul className="space-y-3 mb-10">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-wood-300/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3 : Contact ── */}
          <div>
            <h3 className="text-xs font-semibold text-wood-400 uppercase tracking-widest mb-5">
              Alamat
            </h3>
            <ul className="space-y-5">
              {/* Address */}
              <li className="flex items-start gap-3 text-sm text-wood-300/60">
                <svg
                  className="w-5 h-5 text-wood-400 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-wood-300/40">
            &copy; {year} Padukuhan {padukuhan.name}, Desa {padukuhan.desa} | KKN AB 066 UPNVYK 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
