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

    // Deep V8 Cylinder 1 Thrum
    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(22, now); // Low thrumming V8 pulse

    // Offset frequency oscillator to produce organic beating effect of multiple cylinders
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(14, now);

    // Dynamic thumping sub-bass
    const subOsc = ctx.createOscillator();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(30, now);

    // Resonant filters to shape the exhaust and block sound
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(200, now);

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(90, now);
    bandpass.Q.setValueAtTime(3.0, now);

    // Connect nodes
    const engineGain = ctx.createGain();
    engineGain.gain.setValueAtTime(0.6, now);

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
    crankOsc.type = "sine";
    crankOsc.frequency.setValueAtTime(190, now);

    const crankGain = ctx.createGain();
    crankGain.gain.setValueAtTime(0.3, now);
    crankGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    crankOsc.connect(crankGain);
    crankGain.connect(ctx.destination);
    crankOsc.start(now);
    crankOsc.stop(now + 0.45);

    // 2. Engine Ignites and Roars (Flare Up)
    osc1.frequency.setValueAtTime(22, now);
    osc1.frequency.exponentialRampToValueAtTime(125, now + 0.4); 
    osc1.frequency.exponentialRampToValueAtTime(34, now + 1.1);  // settles to idle

    osc2.frequency.setValueAtTime(14, now);
    osc2.frequency.exponentialRampToValueAtTime(95, now + 0.4); 
    osc2.frequency.exponentialRampToValueAtTime(25, now + 1.1);  // settles to idle

    subOsc.frequency.setValueAtTime(30, now);
    subOsc.frequency.linearRampToValueAtTime(110, now + 0.4);
    subOsc.frequency.linearRampToValueAtTime(45, now + 1.1);

    // Bandpass sweep to make the combustion exhaust flare up sound real
    bandpass.frequency.setValueAtTime(90, now);
    bandpass.frequency.exponentialRampToValueAtTime(380, now + 0.4);
    bandpass.frequency.exponentialRampToValueAtTime(95, now + 1.1);

    // 3. Volume spike at combustion flare, then settling down to rumble idle
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(1.0, now + 0.4); // Ignite flare loudness
    masterGain.gain.exponentialRampToValueAtTime(0.45, now + 1.1); // Idle rumble volume

    // Settle further and smoothly fade out after 3.2 seconds
    masterGain.gain.setValueAtTime(0.45, now + 2.5);
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
      audio.volume = 0.7;
      audio.play().catch(e => console.log("Audio play deferred or blocked by browser.", e));
    } catch (e) {
      console.warn("Media file play failed.", e);
    }
  };

  useEffect(() => {
    // Fill the progress bar over 2500ms
    const totalDuration = 2400; // ms
    const intervalTime = 40; // ms
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Trigger startup engine sound exactly when preloader progress completes and we transition!
      triggerStartupSound();

      // Trigger fade transition
      const fadeTimeout = setTimeout(() => {
        setIsFading(true);
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 500); // fade out duration
        return () => clearTimeout(completeTimeout);
      }, 100);

      return () => clearTimeout(fadeTimeout);
    }
  }, [progress, onComplete]);

  // Handle any click on the preloader screen to unlock audio and immediately play starter cranking clicks
  const handlePreloaderClick = () => {
    setHasInteracted(true);
    // Silent play to unlock audio context in absolute safety
    try {
      const contextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (contextClass) {
        const tempCtx = new contextClass();
        if (tempCtx.state === 'suspended') {
          tempCtx.resume();
        }
      }
    } catch (e) {}

    // If they click on the overlay, let's pre-trigger or register the intention to play
    triggerStartupSound();
  };

  return (
    <div 
      id="app-preloader"
      onClick={handlePreloaderClick}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-radial from-[#0B1120] to-[#030712] overflow-hidden select-none transition-all duration-500 ease-in-out ${
        isFading ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(255,113,18,0.08)_0%,transparent_70%)] blur-2xl pointer-events-none animate-pulse" />

      {/* Simulator car stage container */}
      <div className="w-[320px] h-[80px] relative mb-8">
        {/* Road Track Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500/10" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-repeating-linear-gradient-[90deg] from-orange-500/30 via-orange-500/30 to-transparent bg-[size:30px_100%] animate-[roadScan_1.2s_linear_infinite]" />

        {/* Dynamic orange loading trail */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-[#FF7112] shadow-[0_0_12px_#FF7112]"
          style={{ width: `${progress}%`, transition: 'width 40ms linear' }}
        />

        {/* Finishing flag/gate */}
        <div className="absolute right-0 bottom-0 w-1.5 h-9 bg-repeating-linear-gradient-[0deg] from-slate-100 to-slate-900 border border-[#FF7112] shadow-[0_0_10px_rgba(255,113,18,0.5)] z-10" />

        {/* Animated glowing supercar */}
        <div 
          className="absolute bottom-[-4px] w-[72px] h-[36px] transition-all duration-40ms ease-out"
          style={{ left: `calc(${progress}% - ${progress * 0.72}px)` }}
        >
          {/* Exhaust warp effects */}
          <div className="absolute left-[-15px] bottom-3.5 w-6 h-[1.5px] bg-gradient-to-r from-transparent to-orange-500 opacity-80 blur-[0.5px] animate-pulse" />
          <div className="absolute left-[-22px] bottom-2 w-[18px] h-[1.5px] bg-gradient-to-r from-transparent to-[#FF7112] opacity-70 blur-[0.5px] animate-pulse" />

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32" fill="none" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,113,18,0.8)]">
            {/* Supercar chassis contour */}
            <path d="M4 22h4c1 0 1.8-.7 2-1.7l1.5-6c.3-1.2 1.3-2 2.5-2h14c1.2 0 2.2.8 2.5 2l1.5 6c.2 1 .9 1.7 2 1.7h18c1.1 0 2-.9 2-2v-2c0-1.8-1.1-3.4-2.8-4l-8.6-3.2C41.8 4.2 38.3 3 34.7 3H19.6c-2.4 0-4.7 1.1-6.1 3L5.4 17.6C4.5 18.8 4 20.3 4 22z" stroke="#FF7112" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M16 11.5h14c1 0 1.8.7 2 1.7l1 3.5H13.6l1.2-4.2c.2-.6.7-1 1.2-1z" fill="rgba(255,113,18,0.25)" stroke="#FF7112" strokeWidth="1.2"/>
            <path d="M21 16.5h15" stroke="#FF9E59" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
            <path d="M53 18.5h4.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.95" className="drop-shadow-[0_0_3px_#fff]" />
            <path d="M4 17.5h3" stroke="#ff3333" strokeWidth="2" strokeLinecap="round" className="drop-shadow-[0_0_3px_#ff3333]" />
            {/* Spinning wheels */}
            <g className="origin-center animate-[spin_0.3s_linear_infinite]" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <circle cx="16" cy="24" r="6.5" stroke="#FF7112" strokeWidth="1.8" fill="none" />
              <circle cx="16" cy="24" r="3.5" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3.5" fill="none" />
            </g>
            <g className="origin-center animate-[spin_0.3s_linear_infinite]" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <circle cx="46" cy="24" r="6.5" stroke="#FF7112" strokeWidth="1.8" fill="none" />
              <circle cx="46" cy="24" r="3.5" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3.5" fill="none" />
            </g>
          </svg>
        </div>
      </div>

      {/* Brand & Progress text */}
      <h2 className="text-white text-3xl font-black tracking-[0.15em] uppercase select-none">
        <span className="text-[#FF7112] drop-shadow-[0_0_10px_rgba(255,113,18,0.5)]">GO</span>DRIVEIFY
      </h2>

      <div className="relative mt-3 h-5 flex items-center justify-center">
        <p className="text-slate-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 animate-pulse">
          Starting Engine
          <span className="inline-block w-4 text-left after:content-['...'] animate-[dots_1.5s_infinite_steps(4)]" />
        </p>
      </div>

      <div className="mt-8 bg-slate-900/60 border border-slate-800/80 px-5 py-2.5 rounded-full flex items-center gap-2.5 max-w-xs text-center">
        <Gauge className="w-4 h-4 text-[#FF7112]" />
        <span className="text-rose-400 font-mono text-sm font-black tracking-wider">
          {Math.floor(progress * 80)} <span className="text-[10px] text-slate-500">RPM</span>
        </span>
      </div>

      {/* Helper guide to encourage early screen tap for high reliability sound unlock */}
      {!hasInteracted && (
        <div className="absolute bottom-8 mx-auto text-slate-500 text-[10px] uppercase font-bold tracking-widest text-center flex items-center gap-1 opacity-60 animate-bounce">
          <Volume2 className="w-3.5 h-3.5 text-orange-400" /> Tap anywhere on screen to unmute V8 power
        </div>
      )}
    </div>
  );
}
