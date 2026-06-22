import React, { useState, useEffect } from 'react';
import { Gauge, Volume2 } from 'lucide-react';

interface AppPreloaderProps {
  onComplete: () => void;
}

// --- High-Fidelity Web Audio V8 Startup Synthesizer ---
function playSynthesizedV8Startup() {
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return;

  try {
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Master Output Gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.connect(ctx.destination);

    // Deep V8 Cylinder 1 Thrum (Frequencies tuned for phone/laptop speaker audibility)
    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(45, now); // Raised from 22 to be audible

    // Offset frequency oscillator to produce organic beating effect of multiple cylinders
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(35, now);

    // Dynamic thumping sub-bass (Square wave provides more audible harmonics than sine)
    const subOsc = ctx.createOscillator();
    subOsc.type = "square";
    subOsc.frequency.setValueAtTime(50, now);

    // Resonant filters to shape the exhaust and block sound
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(800, now); // Allow mid-range growl through

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(150, now);
    bandpass.Q.setValueAtTime(2.0, now);

    // Connect nodes
    const engineGain = ctx.createGain();
    engineGain.gain.setValueAtTime(0.7, now); // Slightly louder

    osc1.connect(engineGain);
    osc2.connect(engineGain);
    subOsc.connect(engineGain);

    engineGain.connect(lowpass);
    lowpass.connect(bandpass);
    bandpass.connect(masterGain);

    // Start cylinder oscillators
    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);

    // 1. Starter motor high-speed cranking sound (clicks)
    const crankOsc = ctx.createOscillator();
    crankOsc.type = "square"; // Changed to square for more metallic click
    crankOsc.frequency.setValueAtTime(250, now);

    const crankGain = ctx.createGain();
    crankGain.gain.setValueAtTime(0.4, now);
    crankGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    crankOsc.connect(crankGain);
    crankGain.connect(ctx.destination);
    crankOsc.start(now);
    crankOsc.stop(now + 0.45);

    // 2. Engine Ignites and Roars (Flare Up)
    osc1.frequency.setValueAtTime(45, now);
    osc1.frequency.exponentialRampToValueAtTime(180, now + 0.4); 
    osc1.frequency.exponentialRampToValueAtTime(65, now + 1.1);  // settles to idle

    osc2.frequency.setValueAtTime(35, now);
    osc2.frequency.exponentialRampToValueAtTime(140, now + 0.4); 
    osc2.frequency.exponentialRampToValueAtTime(55, now + 1.1);  // settles to idle

    subOsc.frequency.setValueAtTime(50, now);
    subOsc.frequency.linearRampToValueAtTime(160, now + 0.4);
    subOsc.frequency.linearRampToValueAtTime(70, now + 1.1);

    // Bandpass sweep to make the combustion exhaust flare up sound real
    bandpass.frequency.setValueAtTime(150, now);
    bandpass.frequency.exponentialRampToValueAtTime(800, now + 0.4);
    bandpass.frequency.exponentialRampToValueAtTime(180, now + 1.1);

    // 3. Volume spike at combustion flare, then settling down to rumble idle
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(1.0, now + 0.4); // Ignite flare loudness
    masterGain.gain.exponentialRampToValueAtTime(0.6, now + 1.1); // Idle rumble volume

    // Settle further and smoothly fade out after 3.2 seconds
    masterGain.gain.setValueAtTime(0.6, now + 2.5);
    masterGain.gain.linearRampToValueAtTime(0, now + 3.2);

    setTimeout(() => {
      try {
        osc1.stop();
        osc2.stop();
        subOsc.stop();
        ctx.close();
      } catch (e) {}
    }, 3500);

  } catch (error) {
    console.warn("Web Audio engine startup play deferred or failed: ", error);
  }
}

export default function AppPreloader({ onComplete }: AppPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isReadyToIgnite, setIsReadyToIgnite] = useState(false);
  const [isIgnited, setIsIgnited] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const playTriggeredRef = React.useRef(false);

  // Play sound function
  const triggerStartupSound = () => {
    if (playTriggeredRef.current) return;
    playTriggeredRef.current = true;

    // 1. Play synthesized performance engine
    playSynthesizedV8Startup();

    // 2. Play Mixkit offline sound fallback
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2653/2653-84.wav");
      audio.volume = 0.95; // Maximum crystal-clear fullness
      audio.play().catch(e => console.log("Audio play deferred or blocked by browser.", e));
    } catch (e) {
      console.warn("Media file play failed.", e);
    }
  };

  // Set up global background listeners to silently unlock AudioContext at the very first sign of user interaction.
  // This bypasses the browser's autoplay block automatically, securing the reload/refresh experience.
  useEffect(() => {
    const unlockAudio = () => {
      setHasInteracted(true);
      try {
        const contextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (contextClass) {
          const tempCtx = new contextClass();
          if (tempCtx.state === 'suspended') {
            tempCtx.resume();
          }
        }
      } catch (e) {}
    };

    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    window.addEventListener('mousedown', unlockAudio, { passive: true });
    window.addEventListener('pointerdown', unlockAudio, { passive: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('mousedown', unlockAudio);
      window.removeEventListener('pointerdown', unlockAudio);
    };
  }, []);

  useEffect(() => {
    // Fill the progress bar over 1500ms to keep it fast, snappy and responsive
    const totalDuration = 1500; // ms
    const intervalTime = 30; // ms
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsReadyToIgnite(true);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleIgnition = () => {
    if (isIgnited) return;

    setIsIgnited(true);
    setHasInteracted(true);

    // Warm-up / Trigger startup roar exactly when triggered
    triggerStartupSound();

    // Create high-velocity launch and fade transition
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 500); // fade out duration
      return () => clearTimeout(completeTimeout);
    }, 1200); // Allow car startup roar to flourish for 1.2s before entering the site

    return () => clearTimeout(fadeTimeout);
  };

  // Run transition automatically IF user has already interacted, or wait for click to guarantee audio
  useEffect(() => {
    if (isReadyToIgnite && !isIgnited) {
      if (hasInteracted) {
        // If they already clicked or touched the page during loading, trigger completely automatically!
        handleIgnition();
      }
    }
  }, [isReadyToIgnite, hasInteracted, isIgnited]);

  // Safe early background unlock on click anywhere on full preloader
  const handlePreloaderScreenClick = () => {
    setHasInteracted(true);
    try {
      const contextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (contextClass) {
        const tempCtx = new contextClass();
        if (tempCtx.state === 'suspended') {
          tempCtx.resume();
        }
      }
    } catch (e) {}

    // If preloader is already loaded (progress 100%), tapping ANYWHERE on the screen ignites engine automatically
    if (isReadyToIgnite && !isIgnited) {
      handleIgnition();
    }
  };

  return (
    <div 
      id="app-preloader"
      onClick={handlePreloaderScreenClick}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-radial from-[#0B1120] to-[#030712] overflow-hidden select-none transition-all duration-500 ease-in-out cursor-pointer ${
        isFading ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Glow effect */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        isIgnited 
          ? 'bg-[radial-gradient(circle,rgba(239,68,68,0.18)_0%,transparent_70%)]' 
          : 'bg-[radial-gradient(circle,rgba(255,113,18,0.08)_0%,transparent_70%)] animate-pulse'
      }`} />

      {/* Simulator car stage container */}
      <div className="w-[320px] h-[80px] relative mb-10 overflow-visible">
        {/* Road Track Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500/10" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-repeating-linear-gradient-[90deg] from-orange-500/30 via-orange-500/30 to-transparent bg-[size:30px_100%] animate-[roadScan_1.2s_linear_infinite]" />

        {/* Dynamic orange loading trail */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-[#FF7112] shadow-[0_0_12px_#FF7112]"
          style={{ 
            width: isIgnited ? "100%" : `${progress}%`, 
            transition: isIgnited ? 'width 0.4s ease-out' : 'width 30ms linear' 
          }}
        />

        {/* Finishing flag/gate */}
        <div className="absolute right-0 bottom-0 w-1.5 h-9 bg-repeating-linear-gradient-[0deg] from-slate-100 to-slate-900 border border-[#FF7112] shadow-[0_0_10px_rgba(255,113,18,0.5)] z-10" />

        {/* Animated glowing supercar */}
        <div 
          className="absolute bottom-[-4px] w-[72px] h-[36px] transition-all"
          style={{ 
            left: isIgnited 
              ? `120%` 
              : `calc(${progress}% - ${progress * 0.72}px)`,
            transitionDuration: isIgnited ? '900ms' : '30ms',
            transitionTimingFunction: isIgnited ? 'cubic-bezier(0.6, -0.28, 0.735, 0.045)' : 'ease-out'
          }}
        >
          {/* Exhaust warp effects */}
          <div className={`absolute left-[-15px] bottom-3.5 w-6 h-[1.5px] bg-gradient-to-r from-transparent to-orange-500 blur-[0.5px] ${isIgnited ? 'scale-x-300 opacity-100' : 'opacity-80 animate-pulse'}`} />
          <div className={`absolute left-[-22px] bottom-2 w-[18px] h-[1.5px] bg-gradient-to-r from-transparent to-[#FF7112] blur-[0.5px] ${isIgnited ? 'scale-x-300 opacity-100' : 'opacity-70 animate-pulse'}`} />

          {/* Nitro flame for ignite boost */}
          {isIgnited && (
            <div className="absolute left-[-35px] bottom-1 w-8 h-4 bg-gradient-to-r from-rose-600 via-orange-500 to-transparent rounded-full filter blur-[1px] animate-pulse" />
          )}

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32" fill="none" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,113,18,0.8)]">
            {/* Supercar chassis contour */}
            <path d="M4 22h4c1 0 1.8-.7 2-1.7l1.5-6c.3-1.2 1.3-2 2.5-2h14c1.2 0 2.2.8 2.5 2l1.5 6c.2 1 .9 1.7 2 1.7h18c1.1 0 2-.9 2-2v-2c0-1.8-1.1-3.4-2.8-4l-8.6-3.2C41.8 4.2 38.3 3 34.7 3H19.6c-2.4 0-4.7 1.1-6.1 3L5.4 17.6C4.5 18.8 4 20.3 4 22z" stroke="#FF7112" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M16 11.5h14c1 0 1.8.7 2 1.7l1 3.5H13.6l1.2-4.2c.2-.6.7-1 1.2-1z" fill="rgba(255,113,18,0.25)" stroke="#FF7112" strokeWidth="1.2"/>
            <path d="M21 16.5h15" stroke="#FF9E59" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
            <path d="M53 18.5h4.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.95" className="drop-shadow-[0_0_3px_#fff]" />
            <path d="M4 17.5h3" stroke="#ff3333" strokeWidth="2" strokeLinecap="round" className="drop-shadow-[0_0_3px_#ff3333]" />
            {/* Spinning wheels with custom fast pacing during launch */}
            <g className="origin-center" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: isIgnited ? 'spin 0.08s linear infinite' : 'spin 0.3s linear infinite' }}>
              <circle cx="16" cy="24" r="6.5" stroke="#FF7112" strokeWidth="1.8" fill="none" />
              <circle cx="16" cy="24" r="3.5" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3.5" fill="none" />
            </g>
            <g className="origin-center" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: isIgnited ? 'spin 0.08s linear infinite' : 'spin 0.3s linear infinite' }}>
              <circle cx="46" cy="24" r="6.5" stroke="#FF7112" strokeWidth="1.8" fill="none" />
              <circle cx="46" cy="24" r="3.5" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3.5" fill="none" />
            </g>
          </svg>
        </div>
      </div>

      {/* Brand Label */}
      <h2 className="text-white text-3xl font-black tracking-[0.15em] uppercase select-none">
        <span className="text-[#FF7112] drop-shadow-[0_0_10px_rgba(255,113,18,0.5)]">GO</span>DRIVEIFY
      </h2>

      {/* Dynamic Content: Check whether to show the Start Button or Loading Progress */}
      <div className="mt-8 flex flex-col items-center justify-center min-h-[140px] text-center px-4">
        {isReadyToIgnite ? (
          <div className="flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-out]">
            {isIgnited ? (
              <>
                <p className="text-[#FF7112] font-mono text-xs uppercase tracking-[0.25em] font-black animate-pulse select-none">
                  V8 ENGINE IGNITED! 🔥
                </p>
                <p className="mt-2 text-slate-400 text-[10px] uppercase font-bold tracking-widest select-none font-mono">
                  Engaging drive transmissions...
                </p>
              </>
            ) : (
              <>
                {/* Hyper-realistic supercar Push to Start Engine button */}
                <button
                  type="button"
                  onClick={handleIgnition}
                  className="group relative flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 border-4 border-[#FF7112]/30 active:scale-95 cursor-pointer transition-all duration-300 shadow-[0_0_35px_rgba(255,113,18,0.25)] hover:shadow-[0_0_55px_rgba(255,113,18,0.45)] hover:border-[#FF7112] mb-4"
                >
                  {/* Subtle spinning dashboard gauge style ring */}
                  <div className="absolute inset-1 rounded-full border border-dashed border-red-500/40 group-hover:rotate-180 transition-transform duration-1000" />
                  
                  {/* Outer glowing pulsing ring */}
                  <span className="absolute -inset-1 rounded-full bg-orange-500/10 animate-ping opacity-75 pointer-events-none" />
                  <span className="absolute -inset-2.5 rounded-full border border-[#FF7112]/15 animate-pulse pointer-events-none" />

                  {/* Red Engine Core */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-rose-800 flex flex-col items-center justify-center border border-red-400/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-rose-100/90 leading-none">ENGINE</span>
                    <span className="text-sm font-black uppercase tracking-[0.1em] text-white leading-none mt-1.5 drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">START</span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-rose-200/60 leading-none mt-1">STOP</span>
                  </div>
                </button>

                <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.25em] font-black select-none">
                  DRIVE PROTOCOL ARMED
                </p>
                <p className="mt-1.5 text-[#FF7112] text-xs uppercase font-black tracking-[0.2em] select-none animate-pulse">
                  PUSH TO IGNITE ENGINE
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center animate-pulse">
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1.5">
              System Preloading
              <span className="inline-block w-4 text-left after:content-['...'] animate-[dots_1.5s_infinite_steps(4)]" />
            </p>

            <div className="mt-4 bg-slate-900/60 border border-slate-800/80 px-5 py-2.5 rounded-full flex items-center gap-2.5 max-w-xs justify-center">
              <Gauge className="w-4 h-4 text-[#FF7112] animate-bounce" />
              <span className="text-rose-400 font-mono text-sm font-black tracking-wider">
                {Math.min(7999, Math.floor(progress * 80))} <span className="text-[10px] text-slate-500">RPM</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Pre-interaction Guide */}
      {!hasInteracted && (
        <div className="absolute bottom-8 mx-auto text-slate-500 text-[9px] uppercase font-bold tracking-[0.2em] text-center flex items-center gap-1.5 opacity-60">
          <Volume2 className="w-3.5 h-3.5 text-orange-400 animate-pulse" /> PRESS ANY KEY OR TAP SCREEN TO START ENGINE
        </div>
      )}
    </div>
  );
}
