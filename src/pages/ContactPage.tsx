import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronRight, 
  Car, Shield, Award, HelpCircle, ArrowRight, MessageSquare, ExternalLink
} from 'lucide-react';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const programParam = searchParams.get('program');

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact GoDriveify Driving School",
    "description": "Contact GoDriveify Driving Academy. Enroll in manual or automatic driving courses, request female coach availability, or ask for pricing quotes in Faisalabad.",
    "url": "https://godriveify.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "GoDriveify Driving School",
      "telephone": "0300-1115429",
      "email": "trainingdrivingschool@gmail.com",
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="font-sans text-gray-800 bg-slate-50 min-h-screen flex flex-col justify-between selection:bg-red-650 selection:text-white">
      <SEO 
        title="Contact Us & Driving Course Registration | GoDriveify"
        description="Connect with Faisalabad's top driving school. Book lessons, find our location on Jaranwala Road, call 0300-1115429, or submit our online registration form."
        keywords="contact driving school Faisalabad, register driving classes, female driving instructor booking, learn driving school address Pakistan"
        schema={contactSchema}
      />
      <Navbar />


      {/* Elegant Futuristic Hero Header Banner */}
      <section className="relative py-28 sm:py-36 overflow-hidden bg-slate-950 text-white">
        {/* Futuristic Background Image with Glow Overlay */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000" 
            alt="Futuristic Neon Driving Dashboard Cockpit" 
            className="w-full h-full object-cover opacity-65 scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Neon grid effect and high-tech gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-slate-900" />
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

      {/* Main Content Layout */}
      <section className="py-20 bg-slate-50 relative z-10 w-full overflow-hidden">
        {/* Subtle decorative futuristic grid markings in background */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000002_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Human Centric Details Card */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              
              {/* Quick Contact & Working Hours */}
              <div className="space-y-6">
                <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(239,68,68,0.05)] group">
                  <div className="absolute top-0 left-0 w-1.5 h-0 bg-red-600 group-hover:h-full transition-all duration-300" />
                  <h3 className="text-2xl font-black text-slate-900 mb-6 font-display tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-red-650 rounded-full inline-block"></span>
                    Contact Coordinates
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Address */}
                    <div className="flex gap-4 items-start p-4 rounded-2xl transition-all duration-300 hover:bg-slate-50 border border-transparent hover:border-slate-100">
                      <div className="p-3 bg-red-50 text-red-650 rounded-2xl border border-red-100 shrink-0 shadow-[0_2px_10px_rgba(239,68,68,0.05)]">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block mb-1">Academy Campus</span>
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-bold">
                          Main Jaranwala Road, Near Peoples Colony, Faisalabad, Punjab, Pakistan.
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4 items-start p-4 rounded-2xl transition-all duration-300 hover:bg-slate-50 border border-transparent hover:border-slate-100">
                      <div className="p-3 bg-blue-50 text-blue-605 rounded-2xl border border-blue-100 shrink-0 shadow-[0_2px_10px_rgba(59,130,246,0.05)]">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block mb-1">Direct Helpline</span>
                        <p className="text-slate-950 text-base sm:text-lg font-mono font-black tracking-tight scale-y-105">
                          0300-1115429
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 font-semibold">Instant human dispatch • Mon - Sat</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-4 items-start p-4 rounded-2xl transition-all duration-300 hover:bg-slate-50 border border-transparent hover:border-slate-100">
                      <div className="p-3 bg-green-50 text-green-600 rounded-2xl border border-green-100 shrink-0 shadow-[0_2px_10px_rgba(34,197,94,0.05)]">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block mb-1">Encrypted Mailbox</span>
                        <p className="text-slate-700 text-sm sm:text-base font-mono font-bold">
                          trainingdrivingschool@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Training Hours Card */}
                <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-black text-slate-900 font-display tracking-tight">Active Operation Hours</h4>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </div>
                  
                  <div className="space-y-3.5 text-xs text-slate-600 font-bold">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Monday - Wednesday</span>
                      <span className="text-slate-800 font-black">08:00 AM - 06:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Thursday - Saturday</span>
                      <span className="text-slate-800 font-black">08:00 AM - 06:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Sunday</span>
                      <span className="text-red-650 font-black uppercase tracking-widest">System Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live WhatsApp Assist Callout with custom animated radar ring */}
              <div className="bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10 border border-[#25D366]/20 rounded-3xl p-8 flex items-center justify-between gap-6 relative overflow-hidden group">
                <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-[#25D366]/5 rounded-full blur-lg pointer-events-none" />
                <div className="space-y-1 relative z-10">
                  <h5 className="font-extrabold text-slate-900 text-base">Instant WhatsApp Assist</h5>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">Direct connection to active instructors on campus.</p>
                </div>
                <a 
                  href="https://wa.me/923097666928" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-green-200/50 ring-4 ring-green-600/10 hover:scale-110 active:scale-95 shrink-0 relative z-10 cursor-pointer"
                  aria-label="Direct WhatsApp Support Link"
                >
                  <svg className="w-6 h-6 fill-white text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>

            </div>

            {/* Right Column: Premium Contact Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="contact-form"
                      initial={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="mb-8 border-b border-gray-150 pb-5">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                          <span className="w-2.5 h-2.5 bg-red-650 rounded-full animate-pulse inline-block" />
                          Send Us An Inquiry
                        </h3>
                        <p className="text-slate-400 text-[10px] mt-2 font-black uppercase tracking-widest">LOCK YOUR PREFERRED TIMING SYSTEM slot</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                              Your Full Name
                            </label>
                            <div className="relative rounded-2xl overflow-hidden p-[2px] bg-red-400/40 focus-within:bg-red-500/60 transition-colors">
                              <span className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#dc2626_0%,transparent_15%)]" />
                              <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Muhammad Ali" 
                                className="w-full relative z-10 bg-white rounded-[14px] px-5 py-4 focus:outline-none text-slate-900 text-sm transition-all font-semibold"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                              Active Phone Number
                            </label>
                            <div className="relative rounded-2xl overflow-hidden p-[2px] bg-red-400/40 focus-within:bg-red-500/60 transition-colors">
                              <span className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_3.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#dc2626_0%,transparent_15%)]" />
                              <input 
                                type="tel" 
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="0300-1234567" 
                                className="w-full relative z-10 bg-white rounded-[14px] px-5 py-4 focus:outline-none text-slate-900 text-sm transition-all font-semibold"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                            Email Address
                          </label>
                          <div className="relative rounded-2xl overflow-hidden p-[2px] bg-red-400/40 focus-within:bg-red-500/60 transition-colors">
                            <span className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#dc2626_0%,transparent_15%)]" />
                            <input 
                              type="email" 
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="student@gmail.com" 
                              className="w-full relative z-10 bg-white rounded-[14px] px-5 py-4 focus:outline-none text-slate-900 text-sm transition-all font-semibold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                            Select Preferred Course Program
                          </label>
                          <div className="relative rounded-2xl overflow-hidden p-[2px] bg-red-400/40 focus-within:bg-red-500/60 transition-colors">
                            <span className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_4.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#dc2626_0%,transparent_15%)]" />
                            <div className="relative w-full z-10 bg-white rounded-[14px]">
                              <select 
                                value={formData.course}
                                onChange={(e) => setFormData({...formData, course: e.target.value})}
                                className="w-full bg-transparent px-5 py-4 appearance-none focus:outline-none text-slate-950 text-sm transition-all font-bold cursor-pointer"
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
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
                            How can we help you? (Optional Message)
                          </label>
                          <div className="relative rounded-2xl overflow-hidden p-[2px] bg-red-400/40 focus-within:bg-red-500/60 transition-colors">
                            <span className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#dc2626_0%,transparent_15%)]" />
                            <textarea 
                              rows={4}
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                              placeholder="Write down any requests such as pick/drop timings, manual or automatic transmissions, or specific training parameters..." 
                              className="w-full relative z-10 bg-white rounded-[14px] px-5 py-4 focus:outline-none text-slate-900 text-sm transition-all resize-none font-medium"
                            ></textarea>
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4.5 px-6 rounded-2xl shadow-lg shadow-red-200/50 active:scale-[0.98] hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 text-xs uppercase tracking-widest disabled:opacity-75 cursor-pointer"
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin"></span>
                              Booking Session...
                            </span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
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
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold py-4 px-8 rounded-2xl text-xs uppercase tracking-widest transition-colors cursor-pointer"
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

      <CTABanner />
      <Footer />
    </div>
  );
}
