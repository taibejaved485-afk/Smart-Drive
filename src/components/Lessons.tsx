import { motion } from 'motion/react';

const lessons = [
  'https://trainingdrivingschool.pk/wp-content/uploads/2025/02/download-2.jpeg',
  'https://trainingdrivingschool.pk/wp-content/uploads/2025/02/download.jpeg',
  'https://trainingdrivingschool.pk/wp-content/uploads/2025/02/download-1-1.jpeg',
];

export default function Lessons() {
  return (
    <section className="py-20 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-500 font-bold tracking-widest uppercase text-sm mb-2"
          >
            Our Driving Lessons
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight"
          >
            Our Driving Course Classes For All Ages
          </motion.h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {lessons.map((src, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="group relative p-8 rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-white/5 shadow-2xl hover:border-red-500/30 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.2)] transition-all duration-300 flex items-center justify-center h-64 w-full sm:w-64"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src={src} alt={`Lesson ${i + 1}`} className="max-h-full object-contain relative z-10 filter group-hover:brightness-110 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
