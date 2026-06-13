import { FileText, Settings, FileCheck } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Features() {
  const features = [
    { 
      icon: FileText, 
      label: 'Experienced & Certified Instructors', 
      desc: 'Our professional trainers provide hands-on learning to help you master driving with ease.' 
    },
    { 
      icon: Settings, 
      label: 'Customized Learning Programs', 
      desc: 'We offer flexible courses designed for beginners, intermediate learners, and those seeking advanced driving techniques.' 
    },
    { 
      icon: FileCheck, 
      label: 'Traffic Rules Training', 
      desc: 'We emphasize defensive driving, road safety awareness, and adherence to traffic laws.' 
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard: React.FC<{ feature: any }> = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState(feature.desc);

  useEffect(() => {
    if (isHovered) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(feature.desc.slice(0, i + 1));
        i++;
        if (i >= feature.desc.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(feature.desc);
    }
  }, [isHovered, feature.desc]);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
    >
      <style>{`
        @keyframes travel-rectangle {
          0%, 100% { top: -10px; left: -10px; }
          25% { top: -10px; left: calc(100% - 6px); }
          50% { top: calc(100% - 6px); left: calc(100% - 6px); }
          75% { top: calc(100% - 6px); left: -10px; }
        }
        .animate-travel-rectangle { animation: travel-rectangle 4s linear infinite; }
      `}</style>
      
      {/* Rectangular Red Dot */}
      <div className={`absolute w-4 h-4 bg-red-600 rounded-full shadow-[0_0_15px_#dc2626] animate-travel-rectangle z-0 ${isHovered ? 'block' : 'hidden'}`} />
      
      <div className="relative z-10 p-4 rounded-full bg-red-600 shadow-md">
        <feature.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="relative z-10 font-display font-bold text-xl text-gray-900">{feature.label}</h3>
      <div className="relative z-10 w-16 h-1 bg-red-500 rounded-full" />
      <p className="relative z-10 text-gray-600 leading-relaxed text-sm min-h-[4rem]">{displayedText}</p>
    </div>
  );
};
