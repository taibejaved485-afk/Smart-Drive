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
      className="relative p-[1px] rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      {isHovered ? (
        <div className="absolute inset-0 bg-red-100/50">
          <span className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#dc2626_0%,transparent_15%)]" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-100" />
      )}
      
      <div className="relative flex flex-col items-start gap-4 p-6 bg-white rounded-[15px] h-full z-10 w-full">
        <div className="relative z-10 p-4 rounded-full bg-red-600 shadow-md">
          <feature.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="relative z-10 font-display font-bold text-xl text-gray-900">{feature.label}</h3>
        <div className="relative z-10 w-16 h-1 bg-red-500 rounded-full" />
        <p className="relative z-10 text-gray-600 leading-relaxed text-sm min-h-[4rem] flex-grow">{displayedText}</p>
      </div>
    </div>
  );
};
