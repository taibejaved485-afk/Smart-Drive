import { Award, Car, Users, Gauge, LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { fetchSystemMetadata } from '../lib/supabase';

const StatCard = (props: any) => {
  const Icon = props.icon;
  const { label, count, suffix } = props;
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const countValue = useMotionValue(0);
  const rounded = useTransform(countValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(countValue, count, { duration: 2 });
      return () => controls.stop();
    }
  }, [isInView, count, countValue]);

  return (
    <div ref={nodeRef} className="group relative flex flex-col items-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 overflow-hidden">
      <style>{`
        @keyframes rotate-dot {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .animate-rotate-dot {
          offset-path: rect(0% 100% 100% 0% round 24px);
          animation: rotate-dot 10s linear infinite;
          animation-play-state: paused;
        }
        .group:hover .animate-rotate-dot {
          animation-play-state: running;
        }
      `}</style>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF7112]/30 rounded-3xl transition-colors duration-500"></div>
      <div className="absolute w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-rotate-dot shadow-[0_0_15px_5px_#dc2626] z-0 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        <Icon className="w-12 h-12 text-[#FF7112]/90 mb-4 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform" />
        <h3 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          <motion.span>{rounded}</motion.span>{suffix ?? ''}
        </h3>
        <p className="text-gray-400 font-medium text-xs sm:text-sm tracking-wide uppercase text-center">{label}</p>
      </div>
    </div>
  );
};

export default function Stats() {
  const [metadata, setMetadata] = useState<Record<string, string>>({
    years_active: '8',
    students_trained: '4500+',
    certified_instructors: '25',
    happy_reviews: '150+'
  });

  useEffect(() => {
    let active = true;
    
    // Fetch system metadata on mount
    fetchSystemMetadata().then(data => {
      if (active) {
        setMetadata(data);
      }
    });

    const handleUpdate = () => {
      fetchSystemMetadata().then(data => {
        if (active) {
          setMetadata(data);
        }
      });
    };

    window.addEventListener('system_metadata_updated', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('system_metadata_updated', handleUpdate);
    };
  }, []);

  // Helper to parse integer count and character suffix from a string (e.g. "4500+" -> count: 4500, suffix: "+")
  const parseStat = (value: string) => {
    if (!value) return { count: 0, suffix: '' };
    const cleanValue = value.toString();
    const numberPart = parseInt(cleanValue.replace(/[^0-9]/g, ''), 10) || 0;
    const suffixPart = cleanValue.replace(/[0-9]/g, '');
    return { count: numberPart, suffix: suffixPart };
  };

  const yearsStat = parseStat(metadata.years_active);
  const instructorsStat = parseStat(metadata.certified_instructors);
  const reviewsStat = parseStat(metadata.happy_reviews);
  const studentsStat = parseStat(metadata.students_trained);

  const stats = [
    { icon: Award, label: 'Years Experience', count: yearsStat.count, suffix: yearsStat.suffix },
    { icon: Car, label: 'Professional Instructors', count: instructorsStat.count, suffix: instructorsStat.suffix },
    { icon: Users, label: 'Happy Reviews', count: reviewsStat.count, suffix: reviewsStat.suffix },
    { icon: Gauge, label: 'Students Trained', count: studentsStat.count, suffix: studentsStat.suffix },
  ];

  return (
    <section className="relative py-20 bg-gray-900 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url("https://i.pinimg.com/736x/82/14/57/821457006ba1f2acea6e7234cb3b74ce.jpg")' }}
      ></div>
      <div className="absolute inset-0 bg-gray-900/70 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

