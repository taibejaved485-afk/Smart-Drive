import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Car, Shield, Award, HelpCircle, Compass, Users, 
  Map, ArrowRight, CheckCircle2, ChevronRight, Search, 
  Bike, Info, Layers, Zap, Clock, Star, Heart, Check, X,
  ShieldAlert, Cpu, Sliders, ToggleLeft, Activity, Radio
} from 'lucide-react';

interface Program {
  id: string;
  title: string;
  description: string;
  category: 'core' | 'specialty' | 'bike';
  duration: string;
  lessons: number;
  highlight: string;
  badge?: string;
  instructor: string;
  benefits: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  femaleInstructor: boolean;
  simulatorAccredited: boolean;
}

export default function ProgramsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'specialty' | 'bike'>('all');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Compare System state (stores 0 to 2 programs)
  const [compareList, setCompareList] = useState<Program[]>([]);
  const [showComparePanel, setShowComparePanel] = useState(false);

  // Match Advisor Mini Quiz state
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    experience: '', // 'none', 'some', 'test-prep'
    transmission: '', // 'automatic', 'manual', 'bike'
    priority: '' // 'license', 'highway', 'safety'
  });
  const [quizResult, setQuizResult] = useState<Program | null>(null);
  const [compatibilityScore, setCompatibilityScore] = useState(98);

  const programs: Program[] = [
    {
      id: 'adult-courses',
      title: 'Adult Driving Courses',
      description: 'Our Adult Driving Courses are ideal for those starting from the beginning or looking to enhance their driving abilities. Receive expert guidance to build confidence and develop safe driving habits.',
      category: 'core',
      duration: '15 Days / 4 Weeks',
      lessons: 15,
      highlight: 'Top Rated for Beginners',
      badge: 'Best For Adults',
      instructor: 'Male & Female Instructors',
      benefits: ['1-on-1 personalized training', 'Dual-pedal control vehicle safety', 'Defensive driving habits development', 'Flexible scheduling'],
      difficulty: 'Beginner',
      femaleInstructor: true,
      simulatorAccredited: true
    },
    {
      id: 'senior-courses',
      title: 'Senior Driving Courses',
      description: 'Our senior driving courses offer personalized lessons to help older drivers regain or maintain their confidence on the road, focusing on safety, comfort, and adapting to changing driving needs as they age.',
      category: 'core',
      duration: '10 Days / Flexible',
      lessons: 10,
      highlight: 'Patience & Comfort First',
      badge: 'Senior Approved',
      instructor: 'Specialized Supportive Instructors',
      benefits: ['Vigilant safety awareness checks', 'Ergonomic vehicle setup coaching', 'Refresher on modern regulatory updates', 'Stress-free environment'],
      difficulty: 'Beginner',
      femaleInstructor: true,
      simulatorAccredited: false
    },
    {
      id: 'teen-courses',
      title: 'Teen Driving Courses',
      description: 'Our structured curriculum helps teens build responsible driving habits, ensuring they understand traffic laws, practice safe driving techniques, and are well-prepared to pass their driving exams with confidence and skill.',
      category: 'core',
      duration: '21 Days Custom',
      lessons: 15,
      highlight: 'Safe Teen Driver Certificate',
      badge: 'Exam Ready',
      instructor: 'Highly Patient Coaches',
      benefits: ['Mock theoretical examination preparation', 'Confidence boosting dynamic tracks', 'Critical emergency steering response', 'Distraction avoidance coaching'],
      difficulty: 'Beginner',
      femaleInstructor: true,
      simulatorAccredited: true
    },
    {
      id: 'highway-lessons',
      title: 'Highway Driving Lessons',
      description: 'Our highway driving lessons provide focused training on high-speed driving, safe lane changes, merging techniques, and boosting overall confidence for drivers navigating highways and faster traffic conditions with ease.',
      category: 'specialty',
      duration: '5 Days Specialist',
      lessons: 5,
      highlight: 'High Speed Confidence',
      badge: 'Advanced Scope',
      instructor: 'Pro Highway Instructors',
      benefits: ['High-speed intersection & merging drills', 'Crucial safe braking distance control', 'Dual-way multi-lane lane switching logic', 'Expressway navigation guidance'],
      difficulty: 'Advanced',
      femaleInstructor: false,
      simulatorAccredited: true
    },
    {
      id: 'complete-course',
      title: 'Complete Driving Course',
      description: 'Our all-inclusive driving course covers everything from basic vehicle operation to advanced techniques, ensuring you gain the skills and confidence needed to handle any driving situation with ease and safety.',
      category: 'core',
      duration: '30 Days Comprehensive',
      lessons: 25,
      highlight: 'All-Inclusive Full Mastery',
      badge: 'Most Popular',
      instructor: 'Male & Female Mentors',
      benefits: ['Zero-to-Expert complete layout', 'Dynamic weather & night-time practice', 'Parallel and L-parking master drill', 'Full licensing application support'],
      difficulty: 'Beginner',
      femaleInstructor: true,
      simulatorAccredited: true
    },
    {
      id: 'international-drivers',
      title: 'International Drivers Program',
      description: 'Our specialized lessons for international drivers help them adapt to local road rules, traffic laws, and driving conditions, ensuring a smooth transition and enhancing their confidence behind the wheel in a new environment.',
      category: 'specialty',
      duration: '7 Days Program',
      lessons: 8,
      highlight: 'Global Rule Compliance',
      badge: 'Global Approved',
      instructor: 'Multi-lingual Coaches',
      benefits: ['Local driving legal framework guidelines', 'Right-hand to Left-hand adaptation drills', 'Complex roundabout & intersection flow', 'Fast-track test booking clearance'],
      difficulty: 'Intermediate',
      femaleInstructor: false,
      simulatorAccredited: false
    },
    {
      id: 'pre-licensing',
      title: 'Pre-Licensing Course',
      description: 'Our preparatory course equips learners with essential knowledge of road signs, traffic laws, and test expectations, ensuring they feel confident and prepared before applying for their driving license and taking the test.',
      category: 'core',
      duration: '3 Days Quick Crash',
      lessons: 4,
      highlight: 'Direct Prep for Regulatory Board',
      badge: 'Pass Guaranteed',
      instructor: 'Internal Mock Examiners',
      benefits: ['Rigorous mock driving test simulations', 'Comprehensive visual road sign quizzes', 'Parallel park validation checks', 'Vital stress management counseling'],
      difficulty: 'Intermediate',
      femaleInstructor: true,
      simulatorAccredited: true
    },
    {
      id: 'defensive-driving',
      title: 'Defensive Driving Course',
      description: 'Our Defensive Driving Course teaches proactive strategies to help drivers identify potential hazards early, anticipate road conditions, and avoid accidents, ensuring safer and more confident driving in any situation.',
      category: 'specialty',
      duration: '6 Days Intensive',
      lessons: 6,
      highlight: 'Hazard Avoidance Tactics',
      badge: 'Premium Safety',
      instructor: 'Certified Safety Instructors',
      benefits: ['Crucial proactive hazard spot exercises', 'Slippery road skid controls simulation', 'Aggressive driver management skills', 'Braking time optimization formulas'],
      difficulty: 'Advanced',
      femaleInstructor: false,
      simulatorAccredited: true
    },
    {
      id: 'road-test-prep',
      title: 'Road Test Preparation',
      description: 'Specialized training designed to thoroughly prepare students for their driving test, including practical driving sessions, test simulations, and expert guidance on the test day to ensure success and confidence behind the wheel.',
      category: 'specialty',
      duration: '5 Days Targeted',
      lessons: 5,
      highlight: 'Mock Test Perfection',
      badge: 'License Oriented',
      instructor: 'Certified Trainers',
      benefits: ['Actual municipal test route previews', 'Precise reverse L-parking alignment rules', 'Immediate examiner behavior analytics', 'Instant constructive error correction'],
      difficulty: 'Intermediate',
      femaleInstructor: true,
      simulatorAccredited: true
    },
    {
      id: 'automatic-lessons',
      title: 'Automatic Car Lessons',
      description: 'Our training program is designed for individuals who prefer to learn driving with automatic transmission vehicles, offering a comfortable and straightforward approach to mastering the road without manual gear shifting.',
      category: 'core',
      duration: '12 Days Smart Track',
      lessons: 10,
      highlight: 'Modern & Seamless Shift',
      badge: 'Streamlined Driving',
      instructor: 'Male & Female Specialists',
      benefits: ['Automatic drive modes (P-R-N-D-S) coaching', 'Smooth accelerator control logic', 'Urban stop-and-go comfort drills', 'Hill-climb safety assistance training'],
      difficulty: 'Beginner',
      femaleInstructor: true,
      simulatorAccredited: true
    },
    {
      id: 'manual-lessons',
      title: 'Manual Car Lessons',
      description: 'Our manual car lessons teach you how to drive with a manual transmission, focusing on gear shifting, clutch control, and smooth transitions, ensuring you gain the skills needed for confident manual driving.',
      category: 'core',
      duration: '15 Days Classic Track',
      lessons: 15,
      highlight: 'Pure Transmission Mastery',
      badge: 'Drivers Pedigree',
      instructor: 'Veteran Manual Coaches',
      benefits: ['Precise friction point clutch control', 'Multi-speed responsive gear-shifting', 'Incline clutch-hold rollback remedies', 'Fuel-efficient mechanical engine usage'],
      difficulty: 'Intermediate',
      femaleInstructor: true,
      simulatorAccredited: true
    },
    {
      id: 'honda-civic-lessons',
      title: 'Automatic & Manual Honda Civic Driving Lessons',
      description: 'Our Driving school near me offer comprehensive training on both automatic and manual Honda Civic vehicles, providing hands-on experience to master driving techniques, gear control, and road safety with personalized instruction.',
      category: 'specialty',
      duration: '14 Days Premium Sedan',
      lessons: 12,
      highlight: 'Premium Sedan Experience',
      badge: 'Sedan Master',
      instructor: 'Certified Premium Car Instructors',
      benefits: ['Hands-on Civic console dashboard training', 'Modern sedan dimension and reverse sensing', 'Interactive rearview camera parking guides', 'Urban luxury cruising control guides'],
      difficulty: 'Intermediate',
      femaleInstructor: true,
      simulatorAccredited: true
    },
    {
      id: 'heavy-bike-riding',
      title: 'Heavy Bike Riding Lessons',
      description: 'Our Heavy Bike Riding Lessons are designed for those looking to master riding larger motorcycles, focusing on safety, control, and confidence, while equipping you with the skills needed to handle heavy bikes effectively.',
      category: 'bike',
      duration: '10 Days Heavyweight',
      lessons: 10,
      highlight: 'Superbike Control Systems',
      badge: 'Adrenaline Master',
      instructor: 'Professional Bike Racers',
      benefits: ['Heavy bike center-of-gravity balancing', 'Complex cornering leans and apex controls', 'High displacement throttle & gear shifting', 'Optimal dual disc advanced braking safety'],
      difficulty: 'Advanced',
      femaleInstructor: false,
      simulatorAccredited: false
    },
    {
      id: 'motorcycle-riding',
      title: 'Motorcycle Riding Lessons',
      description: 'Our motorcycle riding lessons are designed to help you develop essential skills for safe, confident riding. Learn proper techniques, handling, and road safety to become a skilled and responsible motorcyclist.',
      category: 'bike',
      duration: '8 Days Essential',
      lessons: 8,
      highlight: 'Safe Two-Wheeler Commute',
      badge: 'Commuter Core',
      instructor: 'Patient Certified Riders',
      benefits: ['Two-wheeler steering balance & low-speed posture', 'Urban city traffic survival skills', 'Clutch transmission and chain shifting rules', 'Crucial helmet and armor road protection guide'],
      difficulty: 'Beginner',
      femaleInstructor: true,
      simulatorAccredited: false
    }
  ];

  // Filtering Logic
  const filteredPrograms = useMemo(() => {
    return programs.filter(prog => {
      const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prog.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || prog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleEnrollClick = (programTitle: string) => {
    navigate(`/contact?program=${encodeURIComponent(programTitle)}`);
  };

  // Compare toggler logic
  const toggleCompare = (program: Program) => {
    setCompareList(prev => {
      const alreadyInList = prev.some(item => item.id === program.id);
      if (alreadyInList) {
        return prev.filter(item => item.id !== program.id);
      }
      if (prev.length >= 2) {
        // limit reached, replace the second one
        return [prev[0], program];
      }
      return [...prev, program];
    });
    setShowComparePanel(true);
  };

  // Automated Quiz calculation logic
  const handleQuizAnswer = (key: string, value: string) => {
    const updatedAnswers = { ...quizAnswers, [key]: value };
    setQuizAnswers(updatedAnswers);

    if (quizStep < 3) {
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate best course recommendation
      let matchedId = 'complete-course'; // Default choice

      if (updatedAnswers.transmission === 'bike') {
        matchedId = updatedAnswers.experience === 'none' ? 'motorcycle-riding' : 'heavy-bike-riding';
      } else if (updatedAnswers.transmission === 'manual') {
        matchedId = 'manual-lessons';
      } else if (updatedAnswers.experience === 'test-prep') {
        matchedId = 'road-test-prep';
      } else if (updatedAnswers.priority === 'highway') {
        matchedId = 'highway-lessons';
      } else if (updatedAnswers.priority === 'safety') {
        matchedId = 'defensive-driving';
      } else if (updatedAnswers.experience === 'none') {
        matchedId = updatedAnswers.transmission === 'automatic' ? 'automatic-lessons' : 'adult-courses';
      }

      const match = programs.find(p => p.id === matchedId) || programs[0];
      setQuizResult(match);
      setCompatibilityScore(Math.floor(Math.random() * 5) + 95); // High custom score 95-99%
      setQuizStep(4);
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({ experience: '', transmission: '', priority: '' });
    setQuizResult(null);
  };

  return (
    <div className="font-sans text-gray-100 bg-slate-950 min-h-screen flex flex-col justify-between selection:bg-red-600 selection:text-white">
      <div>
        <Navbar />

        {/* Dynamic Glowing Sci-Fi Header Banner */}
        <section 
          className="relative py-24 sm:py-32 flex items-center justify-center text-white bg-cover bg-center overflow-hidden border-b border-slate-900/40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop')" }}
        >
          {/* Dark overlay to ensure beautiful readability */}
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-30"></div>
          
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse delay-75"></div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-[11px] uppercase tracking-widest mb-6 shadow-sm shadow-red-500/5 hover:border-red-500/50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              Tailored Road Academy Models
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-red-100 via-white to-gray-400 bg-clip-text text-transparent font-display"
            >
              Interactive Programs
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-sans"
            >
              At <span className="text-white font-semibold">Smart Drive</span>, we offer a variety of professional <span className="text-red-400 font-bold underline decoration-red-500 decoration-2 underline-offset-4">Female Driving Instructors</span> tailored to suit learners at every level. Whether you're a beginner, an experienced driver looking to enhance your skills, or preparing for a road test, choose a model and test your options below.
            </motion.p>
          </div>
        </section>

        {/* Dynamic Telemetry Real-time Counter Stats Grid */}
        <section className="bg-slate-900/30 border-b border-slate-900 px-4 py-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Active Curriculums', count: '14+ Systems', icon: Layers, color: 'text-red-500' },
              { label: 'Simulator Labs', count: '98.4% Accredit', icon: Cpu, color: 'text-cyan-400' },
              { label: 'Female Mentors Team', count: 'Professional', icon: Users, color: 'text-pink-400' },
              { label: 'Safety Rating', desc: 'Faisalabad Direct', count: '5.0 / 5.0 Star', icon: Shield, color: 'text-amber-500' }
            ].map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="bg-slate-950/40 border border-slate-900 p-4 rounded-2xl flex flex-col justify-center items-center">
                  <IconComp className={`w-5 h-5 mb-2 ${stat.color} animate-pulse`} />
                  <span className="text-xs uppercase font-mono tracking-widest text-gray-500 block mb-1">{stat.label}</span>
                  <span className="text-white text-lg font-bold font-display">{stat.count}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Filter/Search Dashboard Area */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl backdrop-blur-md">
            
            {/* Category selection Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Courses', icon: Layers },
                { id: 'core', label: 'Core Driving', icon: Car },
                { id: 'specialty', label: 'Advanced Specialty', icon: Award },
                { id: 'bike', label: 'Cycle & Heavy Bike', icon: Bike }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wide transition-all ${
                      isActive 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 scale-[1.02]' 
                        : 'bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Direct Instant Search Bar input */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <input 
                type="text"
                placeholder="Search curriculum program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-red-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 text-white transition-all font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs font-mono"
                >
                  CLEAR
                </button>
              )}
            </div>

          </div>

          {/* Quick Informational Notice about Comparator HUD */}
          {compareList.length > 0 && (
            <div className="mb-6 flex justify-between items-center bg-cyan-950/40 border border-cyan-800/40 rounded-xl p-4 text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-mono">
                <Sliders className="w-4 h-4 animate-spin-slow" />
                <span>COURSES PINNED FOR COMPARISON: {compareList.length} / 2</span>
              </div>
              <button 
                onClick={() => setCompareList([])}
                className="text-gray-400 hover:text-white font-bold underline cursor-pointer"
              >
                Clear Pinned Codes
              </button>
            </div>
          )}

          {/* Grid list of dynamic program offerings */}
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => {
                  const isPinned = compareList.some(item => item.id === program.id);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.3 }}
                      key={program.id}
                      className="group relative bg-slate-900/40 hover:bg-slate-900/85 border border-slate-800 hover:border-red-500/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-red-950/10 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Glowing highlight top bar on hover */}
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl"></div>

                      <div>
                        {/* Badge and Top Icon */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-red-500 group-hover:text-red-400 group-hover:scale-105 transition-all flex items-center justify-center">
                            {program.category === 'bike' ? <Bike className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                          </span>
                          
                          <div className="flex items-center gap-1.5">
                            {program.femaleInstructor && (
                              <span className="px-2 py-0.5 rounded bg-pink-950/65 border border-pink-500/30 text-pink-400 text-[9px] font-mono font-bold uppercase tracking-wider">
                                Female Coach
                              </span>
                            )}
                            {program.badge && (
                              <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-500/20 text-red-400 text-[9px] font-mono font-bold uppercase tracking-widest">
                                {program.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title and Accents */}
                        <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-2.5 leading-tight font-display">
                          {program.title}
                        </h3>

                        {/* Complexity Level Gauge Indicator */}
                        <div className="flex items-center gap-1.5 mb-4 text-xs font-mono text-gray-500">
                          <span>Difficulty:</span>
                          <span className={`font-semibold ${
                            program.difficulty === 'Beginner' ? 'text-green-400' : program.difficulty === 'Intermediate' ? 'text-amber-400' : 'text-red-400'
                          }`}>
                            {program.difficulty}
                          </span>
                          <div className="flex items-center gap-0.5 ml-1">
                            {['Beginner', 'Intermediate', 'Advanced'].map((level, i) => {
                              const stepIdx = i + 1;
                              const currentPower = program.difficulty === 'Beginner' ? 1 : program.difficulty === 'Intermediate' ? 2 : 3;
                              const isActive = stepIdx <= currentPower;
                              return (
                                <span 
                                  key={level} 
                                  className={`w-3 h-1.5 rounded-sm ${isActive ? 'bg-red-500' : 'bg-slate-800'}`}
                                ></span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Word-for-Word Screenshot Description */}
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                          {program.description}
                        </p>

                        {/* Details Strip metrics */}
                        <div className="space-y-2 border-t border-slate-850 pt-4 mb-6">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-gray-500 uppercase">Duration Track</span>
                            <span className="text-slate-200 font-semibold">{program.duration}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-gray-500 uppercase">Instructor Type</span>
                            <span className="text-slate-200 font-semibold">{program.instructor}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-gray-500 uppercase">Session Count</span>
                            <span className="text-slate-200 font-semibold">{program.lessons} Core Lessons</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-gray-500 uppercase">Simulator Labs</span>
                            <span className={`font-bold ${program.simulatorAccredited ? 'text-cyan-400' : 'text-gray-500'}`}>
                              {program.simulatorAccredited ? 'VR Integrated [Accredited]' : 'Field Driving Only'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => setSelectedProgram(program)}
                            className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[11px] text-gray-300 hover:text-white font-mono py-2 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Info className="w-3.5 h-3.5 text-red-500" />
                            Benefits
                          </button>

                          <button 
                            onClick={() => toggleCompare(program)}
                            className={`border text-[11px] font-mono py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                              isPinned 
                                ? 'bg-cyan-950/60 border-cyan-500 text-cyan-400' 
                                : 'bg-slate-950/40 hover:bg-slate-900 border-slate-800 text-gray-400 hover:text-white'
                            }`}
                          >
                            {isPinned ? <Check className="w-3.5 h-3.5" /> : <Sliders className="w-3.4 h-3.4" />}
                            {isPinned ? 'Comparing' : 'Compare'}
                          </button>
                        </div>

                        <button 
                          onClick={() => handleEnrollClick(program.title)}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-650 text-white text-xs font-bold font-sans py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow shadow-red-500/10 active:scale-[0.98] cursor-pointer"
                        >
                          Enroll In Course
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-20 bg-slate-900/20 border border-slate-800 rounded-2xl">
                  <Heart className="w-10 h-10 text-slate-700 mx-auto mb-4 animate-pulse" />
                  <h4 className="text-white font-semibold text-lg animate-pulse">No Program Matches</h4>
                  <p className="text-slate-500 text-sm mt-1">Try resetting filters or clear your input search query.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    className="mt-6 bg-red-600/10 hover:bg-red-600/25 border border-red-500/20 text-red-400 text-xs font-mono py-2.5 px-5 rounded-xl cursor-pointer"
                  >
                    RESET DISPENSATION
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </section>

        {/* Dynamic Interactive Side-by-Side Advisor Questionnaire System */}
        <section className="bg-slate-950 text-white py-20 border-t border-slate-900 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dc262608,transparent)] pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-red-500 font-mono font-bold tracking-widest text-xs uppercase block mb-3">
                [ AI INTERACTIVE COURSE CHANGER ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-4">
                Automated Course Advisory Terminal
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Answer 3 quick technical questions to have our systems compute the ideal program, lesson quota, and match you with a male or female mentor instantly.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto relative backdrop-blur-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-2xl pointer-events-none"></div>
              
              {!isQuizActive ? (
                <div className="text-center py-6">
                  <Activity className="w-12 h-12 text-red-500 mx-auto mb-4 animate-bounce" />
                  <h4 className="text-white font-bold text-lg mb-2">Simulate Your Match Matrix</h4>
                  <p className="text-xs text-gray-500 max-w-md mx-auto mb-8 font-mono">
                    LOGOUT_DIAGNOSTICS: SYSTEMS_READY. START MATCH CALCULATOR PROTOCOL.
                  </p>
                  <button 
                    onClick={() => { setIsQuizActive(true); resetQuiz(); }}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-8 rounded-xl font-mono text-xs uppercase tracking-widest transition-all shadow shadow-red-600/10 cursor-pointer"
                  >
                    Launch Interactive Matcher &rsaquo;
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Step status bar */}
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3 text-xs text-gray-400 font-mono">
                    <span className="text-red-400 font-bold uppercase">Matcher Node Mode</span>
                    <span>QUESTIONS SOLVED: {quizStep > 3 ? 3 : quizStep} / 3</span>
                  </div>

                  {/* Multi-step options view */}
                  <AnimatePresence mode="wait">
                    {quizStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="text-white font-bold text-base font-display">1. What is your current steering experience?</h4>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {[
                            { id: 'none', title: 'Absolute Beginner', desc: 'No background; never sat on driver seat.' },
                            { id: 'some', title: 'Have basic experience', desc: 'Can steer and clutch, but lack complex confidence.' },
                            { id: 'test-prep', title: 'Pre-Test preparation', desc: 'Prepared but require mock testing loops.' }
                          ].map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => handleQuizAnswer('experience', opt.id)}
                              className="bg-slate-950/80 hover:bg-slate-800 border border-slate-800 p-4 rounded-xl text-left hover:border-red-500/40 transition-colors cursor-pointer"
                            >
                              <div className="font-bold text-sm text-white mb-1 font-display">{opt.title}</div>
                              <div className="text-[11px] text-gray-500 leading-normal">{opt.desc}</div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {quizStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="text-white font-bold text-base font-display">2. Which gearbox configuration / vehicle mode do you prefer?</h4>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {[
                            { id: 'automatic', title: 'Automatic Transmission', desc: 'Modern seamless gears; easy fuel-efficient drives.' },
                            { id: 'manual', title: 'Manual Shifting', desc: 'Complete mechanical friction clutch control.' },
                            { id: 'bike', title: 'Two-Wheeler / Bike', desc: 'Heavy sports bikes or simple street motorbikes.' }
                          ].map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => handleQuizAnswer('transmission', opt.id)}
                              className="bg-slate-950/80 hover:bg-slate-800 border border-slate-800 p-4 rounded-xl text-left hover:border-red-500/40 transition-colors cursor-pointer"
                            >
                              <div className="font-bold text-sm text-white mb-1 font-display">{opt.title}</div>
                              <div className="text-[11px] text-gray-500 leading-normal">{opt.desc}</div>
                            </button>
                          ))}
                        </div>
                        <button onClick={() => setQuizStep(1)} className="text-xs text-gray-500 hover:text-white font-mono underline block mt-2">Go Back</button>
                      </motion.div>
                    )}

                    {quizStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="text-white font-bold text-base font-display">3. What is your paramount safety objective?</h4>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {[
                            { id: 'license', title: 'Acquire Licensing Pass', desc: 'Clear Punjab Traffic police tests beautifully.' },
                            { id: 'highway', title: 'Highway Confidence', desc: 'Confidence on high volume high speed expressways.' },
                            { id: 'safety', title: 'Defensive Hazard Avoidance', desc: 'Proactive steering controls during skidding & weather.' }
                          ].map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => handleQuizAnswer('priority', opt.id)}
                              className="bg-slate-950/80 hover:bg-slate-800 border border-slate-800 p-4 rounded-xl text-left hover:border-red-500/40 transition-colors cursor-pointer"
                            >
                              <div className="font-bold text-sm text-white mb-1 font-display">{opt.title}</div>
                              <div className="text-[11px] text-gray-500 leading-normal">{opt.desc}</div>
                            </button>
                          ))}
                        </div>
                        <button onClick={() => setQuizStep(2)} className="text-xs text-gray-500 hover:text-white font-mono underline block mt-2">Go Back</button>
                      </motion.div>
                    )}

                    {quizStep === 4 && quizResult && (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-4"
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-950 border border-green-500/30 rounded-full text-green-400 text-xs font-mono mb-4 animate-pulse">
                          <Radio className="w-4 h-4 text-green-400" />
                          MATCH COMPUTATION RESOLVED: {compatibilityScore}% COMPATIBILITY
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2">
                          {quizResult.title}
                        </h3>
                        <p className="text-sm text-slate-450 text-gray-400 max-w-md mx-auto leading-relaxed mb-6">
                          {quizResult.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-xl mx-auto mb-8 text-xs font-mono">
                          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850">
                            <span className="text-gray-500 uppercase block mb-1">Complexity</span>
                            <span className="text-white font-bold">{quizResult.difficulty}</span>
                          </div>
                          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850">
                            <span className="text-gray-500 uppercase block mb-1">Sessions Count</span>
                            <span className="text-white font-bold">{quizResult.lessons} Lessons</span>
                          </div>
                          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850">
                            <span className="text-gray-500 uppercase block mb-1">Accredited Lab</span>
                            <span className="text-cyan-400 font-bold">{quizResult.simulatorAccredited ? 'Yes VR API' : 'Field Track'}</span>
                          </div>
                          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850">
                            <span className="text-gray-500 uppercase block mb-1">Female Coach</span>
                            <span className="text-pink-400 font-bold">{quizResult.femaleInstructor ? 'Active Availability' : 'Male Mentor Only'}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                          <button 
                            onClick={() => handleEnrollClick(quizResult.title)}
                            className="bg-gradient-to-r from-red-650 to-red-700 bg-red-600 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all"
                          >
                            Lock Selection & Inquire
                          </button>
                          
                          <button 
                            onClick={resetQuiz}
                            className="bg-slate-800 hover:bg-slate-700 text-gray-300 py-3.5 px-6 rounded-xl text-xs uppercase font-mono tracking-wider transition-all"
                          >
                            Rerun Diagnostic Matcher
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Global Floating Side-by-Side Diagnostic Compare Drawer Overlay */}
        <AnimatePresence>
          {showComparePanel && compareList.length > 0 && (
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="fixed bottom-0 inset-x-0 bg-slate-950 border-t-2 border-red-600/60 z-40 p-4 sm:p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-850">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    <h4 className="font-mono text-xs font-black uppercase text-gray-300 tracking-widest">
                      Curriculum Diagnostic Comparator HUD ({compareList.length} / 2)
                    </h4>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCompareList([])}
                      className="text-[10px] uppercase font-mono text-gray-500 hover:text-white"
                    >
                      Clear Comparator
                    </button>
                    <button 
                      onClick={() => setShowComparePanel(false)}
                      className="text-[10px] uppercase font-mono text-red-500 font-bold hover:text-red-400 flex items-center gap-0.5"
                    >
                      Minimize <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {compareList.map((prog, index) => (
                    <div key={prog.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 relative">
                      <button 
                        onClick={() => toggleCompare(prog)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-red-400 bg-slate-950 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded bg-red-950 text-red-400 text-xs font-mono">
                          CODE_0{index + 1}
                        </span>
                        <h5 className="font-semibold text-white text-sm font-display truncate pr-6">{prog.title}</h5>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5 text-[10px] font-mono text-gray-400 mt-2">
                        <div className="bg-slate-950 p-2 rounded">
                          <span className="block text-[8px] text-gray-600 block mb-0.5">Complexity Level</span>
                          <span className="font-black text-white">{prog.difficulty}</span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded">
                          <span className="block text-[8px] text-gray-600 block mb-0.5">Lessons Count</span>
                          <span className="font-black text-cyan-400">{prog.lessons} Sessions</span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded">
                          <span className="block text-[8px] text-gray-600 block mb-0.5">Female Coach</span>
                          <span className={`font-black uppercase ${prog.femaleInstructor ? 'text-pink-400' : 'text-gray-500'}`}>
                            {prog.femaleInstructor ? 'Active' : 'Unavail'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3.5 pt-3.5 border-t border-slate-800/60">
                        <span className="block text-[8px] font-mono uppercase text-gray-500 mb-1.5">Compulsory Course Milestones:</span>
                        <ul className="text-[11px] text-gray-300 space-y-1 block">
                          {prog.benefits.slice(0, 3).map((ben, bidx) => (
                            <li key={bidx} className="flex gap-1.5 items-center truncate">
                              <CheckCircle2 className="w-3 h-3 text-red-500 flex-shrink-0" />
                              <span className="truncate">{ben}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button 
                          onClick={() => handleEnrollClick(prog.title)}
                          className="flex-grow bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg text-xs tracking-wider uppercase transition-colors"
                        >
                          Enroll now
                        </button>
                        <button 
                          onClick={() => setSelectedProgram(prog)}
                          className="px-3 bg-slate-950 hover:bg-slate-800 text-gray-400 hover:text-white border border-slate-850 rounded-lg text-[10px] font-mono uppercase"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}

                  {compareList.length < 2 && (
                    <div className="border border-dashed border-slate-800 rounded-xl flex flex-col justify-center items-center text-center p-6 text-gray-500">
                      <Sliders className="w-8 h-8 text-slate-800 mb-2 animate-pulse" />
                      <p className="text-xs font-mono">Select Another Course To Compare Side-by-Side</p>
                      <p className="text-[10px] text-gray-600 mt-1">Check the Comparison options in the list above</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Details Modal Backdrop popups */}
        <AnimatePresence>
          {selectedProgram && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgram(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
              >
                {/* Decorative glow overlay */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-red-500/10 to-transparent blur-3xl pointer-events-none"></div>

                {/* Modal header details */}
                <div className="p-6 sm:p-8 border-b border-slate-800/60 pb-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-black">
                      COURSE DETAILS TERMINAL
                    </span>
                    <button 
                      onClick={() => setSelectedProgram(null)}
                      className="text-gray-400 hover:text-white px-3 py-1 bg-slate-950 rounded-lg text-xs font-mono"
                    >
                      ESC CLOSE
                    </button>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3.5xl font-extrabold font-display text-white">
                    {selectedProgram.title}
                  </h3>
                  <p className="text-xs text-red-400 font-mono mt-1.5 uppercase tracking-wider">
                    {selectedProgram.instructor} available
                  </p>
                </div>

                {/* Details Section content */}
                <div className="p-6 sm:p-8 space-y-6 flex-grow overflow-y-auto max-h-[60vh]">
                  <div>
                    <h5 className="font-mono text-[11px] uppercase text-gray-500 tracking-wider mb-2">Program Overview</h5>
                    <p className="text-slate-350 text-sm leading-relaxed text-gray-350 font-sans">
                      {selectedProgram.description}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-mono text-[11px] uppercase text-gray-500 tracking-wider mb-3">Compulsory Session Milestones {`(${selectedProgram.lessons} Total Sessions)`}</h5>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedProgram.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex gap-2.5 items-start bg-slate-950/60 border border-slate-850 p-3 rounded-xl">
                          <CheckCircle2 className="w-4.5 h-4.5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-300 leading-normal">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing details / CTA */}
                  <div className="bg-slate-950/80 border border-slate-850 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                    <div>
                      <span className="block text-[10px] font-mono text-gray-500 uppercase">Duration Track</span>
                      <span className="font-display font-medium text-white text-base mt-0.5 block flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-red-500" />
                        {selectedProgram.duration}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => {
                        handleEnrollClick(selectedProgram.title);
                        setSelectedProgram(null);
                      }}
                      className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl transition-all cursor-pointer"
                    >
                      Lock Selection & Inquire Now
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <Footer />
    </div>
  );
}
