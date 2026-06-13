import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Decorative Lights & Shadows */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Identity Column */}
          <div className="space-y-6">
            <Link to="/" className="font-display font-black text-3xl text-red-600 flex items-center gap-1 leading-none tracking-tight">
              <span>GO</span>
              <span className="text-white font-extrabold text-2xl">DRIVEIFY</span>
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
                <Link to="/services" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-red-600" /> Executive Services
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

          {/* Contact Details */}
          <div className="space-y-5">
            <h4 className="text-white font-extrabold tracking-wider uppercase text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Contact Us
            </h4>
            <div className="space-y-2.5 text-xs pt-2">
              <p className="flex items-center gap-2 text-gray-400">
                <Phone className="w-3.5 h-3.5 text-red-500" /> <span className="font-mono">03097666928</span>
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <Mail className="w-3.5 h-3.5 text-red-500" /> <span>info@godriveify.com</span>
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-red-500" /> <span>Faisalabad, Pakistan</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p>&copy; 2026 GoDriveify. All rights reserved.</p>
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
