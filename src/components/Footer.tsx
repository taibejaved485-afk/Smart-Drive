import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter tips!');
  };

  return (
    <footer className="bg-gray-950 text-gray-400 pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Decorative Lights & Shadows */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Pre-footer Call to Action Panel */}
        <div className="bg-gradient-to-r from-red-950/40 via-gray-900/90 to-slate-900/40 border border-white/5 rounded-3xl p-8 sm:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-red-500" /> Start Driving Safely today
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Ready to Master the Driver's Seat?</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Book a custom driving lesson package with professional certified male and female trainers in Faisalabad.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
            <Link 
              to="/programs" 
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-center shadow-lg shadow-red-900/30 transition-all text-sm uppercase tracking-wider"
            >
              Explore Programs
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl text-center transition-all text-sm font-bold uppercase tracking-wider"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity Column */}
          <div className="space-y-6">
            <Link to="/" className="font-display font-black text-3xl text-red-600 flex items-center gap-1 leading-none tracking-tight">
              <span>SMART</span>
              <span className="text-white">DRIVE</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              Transforming raw beginners into safe, fully defensive, and licensed professional drivers across Faisalabad since 2018.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/GoDriveify/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Link"
                  className="w-10 h-10 bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all border border-white/5 hover:border-transparent hover:scale-105"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://x.com/godriveify?s=11" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter Link"
                  className="w-10 h-10 bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all border border-white/5 hover:border-transparent hover:scale-105"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/godriveify/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Link"
                  className="w-10 h-10 bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all border border-white/5 hover:border-transparent hover:scale-105"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.youtube.com/@godriveify" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Link"
                  className="w-10 h-10 bg-white/5 hover:bg-red-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all border border-white/5 hover:border-transparent hover:scale-105"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick & Utility Links */}
          <div className="space-y-5">
            <h4 className="text-white font-extrabold tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Quick Links
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-red-600" /> Home Interface
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-red-600" /> About Our School
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-red-600" /> Lesson Programs
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-red-600" /> Plans & Packages
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-red-600" /> Blog & Safe Driving Tips
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-red-600" /> FAQ Helper Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice & Work Hours */}
          <div className="space-y-5">
            <h4 className="text-white font-extrabold tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Practice Hours
            </h4>
            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-3 text-xs leading-relaxed text-gray-400">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-gray-300">Mon - Sat</span>
                <span className="text-white font-mono">08:00 AM - 06:00 PM</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="font-bold text-gray-300">Sunday</span>
                <span className="text-red-400 uppercase font-bold">Closed (Emergency Only)</span>
              </div>
              <div className="text-[11px] text-gray-500 flex items-start gap-1 pb-1 pt-1">
                <Clock className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>Our schedules remain highly flexible for corporate drive lessons.</span>
              </div>
            </div>
            
            {/* Short Contact Coordination */}
            <div className="space-y-2.5 text-xs">
              <p className="flex items-center gap-2 text-gray-400">
                <Phone className="w-3.5 h-3.5 text-red-500" /> <span className="font-mono">0300 - 1115429</span>
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <Mail className="w-3.5 h-3.5 text-red-500" /> <span>info@tds.edu.pk</span>
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-red-500" /> <span>Faisalabad, Pakistan</span>
              </p>
            </div>
          </div>

          {/* Premium Form Subscriptions info */}
          <div className="space-y-5">
            <h4 className="text-white font-extrabold tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Newsletter Signee
            </h4>
            <p className="text-sm leading-relaxed text-gray-500">
              Receive safe driving advice, traffic regulatory updates, & license mock evaluation tests directly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="Enter email here"
                  className="w-full bg-white/5 text-white border border-white/10 hover:border-white/20 p-3 rounded-xl focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition text-xs font-medium" 
                />
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-1">
                Subscribe Updates <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p>&copy; 2026 Smart Drive. All rights reserved.</p>
            <span className="hidden sm:inline text-white/10">|</span>
            <div className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 py-1 px-2.5 rounded-full border border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>Accredited Driving Academy</span>
            </div>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest text-gray-600">
            <Link to="/admin" className="hover:text-red-500 transition-colors uppercase">Admin Access Portal</Link>
            <span>•</span>
            <span>SYSTEM_V1.1.2_LIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
