import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Programs', path: '/programs' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Blog', path: '/blog' },
      { name: 'FAQ', path: '/faq' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="font-display font-bold text-lg text-red-600 flex flex-col items-center">
            <span>TRAINING</span>
            <span className="text-xs tracking-widest text-gray-700">DRIVING SCHOOL</span>
          </div>
          <div className="hidden lg:flex space-x-6 font-sans font-medium text-sm text-gray-700">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="hover:text-red-600 transition tracking-wide text-uppercase">{link.name.toUpperCase()}</Link>
            ))}
          </div>
          <button className="hidden lg:flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-700 transition shadow-md text-sm">
            <Phone className="w-4 h-4" /> 03001115429
          </button>
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white px-4 pt-2 pb-4 space-y-2 border-t font-sans text-sm font-medium text-gray-700">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} className="block hover:text-red-600">{link.name}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
