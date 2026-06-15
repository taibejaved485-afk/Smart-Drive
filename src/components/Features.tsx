import { FileText, Settings, FileCheck } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

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
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard: React.FC<{ feature: any, index: number }> = ({ feature }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isInView) {
      let i = 0;
      setDisplayedText("");
      const interval = setInterval(() => {
        setDisplayedText(feature.desc.slice(0, i + 1));
        i++;
        if (i >= feature.desc.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(feature.desc); // fallback or when out of view
    }
  }, [isInView, feature.desc]);

  return (
    <div 
      ref={ref}
      className="group relative p-[1.5px] bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gray-100 transition-colors duration-500 group-hover:bg-red-100/30" />
      <span className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:animate-[spin_10s_linear_infinite] transition-opacity duration-500 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ef4444_2%,#dc2626_4%,transparent_8%)]" />
      
      <div className="relative flex flex-col items-start gap-4 p-6 bg-white rounded-[14.5px] h-full z-10 w-full">
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
