import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, CheckCircle2, DollarSign, Calendar, ShieldCheck, 
  ArrowRight, Mail, Phone, Users, Sparkles, UploadCloud, 
  TrendingUp, FileText, Check, HelpCircle, Star, MessageSquare 
} from 'lucide-react';
import Newsletter from '../components/Newsletter';

interface DrivingCourse {
  id: string;
  courseTitle: string;
  courseDescription: string;
  courseFee: string;
  carImage: string;
  lessonDuration: string;
  dailyTime: string;
  theoryDuration: string;
  coursePeriod: string;
  additionalTime: string;
}

export default function ServicesPage() {
  const [courses, setCourses] = useState<DrivingCourse[]>([]);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'driving' | 'rent' | 'sale'>('driving');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    email: '',
    whatsappNumber: '',
    inquiryType: 'Learn Driving / Course Inquiry',
    message: ''
  });

  // Automatically sync Inquiry Type when activeTab is selected
  useEffect(() => {
    let mapping = 'Learn Driving / Course Inquiry';
    if (activeTab === 'rent') {
      mapping = 'Rent My Vehicle out';
    } else if (activeTab === 'sale') {
      mapping = 'List My Vehicle for Selling';
    }
    setFormData(prev => ({
      ...prev,
      inquiryType: mapping
    }));
  }, [activeTab]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionTicketId, setSubmissionTicketId] = useState('');

  useEffect(() => {
    const syncDrivingCourses = () => {
      const saved = localStorage.getItem('driving_courses_v3');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCourses(parsed);
          } else {
            setCourses(DEFAULT_PRICING_COURSES);
          }
        } catch (e) {
          setCourses(DEFAULT_PRICING_COURSES);
        }
      } else {
        setCourses(DEFAULT_PRICING_COURSES);
        localStorage.setItem('driving_courses_v2', JSON.stringify(DEFAULT_PRICING_COURSES));
      }
    };

    const DEFAULT_PRICING_COURSES = [
      {
        id: "course-1",
        courseTitle: "10 Days Course Package",
        courseDescription: "Learn professional manual gear control from experienced trainers.",
        courseFee: "25000",
        carImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600",
        lessonDuration: "30 Mins Driving Lesson",
        dailyTime: "40 min Per Day",
        theoryDuration: "10 min Theory Session",
        coursePeriod: "10 Days Training Duration",
        additionalTime: "Additional Time Available"
      },
      {
        id: "course-2",
        courseTitle: "20 Days Course Package",
        courseDescription: "Master driving in our fully automatic modern Civic, ideal for beginners.",
        courseFee: "25000",
        carImage: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
        lessonDuration: "30 Mins Driving Lesson",
        dailyTime: "40 min Per Day",
        theoryDuration: "10 min Theory Session",
        coursePeriod: "20 Days Intensive Plan",
        additionalTime: "Additional Time Available"
      },
      {
        id: "course-3",
        courseTitle: "1 Month Complete Package",
        courseDescription: "Expert motorcycle sessions to ride heavy sport bike configurations.",
        courseFee: "50000",
        carImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600",
        lessonDuration: "60 Mins Driving Lesson",
        dailyTime: "40 min Per Day",
        theoryDuration: "10 min Theory Session",
        coursePeriod: "1 Month Comprehensive Track",
        additionalTime: "Additional Time Available"
      }
    ];

    syncDrivingCourses();
    window.addEventListener('storage', syncDrivingCourses);
    window.addEventListener('driving_courses_updated', syncDrivingCourses);

    return () => {
      window.removeEventListener('storage', syncDrivingCourses);
      window.removeEventListener('driving_courses_updated', syncDrivingCourses);
    };
  }, []);

  // Smooth scroll to inquiry form
  const scrollToContact = (inquiryType: string, customMessage: string) => {
    setFormData(prev => ({
      ...prev,
      inquiryType: inquiryType,
      message: customMessage
    }));
    
    if (inquiryType === 'Learn Driving / Course Inquiry') {
      setActiveTab('driving');
    } else if (inquiryType === 'Rent My Vehicle out') {
      setActiveTab('rent');
    } else if (inquiryType === 'List My Vehicle for Selling') {
      setActiveTab('sale');
    }
    
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Launch Onboard Car Modal
  const handleOnboardCarModal = () => {
    window.dispatchEvent(new Event('open-listing-modal'));
  };

  // Handle inquiry submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.fatherName || !formData.whatsappNumber) {
      alert('Please fill out all mandatory fields registered with the asterisk *');
      return;
    }

    const ticketId = 'GD' + Math.floor(100000 + Math.random() * 900000).toString();
    setSubmissionTicketId(ticketId);

    // Persist inquiry in localStorage safely
    try {
      const stored = localStorage.getItem('contact_inquiries');
      const inquiriesList = stored ? JSON.parse(stored) : [];
      inquiriesList.unshift({
        ticketId,
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('contact_inquiries', JSON.stringify(inquiriesList));
      window.dispatchEvent(new Event('inquiry_submitted'));
    } catch (err) {
      console.error(err);
    }

    setFormSubmitted(true);
  };

  // Reset form
  const handleResetForm = () => {
    setFormSubmitted(false);
    setFormData({
      fullName: '',
      fatherName: '',
      email: '',
      whatsappNumber: '',
      inquiryType: 'Learn Driving / Course Inquiry',
      message: ''
    });
  };

  // Resume form on WhatsApp
  const handleWhatsAppRedirect = () => {
    const textStr = `*GoDriveify Service Ticket: ${submissionTicketId}*\n\n` + 
                    `*Name:* ${formData.fullName}\n` +
                    `*Father's Name:* ${formData.fatherName}\n` +
                    `*Inquiry:* ${formData.inquiryType}\n` +
                    `*WhatsApp:* ${formData.whatsappNumber}\n` +
                    `*Message:* ${formData.message}`;
    const encoded = encodeURIComponent(textStr);
    window.open(`https://wa.me/923097666928?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <SEO 
        title="Premium Vehicle Services & Driving School | GoDriveify Faisalabad"
        description="Comprehensive services covering Faisalabad's top driving school academy, dual-clutch car rental pipeline, and zero-commission verified direct car selling."
      />
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100 pt-0 pb-16 lg:pt-0 lg:pb-28">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100/50 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <span className="inline-flex items-center gap-1 bg-red-50 border border-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> All-in-One Automobile Hub
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-none mb-6">
                Get Behind the Wheel. <br />
                <span className="text-red-700">Explore Our Services.</span>
              </h1>
              <p className="max-w-xl text-slate-500 text-base sm:text-lg leading-relaxed font-medium">
                Whether you are here to learn defensive driving, build steady passive income by renting your vehicle, or list your car for a high-value hassle-free sale, GoDriveify is your premium partner.
              </p>
            </div>
          
            <div className="hidden lg:flex justify-center items-center relative">
                 <img src="https://i.pinimg.com/1200x/ee/dc/79/eedc79c7a80fec3048983cef468e7191.jpg" alt="3D Car" className="w-full max-w-lg object-contain z-10 relative mix-blend-multiply" />
            </div>
          </div>

          <div className="mt-16 flex flex-col md:flex-row flex-nowrap justify-center items-center gap-4 overflow-x-auto pb-4">
            <button 
              id="tab-btn-driving"
              onClick={() => setActiveTab('driving')}
              className={`whitespace-nowrap px-6 sm:px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                activeTab === 'driving' 
                  ? 'bg-red-700 hover:bg-red-800 text-white shadow-lg border-transparent shadow-red-700/20' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-red-750 hover:border-red-500/30 hover:bg-red-50/30'
              }`}
            >
              LEARN DRIVING
            </button>
            <button 
              id="tab-btn-rent"
              onClick={() => setActiveTab('rent')}
              className={`whitespace-nowrap px-6 sm:px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                activeTab === 'rent' 
                  ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg border-transparent shadow-slate-900/20' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              PASSIVE RENT PIPELINE
            </button>
            <button 
              id="tab-btn-sale"
              onClick={() => setActiveTab('sale')}
              className={`whitespace-nowrap px-6 sm:px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                activeTab === 'sale' 
                  ? 'bg-red-950 hover:bg-red-900 text-white shadow-lg border-transparent shadow-red-950/20' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-905 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              LIST CAR FOR SALE
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeTab === 'driving' && (
          <motion.div
            key="driving-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {/* SECTION A: Driving School Hub */}
            <section id="driving-school" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-red-700">Section A</span>
            <h2 className="text-3.5xl sm:text-4xl font-black text-slate-900 mt-1 mb-3">
              Professional Driving Academy
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              Premium licensed programs tailored to all skill levels with dual-clutch cars, flexible daily timings, and expert matching.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:border-red-100 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Course Image */}
                    <div className="relative aspect-video bg-gray-50 overflow-hidden group">
                      <img 
                        src={pkg.carImage} 
                        alt={pkg.courseTitle} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">
                        Official Track
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-black text-slate-900 mb-2 leading-none">{pkg.courseTitle}</h3>
                      <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6">{pkg.courseDescription}</p>

                      {/* Course Fee Badge inside Service layout */}
                      <div className="bg-red-50 text-red-850 p-4 rounded-xl flex items-center justify-between mb-6 border border-red-100/50">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-red-700">Course Fee</span>
                        <div className="text-right">
                          <span className="text-2xl font-black font-sans leading-none">{parseInt(pkg.courseFee).toLocaleString()}</span>
                          <span className="text-[10px] font-bold ml-1">PKR Only</span>
                        </div>
                      </div>

                      {/* Service Spec Bullet Checkpoints */}
                      <div className="space-y-3 ps-1">
                        {pkg.lessonDuration && (
                          <div className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0" />
                            <span>{pkg.lessonDuration}</span>
                          </div>
                        )}
                        {pkg.dailyTime && (
                          <div className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0" />
                            <span>{pkg.dailyTime}</span>
                          </div>
                        )}
                        {pkg.theoryDuration && (
                          <div className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0" />
                            <span>{pkg.theoryDuration}</span>
                          </div>
                        )}
                        {pkg.coursePeriod && (
                          <div className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0" />
                            <span>{pkg.coursePeriod}</span>
                          </div>
                        )}
                        {pkg.additionalTime && (
                          <div className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-red-700 shrink-0" />
                            <span>{pkg.additionalTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button 
                      onClick={() => scrollToContact(
                        'Learn Driving / Course Inquiry', 
                        `Hi GoDriveify Team, I am extremely interested in enrolling in your "${pkg.courseTitle}" driving program which costs PKR ${parseInt(pkg.courseFee).toLocaleString()}/-. Please guide me on scheduling daily slots.`
                      )}
                      className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer text-center block"
                    >
                      Book This Course
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-slate-400 font-medium">
                Syncing premium driving courses...
              </div>
            )}
          </div>
        </div>
      </section>
          </motion.div>
        )}

        {activeTab === 'rent' && (
          <motion.div
            key="rent-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {/* SECTION B: Rent Your Car */}
            <section id="rent-car" className="py-24 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-red-700">Section B</span>
            <h2 className="text-3.5xl sm:text-4xl font-black text-slate-900 mt-1 mb-3">
              Passive Income Rental Pipeline
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              Turn your parked, inactive vehicle into consistent daily or monthly revenue with our verified multi-vendor pipeline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-red-50 text-red-700 rounded-xl flex items-center justify-center font-extrabold text-sm mb-4">
                  01
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">Register Your Vehicle</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  List your car by keying in model, pictures, and official documents. Our executive squad verifies your files instantly.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-red-50 text-red-700 rounded-xl flex items-center justify-center font-extrabold text-sm mb-4">
                  02
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">Trusted Verification</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  We check your vehicle mechanical health, AC function, and suspension parameters to secure official premium certifications.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-red-50 text-red-700 rounded-xl flex items-center justify-center font-extrabold text-sm mb-4">
                  03
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">Receive Bookings</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Your car sits live on Faisalabad's highest traffic rental page. Booking requests flow instantly to your registered WhatsApp.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-red-50 text-red-700 rounded-xl flex items-center justify-center font-extrabold text-sm mb-4">
                  04
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">Guaranteed Earnings</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Earn up to PKR 150,000/month. Enjoy guaranteed security deposits, clear legal contracts, and robust tracing checks.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-md text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">Got an Inactive Sedan or Hatchback in Faisalabad?</h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-6 max-w-xl mx-auto">
              Our registered platform vendors enjoy full support, digital tracking, and background-vetted premium clients. Fill in the inquiry form below or launch our instant onboarding portal.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={handleOnboardCarModal}
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Launch Onboarding Portal
              </button>
              <button 
                onClick={() => scrollToContact(
                  'Rent My Vehicle out',
                  'Hello, I want to list my vehicle for rent. Please guide me regarding verification steps, rental income parameters, and mechanical checks.'
                )}
                className="bg-slate-900 hover:bg-slate-850 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Inquire For Renting out
              </button>
            </div>
          </div>
        </div>
      </section>
          </motion.div>
        )}

        {activeTab === 'sale' && (
          <motion.div
            key="sale-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {/* SECTION C: List Your Car for Sale */}
            <section id="sell-car" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-red-700">Section C</span>
            <h2 className="text-3.5xl sm:text-4xl font-black text-slate-900 mt-1 mb-3">
              Zero-Hassle Direct Car Sales
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              List your car directly with zero-commission stress. Sell your ride inside Faisalabad with maximum executive transparency.
            </p>
          </div>

          {/* Clean Executive Minimalist Section */}
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              {/* Premium Bullet Points with Catchy AI Sales Copy */}
              <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 inline-block">
                <span className="text-xs font-extrabold uppercase tracking-wider text-red-800 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-red-800" /> Premium Direct Trade Offer
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 leading-tight">
                Skip the Dealer Games. <br />
                Flip Your Car For Maximum Value Within 48 Hours.
              </h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Selling your car through brick-and-mortar showrooms or unregulated classifieds is tiring. Shady agents, low-ball dealer offers, and hundreds of useless inquiries waste your precious weekends. 
              </p>
              <p className="text-slate-650 font-bold text-sm leading-relaxed border-l-4 border-red-700 pl-4 bg-slate-50 py-3 rounded-r-xl">
                "Our technology lists your vehicle directly to highly serious buyers with zero directory charge, handles complete document transfer verification, and guarantees instant escrow payments."
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">No Dealer Commissions</h5>
                    <p className="text-[11px] text-slate-400 font-medium">Keep 100% of your selling price, transparent & direct.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Professional Photography</h5>
                    <p className="text-[11px] text-slate-400 font-medium">We catalog and render high-resolution photos of your ride.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Vetted Genuine Buyers</h5>
                    <p className="text-[11px] text-slate-400 font-medium">No spam, only verified, serious corporate offers managed by us.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Safe Title Transfer Escrow</h5>
                    <p className="text-[11px] text-slate-400 font-medium">Full bank security and biometrics paperwork assistance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Static Interactive Widget for Sales Stats */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200/50 p-6 sm:p-8 rounded-3xl relative">
              <div className="absolute -top-3 -right-3 bg-red-700 text-white font-bold text-[10px] tracking-widest px-3 py-1 rounded-full shadow-md uppercase">
                DIRECT SELLING
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-700" /> Executive Metrics
              </h4>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average Selling Time</span>
                    <span className="text-lg font-black text-slate-900 leading-none">42 Hours</span>
                  </div>
                  <span className="text-xs bg-green-50 text-green-700 font-extrabold px-2.5 py-1 rounded-md">92% faster</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Dealer Commission Saved</span>
                    <span className="text-lg font-black text-slate-900 leading-none">PKR 50,000+</span>
                  </div>
                  <span className="text-xs bg-green-50 text-green-700 font-extrabold px-2.5 py-1 rounded-md">Save Lakhs</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Verified Active Buyers</span>
                    <span className="text-lg font-black text-slate-900 leading-none">4,120+ Users</span>
                  </div>
                  <span className="text-xs bg-red-50 text-red-750 font-extrabold px-2.5 py-1 rounded-md">Live Cash Offers</span>
                </div>
              </div>

              <button 
                onClick={() => scrollToContact(
                  'List My Vehicle for Selling',
                  'Dear GoDriveify Team, I am looking to list my vehicle for sale. Detail: [Insert model, year, and demand here]. Please arrange a certified mechanical inspection session.'
                )}
                className="w-full mt-8 bg-slate-900 hover:bg-slate-850 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer text-center block"
              >
                List Your Ride For Sale
              </button>
            </div>
          </div>
        </div>
      </section>
          </motion.div>
        )}
      </AnimatePresence>

      <Newsletter />

      {/* BOTTOM INQUIRY FORM */}
      <section ref={contactFormRef} className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-red-700" /> Corporate Inquiry Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-none mb-4">
              Select Your Service Interest
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
              Fill in the form below. Our customer concierge matches your intent within 30 minutes to route you directly into our secure pipeline.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-red-700" />
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Muhammad Raza" 
                        className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm font-medium"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Father's Name *
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Malik Muhammad Ilyas" 
                        className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm font-medium"
                        value={formData.fatherName}
                        onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        Email Address (Optional)
                      </label>
                      <input 
                        type="email" 
                        placeholder="e.g. name@domain.com" 
                        className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm font-medium"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                        WhatsApp Number *
                      </label>
                      <input 
                        required
                        type="tel" 
                        placeholder="e.g. 03097666928" 
                        className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm font-mono font-bold"
                        value={formData.whatsappNumber}
                        onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* MANDATORY STYLED HTML DROPDOWN FIELD INQUIRY TYPE */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select 
                      required
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-white transition text-xs sm:text-sm font-extrabold text-slate-900 cursor-pointer"
                      value={formData.inquiryType}
                      onChange={e => {
                        const val = e.target.value;
                        setFormData({ ...formData, inquiryType: val });
                        if (val === 'Learn Driving / Course Inquiry') {
                          setActiveTab('driving');
                        } else if (val === 'Rent My Vehicle out') {
                          setActiveTab('rent');
                        } else if (val === 'List My Vehicle for Selling') {
                          setActiveTab('sale');
                        }
                      }}
                    >
                      <option value="Learn Driving / Course Inquiry">Learn Driving / Course Inquiry</option>
                      <option value="Rent My Vehicle out">Rent My Vehicle out</option>
                      <option value="List My Vehicle for Selling">List My Vehicle for Selling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                      Message / Special Queries *
                    </label>
                    <textarea 
                      required
                      rows={4} 
                      placeholder="Type details such as desired timing, transmission mode, vehicle configuration registration year or initial sale demand value..." 
                      className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm font-medium resize-none leading-relaxed"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-semibold leading-relaxed text-slate-500 flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4.5 h-4.5 text-red-700 shrink-0 mt-0.5" />
                    <p>
                      By submitting or listing, you authorize GoDriveify support to review your registered assets and reach out directly at the WhatsApp number specified under Pakistani regulatory biometrics checks.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-red-700 hover:bg-red-800 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-md"
                  >
                    Submit Corporate Inquiry
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Inquiry Registered Successfully!</h3>
                  <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">
                    Your Ticket ID is: <span className="text-red-700 font-mono font-extrabold">{submissionTicketId}</span>
                  </p>

                  <p className="text-slate-650 text-xs sm:text-sm font-semibold max-w-md mx-auto mt-4 leading-relaxed bg-slate-50 p-4 border rounded-2xl">
                    We have logged your request under <strong className="text-slate-900 font-black">"{formData.inquiryType}"</strong>. Our Faisalabad support agents are prepping custom schedules or evaluations for you.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <button 
                      onClick={handleWhatsAppRedirect}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                    >
                      Resume On WhatsApp Instantly
                    </button>
                    
                    <button 
                      onClick={handleResetForm}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-750 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
}
