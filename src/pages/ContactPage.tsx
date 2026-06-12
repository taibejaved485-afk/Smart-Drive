import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
    "name": "Contact Smart Drive Driving School",
    "description": "Contact Smart Drive Driving Academy. Enroll in manual or automatic driving courses, request female coach availability, or ask for pricing quotes in Faisalabad.",
    "url": "https://smartdrivefd.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Smart Drive Driving School",
      "telephone": "0300-1115429",
      "email": "trainingdrivingschool@gmail.com",
      "hasMap": "https://maps.google.com/?q=Smart+Drive+Driving+School+Main+Jaranwala+Road+Near+Peoples+Colony+Faisalabad+Punjab+Pakistan",
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
      "url": "https://smartdrivefd.com/",
      "sameAs": [
        "https://www.facebook.com/GoDriveify/",
        "https://www.instagram.com/godriveify/",
        "https://www.youtube.com/@godriveify",
        "https://x.com/godriveify?s=11",
        "https://maps.google.com/?q=Smart+Drive+Driving+School+Main+Jaranwala+Road+Near+Peoples+Colony+Faisalabad+Punjab+Pakistan"
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
        title="Contact Us & Driving Course Registration | Smart Drive"
        description="Connect with Faisalabad's top driving school. Book lessons, find our location on Jaranwala Road, call 0300-1115429, or submit our online registration form."
        keywords="contact driving school Faisalabad, register driving classes, female driving instructor booking, learn driving school address Pakistan"
        schema={contactSchema}
      />
      <Navbar />


      {/* Elegant Hero Header Banner */}
      <section className="bg-white border-b border-gray-200 py-20 relative overflow-hidden">
        {/* Background Decorative Soft Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-100 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200/60 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <Clock className="w-3.5 h-3.5" /> Fast Response Guaranteed
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 font-display tracking-tight mb-6 animate-fade-in"
          >
            Get In Touch
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-650 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Have any questions or ready to schedule your first driving lesson? Send us a message below, visit our campus, or call us directly. Our instructors are ready to help you get started safely.
          </motion.p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Human Centric Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Quick Contact & Working Hours */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <h3 className="text-2xl font-extrabold text-gray-950 mb-6 font-display">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-red-50 text-red-650 rounded-2xl border border-red-100 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Campus Location</span>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-semibold">
                        Main Jaranwala Road, Near Peoples Colony, Faisalabad, Punjab, Pakistan.
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Call Representative</span>
                      <p className="text-gray-950 text-base sm:text-lg font-mono font-black">
                        0300-1115429
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Available Mon - Sat, 08:00 AM - 06:00 PM</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-green-50 text-green-600 rounded-2xl border border-green-100 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Email Network</span>
                      <p className="text-gray-700 text-sm sm:text-base font-mono font-semibold">
                        info@tds.edu.pk
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Arena Card */}
              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-red-100/30 rounded-full" />
                <h4 className="text-xl font-extrabold text-gray-950 mb-4 font-display">Regular Practice Hours</h4>
                
                <div className="space-y-3.5 text-xs text-gray-600 font-medium">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Monday - Wednesday</span>
                    <span className="text-gray-950 font-bold">08:00 AM - 06:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Thursday - Saturday</span>
                    <span className="text-gray-950 font-bold">08:00 AM - 06:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Sunday</span>
                    <span className="text-red-600 font-bold uppercase">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live WhatsApp Assist Callout */}
            <div className="bg-red-50 border border-red-200/60 rounded-3xl p-8 flex items-center justify-between gap-6">
              <div className="space-y-1">
                <h5 className="font-bold text-gray-950 text-base">Prefer WhatsApp?</h5>
                <p className="text-xs text-gray-600">Get quick consultation coordinates anytime from your mobile screen.</p>
              </div>
              <a 
                href="https://wa.me/923097666928" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-2xl flex items-center justify-center transition-all shadow-md shadow-green-100 ring-4 ring-green-600/10 hover:scale-105 shrink-0"
                aria-label="Contact WhatsApp link"
              >
                <svg className="w-7 h-7 fill-white text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

          </div>

          {/* Right Column: Premium Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between h-full relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="mb-8 border-b border-gray-150 pb-5">
                      <h3 className="text-2xl font-black text-gray-950 font-display tracking-tight">Send Us An Inquiry</h3>
                      <p className="text-gray-500 text-xs mt-1.5 font-bold uppercase tracking-wider">Please fill in details to lock slot</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Your Full Name
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Muhammad Ali" 
                            className="w-full bg-gray-50 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3.5 focus:outline-none text-gray-900 text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Active Phone Number
                          </label>
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="0300-1234567" 
                            className="w-full bg-gray-50 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3.5 focus:outline-none text-gray-900 text-sm transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="student@gmail.com" 
                          className="w-full bg-gray-50 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3.5 focus:outline-none text-gray-900 text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Select Preferred Course Program
                        </label>
                        <div className="relative">
                          <select 
                            value={formData.course}
                            onChange={(e) => setFormData({...formData, course: e.target.value})}
                            className="w-full bg-gray-50 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3.5 appearance-none focus:outline-none text-gray-950 text-sm transition-all"
                          >
                            {courses.map((course, idx) => (
                              <option key={idx} value={course}>
                                {course}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <ChevronRight className="w-4 h-4 rotate-90" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          How can we help you? (Optional Message)
                        </label>
                        <textarea 
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Write down any requests such as pick/drop timings, manual or automatic transmissions, or specific training parameters..." 
                          className="w-full bg-gray-50 border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3.5 focus:outline-none text-gray-900 text-sm transition-all resize-none"
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-red-650 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-red-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-75 cursor-pointer"
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
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-950 font-display mb-3">Booking Confirmed!</h3>
                    <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-8">
                      Thank you, <span className="font-bold text-red-650">{formData.name}</span>. Your reservation inquiry for <span className="font-bold text-gray-900">{formData.course}</span> has been saved safely into our queue. Our Faisalabad representative team will contact you in the next 2 hours.
                    </p>
                    
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', course: 'Complete Driving Course', message: '' });
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Process Another Booking
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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
                href="https://maps.google.com/?q=Smart+Drive+Driving+School+Main+Jaranwala+Road+Near+Peoples+Colony+Faisalabad+Punjab+Pakistan" 
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
                    Smart Drive HQ
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

      <Footer />
    </div>
  );
}
