import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Compass, 
  Eye, 
  ShieldAlert, 
  ArrowLeftRight, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Car,
  Bike,
  Truck,
  Play,
  Pause,
  Info,
  Sparkles,
  Gauge,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

// Vehicle types with their metadata and educational tips in EN and UR
const VEHICLES = [
  {
    id: 'motorcycle',
    nameEN: "Motorcycle / Bike",
    nameUR: "موٹر سائیکل / بائیک",
    icon: Bike,
    color: "#EF4444",
    width: "w-10",
    height: "h-16",
    shadow: "shadow-[0_8px_16px_rgba(239,68,68,0.3)]",
    tipEN: "⚠️ Motorcycles are narrow and highly vulnerable. They vanish instantly in minor angles. Double-check your side windows!",
    tipUR: "⚠️ موٹر سائیکل بہت تنگ ہوتی ہے اور شیشوں سے فوراً غائب ہو جاتی ہے۔ مڑنے سے پہلے کھڑکی سے باہر ضرور نظر دوڑائیں۔"
  },
  {
    id: 'car',
    nameEN: "Standard Sedan",
    nameUR: "پیسنجر کار / سیڈان",
    icon: Car,
    color: "#FF7112",
    width: "w-14",
    height: "h-24",
    shadow: "shadow-[0_10px_20px_rgba(255,113,18,0.3)]",
    tipEN: "⚠️ A standard passenger car sits fully inside your blind spot for nearly 3 seconds at highway speeds before you see it.",
    tipUR: "⚠️ شاہراہوں پر ایک عام کار کم از کم 3 سیکنڈ کے لیے آپ کے اندھے دھبے میں مکمل طور پر غائب رہ سکتی ہے۔"
  },
  {
    id: 'truck',
    nameEN: "Commercial Truck",
    nameUR: "کمرشل ٹرک / ڈمپر",
    icon: Truck,
    color: "#F59E0B",
    width: "w-16",
    height: "h-32",
    shadow: "shadow-[0_12px_24px_rgba(245,158,11,0.35)]",
    tipEN: "⚠️ Large trucks have enormous blind spots. Remember: If you can't see their mirrors, they absolutely cannot see you either!",
    tipUR: "⚠️ بڑے ٹرکوں کے اندھے دھبے بہت بڑے ہوتے ہیں۔ اصول: اگر آپ ان کا شیشہ نہیں دیکھ سکتے، تو وہ بھی آپ کو نہیں دیکھ سکتے۔"
  }
];

const TRANSLATIONS = {
  en: {
    title: "Interactive Blind Spot Lab",
    subtitle: "Experience standard mirror limits in high fidelity. Toggle active sonar warning systems, launch overtaking runs, and perform physical shoulder checks to master defensive driving.",
    laneSelector: "Select Opponent Track:",
    leftLane: "Left Lane",
    rightLane: "Right Lane",
    carPosition: "Adjust Position Offset:",
    rearViewMirror: "Interior Mirror",
    leftMirror: "Left Wing Mirror",
    rightMirror: "Right Wing Mirror",
    shoulderCheck: "Physical Shoulder Check",
    visibleText: "Visible",
    invisibleText: "⚠️ HIDDEN!",
    alertWarning: "CRITICAL DANGER! The vehicle is alongside your rear door but 100% invisible in all mirrors. You must perform a physical SHOULDER CHECK before steering!",
    alertUrduWarning: "شدید خطرہ! گاڑی آپ کے پچھلے بمپر کے برابر ہے لیکن کسی شیشے میں نظر نہیں آ رہی۔ مڑنے سے پہلے لازمی گردان گھما کر (Shoulder Check) دیکھیں!",
    tipTitle: "GoDriveify Safety Protocol:",
    tipBody: "Adjust side mirrors wide so your own car is barely visible. Lean slightly forward to maximize coverage, and never steer without a direct 1-second over-the-shoulder glance.",
    presetsTitle: "Interactive Safety Scenarios",
    presetBlindSpot: "Lock in Blind Spot",
    presetOvertake: "Animate Overtaking Pass",
    presetSafe: "Reset to Safe Margin",
    soundToggle: "Sonar Alarm",
    vehicleSelect: "Select Opponent Type:",
    bsdWarning: "Blind Spot Detection (BSD) active on your wing mirrors.",
    liveHud: "LIVE TRACK INSTRUMENTATION",
    dangerZoneAlert: "COLLISION THREAT DETECTED"
  },
  ur: {
    title: "اندھے دھبے کی ہائی فائی لیب",
    subtitle: "شیشوں کی حقیقی حد کا خود تجربہ کریں۔ ریڈار وارننگ سسٹم آن کریں، اوور ٹیکنگ کی لائیو اینیمیشن چلائیں، اور مڑنے سے پہلے گردن گھما کر دیکھنے کی عادت ڈالیں۔",
    laneSelector: "مخالف گاڑی کا ٹریک منتخب کریں:",
    leftLane: "بایاں ٹریک",
    rightLane: "دایاں ٹریک",
    carPosition: "گاڑی کا فاصلہ ایڈجسٹ کریں:",
    rearViewMirror: "درمیان والا شیشہ",
    leftMirror: "بایاں شیشہ",
    rightMirror: "دایاں شیشہ",
    shoulderCheck: "براہِ راست گردن گھما کر دیکھنا",
    visibleText: "نمایاں ہے",
    invisibleText: "⚠️ غائب (اندھا دھبہ)!",
    alertWarning: "شدید خطرہ! گاڑی آپ کے پچھلے بمپر کے برابر ہے لیکن کسی شیشے میں نظر نہیں آ رہی۔ مڑنے سے پہلے لازمی گردان گھما کر (Shoulder Check) دیکھیں!",
    alertUrduWarning: "CRITICAL DANGER! The vehicle is alongside your rear door but invisible in all mirrors. You must perform a physical SHOULDER CHECK before turning!",
    tipTitle: "گو ڈرائیو آئیف کا حفاظتی اصول:",
    tipBody: "سائیڈ شیشوں کو ایسے سیٹ کریں کہ اپنی گاڑی کا کنارہ برائے نام نظر آئے۔ مڑنے سے پہلے صرف ایک سیکنڈ کے لیے گردن گھما کر شیشے سے باہر والی جگہ دیکھیں۔",
    presetsTitle: "حفاظتی منظرنامے (Presets)",
    presetBlindSpot: "اندھے دھبے کا منظر",
    presetOvertake: "اوور ٹیکنگ لائیو دیکھیں",
    presetSafe: "محفوظ فاصلے پر لائیں",
    soundToggle: "آواز کی رہنمائی",
    vehicleSelect: "مخالف گاڑی کی قسم منتخب کریں:",
    bsdWarning: "شیشوں پر بلائنڈ اسپاٹ انڈیکیٹر (BSD) متحرک ہے۔",
    liveHud: "لائیو ٹریک مانیٹرنگ",
    dangerZoneAlert: "شدید خطرہ کا الرٹ"
  }
};

export default function BlindSpotSimulator() {
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [opponentLane, setOpponentLane] = useState<'left' | 'right'>('left');
  const [opponentY, setOpponentY] = useState(85); // 12 (ahead) to 95 (far behind)
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const [shoulderCheckActive, setShoulderCheckActive] = useState(false);
  
  // Speed simulator for HUD
  const [speed, setSpeed] = useState(60);
  
  // Interactive features
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isOvertaking, setIsOvertaking] = useState(false);
  const overtakeInterval = useRef<NodeJS.Timeout | null>(null);

  // Audio synthesis setup
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const t = TRANSLATIONS[lang];
  const vehicleData = VEHICLES.find(v => v.id === selectedVehicle) || VEHICLES[1];

  // User's car is static at Y = 50.
  // Opponent car Y goes from 10 to 95.
  
  // Rearview Mirror Visibility: Visible if opponent is far behind (Y between 68 and 100)
  const visibleInRearview = opponentY >= 68 && opponentY <= 100;

  // Side Mirror Coverage (Y from 65 to 90)
  // Blind Spot Range (Y between 44 and 65)
  const visibleInLeftMirror = opponentLane === 'left' && opponentY > 64 && opponentY <= 90;
  const visibleInRightMirror = opponentLane === 'right' && opponentY > 64 && opponentY <= 90;

  // Direct Window View / Shoulder Check window range
  const visibleInPeripheral = opponentY >= 32 && opponentY <= 43;
  
  // Inside the dangerous blind spot transition
  const inBlindSpot = opponentY >= 44 && opponentY <= 65;
  const isCriticalDanger = inBlindSpot;

  // Track lanes simulation offset for background animation
  const [laneOffset, setLaneOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animateLanes = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      // Speed factor determines how fast lanes scroll
      const currentSpeedFactor = isOvertaking ? 1.4 : 0.6;
      setLaneOffset((prev) => (prev + currentSpeedFactor * (delta / 16)) % 40);
      
      animationFrameId = requestAnimationFrame(animateLanes);
    };

    animationFrameId = requestAnimationFrame(animateLanes);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOvertaking]);

  // Adjust mock speed dynamically based on actions
  useEffect(() => {
    if (isOvertaking) {
      // Accelerate during overtaking simulation
      if (opponentY > 50) {
        setSpeed(Math.min(85, Math.round(60 + (95 - opponentY) * 0.6)));
      } else {
        setSpeed(Math.max(60, Math.round(85 - (50 - opponentY) * 1.1)));
      }
    } else if (isCriticalDanger) {
      setSpeed(60);
    } else {
      setSpeed(60);
    }
  }, [opponentY, isOvertaking, isCriticalDanger]);

  // Trigger safety sound alarms inside blind spot
  useEffect(() => {
    if (soundEnabled && isCriticalDanger) {
      startAlarm();
    } else {
      stopAlarm();
    }
    return () => stopAlarm();
  }, [soundEnabled, isCriticalDanger, opponentY]);

  // Audio Synthesizer Controls
  const startAlarm = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous to prevent stacking
      stopAlarm();

      // Setup Oscillator (Beeping Tone)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      
      // Dynamic frequency based on proximity inside blind spot
      const distanceFactor = Math.abs(opponentY - 54); // Peak danger is Y=54
      const pitch = 580 - (distanceFactor * 12); // higher pitch when exactly center of blind spot
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      // Fast warning beeps
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn("Audio Context block or error", e);
    }
  };

  const stopAlarm = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
  };

  // Preset Controls
  const setPreset = (type: 'blind' | 'safe') => {
    if (overtakeInterval.current) {
      clearInterval(overtakeInterval.current);
      setIsOvertaking(false);
    }
    if (type === 'blind') {
      setOpponentY(54); // Exact blind spot center
    } else {
      setOpponentY(85); // Safe back position
    }
  };

  // Live Auto Overtaking Simulation
  const triggerOvertakeSimulation = () => {
    if (isOvertaking) {
      if (overtakeInterval.current) clearInterval(overtakeInterval.current);
      setIsOvertaking(false);
      return;
    }

    setIsOvertaking(true);
    setOpponentY(95); // Start far behind
    
    overtakeInterval.current = setInterval(() => {
      setOpponentY((prev) => {
        if (prev <= 12) {
          if (overtakeInterval.current) clearInterval(overtakeInterval.current);
          setIsOvertaking(false);
          return 12; // Finished overtaking
        }
        return prev - 1.2; // Smoother slower progression for better analysis
      });
    }, 45);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (overtakeInterval.current) clearInterval(overtakeInterval.current);
    };
  }, []);

  return (
    <div className={`max-w-6xl mx-auto my-12 px-4 sm:px-6 ${lang === 'ur' ? 'font-urdu' : 'font-sans'}`} id="blind-spot-simulator">
      
      {/* Header section with modern badge, description & premium layout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#FF7112] bg-[#FF7112]/10 border border-[#FF7112]/20 px-4 py-1.5 rounded-full shadow-sm">
            <ShieldAlert className="w-3.5 h-3.5 text-[#FF7112] animate-pulse" />
            {lang === 'en' ? 'HIGH-FIDELITY DEFENSIVE LAB' : 'حفاظتی اور مانیٹرنگ لیب'}
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-950 leading-tight tracking-tight flex items-center gap-2">
            {t.title}
            <Sparkles className="w-6 h-6 text-amber-500 hidden sm:block animate-pulse" />
          </h2>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>
        
        {/* Language & Sound Quick Switchers */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Sound Assist Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              // Audio context user gesture activation
              if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              soundEnabled 
                ? 'bg-[#002060] text-white border-[#002060] shadow-md shadow-sky-900/15' 
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 shadow-sm'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            {t.soundToggle}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="bg-[#FF7112] hover:bg-[#FF7112]/90 hover:shadow-lg hover:shadow-orange-500/20 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 text-xs uppercase tracking-wider flex items-center gap-2 border border-[#FF7112]/10 cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4" />
            {lang === 'en' ? 'اردو میں دیکھیں' : 'English Mode'}
          </button>
        </div>
      </div>

      {/* Main interactive lab dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/50 border border-slate-100 rounded-3xl p-4 sm:p-6 lg:p-10 shadow-xl relative overflow-hidden">
        
        {/* Decorative Grid overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-100" />
        <div className="absolute -right-32 -top-32 w-64 h-64 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Left Side: Interactive Road Map Simulator (col-span-5) */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 lg:self-start bg-[#0b0f19] rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl h-[530px] lg:h-[750px] border border-slate-800 z-10 group">
          
          {/* Subtle Road grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

          {/* Sarak (Road Canvas) */}
          <div className="absolute inset-0 bg-slate-900/90 flex justify-center overflow-hidden">
            
            {/* Asphalt fine grit texture */}
            <div className="absolute inset-0 bg-slate-950/30 opacity-50 mix-blend-overlay" />

            {/* Red & White Safety Curbs on shoulders */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-red-600 flex flex-col">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className={`h-12 w-full ${i % 2 === 0 ? 'bg-white' : 'bg-red-600'}`} />
              ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-red-600 flex flex-col">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className={`h-12 w-full ${i % 2 === 0 ? 'bg-white' : 'bg-red-600'}`} />
              ))}
            </div>

            {/* Glowing yellow road boundaries */}
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
            <div className="absolute right-3 top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
            
            {/* White Dashed Lane Separators with Dynamic Parallax Scrolling */}
            <div className="absolute left-1/3 top-0 bottom-0 w-[2px] overflow-hidden flex flex-col justify-around">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-[2px] h-8 bg-slate-700/80 rounded-full"
                  style={{
                    transform: `translateY(${laneOffset}px)`
                  }}
                />
              ))}
            </div>
            <div className="absolute right-1/3 top-0 bottom-0 w-[2px] overflow-hidden flex flex-col justify-around">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-[2px] h-8 bg-slate-700/80 rounded-full"
                  style={{
                    transform: `translateY(${laneOffset}px)`
                  }}
                />
              ))}
            </div>

            {/* ACTIVE SONAR / RADAR CONE REPRESENTATION FROM USER CAR */}
            <AnimatePresence>
              {isCriticalDanger && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute pointer-events-none transition-all duration-300 ${
                    opponentLane === 'left' 
                      ? 'left-3 w-1/2 rounded-r-[100px]' 
                      : 'right-3 w-1/2 rounded-l-[100px]'
                  } top-[42%] h-[120px] bg-gradient-to-r ${
                    opponentLane === 'left' 
                      ? 'from-red-600/20 via-orange-500/10 to-transparent' 
                      : 'from-transparent via-orange-500/10 to-red-600/20'
                  } border-y border-dashed border-red-500/30 z-10 flex items-center justify-center`}
                >
                  <div className={`absolute ${opponentLane === 'left' ? 'left-6' : 'right-6'} animate-ping duration-1000 w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40`} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Static: USER'S CAR (Main vehicle - Deep Metallic Navy) */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-16 h-28 bg-gradient-to-b from-[#10306b] via-[#0b214a] to-[#040e21] border-2 border-sky-400 rounded-2xl flex flex-col items-center justify-between py-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_15px_rgba(14,165,233,0.25)] z-30 transition-all duration-300 group-hover:scale-[1.03]"
              style={{ top: '45%' }}
            >
              {/* LED Headlights reflecting forward */}
              <div className="absolute -top-6 left-1 w-3 h-6 bg-gradient-to-t from-sky-200/40 to-transparent blur-xs rounded-full opacity-60" />
              <div className="absolute -top-6 right-1 w-3 h-6 bg-gradient-to-t from-sky-200/40 to-transparent blur-xs rounded-full opacity-60" />

              {/* Back LED Tail Lights */}
              <div className="absolute -bottom-1 left-2 w-3.5 h-1.5 bg-red-500/90 rounded-b-sm shadow-[0_4px_12px_rgba(239,68,68,0.7)] animate-pulse" />
              <div className="absolute -bottom-1 right-2 w-3.5 h-1.5 bg-red-500/90 rounded-b-sm shadow-[0_4px_12px_rgba(239,68,68,0.7)] animate-pulse" />

              {/* Cabin Glass / Interior */}
              <div className="w-11 h-4 bg-gradient-to-b from-slate-200 to-sky-100 rounded border border-white/30 relative overflow-hidden shadow-inner">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/50" />
                <div className="absolute left-2.5 right-2.5 top-1 bottom-1 bg-[#020617] rounded-sm opacity-90 flex items-center justify-center">
                  <div className="w-4 h-1 bg-[#FF7112] rounded-full animate-pulse" />
                </div>
              </div>

              <div className="text-[9px] font-black text-sky-400 uppercase tracking-widest text-center leading-none mt-1 shadow-sm">
                YOU<br/><span className="text-[8px] text-sky-500 font-bold">(آپ)</span>
              </div>
              
              {/* Mid Body side lines */}
              <div className="w-11 h-8 flex justify-between px-1 opacity-70">
                <div className="w-[1.5px] bg-sky-400/40 h-full rounded" />
                <div className="w-[1.5px] bg-sky-400/40 h-full rounded" />
              </div>

              {/* Rear Glass Window */}
              <div className="w-11 h-3.5 bg-gradient-to-b from-slate-200 to-sky-100 rounded border border-white/30" />

              {/* Sleek Side Mirror Mounts */}
              <div className="absolute -left-3 top-5 w-3 h-4 bg-sky-400/90 rounded-l shadow-[0_0_8px_rgba(56,189,248,0.5)] flex items-center justify-center border border-white/20">
                <div className="w-1 h-2 bg-white/70 rounded-full" />
              </div>
              <div className="absolute -right-3 top-5 w-3 h-4 bg-sky-400/90 rounded-r shadow-[0_0_8px_rgba(56,189,248,0.5)] flex items-center justify-center border border-white/20">
                <div className="w-1 h-2 bg-white/70 rounded-full" />
              </div>
            </div>

            {/* Dynamic: OPPONENT VEHICLE (CAR/BIKE/TRUCK) */}
            <motion.div 
              className={`absolute flex flex-col items-center justify-between py-2.5 rounded-2xl z-20 border border-white/30 shadow-[0_15px_30px_rgba(0,0,0,0.5)]`}
              style={{ 
                width: vehicleData.id === 'motorcycle' ? '38px' : vehicleData.id === 'truck' ? '62px' : '56px',
                height: vehicleData.id === 'motorcycle' ? '64px' : vehicleData.id === 'truck' ? '124px' : '96px',
                backgroundColor: vehicleData.color,
                boxShadow: vehicleData.id === 'motorcycle' ? '0 10px 20px rgba(239,68,68,0.4)' : vehicleData.id === 'truck' ? '0 15px 25px rgba(245,158,11,0.4)' : '0 12px 22px rgba(255,113,18,0.4)',
                transform: 'translateY(-50%)' 
              }}
              animate={{ 
                top: `${opponentY}%`, 
                left: opponentLane === 'left' ? '12%' : '62%',
              }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              {/* LED Headlights for opponent */}
              <div className="absolute -top-1 left-2 w-2 h-1 bg-amber-200 rounded-t shadow-[0_-3px_8px_rgba(251,191,36,0.8)]" />
              <div className="absolute -top-1 right-2 w-2 h-1 bg-amber-200 rounded-t shadow-[0_-3px_8px_rgba(251,191,36,0.8)]" />

              <div className="text-[8px] font-black text-white bg-black/60 px-1.5 py-0.5 rounded uppercase tracking-wider text-center leading-none">
                {lang === 'en' ? 'VEHICLE' : 'مخالف'}
              </div>

              {/* Dynamic Top down body graphics depending on vehicle types */}
              {vehicleData.id === 'motorcycle' ? (
                <div className="flex flex-col items-center justify-center flex-1 w-full">
                  {/* Rider helmet with metallic accent */}
                  <div className="w-5 h-5 bg-slate-950 rounded-full border border-slate-700 shadow-md flex items-center justify-center">
                    <div className="w-3 h-2 bg-red-500 rounded-t-full shadow-inner" />
                  </div>
                  {/* Bike frame body */}
                  <div className="w-1.5 h-6 bg-slate-950 rounded mt-1.5 shadow" />
                </div>
              ) : vehicleData.id === 'truck' ? (
                <div className="w-full h-full flex flex-col justify-between py-1 px-1.5">
                  {/* Truck Cabin Cabin windshield */}
                  <div className="h-6 bg-slate-950/70 rounded border border-white/10 flex items-center justify-center">
                    <div className="w-4/5 h-1.5 bg-cyan-100/20 rounded" />
                  </div>
                  {/* Realistic truck cargo bay */}
                  <div className="flex-1 my-1.5 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded flex flex-col items-center justify-center gap-1 shadow-inner">
                    <span className="text-[8px] text-slate-400 font-mono tracking-widest uppercase font-black">CARGO</span>
                    <div className="w-4/5 h-0.5 bg-slate-950" />
                    <div className="w-4/5 h-0.5 bg-slate-950" />
                  </div>
                  <div className="h-5 bg-slate-950/70 rounded flex items-center justify-center">
                    <div className="w-6 h-1 bg-red-500/80 rounded-full" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between w-full h-full p-1.5">
                  {/* Windshield */}
                  <div className="w-full h-3 bg-gradient-to-b from-slate-950/40 to-slate-950/70 rounded border border-white/10" />
                  {/* Cabin space */}
                  <div className="flex-1 my-1.5 flex justify-between px-1">
                    <div className="w-[1.5px] bg-white/20 h-full" />
                    <div className="w-[1.5px] bg-white/20 h-full" />
                  </div>
                  {/* Rear view glass */}
                  <div className="w-full h-2.5 bg-gradient-to-b from-slate-950/40 to-slate-950/70 rounded border border-white/10" />
                </div>
              )}
            </motion.div>

            {/* DANGER BLIND SPOT RED WARNING TRAPEZOID */}
            <AnimatePresence>
              {inBlindSpot && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute w-36 h-28 bg-red-600/10 border-2 border-dashed border-red-500/70 z-10 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.3)] flex flex-col items-center justify-center p-2"
                  style={{ 
                    top: '43%', 
                    left: opponentLane === 'left' ? '7%' : '44%',
                  }}
                >
                  <span className="text-[10px] font-black text-white bg-red-600 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse border border-red-400 shadow-md">
                    🛡️ BLIND SPOT
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DYNAMIC HUDS / COCKPIT INSTRUMENTATION PANEL */}
          <div className="absolute bottom-4 left-4 right-4 bg-[#0a0f1d]/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-800 text-xs font-semibold z-20 flex flex-col gap-2 shadow-lg">
            
            {/* Live Monitoring Label */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-[#FF7112]" />
                {t.liveHud}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">ACTIVE FEED</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-slate-300">
              
              {/* Instrument 1: Speedometer */}
              <div className="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80 flex flex-col items-center justify-center text-center">
                <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-bold">VEHICLE SPEED</span>
                <span className="text-sm font-mono font-black text-white flex items-baseline gap-0.5 mt-0.5">
                  {speed} <span className="text-[8.5px] text-slate-400 font-bold">KM/H</span>
                </span>
              </div>

              {/* Instrument 2: Position Radar Offset */}
              <div className="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80 flex flex-col items-center justify-center text-center">
                <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-bold">RADAR PROXIMITY</span>
                <span className="text-sm font-mono font-black text-white mt-0.5">
                  {opponentY}%
                </span>
              </div>

              {/* Instrument 3: Gear or Warning Status */}
              <div className="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80 flex flex-col items-center justify-center text-center">
                <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-bold">SAFETY RATING</span>
                <span className={`text-xs font-black uppercase mt-0.5 px-2 py-0.5 rounded ${
                  isCriticalDanger 
                    ? 'text-red-400 bg-red-950/50 border border-red-900/50' 
                    : 'text-emerald-400 bg-emerald-950/50 border border-emerald-900/50'
                }`}>
                  {isCriticalDanger ? 'CRITICAL' : 'OPTIMAL'}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Right Side: Step Instructions & Active Mirror Reflection Cards (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col space-y-6 z-10 lg:max-h-[750px] lg:overflow-y-auto lg:pr-3 scrollbar-thin">
          
          {/* VEHICLE TYPE SELECTOR GRID */}
          <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs shrink-0">
            <label className="block text-[11px] font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#FF7112]" />
              {t.vehicleSelect}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {VEHICLES.map((v) => {
                const isSelected = selectedVehicle === v.id;
                const IconComponent = v.icon;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVehicle(v.id);
                      if (soundEnabled) {
                        startAlarm();
                        setTimeout(() => stopAlarm(), 100);
                      }
                    }}
                    className={`p-3 rounded-xl border-2 text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#FF7112]/5 border-[#FF7112] shadow-sm transform scale-[1.02]' 
                        : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <IconComponent className={`w-5.5 h-5.5 ${isSelected ? 'text-[#FF7112]' : 'text-slate-400'}`} />
                    <span className={`text-[10px] font-black block ${isSelected ? 'text-[#FF7112]' : 'text-slate-600'}`}>
                      {lang === 'en' ? v.nameEN : v.nameUR}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Dynamic Educational Tip block */}
            <p className="text-[11px] bg-[#002060]/5 border border-[#002060]/10 rounded-xl px-3.5 py-2.5 text-[#002060] font-semibold leading-relaxed">
              {lang === 'en' ? vehicleData.tipEN : vehicleData.tipUR}
            </p>
          </div>

          {/* INTERACTIVE POSITION CONTROLS BOX */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4 shrink-0">
            
            {/* 1. Track / Lane Selector */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                {t.laneSelector}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setOpponentLane('left')}
                  className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    opponentLane === 'left'
                      ? 'bg-[#FF7112] text-white shadow-md shadow-orange-500/15 border border-[#FF7112]'
                      : 'bg-white border-2 border-slate-100 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  ⬅️ {t.leftLane}
                </button>
                <button
                  onClick={() => setOpponentLane('right')}
                  className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    opponentLane === 'right'
                      ? 'bg-[#FF7112] text-white shadow-md shadow-orange-500/15 border border-[#FF7112]'
                      : 'bg-white border-2 border-slate-100 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t.rightLane} ➡️
                </button>
              </div>
            </div>

            {/* 2. Position Slide Controller */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {t.carPosition}
                </label>
                <span className="text-[10px] font-black text-[#FF7112] bg-[#FF7112]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Y-Offset: {opponentY}%
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="95"
                value={opponentY}
                onChange={(e) => {
                  if (overtakeInterval.current) {
                    clearInterval(overtakeInterval.current);
                    setIsOvertaking(false);
                  }
                  setOpponentY(Number(e.target.value));
                }}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#FF7112] focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-2 uppercase tracking-wider">
                <span className="text-slate-500">{lang === 'en' ? 'Passing Ahead' : 'آگے نکل گئی'}</span>
                <span className="text-red-500 font-black animate-pulse bg-red-50 px-2 py-0.5 rounded border border-red-100">{lang === 'en' ? '⚠️ Blind Spot Zone (44%-65%)' : '⚠️ اندھا دھبہ زون'}</span>
                <span className="text-slate-500">{lang === 'en' ? 'Far Behind' : 'بہت پیچھے'}</span>
              </div>
            </div>

          </div>

          {/* INTERACTIVE SAFETY PRESETS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-3 shrink-0">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF7112]" />
              {t.presetsTitle}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => setPreset('blind')}
                className={`py-3 px-4 rounded-xl text-[11px] font-extrabold transition-all border-2 flex items-center justify-center gap-2 cursor-pointer ${
                  inBlindSpot && !isOvertaking
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-red-500" />
                {t.presetBlindSpot}
              </button>
              
              <button
                onClick={triggerOvertakeSimulation}
                className={`py-3 px-4 rounded-xl text-[11px] font-extrabold transition-all border-2 flex items-center justify-center gap-2 cursor-pointer ${
                  isOvertaking
                    ? 'bg-amber-500 border-amber-500 text-white animate-pulse'
                    : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isOvertaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#FF7112]" />}
                {t.presetOvertake}
              </button>

              <button
                onClick={() => setPreset('safe')}
                className={`py-3 px-4 rounded-xl text-[11px] font-extrabold transition-all border-2 flex items-center justify-center gap-2 cursor-pointer ${
                  opponentY >= 80 && !isOvertaking
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <RotateCcw className="w-4 h-4 text-emerald-500" />
                {t.presetSafe}
              </button>
            </div>
          </div>

          {/* DYNAMIC MIRRORS DISPLAY CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
            
            {/* 1. Left Wing Mirror */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex flex-col items-center justify-between text-center relative overflow-hidden h-48 shadow-lg">
              <div className="flex items-center gap-1.5 z-10 w-full justify-between">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                  {t.leftMirror}
                </span>
                {/* BSD Warning light inside mirror */}
                <div 
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCriticalDanger && opponentLane === 'left' 
                      ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24] scale-110' 
                      : 'bg-slate-900 border border-slate-800'
                  }`}
                  title="Blind Spot Monitor"
                >
                  <AlertTriangle className={`w-2.5 h-2.5 ${isCriticalDanger && opponentLane === 'left' ? 'text-slate-950' : 'text-slate-600'}`} />
                </div>
              </div>
              
              {/* Virtual Convex Mirror Window */}
              <div className="w-full h-24 bg-[#0a1122] border-2 border-slate-800 rounded-l-[32px] rounded-r-md relative flex items-center justify-center overflow-hidden shadow-inner group-hover:border-slate-700">
                
                {/* Convex distortion road visual inside left mirror */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-slate-900/60 border-t border-slate-800 flex flex-col items-center justify-center" />

                {visibleInLeftMirror ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-10 h-14 bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-slate-700 rounded flex flex-col justify-between p-1.5 shadow-md relative z-10"
                    style={{
                      transform: 'skewY(-3deg)'
                    }}
                  >
                    <div className="w-full h-1.5 bg-yellow-500/80 rounded" />
                    <span className="text-[7px] text-white/90 font-black leading-none text-center block">
                      {lang === 'en' ? 'CAR' : 'گاڑی'}
                    </span>
                  </motion.div>
                ) : (
                  <span className="text-[10px] text-slate-600 font-extrabold italic px-2 z-10">
                    {opponentLane === 'left' && inBlindSpot ? t.invisibleText : 'Empty'}
                  </span>
                )}

                {/* Simulated BSD Warning Glow Indicator */}
                {isCriticalDanger && opponentLane === 'left' && (
                  <div className="absolute inset-0 bg-red-600/5 animate-pulse pointer-events-none" />
                )}

                {/* Glossy lens reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>

              <span className={`text-[10.5px] font-black tracking-wider uppercase ${visibleInLeftMirror ? 'text-emerald-400' : 'text-slate-500'}`}>
                {visibleInLeftMirror ? t.visibleText : 'No Reflection'}
              </span>
            </div>

            {/* 2. Interior Rearview Mirror */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex flex-col items-center justify-between text-center relative overflow-hidden h-48 shadow-lg">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                {t.rearViewMirror}
              </span>
              
              {/* Virtual Rearview glass screen */}
              <div className="w-full h-24 bg-[#0a1122] border-2 border-slate-800 rounded-xl relative flex items-center justify-center overflow-hidden shadow-inner">
                
                {/* Road perspective line inside rearview */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-slate-900/60 border-t border-slate-800" />

                {visibleInRearview ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-9 h-9 bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700 rounded-md flex flex-col justify-between p-1 shadow-md transition-all z-10 ${
                      opponentLane === 'left' ? '-translate-x-4' : 'translate-x-4'
                    }`}
                  >
                    <div className="w-full h-1.5 bg-yellow-500/80 rounded" />
                    <span className="text-[7px] text-white/90 font-black leading-none text-center block">
                      {lang === 'en' ? 'CAR' : 'گاڑی'}
                    </span>
                  </motion.div>
                ) : (
                  <span className="text-[10px] text-slate-600 font-extrabold italic px-2 z-10">
                    {inBlindSpot ? t.invisibleText : 'Empty'}
                  </span>
                )}
                
                {/* Diagonal glass highlights */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>

              <span className={`text-[10.5px] font-black tracking-wider uppercase ${visibleInRearview ? 'text-emerald-400' : 'text-slate-500'}`}>
                {visibleInRearview ? t.visibleText : 'No Reflection'}
              </span>
            </div>

            {/* 3. Right Wing Mirror */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex flex-col items-center justify-between text-center relative overflow-hidden h-48 shadow-lg">
              <div className="flex items-center gap-1.5 z-10 w-full justify-between">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                  {t.rightMirror}
                </span>
                {/* BSD Warning light inside mirror */}
                <div 
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCriticalDanger && opponentLane === 'right' 
                      ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24] scale-110' 
                      : 'bg-slate-900 border border-slate-800'
                  }`}
                  title="Blind Spot Monitor"
                >
                  <AlertTriangle className={`w-2.5 h-2.5 ${isCriticalDanger && opponentLane === 'right' ? 'text-slate-950' : 'text-slate-600'}`} />
                </div>
              </div>
              
              {/* Virtual Convex Mirror Window */}
              <div className="w-full h-24 bg-[#0a1122] border-2 border-slate-800 rounded-r-[32px] rounded-l-md relative flex items-center justify-center overflow-hidden shadow-inner group-hover:border-slate-700">
                
                {/* Convex distortion road visual inside mirror */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-slate-900/60 border-t border-slate-800 flex flex-col items-center justify-center" />

                {visibleInRightMirror ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-10 h-14 bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-slate-700 rounded flex flex-col justify-between p-1.5 shadow-md relative z-10"
                    style={{
                      transform: 'skewY(3deg)'
                    }}
                  >
                    <div className="w-full h-1.5 bg-yellow-500/80 rounded" />
                    <span className="text-[7px] text-white/90 font-black leading-none text-center block">
                      {lang === 'en' ? 'CAR' : 'گاڑی'}
                    </span>
                  </motion.div>
                ) : (
                  <span className="text-[10px] text-slate-600 font-extrabold italic px-2 z-10">
                    {opponentLane === 'right' && inBlindSpot ? t.invisibleText : 'Empty'}
                  </span>
                )}

                {/* Simulated BSD Warning Glow Indicator */}
                {isCriticalDanger && opponentLane === 'right' && (
                  <div className="absolute inset-0 bg-red-600/5 animate-pulse pointer-events-none" />
                )}

                {/* Glossy lens reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>

              <span className={`text-[10.5px] font-black tracking-wider uppercase ${visibleInRightMirror ? 'text-emerald-400' : 'text-slate-500'}`}>
                {visibleInRightMirror ? t.visibleText : 'No Reflection'}
              </span>
            </div>

          </div>

          {/* HIGH POLISH: PHYSICAL OVER-THE-SHOULDER WINDOW PREVIEW */}
          <div className="bg-slate-950 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-5 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 pointer-events-none" />
            
            <div className="flex gap-4 items-start z-10 flex-1 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-slate-800 flex flex-col items-center justify-center text-2xl shadow-inner relative overflow-hidden shrink-0">
                🚘
                {visibleInPeripheral && (
                  <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                )}
                {inBlindSpot && (
                  <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                )}
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  {t.shoulderCheck}
                </span>

                {shoulderCheckActive ? (
                  // Active interactive peek window
                  <div className="mt-1">
                    {visibleInPeripheral ? (
                      <p className="text-[12px] font-extrabold text-emerald-400">
                        🟢 {lang === 'en' ? 'PEEK SUCCESS: Opponent is right beside your front door window!' : 'کامیاب نظارہ: گاڑی بالکل آپ کے برابر والے شیشے سے نظر آ رہی ہے!'}
                      </p>
                    ) : inBlindSpot ? (
                      <p className="text-[12px] font-extrabold text-amber-400">
                        🚨 {lang === 'en' ? 'PEEK SUCCESS: Spotting vehicle alongside your rear passenger door!' : 'کامیاب نظارہ: گاڑی پچھلے دروازے کے برابر چھپی ہوئی نظر آگئی!'}
                      </p>
                    ) : (
                      <p className="text-[12px] font-bold text-slate-300">
                        🛣️ {lang === 'en' ? 'Road segment clear in direct peripheral view.' : 'براہِ راست نظارے میں سڑک خالی ہے۔'}
                      </p>
                    )}
                  </div>
                ) : (
                  // Instructions when inactive
                  <div className="mt-1">
                    {inBlindSpot ? (
                      <p className="text-[11.5px] font-bold text-red-400 flex items-center gap-1 animate-pulse">
                        🔴 {lang === 'en' ? 'CRITICAL BLIND SPOT! Requires over-the-shoulder glance!' : 'شدید خطرہ! گردن گھما کر براہِ راست دیکھیں۔'}
                      </p>
                    ) : (
                      <p className="text-[11.5px] font-medium text-slate-400">
                        {lang === 'en' ? 'Hold trigger below to simulate looking through passenger windows.' : 'مسافر ونڈو سے باہر دیکھنے کے لیے نیچے والے بٹن کو دبا کر رکھیں۔'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive shoulder check button */}
            <div className="shrink-0 z-10 w-full sm:w-auto">
              <button
                type="button"
                onMouseDown={() => setShoulderCheckActive(true)}
                onMouseUp={() => setShoulderCheckActive(false)}
                onTouchStart={() => setShoulderCheckActive(true)}
                onTouchEnd={() => setShoulderCheckActive(false)}
                className={`w-full sm:w-52 px-4 py-3 sm:py-3.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer select-none ${
                  shoulderCheckActive
                    ? 'bg-emerald-600 text-white shadow-inner scale-95 border-emerald-500'
                    : 'bg-gradient-to-r from-sky-500 to-[#002060] hover:from-sky-400 hover:to-[#002060]/95 text-white shadow-md shadow-sky-950/20'
                }`}
              >
                <Eye className="w-4 h-4 animate-pulse shrink-0" />
                <span className="truncate">
                  {shoulderCheckActive 
                    ? (lang === 'en' ? 'Checking Windows...' : 'گردن گھما رہے ہیں...') 
                    : (lang === 'en' ? 'Hold to Peek Side' : 'دبا کر رکھیں (Shoulder Check)')
                  }
                </span>
              </button>
            </div>

          </div>

          {/* CRITICAL WARNING ZONE MESSAGE IF ACTIVE */}
          <AnimatePresence>
            {isCriticalDanger && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl shadow-md border border-red-100"
              >
                <h4 className="text-red-900 font-black text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  {lang === 'en' ? t.dangerZoneAlert : t.dangerZoneAlert}
                </h4>
                <p className="text-xs text-red-800 leading-relaxed font-semibold">
                  {lang === 'en' ? t.alertWarning : t.alertUrduWarning}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GoDriveify Professional Tips block */}
          <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl flex gap-4 items-start shadow-xl border border-slate-800 shrink-0">
            <span className="text-2xl mt-0.5 shrink-0">🎓</span>
            <div className="space-y-1">
              <span className="block text-[10px] font-black uppercase text-[#FF7112] tracking-wider">
                {t.tipTitle}
              </span>
              <p className="text-xs font-semibold text-slate-300 leading-relaxed">
                {t.tipBody}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2.5 text-[9.5px] text-sky-400 font-black uppercase tracking-widest bg-sky-950/80 px-3 py-1 rounded-full border border-sky-900/50">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                {t.bsdWarning}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
