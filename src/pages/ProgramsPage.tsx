import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { 
  Car, Shield, Award, HelpCircle, ArrowRight, CheckCircle2, 
  Search, Bike, Info, Clock, Check, X, Compass, Users, Calendar, Sparkles
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
}

const programsList: Program[] = [
  {
    id: 'complete-course',
    title: 'Complete Driving Course',
    description: 'Our premier all-inclusive driving program covering everything from absolute basic steering wheel controls to advanced parking dynamics and emergency reactions.',
    category: 'core',
    duration: '30 Days Complete Track',
    lessons: 25,
    highlight: 'Full Competency Mastery',
    badge: 'Most Popular',
    instructor: 'Male & Female Mentors Available',
    benefits: [
      'Zero-to-Expert complete layout & checklist',
      'Dynamic weather hazards & night-time practice hours',
      'Parallel, reverse, and L-parking mastery drills',
      'Full guidance through driving license mock tests'
    ],
    difficulty: 'Beginner',
    femaleInstructor: true
  },
  {
    id: 'adult-courses',
    title: 'Adult Learning Course',
    description: 'Perfect for busy adults seeking a structured, patient environment. Master safe driving techniques and build solid defensive driving habits that last a lifetime.',
    category: 'core',
    duration: '15 Days / Flexible Schedule',
    lessons: 15,
    highlight: 'High Passing Success',
    badge: 'Adult Approved',
    instructor: 'Experienced Professional Teachers',
    benefits: [
      'Tailored 1-on-1 personalized private instruction',
      'Dual-controlled training cars for maximum safety',
      'Flexible scheduling (morning, afternoon, or evening slots)',
      'Defensive driving mentality development'
    ],
    difficulty: 'Beginner',
    femaleInstructor: true
  },
  {
    id: 'teen-courses',
    title: 'Teen Driving Essentials',
    description: 'A special program focused on teaching young drivers respect for the road, strict compliance with traffic signs, and safe, distraction-free operation.',
    category: 'core',
    duration: '21 Days Custom',
    lessons: 15,
    highlight: 'Safe Driving Habits First',
    badge: 'Student Favorite',
    instructor: 'Highly Patient Instructors',
    benefits: [
      'Interactive mock road rule examinations',
      'Focus on handling passenger distractions',
      'Emergency braking & critical lane keeping drills',
      'Compliant with regulatory driving guidelines'
    ],
    difficulty: 'Beginner',
    femaleInstructor: true
  },
  {
    id: 'honda-civic-lessons',
    title: 'Sedan Mastery Class (Honda Civic)',
    description: 'Comprehensive, specialized training on both automatic and manual Honda Civic sedans to master car dimensions, modern console dashboards, and premium driving safety.',
    category: 'specialty',
    duration: '14 Days Premium Class',
    lessons: 12,
    highlight: 'Master Modern Sedans',
    badge: 'Sedan Special',
    instructor: 'Premium Sedan Specialists',
    benefits: [
      'Hands-on Civic console & dashboard layouts',
      'Sedan body-length parking and cornering dimensions',
      'Optimal reverse sensing camera mechanics',
      'Urban cruising & luxury car handling safety'
    ],
    difficulty: 'Intermediate',
    femaleInstructor: true
  },
  {
    id: 'automatic-lessons',
    title: 'Automatic Transmission Course',
    description: 'Designed exclusively for learning in modern automatic vehicles, eliminating the stress of gear shifting so you can focus entirely on road rules and lane positioning.',
    category: 'core',
    duration: '12 Days Smart Track',
    lessons: 10,
    highlight: 'Painless Steering Control',
    badge: 'Easiest To Learn',
    instructor: 'Automatic Specialists',
    benefits: [
      'Simple learning curve using automatic vehicles',
      'Mastery of accelerator and brake leverage control',
      'Urban stop-and-go heavy traffic adjustments',
      'Confidence building along complex roundabouts'
    ],
    difficulty: 'Beginner',
    femaleInstructor: true
  },
  {
    id: 'manual-lessons',
    title: 'Manual Shift Pedigree Class',
    description: 'Go classic with our manual car program. Master the clutch friction point, smooth gear shifts, and incline starts with absolute confidence.',
    category: 'core',
    duration: '15 Days Classic Track',
    lessons: 15,
    highlight: 'Mechanical Shifting Expert',
    badge: 'Pedigree Driving',
    instructor: 'Veteran Manual Coaches',
    benefits: [
      'Definitive clutch control and friction point training',
      'Perfect gear box sequencing & timing transitions',
      'Incline holds and hill-start rollback remedies',
      'Mechanical awareness for optimal vehicle safety'
    ],
    difficulty: 'Intermediate',
    femaleInstructor: true
  },
  {
    id: 'defensive-driving',
    title: 'Defensive Hazard Avoidance',
    description: 'Advanced defensive strategies to help experienced drivers anticipate dangerous situations, avoid accidents, and manage difficult driving weather conditions.',
    category: 'specialty',
    duration: '6 Days Intensive',
    lessons: 6,
    highlight: 'Proactive Road Safety',
    badge: 'Safety First',
    instructor: 'Safety Accredited Experts',
    benefits: [
      'Proactive hazard spotting & situational drills',
      'Braking distance guidelines and lane management formulas',
      'Avoiding aggressive drivers safety techniques',
      'Skid recovery procedures & wet-weather steering'
    ],
    difficulty: 'Advanced',
    femaleInstructor: false
  },
  {
    id: 'highway-lessons',
    title: 'Highway & Expressway Program',
    description: 'Boost your speed confidence and master highway lane joining, high-speed merging, blind spot checks, and multi-lane express road positioning.',
    category: 'specialty',
    duration: '5 Days Specialist Run',
    lessons: 5,
    highlight: 'High-Speed Merging confidence',
    badge: 'Advanced Skills',
    instructor: 'Expressway Route Guides',
    benefits: [
      'Interactive high-speed merging and exiting runs',
      'Safe highway lane switching and mirror management',
      'High-speed emergency shoulder parking checks',
      'Long-distance fatigue defense lessons'
    ],
    difficulty: 'Advanced',
    femaleInstructor: false
  },
  {
    id: 'road-test-prep',
    title: 'Road Test Prep Intensive',
    description: 'Master the actual municipal test tracks of Faisalabad. Learn exactly what inspectors evaluate and run strict mock trials to guarantee a first-time pass.',
    category: 'specialty',
    duration: '5 Days Targeted Mock Run',
    lessons: 5,
    highlight: '98% First-Time Pass Rate',
    badge: 'Exam Prep',
    instructor: 'Certified Internal Assessors',
    benefits: [
      'Driving on real test routes and mock-up paths',
      'Reverse L-parking and tight corner parallel parking tests',
      'Strict sign language & theoretical rule checklists',
      'Managing driver exam anxiety with patience'
    ],
    difficulty: 'Intermediate',
    femaleInstructor: true
  },
  {
    id: 'senior-courses',
    title: 'Senior Refresher / Confidence',
    description: 'A comforting, slow-paced program for elderly drivers designed to refresh road rules, restore driving confidence, and evaluate reaction-time adjustments.',
    category: 'core',
    duration: '10 Days Patient Track',
    lessons: 10,
    highlight: 'Patience & Support First',
    badge: 'Comfort Focused',
    instructor: 'Compassionate Veteran Instructors',
    benefits: [
      'Highly supportive & stress-free instructional speed',
      'Review of modern road symbols & lane adjustments',
      'Ergonomic seating and posture optimization',
      'Confidence building along calm residential sectors'
    ],
    difficulty: 'Beginner',
    femaleInstructor: true
  },
  {
    id: 'motorcycle-riding',
    title: 'Motorcycle Essentials',
    description: 'Master two-wheeler steering balance, safe clutch leverage, urban city commuting, and proactive defensive measures on light motorbikes.',
    category: 'bike',
    duration: '8 Days Essential Track',
    lessons: 8,
    highlight: 'Safe Two-Wheeler Commute',
    badge: 'Two-Wheeler Core',
    instructor: 'Certified Motorcycle Trainers',
    benefits: [
      'Low-speed steering controls & balancing postures',
      'Clutch throttle synchronization & foot braking rules',
      'Defensive lane space management in heavy traffic',
      'Critical helmet safety and safety gear guidelines'
    ],
    difficulty: 'Beginner',
    femaleInstructor: true
  },
  {
    id: 'heavy-bike-riding',
    title: 'Heavy Bike Advanced Riding',
    description: 'For motorcycle lovers who wish to step up to high displacement, heavy sports, or touring bikes. Learn center-of-gravity handling and motorcycle controls.',
    category: 'bike',
    duration: '10 Days heavyweight Track',
    lessons: 10,
    highlight: 'Heavyweight Bike Control',
    badge: 'Superbike Master',
    instructor: 'Veteran Superbike Riders',
    benefits: [
      'Center of gravity adjustments for heavy vehicles',
      'Sophisticated cornering turns & body lean leverage',
      'High engine throttle and engine braking optimization',
      'Comprehensive dual disc braking controls'
    ],
    difficulty: 'Advanced',
    femaleInstructor: false
  }
];

export default function ProgramsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'specialty' | 'bike'>('all');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Survey Course Recommendation State
  const [isSurveyActive, setIsSurveyActive] = useState(false);
  const [surveyStep, setSurveyStep] = useState(1);
  const [surveyAnswers, setSurveyAnswers] = useState({
    experience: '', 
    transmission: '', 
    priority: '' 
  });
  const [surveyResult, setSurveyResult] = useState<Program | null>(null);

  // Filter programs based on query & category
  const filteredPrograms = useMemo(() => {
    return programsList.filter(prog => {
      const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prog.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || prog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleEnrollClick = (programTitle: string) => {
    navigate(`/contact?program=${encodeURIComponent(programTitle)}`);
  };

  const handleSurveyAnswer = (key: string, value: string) => {
    const updatedAnswers = { ...surveyAnswers, [key]: value };
    setSurveyAnswers(updatedAnswers);

    if (surveyStep < 3) {
      setSurveyStep(prev => prev + 1);
    } else {
      // Logic for matching the perfect program
      let matchedId = 'complete-course';

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

      const match = programsList.find(p => p.id === matchedId) || programsList[0];
      setSurveyResult(match);
      setSurveyStep(4);
    }
  };

  const resetSurvey = () => {
    setSurveyStep(1);
    setSurveyAnswers({ experience: '', transmission: '', priority: '' });
    setSurveyResult(null);
  };

  const coursesSchema = {
    "@context": "https://schema.org",
    "@graph": programsList.map((prog) => ({
      "@type": "Course",
      "name": prog.title,
      "description": prog.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Smart Drive Driving School",
        "telephone": "0300-1115429",
        "email": "trainingdrivingschool@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Main Jaranwala Road",
          "addressLocality": "Faisalabad",
          "addressRegion": "Punjab",
          "addressCountry": "PK"
        }
      }
    }))
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50/50 min-h-screen flex flex-col justify-between">
      <SEO 
        title="Driving Programs & Courses - Manual, Automatic & Motorcycle Coaching"
        description="Choose from our premier range of tailored driving lessons in Faisalabad. We offer standard automatic car lessons, heavy bike classes, female trainer sessions, and license preparation."
        keywords="automatic car lessons Faisalabad, manual gear training, motorcycle classes Pakistan, drive tutoring, female driving trainer, local driving simulator, passing driving test license"
        schema={coursesSchema}
      />
      <Navbar />


      {/* Styled Minimal Elegance Hero Banner */}
      <section className="bg-white border-b border-gray-200 py-20 relative overflow-hidden">
        {/* Background Decorative Soft Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-100 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200/60 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <Award className="w-3.5 h-3.5" /> Professional Curriculums
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 font-display tracking-tight mb-6"
          >
            Our Driving Programs
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            At <span className="font-bold text-red-600">Smart Drive</span>, we prepare learners at every level to become skilled, completely safe, and confident lifetime drivers. We offer specialized automatic and manual vehicle courses, along with dedicated <span className="text-red-600 font-bold underline decoration-red-500/30 decoration-2 underline-offset-4">Female Driving Instructors</span>.
          </motion.p>
        </div>
      </section>

      {/* Trust & Accreditations Info Bar */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Active Programs', count: '12+ Courses', icon: Car, color: 'text-red-500 bg-red-50' },
            { label: 'Certified Trainers', count: 'Male & Female Team', icon: Users, color: 'text-blue-500 bg-blue-50' },
            { label: 'Learning Materials', count: 'Comprehensive Syllabus', icon: Compass, color: 'text-green-500 bg-green-50' },
            { label: 'Accredited Academy', count: 'Faisalabad Registered', icon: Shield, color: 'text-amber-500 bg-amber-50' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center sm:flex-row sm:text-left gap-3 justify-center">
                <div className={`p-2.5 rounded-xl shrink-0 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">{stat.label}</span>
                  <span className="text-gray-900 font-black text-sm">{stat.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Catalog & Search Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Dynamic Navigation Tabs & Custom Live Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
          
          {/* Categories Tab Pill Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Courses', icon: Car },
              { id: 'core', label: 'Core Programs', icon: Award },
              { id: 'specialty', label: 'Advanced Specialty', icon: Shield },
              { id: 'bike', label: 'Two-Wheeler Classes', icon: Bike }
            ].map(tab => {
              const TabIcon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/20' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quick Search Filtering */}
          <div className="relative max-w-sm w-full">
            <input 
              type="text"
              placeholder="Search driving programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 focus:border-red-500 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-900 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 text-xs font-black uppercase"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Clean, Modular Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => {
              return (
                <div
                  key={program.id}
                  className="bg-white border border-gray-200 hover:border-red-500/30 rounded-3xl p-6.5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
                >
                  {/* Subtle Accent Stripe */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-red-600/10 group-hover:bg-red-600 transition-colors"></div>

                  <div>
                    {/* Header: Class Badge and Female Coach Tag */}
                    <div className="flex justify-between items-start gap-2 mb-5 pt-2">
                      <span className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                        {program.category === 'bike' ? <Bike className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                      </span>
                      
                      <div className="flex flex-col items-end gap-1.5">
                        {program.femaleInstructor && (
                          <span className="px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-[10px] font-black uppercase tracking-wider">
                            Female Coach Available
                          </span>
                        )}
                        {program.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-wider">
                            {program.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-950 group-hover:text-red-600 transition-colors mb-3 leading-tight font-display">
                      {program.title}
                    </h3>

                    {/* Difficulty tags */}
                    <div className="flex items-center gap-1.5 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <span>Course Level:</span>
                      <span className={`px-2 py-0.5 rounded-md ${
                        program.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border border-green-100' :
                        program.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-red-50 text-red-705 border border-red-100'
                      }`}>
                        {program.difficulty}
                      </span>
                    </div>

                    {/* Short Human-Centric Description */}
                    <p className="text-gray-650 text-sm leading-relaxed mb-6">
                      {program.description}
                    </p>

                    {/* Key Metrics details */}
                    <div className="space-y-2.5 pt-4.5 border-t border-gray-100 mb-6 text-xs text-gray-600 font-medium">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Duration Time:</span>
                        <span className="text-gray-900 font-bold flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-red-500" />{program.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Lessons Included:</span>
                        <span className="text-gray-900 font-bold">{program.lessons} Total Sessions</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Instructors:</span>
                        <span className="text-gray-900 font-bold">{program.instructor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Program CTAs */}
                  <div className="space-y-2.5">
                    <button 
                      onClick={() => setSelectedProgram(program)}
                      className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Info className="w-4 h-4 text-red-500" />
                      View Benefits & details
                    </button>

                    <button 
                      onClick={() => handleEnrollClick(program.title)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-200 group-hover:scale-[1.01]"
                    >
                      Enroll & Book Lessons
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <Compass className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-bounce" />
              <h4 className="text-gray-900 font-black text-lg">No Matching Programs Found</h4>
              <p className="text-gray-500 text-sm mt-1">Try resetting the filters or check your search keyword styling.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-6 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-black uppercase tracking-wider py-2.5 px-6 rounded-xl"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </section>

      {/* Styled Friendly Interactive Course Advisor Questionnaire */}
      <section className="bg-white border-t border-gray-200 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-red-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1 bg-red-50 border border-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Direct Roadmap Advisor
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-gray-900 mb-4">
              Not Sure Which Class Is Right?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Answer 3 simple questions and our expert roadmap survey will instantly recommend the most suitable driving package and transmission layout for you.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm relative">
            {!isSurveyActive ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-red-600 mx-auto mb-4 animate-pulse" />
                <h4 className="text-gray-900 font-black text-xl mb-2">Find Your Ideal Class in seconds</h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto mb-8 font-medium">
                  We will evaluate your driving experience and scheduling requirements step by step.
                </p>
                <button 
                  onClick={() => { setIsSurveyActive(true); resetSurvey(); }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shadow-red-200"
                >
                  Start Course Survey
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3.5 text-xs text-gray-500 font-bold">
                  <span className="text-red-600 uppercase">Roadmap Advisor Portal</span>
                  <span>Questions Check: {surveyStep > 3 ? 3 : surveyStep} of 3</span>
                </div>

                <AnimatePresence mode="wait">
                  {surveyStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-gray-950 font-extrabold text-base sm:text-lg">1. What is your current driving background?</h4>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {[
                          { id: 'none', title: 'Complete Beginner', desc: 'No background; never sat behind a steering wheel.' },
                          { id: 'some', title: 'Basic Knowledge', desc: 'Can drive slightly, but need complex traffic practice.' },
                          { id: 'test-prep', title: 'Exam Test Preparation', desc: 'Have experience but need specific mock test run guidelines.' }
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => handleSurveyAnswer('experience', opt.id)}
                            className="bg-white hover:bg-red-50/20 border border-gray-200 hover:border-red-500 p-4 rounded-xl text-left transition-all active:scale-95"
                          >
                            <div className="font-extrabold text-sm text-gray-900 mb-1">{opt.title}</div>
                            <div className="text-xs text-gray-500 leading-normal">{opt.desc}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {surveyStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-gray-950 font-extrabold text-base sm:text-lg">2. Which gearbox configuration / vehicle mode do you prefer?</h4>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {[
                          { id: 'automatic', title: 'Automatic Transmission', desc: 'Modern and hassle-free, gear shifts are completely automatic.' },
                          { id: 'manual', title: 'Manual gear shifting', desc: 'Pedigree driving requiring absolute clutch pedal control.' },
                          { id: 'bike', title: 'Two-Wheeler Motorbike', desc: 'Light commute motorcycles or heavy safety bikes.' }
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => handleSurveyAnswer('transmission', opt.id)}
                            className="bg-white hover:bg-red-50/20 border border-gray-200 hover:border-red-500 p-4 rounded-xl text-left transition-all active:scale-95"
                          >
                            <div className="font-extrabold text-sm text-gray-900 mb-1">{opt.title}</div>
                            <div className="text-xs text-gray-500 leading-normal">{opt.desc}</div>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setSurveyStep(1)} className="text-xs text-red-650 hover:underline font-bold mt-2">← Back to previous question</button>
                    </motion.div>
                  )}

                  {surveyStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-gray-950 font-extrabold text-base sm:text-lg">3. What is your immediate driving goal?</h4>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {[
                          { id: 'license', title: 'Get license immediately', desc: 'Prepare and pass the regulatory highway traffic test in Faisalabad.' },
                          { id: 'highway', title: 'Conquer Highway traffic', desc: 'Gain extreme steering peace at speeds over 80 km/h.' },
                          { id: 'safety', title: 'Proactive Road Safety', desc: 'Defensive measures, emergency maneuvers and safety laws.' }
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => handleSurveyAnswer('priority', opt.id)}
                            className="bg-white hover:bg-red-50/20 border border-gray-200 hover:border-red-500 p-4 rounded-xl text-left transition-all active:scale-95"
                          >
                            <div className="font-extrabold text-sm text-gray-900 mb-1">{opt.title}</div>
                            <div className="text-xs text-gray-500 leading-normal">{opt.desc}</div>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setSurveyStep(2)} className="text-xs text-red-650 hover:underline font-bold mt-2">← Back to previous question</button>
                    </motion.div>
                  )}

                  {surveyStep === 4 && surveyResult && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4"
                    >
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 text-xs font-bold mb-4">
                        <Check className="w-4 h-4 text-green-600" /> Ideal Driving Course Match Found
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 font-display">
                        {surveyResult.title}
                      </h3>
                      <p className="text-sm text-gray-650 max-w-md mx-auto leading-relaxed mb-6 font-medium">
                        {surveyResult.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-xl mx-auto mb-8 text-xs font-medium">
                        <div className="bg-white p-3 rounded-xl border border-gray-205">
                          <span className="text-gray-400 block mb-0.5">Complexity</span>
                          <span className="text-gray-950 font-extrabold">{surveyResult.difficulty}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-205">
                          <span className="text-gray-400 block mb-0.5">Lessons</span>
                          <span className="text-gray-950 font-extrabold">{surveyResult.lessons} Sessions</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-205">
                          <span className="text-gray-400 block mb-0.5">Syllabus Track</span>
                          <span className="text-red-600 font-extrabold">Complete Master</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-205">
                          <span className="text-gray-400 block mb-0.5">Female Coach</span>
                          <span className="text-pink-600 font-extrabold">{surveyResult.femaleInstructor ? 'Active Availability' : 'Male Only'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 justify-center">
                        <button 
                          onClick={() => handleEnrollClick(surveyResult.title)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-red-200"
                        >
                          Enroll In Recommended Course
                        </button>
                        
                        <button 
                          onClick={resetSurvey}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all"
                        >
                          Retake Survey
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

      {/* Program Benefits Modal Backdrop Details popup */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProgram(null)}
            className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-gray-200 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-red-100/30 to-transparent blur-2xl pointer-events-none"></div>

              {/* Modal header */}
              <div className="p-6 sm:p-8 border-b border-gray-100 pb-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black tracking-widest text-red-650 uppercase">
                    Instructor Course Overview
                  </span>
                  <button 
                    onClick={() => setSelectedProgram(null)}
                    className="text-gray-400 hover:text-red-650 bg-gray-100 hover:bg-red-50 p-1.5 rounded-lg text-xs font-bold font-sans transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 font-display tracking-tight">
                  {selectedProgram.title}
                </h3>
                <p className="text-xs text-red-600 font-bold mt-1.5 uppercase tracking-wider bg-red-50 inline-block px-2.5 py-0.5 rounded-md border border-red-100">
                  {selectedProgram.instructor}
                </p>
              </div>

              {/* Modal content body */}
              <div className="p-6 sm:p-8 space-y-6 flex-grow overflow-y-auto max-h-[60vh]">
                <div>
                  <h5 className="font-bold text-xs uppercase text-gray-400 tracking-wider mb-2">Program Objective</h5>
                  <p className="text-gray-650 text-sm leading-relaxed">
                    {selectedProgram.description}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs uppercase text-gray-400 tracking-wider mb-3">What You Will Learn</h5>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedProgram.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex gap-2.5 items-start bg-gray-55/60 border border-gray-200/80 p-3.5 rounded-2xl">
                        <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700 leading-relaxed font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration / CTA bottom strip */}
                <div className="bg-gray-50 border border-gray-200/85 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold">Comprehensive Duration</span>
                    <span className="font-extrabold text-gray-900 text-sm mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-red-500" />
                      {selectedProgram.duration}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      handleEnrollClick(selectedProgram.title);
                      setSelectedProgram(null);
                    }}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-md shadow-red-200"
                  >
                    Lock Selection & Enquire
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
