import { useRef } from 'react';
import { Phone, Star, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
  const ref = useRef(null);
  
  const { scrollY } = useScroll();

  // The car fades OUT and moves UP/DOWN based on scroll (parallax / fadeout)
  const carOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const carY = useTransform(scrollY, [0, 500], [0, 150]);
  const carScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Main text parallax
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={ref} className="relative h-[80vh] min-h-[480px] sm:h-[85vh] sm:min-h-[640px] lg:h-screen flex items-center overflow-hidden bg-slate-950 font-sans">
      
      {/* Decorative ambient subtle light ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/20 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Modern Grid Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      {/* Cinematic Background Video Layer (Placeholder) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.17, 0.55, 0.55, 1], delay: 0.1 }}
        style={{ opacity: carOpacity, y: carY, scale: carScale }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-black will-change-transform"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          src="/hero-video.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none will-change-transform"
        />
        {/* Dark Vignette Color Overlay (Readability Lock) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-slate-950/80 z-10"></div>
      </motion.div>
      
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full flex flex-col items-center justify-center text-center z-20 pt-10 sm:pt-4"
      >
        {/* Main Content Info Container */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Glowing Badge Tag */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
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
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-4 sm:mb-6 leading-[1.1] sm:leading-tight tracking-tight drop-shadow-xl"
          >
            Master the Road<br />With Confidence
          </motion.h1>
          
          {/* Professional Context Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-slate-200 text-xs sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 font-medium leading-relaxed"
          >
            Learn from professional, certified instructors with years of road training expertise. We provide customized manual & automatic classes for safe, lifelong driving habits.
          </motion.p>
          
          {/* Contact CTA Call Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={() => {
              window.location.href = 'tel:03097666928';
            }}
            className="bg-red-650 hover:bg-red-500 text-white px-8 py-3.5 sm:px-10 sm:py-4.5 rounded-full font-black text-[11px] sm:text-xs uppercase tracking-widest transition-all flex items-center gap-2.5 shadow-[0_0_25px_rgba(220,38,38,0.3)] hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] hover:-translate-y-1 active:scale-95 mx-auto cursor-pointer border border-transparent hover:border-red-400"
          >
            CALL US NOW <Phone className="w-4 h-4 shrink-0 transition-transform hover:rotate-12" />
          </motion.button>

          {/* Trust indicator footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 1 }}
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
      </motion.div>
    </section>
  );
}
