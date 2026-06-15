import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollReveal } from '../components/ScrollReveal';
import { ShieldCheck, Tag, Car, MapPin, Gauge, Search, Fuel, Calendar, Phone, CheckCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CarSalePage() {
  const [saleCars, setSaleCars] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');

  useEffect(() => {
    // Initial fetch
    const loadSaleCars = () => {
      const stored = localStorage.getItem('sale_cars');
      if (stored) {
        setSaleCars(JSON.parse(stored));
      }
    };
    
    loadSaleCars();

    // Listen for cross-tab updates or in-app custom event
    const handleStorageChange = () => loadSaleCars();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sale_cars_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sale_cars_updated', handleStorageChange);
    };
  }, []);

  const getWhatsAppLink = (car: any) => {
    const text = `Assalam-o-Alaikum, I am highly interested in buying your ${car.name} (Price: PKR ${car.rentPrice}) that I saw listed on GoDriveify. Is this vehicle still available for purchase? Please share more details.`;
    return `https://wa.me/${car.ownerPhone}?text=${encodeURIComponent(text)}`;
  };

  // Get unique lists for filters
  const cities = ['All', ...Array.from(new Set(saleCars.map(car => car.city || 'Faisalabad')))];
  const transmissions = ['All', ...Array.from(new Set(saleCars.map(car => car.transmission || 'Automatic')))];

  // Filtering Logic
  const filteredCars = saleCars.filter(car => {
    const matchesSearch = car.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'All' || car.city === selectedCity;
    const matchesTrans = selectedTransmission === 'All' || car.transmission === selectedTransmission;
    return matchesSearch && matchesCity && matchesTrans;
  });

  return (
    <div className="font-sans text-slate-800 bg-[#fafafa] min-h-screen">
      <Navbar />

      {/* Hero Header Banner */}
      <section className="relative pt-36 pb-24 bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-950/50 via-slate-900 to-black z-0"></div>
        {/* Subtle decorative background patterns */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal direction="down">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Direct Owner Marketplace
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-6 tracking-tight leading-tight">
              Premium Verified <span className="text-red-500 bg-clip-text">Cars For Sale</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium mb-10 leading-relaxed">
              Buy your next vehicle directly from trusted local owners. ZERO commission, transparent listings, and immediate WhatsApp response.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Search and Filters Segment */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-gray-150 shadow-xl shadow-slate-200/50 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-4 items-end">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Search Car Model</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="e.g. Honda Civic, Toyota Corolla..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-semibold text-slate-800"
                />
              </div>
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Filter by City</label>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-semibold text-slate-700"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Transmission Dropdown */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Transmission</label>
              <select 
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-semibold text-slate-700"
              >
                {transmissions.map((trans) => (
                  <option key={trans} value={trans}>{trans}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200/60">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-950 flex items-center gap-3">
              <Car className="w-7 h-7 text-red-650" /> Featured Active Units ({filteredCars.length})
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wide">Handpicked & directly uploaded by verified sellers</p>
          </div>
          <div className="w-16 h-1.5 bg-red-600 rounded-full hidden sm:block"></div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <Car className="w-16 h-16 text-slate-350 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">No matching vehicles found.</h3>
            <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
              Try adjusting your search query, or change some filter criteria to expand your exploration.
            </p>
            {(searchQuery || selectedCity !== 'All' || selectedTransmission !== 'All') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('All');
                  setSelectedTransmission('All');
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-5 py-2.5 text-xs font-bold transition uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, idx) => (
              <ScrollReveal direction="up" delay={idx * 0.08} key={car.id}>
                <div className="bg-white rounded-[24px] overflow-hidden border border-slate-200/80 shadow-xl shadow-slate-200/30 group flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/5 hover:border-red-500/20">
                  
                  {/* Photo area with status badge overlay */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-950 shrink-0">
                    <img 
                      src={car.images && car.images.length > 0 ? car.images[0] : car.imageUrl} 
                      alt={car.name || 'Car Image'} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    
                    {/* Top action flags */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <div className="bg-emerald-600 text-white px-3 py-1.5 rounded-full font-black text-[10px] shadow-lg tracking-wider uppercase flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-white" />
                        Verified Active
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md text-white px-2.5 py-1.5 rounded-full font-bold text-[10px] shadow-lg tracking-widest uppercase flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-red-500" />
                      {car.city}
                    </div>

                    {/* Elegant footer fade gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-4">
                      <div className="flex justify-between items-center w-full">
                        <span className="font-sans text-[11px] font-black uppercase text-red-400 tracking-widest bg-red-500/15 px-2 py-0.5 rounded border border-red-500/20">
                          {car.fuelType || 'Petrol'}
                        </span>
                        <span className="font-mono text-white text-[10px] font-bold opacity-80">
                          {car.registrationNumber ? `Reg: ${car.registrationNumber}` : 'Reg Portal Verified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info Panel */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white">
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight tracking-tight group-hover:text-red-650 transition">
                        {car.name}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-1">Listed by Direct Owner: {car.ownerName}</p>
                    </div>

                    <div className="border-t border-b border-slate-100 py-3 mb-5 flex items-center justify-between">
                      <div className="text-xs uppercase font-extrabold text-slate-400">Asking Price</div>
                      <div className="text-2xl font-black font-mono text-red-650 flex items-center gap-1.5 tracking-tight">
                        <span className="text-xs font-black text-red-500">PKR</span> {car.rentPrice}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 flex items-center gap-2.5">
                        <Gauge className="w-4 h-4 text-slate-450 shrink-0" />
                        <div className="truncate">
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Gearbox</p>
                          <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wide truncate">{car.transmission}</p>
                        </div>
                      </div>
                      <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-slate-450 shrink-0" />
                        <div className="truncate">
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Owner's City</p>
                          <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wide truncate">{car.ownerCity || car.city}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mb-8 line-clamp-3 leading-relaxed flex-grow italic">
                      " {car.description || 'No description provided by the owner. Please contact them directly for full service or mechanical history.'} "
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100/80 flex flex-col gap-2.5">
                      <a 
                        href={getWhatsAppLink(car)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3.5 font-bold transition-all text-xs sm:text-sm uppercase tracking-widest shadow-md shadow-emerald-100 hover:shadow-lg hover:shadow-emerald-200/50 cursor-pointer transform active:scale-98"
                      >
                        <Phone className="w-4 h-4 fill-white" /> Contact Seller via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Guide details banner */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <CheckCircle className="w-5 h-5 text-red-500" />
              </div>
              <h4 className="text-base font-bold">100% Commission-free</h4>
              <p className="text-xs text-slate-400 leading-relaxed">No dealer commission or service charges. Talk directly with owners and settle your own terms of transaction.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <ShieldCheck className="w-5 h-5 text-red-500" />
              </div>
              <h4 className="text-base font-bold">Verified Registrations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Admin staff reviews registration documentation and verified active status of lists to ensure high security of leads.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <HelpCircle className="w-5 h-5 text-red-500" />
              </div>
              <h4 className="text-base font-bold">Want to Sell Your Car?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Instantly post your car by clicking the <strong>Apply Now</strong> button in the navigation header, select "Sale", and watch calls pour in.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
