import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import { CheckCircle2, ChevronDown, Check, MessageSquare } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Reviews from '../components/Reviews';
import OurProcess from '../components/OurProcess';
import SEO from '../components/SEO';

interface PricingCourse {
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

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [courses, setCourses] = useState<PricingCourse[]>([]);
  const contactFormRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    email: '',
    whatsappNumber: '',
    inquiryType: 'Learn Driving / Course Inquiry',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionTicketId, setSubmissionTicketId] = useState('');

  // Smooth scroll to inquiry form
  const scrollToContact = (courseTitle: string, courseFee: string) => {
    setFormData(prev => ({
      ...prev,
      inquiryType: 'Learn Driving / Course Inquiry',
      message: `Hi GoDriveify Team, I am extremely interested in enrolling in your "${courseTitle}" driving program which costs PKR ${parseInt(courseFee).toLocaleString()}/-. Please guide me on scheduling daily slots.`
    }));
    
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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

  useEffect(() => {
    const syncPricingCourses = () => {
      const saved = localStorage.getItem('driving_courses_v3');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
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

    syncPricingCourses();
    window.addEventListener('storage', syncPricingCourses);
    window.addEventListener('driving_courses_updated', syncPricingCourses);

    return () => {
      window.removeEventListener('storage', syncPricingCourses);
      window.removeEventListener('driving_courses_updated', syncPricingCourses);
    };
  }, []);

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "GoDriveify Driving School Lesson Rates",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "10 Days Course Package",
          "description": "Learn professional manual gear control from experienced trainers."
        },
        "price": "25000",
        "priceCurrency": "PKR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "20 Days Course Package",
          "description": "Master driving in our fully automatic modern Civic, ideal for beginners."
        },
        "price": "25000",
        "priceCurrency": "PKR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "1 Month Complete Package",
          "description": "Expert motorcycle sessions to ride heavy sport bike configurations."
        },
        "price": "50000",
        "priceCurrency": "PKR"
      }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Driving School Fees & Lesson Packages | GoDriveify"
        description="Check out our low-cost manual & automatic driving school pricing plans in Faisalabad. Learn in a high-end Honda Civic starting from 25,000 PKR only."
        keywords="driving school fee Faisalabad, car driving class packages, heavy bike license course rates, cheap driving instructor cost, automatic car lesson prices Punjab"
        schema={pricingSchema}
      />
      <Navbar />

      
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-950 text-white overflow-hidden bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gray-950/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Pricing</h1>
          <p className="text-gray-400">Home / Pricing</p>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-red-500 font-bold tracking-widest text-sm mb-4">PRICING PACKAGE</p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-950 mb-8">Choose A Package That Suits Your Needs</h2>
                <p className="text-gray-600 text-lg leading-relaxed">At GoDriveify, we offer a range of driving packages to suit your needs, skill level, and budget. Whether you're a beginner or looking to refine your driving skills, we've got the perfect package for you.</p>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
                {courses.map((pkg, i) => (
                    <motion.div 
                        key={pkg.id || i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-between hover:border-red-100 hover:shadow-2xl hover:shadow-red-50/20 transition-all duration-300"
                    >
                        <div>
                            {/* Course Image frame with zoom hover effect */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 mb-6 group">
                                <img 
                                    src={pkg.carImage || "https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600"} 
                                    alt={pkg.courseTitle} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>

                            <h3 className="text-2xl font-black mb-1.5 text-gray-900 tracking-tight leading-snug">{pkg.courseTitle}</h3>
                            <p className="text-gray-500 mb-6 font-medium text-sm leading-relaxed">{pkg.courseDescription}</p>
                            
                            {/* Professional Pricing Badge */}
                            <div className="bg-red-800 text-white text-3xl font-black py-4 text-center mb-6 rounded-2xl shadow-sm tracking-tight font-sans">
                                {pkg.courseFee}/- <span className="text-xs font-bold font-sans uppercase tracking-widest text-red-200">PKR Only</span>
                            </div>
                            
                            {/* Check bullet parameters from custom admin schema */}
                            <div className="space-y-3 mb-8 text-sm font-semibold text-gray-700">
                                {pkg.lessonDuration && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.lessonDuration}</div>
                                )}
                                {pkg.dailyTime && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.dailyTime}</div>
                                )}
                                {pkg.theoryDuration && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.theoryDuration}</div>
                                )}
                                {pkg.coursePeriod && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.coursePeriod}</div>
                                )}
                                {pkg.additionalTime && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.additionalTime}</div>
                                )}
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => scrollToContact(pkg.courseTitle, pkg.courseFee)}
                            className="w-full text-red-600 border-2 border-red-600 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition uppercase tracking-widest flex justify-center items-center gap-2 cursor-pointer font-sans"
                        >
                            GET STARTED <span className="text-lg">→</span>
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h3>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    {[
                        {q: "1. How Long Does It Take To Complete A Driving Course?", a: "The duration of our courses depends on the package you choose. On average, beginners can complete their course in 2 to 4 weeks, while advanced or refresher courses may take 1 to 2 weeks. We offer flexible scheduling to fit your availability."},
                        {q: "2. Do I Need Any Documents To Start My Driving Lessons?", a: "Yes, you generally need a valid learner's permit. We can guide you through the process of obtaining one if you don't have it yet."},
                        {q: "3. Will You Help Me Prepare For The Driving License Test?", a: "Absolutely! Our comprehensive training includes theory practice, practical skill building, and mock tests to ensure you're fully prepared and confident for the official driving test."}
                    ].map((faq, i) => (
                        <div key={i} className="mb-2 border-b border-gray-100 last:border-0">
                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 font-bold text-lg text-left">
                                {faq.q}
                                <ChevronDown className={`w-5 h-5 transition ${openFaq === i ? 'rotate-180' : ''}`}/>
                            </button>
                            {openFaq === i && <p className="px-6 pb-6 text-gray-600">{faq.a}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <Reviews />
            <OurProcess />
        </div>
      </section>

      {/* BOTTOM INQUIRY FORM */}
      <section id="contact" ref={contactFormRef} className="py-24 bg-slate-50 border-t border-slate-100">
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
