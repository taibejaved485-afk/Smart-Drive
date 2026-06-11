import { Award, Car, Users, Gauge } from 'lucide-react';

export default function Stats() {
  const stats = [
    { icon: Award, label: 'Years Experience', count: '16' },
    { icon: Car, label: 'Professional Instructor', count: '25' },
    { icon: Users, label: 'People Reviews', count: '150' },
    { icon: Gauge, label: 'Driver Training', count: '125' },
  ];

  return (
    <section className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000")' }}
      ></div>
      <div className="absolute inset-0 bg-gray-900/70 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="group relative flex flex-col items-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-red-500/50 transition-all duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="w-12 h-12 text-red-500 mb-4 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                {stat.count}
              </h3>
              <p className="text-gray-400 font-medium text-sm tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
