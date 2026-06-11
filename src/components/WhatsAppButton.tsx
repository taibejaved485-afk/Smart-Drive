import React, { useState } from 'react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  // WhatsApp link using the requested phone number 03097666928 in international format (923097666928)
  const whatsappUrl = 'https://wa.me/923097666928?text=Assalam%20o%20Alaikum%20Smart%20Drive%2C%20I%2520want%2520to%2520know%2520more%2520about%252520your%2520driving%2520programs%2520and%2520car%2520rental%2520services.';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 font-sans pointer-events-none">
      {/* Tooltip text bubble */}
      {showTooltip && (
        <div className="bg-white text-gray-900 border border-gray-150 px-4 py-2.5 rounded-2xl shadow-lg shadow-gray-200/50 flex items-center gap-2 pointer-events-auto animate-fade-in text-xs sm:text-sm font-bold border-l-4 border-l-green-500 relative">
          <span>Chat on WhatsApp!</span>
          <button 
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 font-extrabold pb-0.5 ml-1 select-none cursor-pointer"
            title="Dismiss tool-tip"
          >
            ×
          </button>
          {/* Caret arrow on the right */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gray-150 rotate-45" />
        </div>
      )}

      {/* Pulsing floating green button anchor */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Support Chat"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] active:scale-95 text-white rounded-full shadow-2xl shadow-green-400/40 pointer-events-auto transition-all duration-300 hover:scale-110 group cursor-pointer"
      >
        {/* Animated outer ring for pulsing focus attraction */}
        <span className="absolute inset-0 rounded-full border-4 border-[#25D366]/40 animate-ping pointer-events-none" />
        
        {/* Glowing layer */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity blur-md" />

        {/* Official WhatsApp SVG Logo */}
        <svg 
          className="relative w-8 h-8 text-white fill-white group-hover:scale-110 transition-transform duration-250" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
