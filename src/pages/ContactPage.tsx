import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronRight, 
  Car, Compass, Cpu, Gauge, Radio, ShieldAlert, Sparkles, Sliders 
} from 'lucide-react';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const programParam = searchParams.get('program');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'Complete Driving Course',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulated Telemetry Interactive States
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [transmissionMode, setTransmissionMode] = useState('D');
  const [radarPingCount, setRadarPingCount] = useState(4);
  const [radarPings, setRadarPings] = useState([
    { id: 1, x: 120, y: 150, label: 'Main Track' },
    { id: 2, x: 280, y: 70, label: 'L-Parking' },
    { id: 3, x: 180, y: 220, label: 'S-Turn Zone' }
  ]);

  const courses = [
    'Adult Driving Courses',
    'Senior Driving Courses',
    'Teen Driving Courses',
    'Highway Driving Lessons',
    'Complete Driving Course',
    'International Drivers Program',
    'Pre-Licensing Course',
    'Defensive Driving Course',
    'Road Test Preparation',
    'Automatic Car Lessons',
    'Manual Car Lessons',
    'Automatic & Manual Honda Civic Driving Lessons',
    'Heavy Bike Riding Lessons',
    'Motorcycle Riding Lessons'
  ];

  // Auto pre-fill course if passed in query param
  useEffect(() => {
    if (programParam) {
      const decodedParam = decodeURIComponent(programParam);
      const matched = courses.find(c => c.toLowerCase() === decodedParam.toLowerCase());
      if (matched) {
        setFormData(prev => ({ ...prev, course: matched }));
      } else {
        // Check for substring match
        const partialMatched = courses.find(c => c.toLowerCase().includes(decodedParam.toLowerCase()));
        if (partialMatched) {
          setFormData(prev => ({ ...prev, course: partialMatched }));
        }
      }
    }
  }, [programParam]);

  // Interactivity: simulated HUD metrics ticking
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight speed & steer changes for standard dynamic realism
      setSpeed(prev => {
        if (prev >= 120) return 0;
        return prev + Math.floor(Math.random() * 5) + 2;
      });
      setSteeringAngle(prev => {
        const next = prev + (Math.random() > 0.5 ? 5 : -5);
        if (next > 45) return 40;
        if (next < -45) return -40;
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const addCustomRadarMarker = () => {
    const newId = Date.now();
    const x = Math.floor(Math.random() * 260) + 70;
    const y = Math.floor(Math.random() * 180) + 70;
    setRadarPings(prev => [...prev, { id: newId, x, y, label: `Sector Mock-${prev.length + 1}` }]);
    setRadarPingCount(prev => prev + 1);
  };

  return (
    <div className="font-sans text-gray-900 bg-slate-950 min-h-screen flex flex-col justify-between selection:bg-red-600 selection:text-white">
      <div>
        <Navbar />

        {/* Futuristic Glowing Header Banner */}
        <section className="relative h-80 sm:h-96 flex items-center justify-center text-white bg-slate-950 overflow-hidden">
          {/* Futuristic grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
          
          {/* Ambient light flares */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-75"></div>

          <div className="relative z-10 text-center px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-[11px] uppercase tracking-widest mb-6 shadow-sm shadow-red-500/5"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-red-400" />
              Next-Gen Driving Experience
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold mb-6 font-display bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent tracking-tight text-center"
            >
              Interactive Contact Hub
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gray-400"
            >
              Home <span className="text-red-500 mx-2.5">&rsaquo;</span> <span className="text-white">Contact Terminal</span>
            </motion.p>
          </div>
        </section>

        {/* Main Content & Interactive Area */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-red-500 font-mono font-bold tracking-widest uppercase text-xs block mb-3">
              [ SECURE ENROLLMENT SYSTEM ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-none mb-6">
              Connect With The Future Of Road Training
            </h2>
            <p className="text-gray-450 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto text-gray-400">
              Pass your tests with our high-tech simulator setup and premium manual & automatic driving training models right here in Faisalabad.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start mb-20">
            {/* Left Side: Contact Details & Telemetry Interactive HUD */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Interactive Telemetry HUD Card */}
              <div className="relative group overflow-hidden bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl shadow-black/40 backdrop-blur-md">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <h4 className="font-mono text-xs font-bold text-gray-300 uppercase tracking-widest">
                      Live Simulator Telemetry
                    </h4>
                  </div>
                  <Cpu className="w-4 h-4 text-red-500 animate-pulse" />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-950/80 border border-slate-800/60 p-3.5 rounded-2xl text-center">
                    <span className="block text-[10px] font-mono text-gray-500 uppercase">Steering Angle</span>
                    <span className="font-mono text-lg font-bold text-white block mt-1">
                      {steeringAngle}°
                    </span>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="bg-red-500 h-full transition-all duration-300"
                        style={{ width: `${Math.min(90, Math.max(10, Math.abs(steeringAngle) * 2))}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800/60 p-3.5 rounded-2xl text-center">
                    <span className="block text-[10px] font-mono text-gray-500 uppercase">Velocity Gauge</span>
                    <span className="font-mono text-lg font-bold text-cyan-400 block mt-1">
                      {speed} <span className="text-[10px] text-gray-500">km/h</span>
                    </span>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="bg-cyan-400 h-full transition-all duration-[1000ms]"
                        style={{ width: `${(speed / 120) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800/60 p-3.5 rounded-2xl text-center">
                    <span className="block text-[10px] font-mono text-gray-500 uppercase">Gear Unit</span>
                    <span className="font-mono text-lg font-bold text-red-500 block mt-1">
                      {transmissionMode}
                    </span>
                    <div className="flex justify-center gap-1.5 mt-2">
                      {['P', 'R', 'N', 'D'].map((g) => (
                        <button 
                          key={g} 
                          onClick={() => setTransmissionMode(g)}
                          className={`text-[9px] font-bold h-4 w-4 rounded-sm flex items-center justify-center transition-all ${transmissionMode === g ? 'bg-red-600 text-white shadow shadow-red-500/20' : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Micro Simulator Steering Wheel Console */}
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/60">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-red-500" />
                      Adjust Steering Handle Simulator:
                    </span>
                    <span className="text-[10.5px] font-mono text-gray-500">Angle Controller</span>
                  </div>
                  <input 
                    type="range" 
                    min="-45" 
                    max="45" 
                    value={steeringAngle}
                    onChange={(e) => setSteeringAngle(parseInt(e.target.value))}
                    className="w-full accent-red-600 bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-2">
                    <span>LEFT -45°</span>
                    <span>CENTER 0°</span>
                    <span>RIGHT 45°</span>
                  </div>
                </div>
              </div>

              {/* Futuristic Interactive Contact Details Cards */}
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 space-y-4">
                
                {/* Information Node 1 */}
                <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-900/80 transition-all border border-transparent hover:border-slate-800/50">
                  <div className="bg-red-950/50 p-3.5 rounded-xl text-red-500 border border-red-900/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Campus Terminal Address
                    </h5>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                      Main Jaranwala Road, Near Peoples Colony, Faisalabad, Punjab, Pakistan.
                    </p>
                  </div>
                </div>

                {/* Information Node 2 */}
                <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-900/80 transition-all border border-transparent hover:border-slate-800/50">
                  <div className="bg-cyan-950/50 p-3.5 rounded-xl text-cyan-500 border border-cyan-900/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Helpline Gateway
                    </h5>
                    <p className="text-gray-200 text-sm sm:text-base mb-0.5">0300-1115429</p>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-0.5 block">
                      Active: 09:00 - 21:00 PKT
                    </span>
                  </div>
                </div>

                {/* Information Node 3 */}
                <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-900/80 transition-all border border-transparent hover:border-slate-800/50">
                  <div className="bg-red-950/50 p-3.5 rounded-xl text-red-500 border border-red-900/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Direct Email Network
                    </h5>
                    <p className="text-gray-200 text-xs sm:text-sm font-mono hover:text-red-400 transition-colors">
                      info@trainingdrivingschool.pk
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm font-mono mt-0.5">
                      support@trainingdrivingschool.pk
                    </p>
                  </div>
                </div>

                {/* Information Node 4 */}
                <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-900/80 transition-all border border-transparent hover:border-slate-800/50">
                  <div className="bg-slate-950/80 p-3.5 rounded-xl text-gray-400 border border-slate-800/80">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Sector Access Schedule
                    </h5>
                    <p className="text-gray-200 text-sm">
                      Monday - Saturday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-xs text-red-400 font-semibold mt-1 flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5 animate-pulse" /> Sunday Simulated Field Tracks Available
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Side: Enhanced Actionable Sci-Fi Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/40 border border-slate-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-lg">
                {/* Decorative circuit line design */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-600/5 rounded-full blur-2xl pointer-events-none"></div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="telemetry-form"
                      initial={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -25 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/60">
                        <div>
                          <h3 className="text-2xl font-extrabold font-display text-white">
                            Terminal Intake Form
                          </h3>
                          <p className="text-xs text-gray-500 font-mono uppercase mt-1">
                            Secure Encrypted Enrollment Connection
                          </p>
                        </div>
                        <div className="px-3 py-1 rounded bg-slate-950/70 border border-slate-800 text-[10px] text-gray-400 font-mono">
                          STATUS: ONLINE
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                              Full Name
                            </label>
                            <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              placeholder="Muhammad Ali" 
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white text-sm transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                              Phone Number
                            </label>
                            <input 
                              type="tel" 
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="0300-1234567" 
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white text-sm transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Secure Email Address
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="student@gmail.com" 
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white text-sm transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Selected Training Program
                          </label>
                          <div className="relative">
                            <select 
                              value={formData.course}
                              onChange={(e) => setFormData({...formData, course: e.target.value})}
                              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-4 appearance-none focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white text-sm transition-all"
                            >
                              {courses.map((course, idx) => (
                                <option key={idx} value={course} className="bg-slate-950 text-white select-none">
                                  {course}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                              <ChevronRight className="w-4 h-4 rotate-90" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Inquiry Message / Requirement Scope
                          </label>
                          <textarea 
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder="Please explain any driving experience, pick/drop preferences or specific schedules needed..." 
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white text-sm transition-all resize-none"
                          ></textarea>
                        </div>

                        {/* Interactive Warning Banner */}
                        <div className="bg-slate-950/75 border border-slate-800 rounded-2xl p-4 flex gap-3 items-center text-xs text-gray-400">
                          <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <span>
                            By booking, a physical seat will be query-locked in our real-time Faisalabad course database logs.
                          </span>
                        </div>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full relative group overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-red-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base disabled:opacity-75"
                        >
                          {loading ? (
                            <span className="flex items-center gap-2.5">
                              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                              Enrolling into Database...
                            </span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Submit Simulator Course Entry
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-10 px-2"
                    >
                      <div className="w-20 h-20 bg-green-950/50 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-green-500/5">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-extrabold font-display text-white mb-3">
                        Locked and Secured!
                      </h3>
                      <p className="text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
                        Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your booking for <span className="font-semibold text-red-500">{formData.course}</span> has been routed successfully to our Faisalabad operations control.
                      </p>
                      
                      {/* Telemetry Ticket recap details */}
                      <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3.5 mb-8">
                        <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                          <span>REGISTRY DATA CENTER</span>
                          <span className="font-semibold text-white">Faisalabad, Pakistan</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                          <span>MOBILE ID</span>
                          <span className="font-semibold text-white">{formData.phone}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                          <span>CONNECTION SCHEDULE</span>
                          <span className="font-semibold text-green-400">Locked - Call Scheduled Next 2 Hours</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', phone: '', email: '', course: 'Beginner Driving Course', message: '' });
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-gray-200 font-bold py-3 px-6 rounded-xl text-sm transition-all border border-slate-700/50"
                      >
                        Submit Another Booking
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Stylized Faisalabad Road & Location Map with REAL-TIME Radar Sweep HUD */}
        <section className="bg-slate-950 text-white py-20 relative border-t border-slate-900/60 overflow-hidden">
          {/* Radial mask background styling */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#dc26260a,transparent)] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-red-500 font-mono font-bold tracking-widest text-xs uppercase block mb-3">
                  [ SCANNING REGISTRY SECTORS ]
                </span>
                <h3 className="text-3xl sm:text-5xl font-display font-extrabold leading-tight mb-6 text-white tracking-tight">
                  Interact With Our High-Tech Faisalabad Radar
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Check out our state-of-the-art simulator facility and outdoor training grounds. Click below to add mocked radar pins and plot test coordinates dynamically!
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/40">
                    <div className="bg-red-500/10 p-2.5 rounded-xl text-red-500 h-11 w-11 flex items-center justify-center font-bold">1</div>
                    <div>
                      <h5 className="font-semibold text-gray-200 text-sm sm:text-base">Simulator Labs & VR Cockpits</h5>
                      <p className="text-xs text-gray-500 leading-relaxed">Safety first - practice speed, steering response and braking limits before hitting roads.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/40">
                    <div className="bg-cyan-500/10 p-2.5 rounded-xl text-cyan-500 h-11 w-11 flex items-center justify-center font-bold">2</div>
                    <div>
                      <h5 className="font-semibold text-gray-200 text-sm sm:text-base">Reverse L-Parking & High incline Slopes</h5>
                      <p className="text-xs text-gray-500 leading-relaxed">Perfect manual clutch controls on synthetic slopes styled for Faisalabad license prepares.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={addCustomRadarMarker}
                    className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 px-5 py-3 rounded-xl text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all hover:border-red-500/40"
                  >
                    <Compass className="w-4 h-4 text-red-500 animate-spin-slow" />
                    Plot New Target Pin ({radarPingCount})
                  </button>
                  <button 
                    onClick={() => {
                      setRadarPings([
                        { id: 1, x: 120, y: 150, label: 'Main Track' },
                        { id: 2, x: 280, y: 70, label: 'L-Parking' },
                        { id: 3, x: 180, y: 220, label: 'S-Turn Zone' }
                      ]);
                      setRadarPingCount(4);
                    }}
                    className="text-gray-500 hover:text-gray-300 text-xs font-mono uppercase underline underline-offset-4 decoration-gray-800 px-2 py-3"
                  >
                    Reset Grid Plotting
                  </button>
                </div>
              </div>

              {/* Sci-Fi SVG HUD Radar Map Screen */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden h-96 sm:h-[450px] flex flex-col justify-between shadow-2xl backdrop-blur-md">
                
                {/* Header info bar of screen */}
                <div className="flex justify-between items-start relative z-10 border-b border-slate-800/70 pb-3">
                  <div>
                    <h5 className="text-white font-mono font-bold text-sm tracking-wider flex items-center gap-2">
                      <Radio className="w-4 h-4 text-red-500 animate-ping" />
                      FSD-CAMPUS_GRID.HUD
                    </h5>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      Peoples Colony Branch Map
                    </p>
                  </div>
                  <div className="bg-red-600/15 border border-red-500/30 text-red-400 font-mono text-[9px] px-2.5 py-1 rounded">
                    ACTIVE SATELLITE FEED
                  </div>
                </div>

                {/* Radar Grid Map Visualization */}
                <div className="relative flex-grow border border-slate-800/50 bg-slate-950/80 rounded-2xl overflow-hidden my-4 flex items-center justify-center">
                  
                  {/* Radar Scanning Sweep Overlay (animated rotation) */}
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute top-1/2 left-1/2 w-[340px] h-[340px] border border-cyan-500/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-[220px] h-[220px] border border-cyan-500/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-[100px] h-[100px] border border-cyan-500/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    
                    {/* Simulated Sweeper Radar lines */}
                    <div className="absolute top-1/2 left-1/2 w-0.5 h-[170px] bg-gradient-to-t from-red-500/40 to-transparent origin-bottom animate-radar-sweep pointer-events-none"></div>
                  </div>

                  {/* Grid Lines mockup */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20"></div>

                  {/* Dynamic mapped radar pins */}
                  {radarPings.map((ping) => (
                    <motion.div 
                      key={ping.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute group z-20"
                      style={{ left: `${ping.x}px`, top: `${ping.y}px` }}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Ping pulse ripple rings */}
                        <span className="absolute w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 animate-ping"></span>
                        <div className="w-3.5 h-3.5 bg-red-500 border border-slate-950 rounded-full relative z-10 cursor-pointer shadow-red-500/50 shadow-md"></div>
                        
                        {/* Floating sector text tooltip display */}
                        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-slate-700 text-[9px] font-mono whitespace-nowrap text-white px-2 py-1 rounded shadow-xl uppercase opacity-85 group-hover:opacity-100 transition-opacity">
                          {ping.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Main Headquarters pin (Center Faisalabad site representation) */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="flex flex-col items-center">
                      <span className="absolute w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/40 animate-ping"></span>
                      <div className="w-5 h-5 bg-cyan-400 border border-slate-950 rounded-full flex items-center justify-center relative z-20 shadow-cyan-400/50 shadow-lg cursor-pointer">
                        <Car className="w-3 h-3 text-slate-950 font-bold" />
                      </div>
                      <div className="bg-cyan-950/90 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap uppercase tracking-widest font-bold">
                        Main Faisalabad HQ
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer terminal telemetry logs read-out panel */}
                <div className="border-t border-slate-800/80 pt-3 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                  <span>LAT/LON: 31.4187° N, 73.1118° E</span>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 flex items-center font-bold tracking-wider uppercase transition-colors">
                    GET GOOGLE ROUTE <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
