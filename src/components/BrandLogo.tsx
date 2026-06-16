import React from 'react';

interface BrandLogoProps {
  isDark?: boolean;
}

export default function BrandLogo({ isDark = false }: BrandLogoProps) {
  const navyColor = isDark ? '#ffffff' : '#002060';
  const navyTextClass = isDark ? 'text-white' : 'text-[#002060]';
  const shadowClass = isDark ? 'bg-white/5 group-hover:bg-white/10' : 'bg-[#FF5500]/5 group-hover:bg-[#FF5500]/10';

  return (
    <div className="flex items-center gap-2.5 select-none group cursor-pointer">
      {/* Precision Vector GoDriveify Logo Emblem */}
      <div className="relative flex items-center justify-center">
        {/* Outer glowing halo using brand orange */}
        <div className={`absolute inset-0 rounded-full scale-110 blur-sm transition duration-500 ${shadowClass}`} />
        
        <svg 
          width="54" 
          height="54" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transform transition-transform duration-700 ease-out group-hover:scale-105"
        >
          {/* Deep Navy C-shaped Road */}
          <path 
            d="M 74,25 A 30,30 0 1,0 74,61" 
            fill="none" 
            stroke={navyColor} 
            strokeWidth="11" 
            strokeLinecap="round" 
          />
          
          {/* White Dash Lane Markings */}
          <path 
            d="M 74,25 A 30,30 0 1,0 74,61" 
            fill="none" 
            stroke={isDark ? '#002060' : '#ffffff'} 
            strokeWidth="1.5" 
            strokeDasharray="5,4" 
            strokeLinecap="round" 
          />
          
          {/* Corporate Deep Navy Sedan Car Silhouette */}
          <g fill={navyColor}>
            {/* Glass & Roof */}
            <path d="M 40,36 C 44,32 56,32 60,36 L 64,43 L 36,43 L 40,36 Z" />
            <path d="M 41.5,37.5 H 58.5 L 61,42 H 39 L 41.5,37.5 Z" fill={isDark ? '#002060' : '#ffffff'} />
            
            {/* Mirrors */}
            <path d="M 35,42 Q 31,41 31,44 Q 35,43 35,42 Z" />
            <path d="M 65,42 Q 69,41 69,44 Q 65,43 65,42 Z" />
            
            {/* Front Bumper & Main Body */}
            <path d="M 34,43 Q 50,41 66,43 C 68.5,45 68.5,48.5 67,51 C 66,52 65,54 62,54 C 60,54 61,51.5 58,51.5 C 50,51.5 50,51.5 42,51.5 C 39,51.5 40,54 38,54 C 35,54 34,52 33,51 C 31.5,48.5 31.5,45 34,43 Z" />
            
            {/* Headlights */}
            <path d="M 36.5,44.5 C 38.5,44.5 40.5,45.5 41.5,46.5 C 39.5,47.5 37.5,47.5 35.5,46.5 Z" fill={isDark ? '#002060' : '#ffffff'} />
            <path d="M 63.5,44.5 C 61.5,44.5 59.5,45.5 58.5,46.5 C 60.5,47.5 62.5,47.5 64.5,46.5 Z" fill={isDark ? '#002060' : '#ffffff'} />
            
            {/* Intake/Grille */}
            <path d="M 44.5,47 H 55.5 C 54.5,50 45.5,50 44.5,47 Z" fill={isDark ? '#002060' : '#ffffff'} opacity="0.9" />
            
            {/* Wheels */}
            <rect x="35" y="51" width="5.5" height="4.5" rx="1.5" fill={isDark ? '#e2e8f0' : '#011030'} />
            <rect x="59.5" y="51" width="5.5" height="4.5" rx="1.5" fill={isDark ? '#e2e8f0' : '#011030'} />
          </g>
          
          {/* Vibrant Brand Orange Open Book Pages Supporting the C */}
          <g fill="#FF5500">
            {/* Left Wing page */}
            <path d="M 50,68 C 42,65 31,65 24,72 C 31,76 42,72 50,68 Z" />
            <path d="M 50,71 C 42,68 31,69 24,75.5 C 31,79.5 42,75.5 50,71 Z" fill="#e64c00" opacity="0.9" />
            
            {/* Right Wing page */}
            <path d="M 50,68 C 58,65 69,65 76,72 C 69,76 58,72 50,68 Z" />
            <path d="M 50,71 C 58,68 69,69 76,75.5 C 69,79.5 58,75.5 50,71 Z" fill="#e64c00" opacity="0.9" />
          </g>
        </svg>
      </div>
      
      {/* Branding Texts */}
      <div className="flex flex-col justify-center leading-none">
        <div className="font-display tracking-tight text-2xl font-extrabold flex items-center -mb-0.5">
          <span className="text-[#FF5500]">Go</span>
          <span className={navyTextClass}>Driveify</span>
        </div>
        <div className="font-sans text-[7.5px] font-bold tracking-[0.27em] pl-0.5 uppercase flex items-center gap-1">
          <span className="text-[#FF5500]">LEARN</span>
          <span className={navyTextClass}>DRIVING</span>
        </div>
      </div>
    </div>
  );
}
