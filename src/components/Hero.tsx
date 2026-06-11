import { useState, useEffect } from 'react';
import { Phone, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const images = [
  // Driving student hands on steering wheel, learning controls (sharp, high-res Unsplash)
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop',
  // Highway/road navigation showing safe road confidence (exquisite landscape)
  'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2000&auto=format&fit=crop',
  // Car cockpit focus on steering, modern interior
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000&auto=format&fit=crop',
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[480px] sm:h-[85vh] sm:min-h-[640px] lg:h-screen flex items-center overflow-hidden bg-gray-950 font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center md:bg-[center_center]"
          style={{ backgroundImage: `url('${images[index]}')` }}
        />
      </AnimatePresence>
      
      {/* Premium overlay gradient for ultra high-contrast typography reading */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/60 to-black/75"></div>
      
      {/* Decorative ambient subtle light ring */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-650/10 rounded-full blur-[140px] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full flex flex-col items-center justify-center text-center z-10 pt-10 sm:pt-16">
        {/* Main Content Info Container */}
        <div className="w-full max-w-4xl mx-auto">
          
          {/* Glowing Badge Tag */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full mb-5 sm:mb-7 shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-red-500 fill-red-500/10" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-200">
              Faisalabad's #1 Certified Driving Academy
            </span>
          </motion.div>

          {/* Main Title Hero */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-4 sm:mb-6 leading-[1.1] sm:leading-tight tracking-tight drop-shadow-xl"
          >
            Your Path To Safe And<br />Confident Driving
          </motion.h1>
          
          {/* Professional Context Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-300 text-xs sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 font-medium leading-relaxed"
          >
            Learn from professional, certified instructors with years of road training expertise. We provide customized manual & automatic classes for safe, lifelong driving habits.
          </motion.p>
          
          {/* Contact CTA Call Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            onClick={() => {
              window.location.href = 'tel:03001115429';
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 sm:px-10 sm:py-4.5 rounded-full font-black text-[11px] sm:text-xs uppercase tracking-widest transition-all flex items-center gap-2.5 shadow-[0_0_25px_rgba(220,38,38,0.25)] hover:shadow-red-900/50 hover:scale-105 active:scale-95 mx-auto cursor-pointer"
          >
            CALL US NOW <Phone className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-12" />
          </motion.button>

          {/* Trust indicator footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex items-center justify-center gap-1.5 mt-8 sm:mt-10 opacity-75"
          >
            <div className="flex text-yellow-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-300 tracking-wide">
              Rated 4.9/5 by 380+ Confident Students
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
