import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';

interface TourStep {
  title: string;
  urduTitle: string;
  description: string;
  urduDescription: string;
  tab?: 'dashboard' | 'bookings' | 'blogs' | 'dns' | 'rentals' | 'requests' | 'courses' | 'car-sales' | 'instructors' | 'excise';
  badge: string;
  urduBadge: string;
  icon: string;
  targetId: string;
}

interface AdminOnboardingTourProps {
  activeTab: 'dashboard' | 'bookings' | 'blogs' | 'dns' | 'rentals' | 'requests' | 'courses' | 'car-sales' | 'instructors' | 'excise';
  setActiveTab: (tab: 'dashboard' | 'bookings' | 'blogs' | 'dns' | 'rentals' | 'requests' | 'courses' | 'car-sales' | 'instructors' | 'excise') => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminOnboardingTour({
  activeTab,
  setActiveTab,
  isOpen,
  onClose
}: AdminOnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState<'en' | 'ur'>('en'); // Default to English as requested, toggleable to Urdu
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number; placement: 'right' | 'bottom' | 'center' } | null>(null);

  const steps: TourStep[] = [
    {
      title: "Welcome to Administrative Control Board",
      urduTitle: "ایڈمنسٹریٹر کنٹرول بورڈ میں خوش آمدید",
      description: "Welcome to your Command Center! This dashboard provides live diagnostic cards tracking student enrollments, approved car fleets, pending verification works, and active driving school packages in real-time.",
      urduDescription: "گو ڈرائیو فائی کے ایڈمن پینل میں خوش آمدید! یہ آپ کا مرکزی کمانڈ سینٹر ہے جہاں سے آپ لائیو بکنگز، رینٹل کاریں، اور نئے کورسز کو لائیو مانیٹر اور کنٹرول کر سکتے ہیں۔",
      tab: 'dashboard',
      badge: "Command Center",
      urduBadge: "کمانڈ سینٹر",
      icon: "👑",
      targetId: "admin-tour-stats"
    },
    {
      title: "Operations Directory",
      urduTitle: "آپریشنز ڈائریکٹری (سائڈبار)",
      description: "This sidebar is your navigation panel. Click on any sector to manage that specific branch of the driving school, rental fleet, or blogging platform.",
      urduDescription: "بائیں جانب موجود یہ سائڈبار آپ کا مینیو ہے۔ یہاں سے آپ ڈرائیونگ سکول، رینٹل مارکیٹ، یا بلاگنگ پلیٹ فارم کے مخصوص شعبوں کو سنبھال سکتے ہیں۔",
      tab: 'dashboard',
      badge: "Sidebar Directory",
      urduBadge: "سائڈبار ڈائریکٹری",
      icon: "📂",
      targetId: "admin-tour-sidebar"
    },
    {
      title: "Student Enrollments & Bookings",
      urduTitle: "طلبہ کے داخلے اور بکنگز مینیجر",
      description: "Manage registered driving school students. Here, you can approve applications, update payment status (Paid/Unpaid), schedule lesson timings, and view biometric requirements.",
      urduDescription: "یہاں سے آپ ڈرائیونگ سیکھنے والے تمام طلبہ کی درخواستیں دیکھ سکتے ہیں، ان کے فیس اسٹیٹس (ادا شدہ / غیر ادا شدہ) کو اپ ڈیٹ کر سکتے ہیں اور ان کا شیڈول طے کر سکتے ہیں۔",
      tab: 'bookings',
      badge: "Student Bookings",
      urduBadge: "طلبہ بکنگز",
      icon: "📝",
      targetId: "admin-tour-bookings"
    },
    {
      title: "Driving Academy Curriculums",
      urduTitle: "ڈرائیونگ اکیڈمی کورسز و فیس پیکجز",
      description: "Add, edit, or delete driving course plans. You can update pricing packages, modify lesson hours, and set manual or automatic car specifications displayed on the enrollment form.",
      urduDescription: "اس پینل سے آپ ڈرائیونگ کے کورسز، فیس پیکجز، اور کلاسز کا دورانیہ تبدیل کر سکتے ہیں جو کہ سٹوڈنٹس کو رجسٹریشن فارم بھرتے وقت نظر آتے ہیں۔",
      tab: 'courses',
      badge: "Academy Curriculums",
      urduBadge: "اکیڈمی نصاب",
      icon: "🎓",
      targetId: "admin-tour-courses"
    },
    {
      title: "Rental Marketplace Fleet Approval",
      urduTitle: "رینٹل مارکیٹ اور گاڑیوں کی منظوری",
      description: "Approve or reject vehicles uploaded by users for rent. You can set daily rental rates, manage specifications, and toggle driver-included packages.",
      urduDescription: "لوگوں کی طرف سے رینٹ پر چڑھانے کے لیے بھیجی گئی گاڑیوں کو منظور یا مسترد کریں۔ یہاں سے آپ گاڑیوں کے یومیہ کرائے اور ڈرائیور کی تفصیلات کنٹرول کر سکتے ہیں۔",
      tab: 'rentals',
      badge: "Rental Cars Fleet",
      urduBadge: "گاڑیوں کا فلیٹ",
      icon: "🚗",
      targetId: "admin-tour-rentals"
    },
    {
      title: "Buyer/Seller Custom Demands",
      urduTitle: "کسٹمرز کی مخصوص فرمائشی درخواستیں",
      description: "Track custom driving requests and rental demands. When users submit unique travel or learning requests, review them here to coordinate drivers and custom rates.",
      urduDescription: "صارفین کی طرف سے بھیجی گئی مخصوص سفری اور سیکھنے کی فرمائشیں یہاں ظاہر ہوتی ہیں۔ آپ ان کا جائزہ لے کر کسٹمرز سے رابطہ کر سکتے ہیں۔",
      tab: 'requests',
      badge: "Custom Requests",
      urduBadge: "کسٹمرز کی درخواستیں",
      icon: "💡",
      targetId: "admin-tour-requests"
    },
    {
      title: "Pre-Owned Cars Sale Board",
      urduTitle: "گاڑیوں کی خرید و فروخت کا بورڈ",
      description: "Manage pre-owned cars listed for sale. Add specifications, mileage, pricing, images, and owner contact details directly to the Faisalabad car sales marketplace.",
      urduDescription: "فروخت کے لیے پیش کی گئی گاڑیوں کی لسٹنگ مینیج کریں۔ گاڑیوں کی قیمت، تصاویر، اور مالک کا رابطہ یہاں سے اپ ڈیٹ کریں۔",
      tab: 'car-sales',
      badge: "Car Sales Market",
      urduBadge: "خرید و فروخت مارکیٹ",
      icon: "🚘",
      targetId: "admin-tour-car-sales"
    },
    {
      title: "Blogging & AI SEO Content Engine",
      urduTitle: "بلاگز اور AI ایس ای او رائٹنگ انجن",
      description: "A full-featured markdown editor to write traffic guides and tutorials. Use our AI tool to automatically generate meta titles, descriptions, and SEO focus keywords with a single click to boost Google rankings.",
      urduDescription: "ڈرائیونگ قوانین اور تعلیمی مضامین لکھنے کا زبردست ایڈیٹر۔ صرف ایک کلک سے AI کے ذریعے میٹا ٹیگز اور کی ورڈز بنائیں تاکہ آپ کا بلاگ گوگل سرچ میں اوپر آ سکے۔",
      tab: 'blogs',
      badge: "SEO Blog Publisher",
      urduBadge: "ایس ای او بلاگز",
      icon: "✍️",
      targetId: "admin-tour-blogs"
    },
    {
      title: "DLIMS Punjab Official Docs Center",
      urduTitle: "DLIMS پنجاب ڈرائیونگ معلومات مینیجر",
      description: "Configure official DLIMS licensing guidelines, verify processes, and FAQ documents. These feed directly into our conversational AI Driving Assistant on the main portal.",
      urduDescription: "سرکاری ڈرائیونگ لائسنس کے قوانین، مطلوبہ دستاویزات اور عام سوالات ترتیب دیں۔ یہ ڈیٹا براہ راست ہوم پیج پر موجود لائیو AI اسسٹنٹ کو فیڈ ہوتا ہے۔",
      tab: 'dns',
      badge: "DLIMS Docs Assistant",
      urduBadge: "سرکاری گائیڈ لائنز",
      icon: "📜",
      targetId: "admin-tour-dns"
    },
    {
      title: "Certified Driving Instructors Roster",
      urduTitle: "تصدیق شدہ انسٹرکٹرز کی لسٹ اور ریٹنگز",
      description: "Hire and maintain certified driving tutors. Define their expertise (manual, automatic, test prep) and check student ratings, contacts, and active statuses.",
      urduDescription: "اکیڈمی کے انسٹرکٹرز (ٹیوٹرز) کی لسٹ سنبھالیں۔ ان کی مہارت (مینول، آٹومیٹک) اور طلبہ کی طرف سے دی گئی ریٹنگز یہاں مانیٹر کریں۔",
      tab: 'instructors',
      badge: "Tutors Roster",
      urduBadge: "انسٹرکٹرز لسٹ",
      icon: "🧑‍✈️",
      targetId: "admin-tour-instructors"
    },
    {
      title: "Excise Taxes & NADRA Biometrics",
      urduTitle: "ایکسائز ٹیکس اور نادرہ فیس سیٹنگز",
      description: "Configure Punjab Excise tax slabs (withholding taxes for Filers vs Non-Filers) and NADRA online biometric fees. Your updates are reflected in our real-time Biometric Calculator.",
      urduDescription: "پنجاب ایکسائز کے ٹیکس ریٹس (فائلر اور نان فائلر ٹیکسز) اور نادرہ بائیومیٹرک فیس مقرر کریں۔ یہاں کی گئی تبدیلیاں لائیو بائیومیٹرک کیلکولیٹر پر لاگو ہوتی ہیں۔",
      tab: 'excise',
      badge: "Excise & NADRA Rates",
      urduBadge: "ایکسائز اور نادرہ ریٹس",
      icon: "🏛️",
      targetId: "admin-tour-excise"
    },
    {
      title: "You are Ready!",
      urduTitle: "آپ اب تیار ہیں!",
      description: "Awesome! You have completed the walk-through of the Administrative Board. Go ahead and manage your driving academy with confidence. Launch this interactive tour anytime via the Help button.",
      urduDescription: "بہت خوب! آپ نے ایڈمن پینل کا تفصیلی جائزہ مکمل کر لیا ہے۔ اب آپ اعتماد کے ساتھ سسٹم کو مینیج کر سکتے ہیں۔ کسی بھی وقت دوبارہ رہنمائی کے لیے ہیلپ بٹن دبائیں۔",
      tab: 'dashboard',
      badge: "Setup Complete",
      urduBadge: "ٹور مکمل",
      icon: "🎉",
      targetId: "admin-tour-dashboard"
    }
  ];

  // Dynamically change active tab when current step shifts
  useEffect(() => {
    if (isOpen && steps[currentStep] && steps[currentStep].tab) {
      setActiveTab(steps[currentStep].tab!);
    }
  }, [currentStep, isOpen]);

  // Function to calculate position coordinates
  const updatePosition = () => {
    if (!isOpen) return;
    const step = steps[currentStep];
    const element = document.getElementById(step.targetId);
    
    if (element) {
      // Scroll target element into view smoothly so the user doesn't miss it
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      const rect = element.getBoundingClientRect();
      const isMobile = window.innerWidth < 1024;
      
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        placement: isMobile 
          ? 'center' 
          : (step.targetId === 'admin-tour-stats' ? 'bottom' : 'right')
      });
    } else {
      setCoords(null);
    }
  };

  useEffect(() => {
    // Delay slightly to let the tab change and components mount/render
    const timer = setTimeout(() => {
      updatePosition();
    }, 250);

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, isOpen, activeTab]);

  if (!isOpen) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Determine Safe Floating Popover Styles based on target coordinate bounding box
  let popupStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 50,
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  if (coords && !isMobile) {
    if (coords.placement === 'right') {
      const cardWidth = 460;
      const targetRight = coords.left + coords.width;
      const fitRight = targetRight + cardWidth + 30 < window.innerWidth;
      
      if (fitRight) {
        popupStyle.left = targetRight + 24;
        // Vertically centered next to target, clamped to viewport bounds
        const idealTop = coords.top + (coords.height / 2) - 160;
        popupStyle.top = Math.max(24, Math.min(window.innerHeight - 340, idealTop));
      } else {
        // Overlay below the sidebar item if horizontal space is tight
        popupStyle.left = Math.max(24, Math.min(window.innerWidth - cardWidth - 24, coords.left));
        popupStyle.top = coords.top + coords.height + 24;
      }
    } else if (coords.placement === 'bottom') {
      popupStyle.left = Math.max(24, Math.min(window.innerWidth - 480, coords.left + (coords.width / 2) - 230));
      popupStyle.top = coords.top + coords.height + 24;
    }
  } else {
    // Center alignment on Mobile screens
    popupStyle.left = '50%';
    popupStyle.top = '50%';
    popupStyle.transform = 'translate(-50%, -50%)';
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        
        {/* Subtle Dark non-blocking Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs pointer-events-auto"
          onClick={onClose}
        />

        {/* Dynamic Glow Spotlight Highlighter Ring around the guided option */}
        {coords && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            style={{
              position: 'fixed',
              top: coords.top - 8,
              left: coords.left - 8,
              width: coords.width + 16,
              height: coords.height + 16,
            }}
            className="pointer-events-none z-45 rounded-2xl border-4 border-[#FF7112] shadow-[0_0_35px_rgba(255,113,18,0.85)] mix-blend-screen"
          >
            {/* Visual focus arrow/tag */}
            <span className="absolute -top-3.5 left-4 bg-[#FF7112] text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-md animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              FOCUS / نشان دہی
            </span>
          </motion.div>
        )}

        {/* Beautiful Anchored Floating Card with directional point guide pointers */}
        <motion.div
          initial={isMobile ? { y: 100, opacity: 0, x: "-50%" } : { scale: 0.9, opacity: 0 }}
          animate={isMobile ? { y: "-50%", opacity: 1, x: "-50%" } : { scale: 1, opacity: 1 }}
          exit={isMobile ? { y: 100, opacity: 0, x: "-50%" } : { scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={popupStyle}
          className="absolute bg-white dark:bg-slate-900 border-3 border-[#FF7112] rounded-3xl p-6 sm:p-7 max-w-md sm:max-w-lg w-[calc(100vw-32px)] sm:w-full shadow-2xl overflow-visible pointer-events-auto"
        >
          {/* Top aesthetic accent line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-[#FF7112] to-amber-500 rounded-t-3xl" />

          {/* Dynamic layout directional point arrow pointing towards targeted button */}
          {coords && !isMobile && coords.placement === 'right' && (
            <div className="absolute left-0 top-[30%] -translate-x-3 w-5 h-5 bg-white dark:bg-slate-900 border-l-3 border-b-3 border-[#FF7112] rotate-45" />
          )}

          {coords && !isMobile && coords.placement === 'bottom' && (
            <div className="absolute top-0 left-[15%] -translate-y-3 w-5 h-5 bg-white dark:bg-slate-900 border-t-3 border-l-3 border-[#FF7112] rotate-45" />
          )}

          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{step.icon}</span>
              <span className="bg-[#FF7112]/10 text-[#E05A00] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#FF7112]/20">
                {language === 'en' ? step.badge : step.urduBadge}
              </span>
            </div>

            {/* Language switch & exit button */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLanguage(prev => prev === 'en' ? 'ur' : 'en')}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-1 border border-slate-200 dark:border-slate-700 cursor-pointer"
                title="Toggle Language"
              >
                🌐 {language === 'en' ? 'اردو' : 'English'}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Onboarding text content block */}
          <div className="space-y-3.5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF7112] shrink-0" />
              {language === 'en' ? step.title : step.urduTitle}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-bold">
              {language === 'en' ? step.description : step.urduDescription}
            </p>
          </div>

          {/* Footers controls stack */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Step bullet list trackers */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentStep 
                      ? 'w-5 bg-[#FF7112]' 
                      : 'w-2 bg-slate-200 dark:bg-slate-800 hover:bg-[#FF7112]/40'
                  }`}
                  title={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Back & Next flow buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition flex items-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Back' : 'پیچھے'}
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="bg-[#FF7112] hover:bg-[#E05A00] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition flex items-center gap-1 shadow-md shadow-orange-200 dark:shadow-none cursor-pointer"
              >
                <span>
                  {currentStep === steps.length - 1 
                    ? (language === 'en' ? 'Get Started' : 'شروع کریں') 
                    : (language === 'en' ? 'Next' : 'اگلا')}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick exit option */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-[10px] font-black text-slate-400 hover:text-[#FF7112] transition tracking-wider uppercase cursor-pointer"
            >
              {language === 'en' ? 'Skip Guide / Exit' : 'رہنمائی ختم کریں / بند کریں'}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
