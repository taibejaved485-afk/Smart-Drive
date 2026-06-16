import React from 'react';

interface BrandLogoProps {
  isDark?: boolean;
}

export default function BrandLogo({ isDark = false }: BrandLogoProps) {
  return (
    <div className="flex items-center select-none group cursor-pointer">
      <img 
        src="/static/godriveify-logo.jpg" 
        alt="GoDriveify Logo" 
        className="h-20 w-auto object-contain relative z-10 transform transition-transform duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
        style={{ imageRendering: 'high-quality' }}
      />
    </div>
  );
}
