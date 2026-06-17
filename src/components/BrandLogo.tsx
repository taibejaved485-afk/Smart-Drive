import React from 'react';

interface BrandLogoProps {
  isDark?: boolean;
}

export default function BrandLogo({ isDark = false }: BrandLogoProps) {
  const logoSrc = isDark ? '/static/godriveify-logo-dark.jpg' : '/static/godriveify-logo.jpg';

  return (
    <div className="flex items-center w-auto h-full max-h-[80px] select-none group cursor-pointer">
      <img 
        src={logoSrc} 
        alt="GoDriveify Logo" 
        className="h-full w-auto object-contain max-w-none block relative z-10 transform transition-transform duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
        style={{ imageRendering: 'high-quality' }}
      />
    </div>
  );
}
