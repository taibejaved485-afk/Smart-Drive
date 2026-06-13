import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTABanner() {
  const [headingText, setHeadingText] = useState("");
  const targetHeading = "Ready to Master the Driver's Seat?";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setHeadingText(targetHeading.slice(0, i + 1));
      i++;
      if (i >= targetHeading.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-950 py-12 relative overflow-hidden border-t border-white/5">
      {/* Decorative Lights & Shadows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-red-650/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-slate-900/30 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <style>{`
          @keyframes travel-rectangle-banner {
            0%, 100% { top: -10px; left: -10px; }
            25% { top: -10px; left: calc(100% - 6px); }
            50% { top: calc(100% - 6px); left: calc(100% - 6px); }
            75% { top: calc(100% - 6px); left: -10px; }
          }
          .animate-travel-rectangle-banner { animation: travel-rectangle-banner 6s linear infinite; }
        `}</style>

        <div className="bg-gradient-to-r from-red-950/40 via-gray-905/90 to-slate-900/40 border-2 border-white/20 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
          {/* White Rectangular Dot */}
          <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#ffffff] animate-travel-rectangle-banner z-0" />

          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl text-center lg:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest font-sans">
              <Sparkles className="w-3.5 h-3.5 text-red-500" /> Start Driving Safely today
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-sans leading-tight min-h-[4rem]">
              {headingText}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Book a custom driving lesson package with professional certified male and female trainers in Faisalabad.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0 relative z-10">
            <Link 
              to="/pricing#contact" 
              className="w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white font-extrabold px-8 py-4 rounded-xl text-center shadow-lg shadow-red-900/30 transition-all text-xs uppercase tracking-widest font-sans border border-transparent hover:border-red-550/20"
            >
              APPLY NOW
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl text-center transition-all text-xs font-extrabold uppercase tracking-widest font-sans"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
