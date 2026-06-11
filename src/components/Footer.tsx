import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-20 relative border-t border-white/5">
      {/* Sleek top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Logo / Description */}
          <div className="md:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Smart Drive</h2>
            <p className="text-sm leading-relaxed text-gray-500">
              Transforming learners into confident, professional drivers in Faisalabad.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors flex items-center gap-2 font-mono"><span>_</span> Home</Link></li>
              <li><Link to="/programs" className="hover:text-red-500 transition-colors flex items-center gap-2 font-mono"><span>_</span> Programs</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors flex items-center gap-2 font-mono"><span>_</span> About</Link></li>
              <li><Link to="/pricing" className="hover:text-red-500 transition-colors flex items-center gap-2 font-mono"><span>_</span> Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-red-500 transition-colors flex items-center gap-2 font-mono"><span>_</span> FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-red-500 transition-colors flex items-center gap-2 font-mono"><span>_</span> Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm">Contact Hub</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-red-500" /> 0300 - 1115429</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-red-500" /> info@tds.edu.pk</li>
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-red-500" /> Faisalabad, PK</li>
            </ul>
          </div>

          {/* Follow Section */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-sm">Social Link</h4>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-gray-900 rounded-lg hover:bg-red-600 transition-all hover:scale-105"><Facebook className="w-5 h-5 text-white" /></a>
              <a href="#" className="p-3 bg-gray-900 rounded-lg hover:bg-red-600 transition-all hover:scale-105"><Twitter className="w-5 h-5 text-white" /></a>
              <a href="#" className="p-3 bg-gray-900 rounded-lg hover:bg-red-600 transition-all hover:scale-105"><Instagram className="w-5 h-5 text-white" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
          <p>&copy; 2026 Smart Drive. All rights reserved.</p>
          <p className="tracking-widest uppercase">system_v1.0.0_ready</p>
        </div>
      </div>
    </footer>
  );
}
