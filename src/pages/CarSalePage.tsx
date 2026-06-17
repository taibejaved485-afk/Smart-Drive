import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollReveal } from '../components/ScrollReveal';
import { ShieldCheck, Tag, Car, MapPin, Gauge, Search, Fuel, Calendar, Phone, CheckCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchSaleCars } from '../lib/supabase';

export default function CarSalePage() {
  const [saleCars, setSaleCars] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');

  useEffect(() => {
    // Initial fetch using Supabase synced fetching
    const loadSaleCars = async () => {
      const data = await fetchSaleCars();
      if (data) {
        setSaleCars(data);
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
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#FF7112]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal direction="down">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF7112]/100/10 border border-[#FF7112]/30 text-[#FF7112]/70 text-xs font-black uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Direct Owner Marketplace
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-6 tracking-tight leading-tight">
              Premium Verified <span className="text-[#FF7112]/90 bg-clip-text">Cars For Sale</span>
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
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none bg-white transition text-xs sm:text-sm font-semibold text-slate-800"
                />
              </div>
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Filter by City</label>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none bg-white transition text-xs sm:text-sm font-semibold text-slate-700"
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
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none bg-white transition text-xs sm:text-sm font-semibold text-slate-700"
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
              <Car className="w-7 h-7 text-[#E05A00]" /> Featured Active Units ({filteredCars.length})
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wide">Handpicked & directly uploaded by verified sellers</p>
          </div>
          <div className="w-16 h-1.5 bg-[#FF7112] rounded-full hidden sm:block"></div>
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
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-red-500/10 hover:border-[#FF7112]/20 group flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2.5 relative">
                  
                  {/* Glowing gradient back-accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] via-transparent to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>

                  {/* Photo Area with modern overlays */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950 shrink-0">
                    <img 
                      src={car.images && car.images.length > 0 ? car.images[0] : car.imageUrl} 
                      alt={car.name || 'Car Image'} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    
                    {/* Corner badge actions */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                      <span className="bg-emerald-600/95 backdrop-blur-md text-white px-3 py-1.5 rounded-full font-black text-[10px] tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                        <ShieldCheck className="w-3.5 h-3.5 text-white" />
                        Admin Verified
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md text-white px-3 py-1.5 rounded-full font-extrabold text-[10px] shadow-md tracking-wider uppercase flex items-center gap-1.5 z-10 border border-white/10">
                      <MapPin className="w-3 h-3 text-[#FF7112]/90 animate-pulse" />
                      {car.city}
                    </div>

                    {/* Dark gradient fade for crisp text details */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex items-end p-5">
                      <div className="flex justify-between items-center w-full z-10">
                        <span className="font-sans text-[10px] font-black uppercase text-[#FF7112]/70 tracking-widest bg-[#FF7112]/100/15 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#FF7112]/25">
                          {car.fuelType || 'Petrol'}
                        </span>
                        <span className="text-white/90 text-xs font-semibold bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/5 font-mono">
                          {car.registrationNumber ? `Reg: ${car.registrationNumber}` : 'Verified Docs'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info Card Area */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white relative z-10">
                    
                    {/* Header Title section */}
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight tracking-tight group-hover:text-[#E05A00] transition duration-200">
                        {car.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Direct Owner: {car.ownerName}</p>
                      </div>
                    </div>

                    {/* Styled Price bar */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 mb-5 flex items-center justify-between">
                      <span className="text-[11px] uppercase font-black text-slate-400 tracking-wider">Demand (PKR)</span>
                      <div className="text-2xl font-black font-mono text-[#E05A00] flex items-center gap-1.5 tracking-tight">
                        <span className="text-xs font-black text-[#FF7112]/90 px-1.5 py-0.5 bg-[#FF7112]/20 rounded">PKR</span>
                        {car.rentPrice}
                      </div>
                    </div>

                    {/* Specs Grid with 4 beautiful components */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-slate-50/70 border border-slate-100/80 rounded-xl p-3 flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm shrink-0">
                          <Gauge className="w-4 h-4 text-[#FF7112]" />
                        </div>
                        <div className="truncate">
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Transmission</p>
                          <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wide truncate">{car.transmission}</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50/70 border border-slate-100/80 rounded-xl p-3 flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm shrink-0">
                          <MapPin className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="truncate">
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Listed From</p>
                          <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wide truncate">{car.ownerCity || car.city}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50/70 border border-slate-100/80 rounded-xl p-3 flex items-center gap-3 col-span-2">
                        <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm shrink-0">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="truncate">
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Registration Status</p>
                          <p className="text-xs font-extrabold text-emerald-700 tracking-wide truncate">Verified Biometric Available</p>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic owner comments */}
                    <div className="relative bg-slate-50/40 p-4 rounded-2xl border border-slate-100 mb-6 flex-grow flex items-center">
                      <span className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black uppercase tracking-widest text-slate-400">Seller's Note</span>
                      <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                        " {car.description || 'Stunning family car listed by registered local owner. Perfect mechanical running order, fully functional AC, comfortable layout.'} "
                      </p>
                    </div>

                    {/* CTA Button section */}
                    <div className="mt-auto pt-4 border-t border-slate-100/60">
                      <a 
                        href={getWhatsAppLink(car)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3.5 font-bold transition-all duration-200 text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-100 hover:shadow-xl hover:shadow-emerald-200/50 cursor-pointer transform active:scale-98 relative overflow-hidden group/btn"
                      >
                        {/* Shimmer effect inside button */}
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                        <Phone className="w-4 h-4 fill-white animate-bounce" />
                        Contact Seller via WhatsApp
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
                <CheckCircle className="w-5 h-5 text-[#FF7112]/90" />
              </div>
              <h4 className="text-base font-bold">100% Commission-free</h4>
              <p className="text-xs text-slate-400 leading-relaxed">No dealer commission or service charges. Talk directly with owners and settle your own terms of transaction.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <ShieldCheck className="w-5 h-5 text-[#FF7112]/90" />
              </div>
              <h4 className="text-base font-bold">Verified Registrations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Admin staff reviews registration documentation and verified active status of lists to ensure high security of leads.</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <HelpCircle className="w-5 h-5 text-[#FF7112]/90" />
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
