import { useSiteData } from '../context/SiteDataContext';

const StatIcon = ({ type }) => {
  const base = 'w-5 h-5';

  if (type === 'home') {
    return (
      <svg className={base} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21H4.125c-.621 0-1.125-.504-1.125-1.125V9.75m0 0L12 3.375 21 9.75M3 9.75h18" />
      </svg>
    );
  }

  if (type === 'male') {
    return (
      <svg className={base} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    );
  }

  return (
    <svg className={base} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
};

const accents = ['border-l-leaf-600', 'border-l-leaf-400', 'border-l-wood-500'];

const StatSkeleton = () => (
  <div className="animate-pulse bg-white rounded-lg p-6 border-l-[3px] border-l-gray-200">
    <div className="h-9 bg-warm-200 rounded w-14 mb-2" />
    <div className="h-4 bg-warm-100 rounded w-24 mb-1" />
    <div className="h-3 bg-warm-100 rounded w-32" />
  </div>
);

export default function Stats() {
  const { stats, loading } = useSiteData();

  return (
    <section id="demografi" className="py-16 md:py-24 bg-warm-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-md mb-10">
          <p className="text-xs text-leaf-600 font-medium uppercase tracking-widest mb-2">
            Data Kependudukan
          </p>
          <h2 className="text-2xl md:text-[1.7rem] font-semibold text-leaf-900">
            Statistik Demografi
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <StatSkeleton key={i} />
              ))
            : stats.map((stat, i) => (
                <div
                  key={stat.id}
                  className={`bg-white rounded-lg p-6 border-l-[3px] ${accents[i % accents.length]} hover:shadow-sm transition-shadow duration-200`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-md bg-leaf-50 text-leaf-600 flex items-center justify-center">
                      <StatIcon type={stat.icon} />
                    </div>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </div>

                  <div className="text-3xl font-semibold text-leaf-800 tabular-nums">
                    {stat.value.toLocaleString('id-ID')}
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    {stat.description}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
