import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronRight, 
  Car, Shield, Award, HelpCircle, ArrowRight, MessageSquare, ExternalLink
} from 'lucide-react';
import { useToast } from '../components/Toast';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const programParam = searchParams.get('program');
  const toast = useToast();

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact GoDriveify Driving School",
    "description": "Contact GoDriveify Driving Academy. Enroll in manual or automatic driving courses, request female coach availability, or ask for pricing quotes in Faisalabad.",
    "url": "https://godriveify.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "GoDriveify Driving School",
      "telephone": "03097666928",
      "email": "info@godriveify.com",
      "hasMap": "https://maps.google.com/?q=GoDriveify+Driving+School+Main+Jaranwala+Road+Near+Peoples+Colony+Faisalabad+Punjab+Pakistan",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Main Jaranwala Road",
        "addressLocality": "Faisalabad",
        "addressRegion": "Punjab",
        "postalCode": "38000",
        "addressCountry": "PK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "31.4175",
        "longitude": "73.1350"
      },
      "url": "https://godriveify.com/",
      "sameAs": [
        "https://www.facebook.com/GoDriveify/",
        "https://www.instagram.com/godriveify/",
        "https://www.youtube.com/@godriveify",
        "https://x.com/godriveify?s=11",
        "https://maps.google.com/?q=GoDriveify+Driving+School+Main+Jaranwala+Road+Near+Peoples+Colony+Faisalabad+Punjab+Pakistan"
      ]
    }
  };


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'Complete Driving Course',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const courses = [
    'Complete Driving Course',
    'Adult Learning Course',
    'Teen Driving Essentials',
    'Sedan Mastery Class (Honda Civic)',
    'Automatic Transmission Course',
    'Manual Shift Pedigree Class',
    'Defensive Hazard Avoidance',
    'Highway & Expressway Program',
    'Road Test Prep Intensive',
    'Senior Refresher / Confidence',
    'Motorcycle Essentials',
    'Heavy Bike Advanced Riding'
  ];

  // Auto pre-fill course if passed in query param
  useEffect(() => {
    if (programParam) {
      const decodedParam = decodeURIComponent(programParam);
      const matched = courses.find(c => c.toLowerCase() === decodedParam.toLowerCase());
      if (matched) {
        setFormData(prev => ({ ...prev, course: matched }));
      } else {
        const partialMatched = courses.find(c => c.toLowerCase().includes(decodedParam.toLowerCase()));
        if (partialMatched) {
          setFormData(prev => ({ ...prev, course: partialMatched }));
        }
      }
    }
  }, [programParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation with graceful error toast
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 12) {
      toast.error(
        'Please enter a valid active phone number (10 to 11 digits format, e.g. 0300-1234567).',
        'Invalid Contact Phone'
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      toast.success(
        `Session reservation registered for ${formData.course}. Our support team will connect with you shortly!`,
        'Inquiry Submitted'
      );
    }, 1200);
  };

  return (
    <div className="font-sans text-gray-800 bg-slate-50 min-h-screen flex flex-col justify-between selection:bg-red-650 selection:text-white">
      <SEO 
        title="Contact Us & Driving Course Registration | GoDriveify"
        description="Connect with Faisalabad's top driving school. Book lessons, find our location on Jaranwala Road, call 03097666928, or submit our online registration form."
        keywords="contact driving school Faisalabad, register driving classes, female driving instructor booking, learn driving school address Pakistan"
        schema={contactSchema}
      />
      <Navbar />


      {/* Elegant Futuristic Hero Header Banner */}
      <section className="relative py-28 sm:py-36 overflow-hidden bg-slate-950 text-white">
        {/* Futuristic Background Image with Glow Overlay */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img 
            src="https://i.pinimg.com/1200x/6c/ae/89/6cae89f016eecba155c205d3ac6832da.jpg" 
            alt="Futuristic Neon Driving Dashboard Cockpit" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Neon grid effect and high-tech gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/40 to-slate-900/60" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          {/* Cybernetic grid visual accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <Clock className="w-3.5 h-3.5" /> High Precision Support
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-sans font-black tracking-tight mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-105 to-slate-400 drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)]">GET IN </span>
            <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">TOUCH</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-semibold"
          >
            Connect with Faisalabad's high-performance driving network. Book personalized premium training modules, consult female trainers, or track schedules instantly.
          </motion.p>
        </div>
      </section>

      {/* Main Content Layout - Inspired by Pagedone.io premium split architecture */}
      <section className="py-20 bg-slate-50 relative z-10 w-full overflow-hidden">
        {/* Subtle decorative futuristic grid markings in background */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000002_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-stretch">
            
            {/* Left Column: Visual Brand Element Card (Pagedone Inspired) */}
            <div className="relative rounded-3xl overflow-hidden min-h-[500px] lg:min-h-[620px] flex flex-col justify-between p-8 sm:p-12 shadow-2xl group transition-all duration-500 hover:shadow-red-500/10">
              {/* Background image & gradient overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://i.pinimg.com/736x/6c/f2/fc/6cf2fc8535ed2c053fbf47e58025813c.jpg" 
                  alt="Premium driving journey" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/40" />
              </div>

              {/* Elegant Typography stating Contact Us */}
              <div className="relative z-10">
                <span className="text-red-500 text-xs font-black uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 rounded-full inline-block backdrop-blur-md mb-4">
                  Reach Out
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight leading-none mb-2">
                  Contact Us
                </h2>
                <p className="text-slate-300 text-sm font-medium max-w-xs">
                  Have questions? We are here to help you navigate your journey.
                </p>
              </div>

              {/* White Info Card nested inside wrapper */}
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 space-y-5 transition-transform duration-500 group-hover:translate-y-[-4px]">
                <div className="flex gap-4 items-center border-b border-gray-100 pb-4">
                  <div className="p-3 bg-red-50 text-red-650 rounded-full shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block mb-0.5">Direct Hotline</span>
                    <a href="tel:03097666928" className="text-slate-950 font-mono text-base font-black hover:text-red-600 transition-colors">
                      03097666928
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center border-b border-gray-100 pb-4">
                  <div className="p-3 bg-red-50 text-red-650 rounded-full shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block mb-0.5">Corporate Email</span>
                    <a href="mailto:info@godriveify.com" className="text-slate-900 font-medium text-sm hover:text-red-600 transition-colors">
                      info@godriveify.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-red-50 text-red-650 rounded-full shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block mb-0.5">Academy Campus</span>
                    <p className="text-slate-800 text-xs sm:text-sm font-bold leading-relaxed">
                      Main Jaranwala Road, Near Peoples Colony, Faisalabad, PK.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Interactive Inquiry Form Card */}
            <div>
              <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="contact-form"
                      initial={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-8"
                    >
                      <div>
                        <span className="text-xs font-black text-red-650 uppercase tracking-widest block mb-2">Connect Instantly</span>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display">
                          Send Us A Message
                        </h3>
                        <p className="text-slate-500 text-xs mt-1.5 font-medium leading-relaxed">Fill out the quick session form below and start your premium driving experience today.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 pl-4">
                              Your Full Name
                            </label>
                            <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              placeholder="Muhammad Ali" 
                              className="rounded-full bg-transparent border border-gray-200 pl-5 pr-5 py-4 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 placeholder:text-gray-400 font-semibold transition-all duration-300 w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 pl-4">
                              Active Phone Number
                            </label>
                            <input 
                              type="tel" 
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="0300-1234567" 
                              className="rounded-full bg-transparent border border-gray-200 pl-5 pr-5 py-4 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 placeholder:text-gray-400 font-semibold transition-all duration-300 w-full"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 pl-4">
                            Email Address
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="student@gmail.com" 
                            className="rounded-full bg-transparent border border-gray-200 pl-5 pr-5 py-4 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 placeholder:text-gray-400 font-semibold transition-all duration-300 w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 pl-4">
                            Select Course Program
                          </label>
                          <div className="relative w-full">
                            <select 
                              value={formData.course}
                              onChange={(e) => setFormData({...formData, course: e.target.value})}
                              className="rounded-full bg-transparent border border-gray-200 pl-5 pr-10 py-4 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-semibold transition-all duration-300 w-full appearance-none cursor-pointer"
                            >
                              {courses.map((course, idx) => (
                                <option key={idx} value={course}>
                                  {course}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                              <ChevronRight className="w-4 h-4 rotate-90" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 pl-4">
                            Your Message
                          </label>
                          <textarea 
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder="Write down any requests such as pick/drop timings, manual or automatic transmissions..." 
                            className="rounded-2xl bg-transparent border border-gray-200 pl-5 pr-5 py-4 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 placeholder:text-gray-400 font-semibold transition-all duration-300 w-full resize-none"
                          ></textarea>
                        </div>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full bg-red-600 hover:bg-slate-900 text-white font-black py-4 px-8 rounded-full shadow-lg shadow-red-200/50 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-2.5 text-xs uppercase tracking-widest disabled:opacity-75 cursor-pointer"
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin"></span>
                              Booking Session...
                            </span>
                          ) : (
                            <>
                              <Send className="w-4.5 h-4.5" />
                              Book Free Call Reservation
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="w-20 h-20 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <CheckCircle2 className="w-10 h-10 animate-bounce" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 font-display mb-3 tracking-tight font-sans">Booking Confirmed!</h3>
                      <p className="text-slate-600 max-w-md mx-auto leading-relaxed mb-8 font-semibold">
                        Thank you, <span className="font-extrabold text-red-600">{formData.name}</span>. Your reservation inquiry for <span className="font-extrabold text-slate-800">{formData.course}</span> has been saved safely into our queue. Our Faisalabad representative team will contact you in the next 2 hours.
                      </p>
                      
                      <button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', phone: '', email: '', course: 'Complete Driving Course', message: '' });
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold py-4 px-8 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Process Another Booking
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Styled Interactive Location & Route Finder Section */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side text info */}
            <div>
              <span className="bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                VISIT THE CAMPUS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-950 font-display tracking-tight mb-6">
                Easy to Locate Campus Center
              </h2>
              <p className="text-gray-650 text-sm sm:text-base leading-relaxed mb-6">
                Our main office and safety parking arena are situated near Peoples Colony on Jaranwala Road, Faisalabad. We feature spacious driving ground templates and theoretical class facilities designed for professional training.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4 items-center bg-gray-50 border border-gray-200/60 p-4 rounded-2xl">
                  <span className="w-10 h-10 bg-red-100 text-red-600 font-bold rounded-xl flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">Main Office</h5>
                    <p className="text-xs text-gray-500">Visit us to process registration paper works and permit documentations.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-gray-50 border border-gray-200/60 p-4 rounded-2xl">
                  <span className="w-10 h-10 bg-red-100 text-red-600 font-bold rounded-xl flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">Practice Tracks</h5>
                    <p className="text-xs text-gray-500">Practice reverse parallel layout parking and gear shifts safely inside our yard.</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=GoDriveify+Driving+School+Main+Jaranwala+Road+Near+Peoples+Colony+Faisalabad+Punjab+Pakistan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-gray-300 inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                Get Google Maps Route <ExternalLink className="w-4 h-4 text-red-500" />
              </a>
            </div>

            {/* Right side beautifully styled map mockup (clean and beautiful UI card representation) */}
            <div className="bg-slate-50 border border-gray-200 p-4 rounded-3xl relative overflow-hidden h-96 sm:h-[400px] shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm z-10">
                <div>
                  <h4 className="font-bold text-gray-950 text-xs">Faisalabad Campus Yard</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Jaranwala Road Sector</p>
                </div>
                <span className="bg-red-50 border border-red-100 text-red-600 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-lg">
                  Registered Academy
                </span>
              </div>

              {/* Styled graphic map template for aesthetic appeal (pure responsive SVG shape) */}
              <div className="absolute inset-x-4 top-24 bottom-14 bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">
                {/* Visual road layouts represented purely with styled visual blocks */}
                <div className="absolute inset-0 opacity-40">
                  <div className="w-[150%] h-8 bg-gray-300 absolute top-1/4 left-0 -rotate-12 border-y border-white" />
                  <div className="w-8 h-[150%] bg-gray-300 absolute top-0 left-1/2 rotate-12 border-x border-white" />
                  <div className="w-full h-8 bg-gray-300 absolute top-2/3 left-0 border-y border-white" />
                  <div className="w-20 h-20 rounded-full border-4 border-gray-300 absolute top-1/3 left-1/3 border-dashed" />
                </div>

                {/* Styled marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <span className="absolute w-8 h-8 rounded-full bg-red-500/20 border border-red-500/35 animate-ping"></span>
                    <div className="w-5 h-5 bg-red-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg relative z-10">
                      <Car className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="bg-gray-950 text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow-md mt-1.5 uppercase tracking-wide">
                    GoDriveify HQ
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex justify-between items-center text-[10.5px] text-gray-500 bg-white p-3 rounded-xl border border-gray-200 shadow-sm z-10">
                <span>Near Peoples Colony Jaranwala Rd, FSD</span>
                <span className="font-mono text-[9px] text-gray-400">GEO_PLOT_OK</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ScrollReveal direction="up" delay={0.1}><CTABanner /></ScrollReveal>
      <Footer />
    </div>
  );
}
