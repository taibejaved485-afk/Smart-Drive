import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, Sparkles, MessageSquare, Award, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-28 md:pb-12 relative overflow-hidden border-t border-white/5">
      {/* Background looping video with mask */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-75"
        >
          <source src="/footer-section.mp4" type="video/mp4" />
        </video>
        {/* Ambient Dark Gradients to keep edge boundaries soft while leaving the main visual area highly clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-transparent to-slate-950/95" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/50 to-slate-950/90" />
      </div>

      {/* Premium Ambient Lights & Glassy Grid Overlays */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-[#FF7112]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-12 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Middle Footer: 4-Column Professional Resource Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Legacy Brand & Premium Status Statement */}
          <div className="space-y-6">
            <div>
              <Link to="/" className="flex items-center group select-none">
                <div className="font-display tracking-tighter text-2xl font-black flex items-center">
                  <span className="text-[#FF7112]">Go</span>
                  <span className="text-white">Driveify</span>
                </div>
              </Link>
            </div>
            
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-medium">
              Transforming raw beginners into defensive, fully certified champions across Punjab since 2018. Over 4,500+ licensed graduates.
            </p>

            <div className="flex items-center gap-2.5 bg-white/5 border border-white/5 p-3 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-[#FF7112]/90 shrink-0" />
              <div>
                <p className="text-[10px] uppercase font-black text-white leading-none">NHA Criteria Approved</p>
                <p className="text-[9px] text-slate-500 mt-0.5">Government standard vehicle tracks</p>
              </div>
            </div>

            {/* Premium Social Handles Matrix */}
            <div className="flex gap-2.5 pt-1">
              {[
                { icon: Facebook, href: "https://www.facebook.com/GoDriveify/", label: "Facebook" },
                { icon: Twitter, href: "https://x.com/godriveify?s=11", label: "Twitter" },
                { icon: Instagram, href: "https://www.instagram.com/godriveify/", label: "Instagram" },
                { icon: Youtube, href: "https://www.youtube.com/@godriveify", label: "YouTube" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-slate-900 border border-slate-800 hover:border-[#FF7112]/45 text-slate-400 hover:text-[#FF7112]/90 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-red-550/10 hover:scale-110 cursor-pointer"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Comprehensive Training Programs */}
          <div className="space-y-5">
            <h4 className="text-white font-extrabold tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF7112] rounded-full" /> Academy Courses
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              {[
                { title: "Basic Driving Course" },
                { title: "Standard Driving Course" },
                { title: "Premium Driving Course" },
                { title: "Manual Transmission Mastery" },
                { title: "Automatic Sedan Training" }
              ].map((item, idx) => (
                <li key={idx} className="group">
                  <Link to="/pricing" className="text-slate-400 hover:text-[#FF7112] transition-colors duration-300 flex items-center gap-2 pointer-events-auto">
                    <ArrowRight className="w-3 h-3 text-slate-605 group-hover:text-[#FF7112] group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                    <span className="font-semibold">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation & Safe Resources */}
          <div className="space-y-5">
            <h4 className="text-white font-extrabold tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF7112]/100 rounded-full" /> Academy Links
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              {[
                { title: "About Our Academy", path: "/about" },
                { title: "Course Packages & Fees", path: "/pricing" },
                { title: "Our Premium Services", path: "/services" },
                { title: "Rental Car Marketplace", path: "/rentals" },
                { title: "Defensive Driving Blog", path: "/blog" },
                { title: "FAQ Guidance", path: "/faq" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-slate-400 hover:text-[#FF7112]/90 transition-colors duration-300 flex items-center gap-2 font-semibold">
                    <ArrowRight className="w-3 h-3 text-[#E05A00]" /> {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Coordinates & Active Campus */}
          <div className="space-y-5">
            <h4 className="text-white font-extrabold tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF7112]/100 rounded-full" /> Active Operations
            </h4>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-slate-900 border border-slate-800 text-[#FF7112]/90 rounded-lg shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-0.5">Helpline Support</span>
                  <a href="tel:03097666928" className="font-mono text-white hover:text-[#FF7112]/90 font-bold transition-colors">
                    03097666928
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-slate-900 border border-slate-800 text-[#FF7112]/90 rounded-lg shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-0.5">Corporate Email</span>
                  <a href="mailto:info@godriveify.com" className="text-slate-305 hover:text-[#FF7112]/90 transition-colors font-medium">
                    info@godriveify.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-slate-900 border border-slate-800 text-[#FF7112]/90 rounded-lg shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block mb-0.5">Primary Campus</span>
                  <address className="text-slate-400 not-italic font-bold text-xs leading-relaxed">
                    Millat Road, Millat Town, Faisalabad
                  </address>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Footer: Copyrights & Trust Architecture */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full sm:w-auto">
            <p className="font-medium">&copy; {new Date().getFullYear()} GoDriveify. All rights reserved.</p>
            <span className="hidden sm:inline text-white/10">|</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 py-1 px-3 rounded-full border border-white/5 shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF7112]/90" />
              <span className="font-bold">Accredited Driving Academy</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-slate-500 bg-slate-900 border border-slate-800 py-1.5 px-4 rounded-full mr-0 md:mr-20 xl:mr-20 2xl:mr-0 shadow-md">
            <Link to="/admin" className="hover:text-white transition-colors uppercase font-bold flex items-center gap-1.5">
              Admin Portal
            </Link>
            <div className="w-px h-3 bg-slate-700"></div>
            <span className="text-[9px] uppercase font-bold text-emerald-400/90 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              SYS_V1.2.0
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
