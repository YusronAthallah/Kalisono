import { useSiteData } from '../context/SiteDataContext';
import tuguKalisonoImg from '../images/TuguKalisono.jpeg';

export default function About() {
  const { about } = useSiteData();

  if (!about) return null;

  return (
    <section id="tentang" className="py-16 md:py-24 bg-warm-50 border-b border-warm-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-xl mb-12">
          <p className="text-xs text-leaf-600 font-medium uppercase tracking-widest mb-2">
            {about.subtitle}
          </p>
          <h2 className="text-2xl md:text-[1.7rem] font-semibold text-leaf-900">
            {about.title}
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image & Sejarah (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-xl overflow-hidden shadow-sm border border-warm-200 aspect-[16/9]">
              <img
                src={about.image || tuguKalisonoImg}
                alt={about.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-800">Sejarah Singkat</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {about.sejarah}
              </p>
            </div>
          </div>

          {/* Right Column: Visi & Misi (5 cols) */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 rounded-xl border border-warm-200 shadow-sm">
            {/* Visi */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-leaf-700 uppercase tracking-wider">
                Visi
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                "{about.visi}"
              </p>
            </div>

            {/* Misi */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-leaf-700 uppercase tracking-wider">
                Misi
              </h3>
              <ul className="space-y-3">
                {about.misi.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-leaf-50 text-leaf-600 flex items-center justify-center text-xs font-semibold mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
