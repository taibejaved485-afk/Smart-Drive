import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import SEO from '../components/SEO';
import EarningsCalculator from '../components/EarningsCalculator';
import { CarRequestsForm, CarRequestsGrid } from '../components/CarRequestsDirectory';
import { ScrollReveal } from '../components/ScrollReveal';
import { INITIAL_RENTAL_FLEET, RentalCar, isCarComplete } from '../data/inventory';
import { fetchRentalCars } from '../lib/supabase';
import { Car, MapPin, Calendar, Sliders, CheckCircle2, ShieldCheck, X, Phone, DollarSign, Clock, HelpCircle, Filter, Sparkles, ChevronLeft, ChevronRight, Search, ChevronDown, Check, Users, Maximize2 } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  carName: string;
  onClose: () => void;
}

function ImageLightbox({ images, initialIndex, carName, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && images.length > 1) next();
      if (e.key === 'ArrowLeft' && images.length > 1) prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6" onClick={onClose}>
      {/* Top bar */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white z-50">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg tracking-tight select-none">{carName}</h3>
          {images.length > 1 && (
            <span className="text-xs text-gray-400 font-mono">
              Image {index + 1} of {images.length}
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="bg-white/15 hover:bg-white/25 text-white p-2 sm:p-2.5 rounded-full transition-all cursor-pointer shadow-lg active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center pointer-events-auto" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[index]}
          className="max-w-full max-h-[75vh] object-contain rounded-xl select-none shadow-2xl border border-white/10"
          alt={`${carName} full screen`}
          referrerPolicy="no-referrer"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 sm:-left-16 bg-white/10 hover:bg-white/25 text-white p-2.5 sm:p-3 rounded-full backdrop-blur-sm transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 sm:-right-16 bg-white/10 hover:bg-white/25 text-white p-2.5 sm:p-3 rounded-full backdrop-blur-sm transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails list at bottom */}
      {images.length > 1 && (
        <div className="absolute bottom-6 flex gap-2 overflow-x-auto max-w-full px-4 py-2 z-50 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${idx === index ? 'border-[#FF7112] scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <img src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

function CarImageCarousel({ car }: { car: RentalCar }) {
  const isReal = car.hasRealPhoto || 
                 (car.images && car.images.length > 0 && !car.images[0].includes('unsplash.com')) || 
                 (car.imageUrl && !car.imageUrl.includes('unsplash.com') && !car.imageUrl.includes('stock'));

  const images = car.images && car.images.length > 0 ? car.images : [car.imageUrl];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isReal) {
    return (
      <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center p-6 text-center select-none relative">
        <div className="w-14 h-14 rounded-full bg-slate-200/85 flex items-center justify-center text-slate-400 mb-2.5 border border-slate-300/40">
          <svg className="w-8 h-8 text-slate-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="7" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 17h6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="17" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 px-2.5 py-1 bg-slate-200/60 border border-slate-300/30 rounded-full">
          Real Image Pending Verification
        </span>
        <p className="text-[9px] text-slate-500 font-semibold mt-1 leading-tight">Physical Inspection & Biometric Checks in Progress</p>
      </div>
    );
  }

  return (
    <>
      <div 
        className="w-full h-full relative group/carousel cursor-zoom-in"
        onClick={() => setShowLightbox(true)}
      >
        <img 
          src={images[currentIndex] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'} 
          alt={`${car.name} - View ${currentIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Sleek Floating View Full Pic Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowLightbox(true);
          }}
          className="absolute bottom-3 right-3 z-30 bg-black/60 shadow-lg hover:bg-[#E05A00] hover:bg-[#FF7112] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5 text-white" />
          View Full Pic
        </button>

        {images.length > 1 && (
          <>
            <button 
              type="button" 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-sm shadow-md cursor-pointer z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              type="button" 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-sm shadow-md cursor-pointer z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-25">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-4 bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'w-1.5 bg-white/50 hover:bg-white/80'}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {showLightbox && (
          <ImageLightbox
            images={images}
            initialIndex={currentIndex}
            carName={car.name}
            onClose={() => setShowLightbox(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function RentalCarSkeleton() {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between animate-pulse">
      {/* Media Aspect Ratio Wrapper */}
      <div className="relative aspect-[16/10] bg-gray-200/80 flex items-center justify-center">
        {/* Left top badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
          <div className="w-24 h-6 bg-gray-300 rounded-lg"></div>
          <div className="w-20 h-6 bg-gray-300 rounded-lg"></div>
        </div>
        {/* Right top status */}
        <div className="absolute top-4 right-4">
          <div className="w-20 h-6 bg-gray-300 rounded-lg"></div>
        </div>
        {/* Center icon placeholder */}
        <div className="w-12 h-12 rounded-full bg-gray-300/40 flex items-center justify-center">
          <Car className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Card Info Skeleton Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Title Placeholder */}
          <div className="w-3/4 h-6 bg-gray-300 rounded-lg mb-4"></div>
          
          {/* Tag Badges */}
          <div className="flex gap-2 mb-4">
            <div className="w-16 h-5 bg-gray-200 rounded-md"></div>
            <div className="w-14 h-5 bg-gray-200 rounded-md"></div>
            <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
          </div>

          {/* Vetted Landlord Panel */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 my-3 flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-28 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-full h-8 bg-gray-200 rounded mt-1"></div>
          </div>
        </div>

        {/* Price Tag & Action CTAs Skeletons */}
        <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="w-16 h-3 bg-gray-200 rounded mb-1"></div>
            <div className="w-24 h-6 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-9 bg-gray-200 rounded-xl"></div>
            <div className="w-24 h-9 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RentalsPage() {
  const [viewMode, setViewMode] = useState<'fleet' | 'requests'>('fleet');
  const [cars, setCars] = useState<RentalCar[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('All Budgets');
  const [driverPreference, setDriverPreference] = useState<string>('Any');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('All');
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Booking modal state
  const [selectedCar, setSelectedCar] = useState<RentalCar | null>(null);
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingDuration, setBookingDuration] = useState<number>(3);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Load inventory of cars combining base cars and custom admin-approved cars
  const loadInventory = async (forceFetch = false) => {
    if (forceFetch) {
      setIsLoading(true);
    }

    if (forceFetch) {
      try {
        await fetchRentalCars();
      } catch (err) {
        console.error('Failed to pre-fetch from Supabase:', err);
      }
    }

    // 1. Get specifically approved custom owner cars
    let approvedList: RentalCar[] = [];
    const savedApproved = localStorage.getItem('approved_cars');
    if (savedApproved) {
      try {
        const parsed = JSON.parse(savedApproved);
        if (Array.isArray(parsed)) {
          approvedList = parsed;
        }
      } catch (e) {
        approvedList = [];
      }
    }

    // 2. Get base rental cars
    const savedCars = localStorage.getItem('rental_cars');
    let baseList: RentalCar[] = [];
    if (savedCars) {
      try {
        const parsed = JSON.parse(savedCars);
        if (Array.isArray(parsed)) {
          baseList = parsed;
        } else {
          baseList = INITIAL_RENTAL_FLEET;
        }
      } catch (e) {
        baseList = INITIAL_RENTAL_FLEET;
      }
    } else {
      baseList = INITIAL_RENTAL_FLEET;
    }

    // Combine them safely and remove duplicate IDs (prefer approved custom cars details if same ID exists)
    const merged = [...approvedList, ...baseList];
    const uniqueCars: RentalCar[] = [];
    const seenIds = new Set<string>();
    
    for (const car of merged) {
      if (!seenIds.has(car.id)) {
        seenIds.add(car.id);
        uniqueCars.push(car);
      }
    }

    // Active Conditional Rendering: exclude incomplete listings
    const completeCars = uniqueCars.filter(isCarComplete);

    setCars(completeCars);
    setIsLoading(false);
  };

  // Load cars on mount
  useEffect(() => {
    loadInventory(true);
  }, []);

  // Listen for storage changes & custom events in case admin updates cars in same SPA thread or background
  useEffect(() => {
    const handleStorageUpdate = () => loadInventory(false);
    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('pending_cars_updated', handleStorageUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('pending_cars_updated', handleStorageUpdate);
    };
  }, []);

  // Unique list of cities for filtration tabs
  const cities = ['All Cities', 'Faisalabad', 'Lahore', 'Islamabad', 'Karachi'];
  
  const CITY_AREAS: Record<string, string[]> = {
    'Faisalabad': ['Millat Town', 'D-Ground', 'Canal Road', 'Peoples Colony', 'Sargodha Road'],
    'Lahore': ['DHA', 'Gulberg', 'Johar Town', 'Bahria Town', 'Model Town'],
    'Islamabad': ['Blue Area', 'F-7', 'G-11', 'DHA Phase 2', 'E-7'],
    'Karachi': ['Clifton', 'DHA', 'Gulshan-e-Iqbal', 'North Nazimabad']
  };

  const filteredCars = cars.filter(car => {
    // 1. Search filter
    const searchString = `${car.name || ''} ${car.description || ''} ${car.type || ''} ${car.transmission || ''}`.toLowerCase();
    const matchesSearch = !searchQuery || searchString.includes(searchQuery.toLowerCase());

    // 2. City Filter
    const cityStr = car.city || 'Faisalabad';
    const matchesCity = selectedCity === 'All Cities' || cityStr.toLowerCase() === selectedCity.toLowerCase();
    
    // 3. Area Filter
    const matchesArea = !selectedArea || car.area === selectedArea || (car.description || '').includes(selectedArea);

    // 4. Price Filter
    let matchesPrice = true;
    const rentPriceStr = car.rentPrice ? String(car.rentPrice) : '0';
    const priceNum = parseInt(rentPriceStr.replace(/,/g, '')) || 0;
    if (priceFilter === 'Below 5k/day') matchesPrice = priceNum < 5000;
    if (priceFilter === '5k - 10k/day') matchesPrice = priceNum >= 5000 && priceNum <= 10000;
    if (priceFilter === 'Above 10k/day') matchesPrice = priceNum > 10000;

    // 5. Driver Preference
    let matchesDriver = true;
    if (driverPreference === 'Self-Drive') matchesDriver = car.withDriver !== true;
    if (driverPreference === 'With Driver') matchesDriver = car.withDriver === true;

    // 6. Transmission Filter
    const matchesTransmission = selectedTransmission === 'All' || car.transmission === selectedTransmission;

    return matchesSearch && matchesCity && matchesArea && matchesPrice && matchesDriver && matchesTransmission;
  });

  const handleOpenBooking = (car: RentalCar) => {
    setSelectedCar(car);
    setBookingName('');
    setBookingPhone('');
    setBookingDate(new Date().toISOString().split('T')[0]);
    setBookingDuration(3);
    setBookingSuccess(false);
  };

  const handleCloseBooking = () => {
    setSelectedCar(null);
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) {
      alert('Please fill in your Name, Phone Number and Dates.');
      return;
    }

    if (selectedCar) {
      // Set the booked car to Booked in state and localStorage
      const updatedCars = cars.map(car => {
        if (car.id === selectedCar.id) {
          return { ...car, status: 'Booked' as const };
        }
        return car;
      });
      setCars(updatedCars);
      localStorage.setItem('rental_cars', JSON.stringify(updatedCars));
      
      // Keep approved_cars synchronized too if this is a custom owner car
      const savedApproved = localStorage.getItem('approved_cars');
      if (savedApproved) {
        try {
          const parsed = JSON.parse(savedApproved);
          if (Array.isArray(parsed)) {
            const updatedApproved = parsed.map(car => {
              if (car.id === selectedCar.id) {
                return { ...car, status: 'Booked' as const };
              }
              return car;
            });
            localStorage.setItem('approved_cars', JSON.stringify(updatedApproved));
          }
        } catch (err) {
          // ignore
        }
      }
      
      // Also trigger a storage event so other open tabs update
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('pending_cars_updated'));

      setBookingSuccess(true);
      setTimeout(() => {
        setSelectedCar(null);
        setBookingSuccess(false);
      }, 4000);
    }
  };

  const getWhatsAppLink = (car: RentalCar) => {
    const defaultPhone = '923097666928';
    const ownerPhone = car.ownerPhone ? car.ownerPhone.replace(/[^0-9]/g, '') : defaultPhone;
    
    // Construct rich text organized layout representing an executive inquiry invoice of the car
    const invoiceParts = [
      "=============================",
      "    📄 GODRIVEIFY INQUIRY INVOICE   ",
      "=============================",
      "👤 CLIENT DETAILS:",
      "• Name: Valued Guest (Inquiry)",
      "",
      "🚗 VEHICLE DETAILS:",
      `• Model: ${car.name}`,
      `• Type: ${car.type || 'Sedan'}`,
      `• Transmission: ${car.transmission}`,
      `• City Hub: ${car.city} Office Hub`,
      "",
      "💰 RENTAL ESTIMATES:",
      `• Rate: PKR ${car.rentPrice} / ${car.rentUnit || 'Day'}`,
      "=============================",
      "Kindly check and confirm vehicle booking slot availability!"
    ];
    
    return `https://wa.me/${ownerPhone}?text=${encodeURIComponent(invoiceParts.join("\n"))}`;
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    "name": "GoDriveify Car Rental Fleet Pakistan",
    "description": "Rent premium Honda Civic, Toyota Yaris, or Suzuki Swift manual or automatic cars for practice sessions, driving test preparation, or personal travel in Lahore, Faisalabad, Islamabad, and Karachi.",
    "url": "https://godriveify.com/rentals"
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Rent a Car for Driving Practice & Travel | GoDriveify"
        description="Browse our luxury and economy manual/automatic car rental fleet in Faisalabad, Lahore, Islamabad, and Karachi. High-end rentals starting from 5,500 PKR with smooth booking."
        keywords="car rental for driving test, rent car Faisalabad, rent driving practice car Lahore, automatic car rental Islamabad, manual transmission car rent, car rental packages Pakistan"
        schema={schema}
      />
      <Navbar />

      {/* Hero Header */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        {/* Cinematic Background Video Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            src="/hero-video.mp4"
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
          />
          {/* Rich Dark Vignette Overlay for Premium Contrast and Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/40 to-slate-950/90 z-10"></div>
          <div className="absolute inset-0 bg-radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops)) from-red-950/20 via-transparent to-black/80 z-15"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-400 font-extrabold tracking-widest text-xs uppercase mb-3"
          >
            Premium Transport Fleet
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Rent a Car for Practice or Travel
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-200 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-medium"
          >
            Learn to drive on public roads, pass your driver's licensing test, or enjoy comfortable weekend rentals in major Pakistani cities.
          </motion.p>
        </div>
      </section>

      {/* INTERACTIVE INCOME CALCULATOR COMPONENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16 relative z-20 animate-fade-in">
        <ScrollReveal direction="up" delay={0.1}><EarningsCalculator /></ScrollReveal>
      </div>

      {/* Main Content & Fleet Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* View Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl shadow-sm border border-gray-200">
              <button
                onClick={() => setViewMode('fleet')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm sm:text-base tracking-tight transition-all ${
                  viewMode === 'fleet' 
                    ? 'bg-white text-gray-950 shadow-sm border border-gray-150' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Car className="w-5 h-5" /> Browse Fleet
              </button>
              <button
                onClick={() => setViewMode('requests')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm sm:text-base tracking-tight transition-all ${
                  viewMode === 'requests' 
                    ? 'bg-white text-[#FF7112] shadow-sm border border-gray-150' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Users className="w-5 h-5" /> Car Requests (Reverse Directory)
              </button>
            </div>
          </div>

          {viewMode === 'fleet' ? (
            <>
              {/* Section Introduction */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#E05A00] font-black tracking-wider text-xs uppercase block mb-2">Our Vehicle Fleet</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-none">
                Select Your Desired Transmission & City
              </h2>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                We provide premium manual and automatic cars equipped with dual auxiliary passenger controls upon practice request to ensure 100% security during your road session. Select your preferred location below.
              </p>
            </div>

            {/* Quick trust seals */}
            <div className="flex items-center gap-4 shrink-0 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="bg-[#FF7112]/10 p-2.5 rounded-xl text-[#FF7112]">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-900">Dual Control Brakes</p>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Available upon request</p>
              </div>
            </div>
          </div>

          {/* UNIFIED FLEET SEARCH BAR */}
          <div className="bg-white rounded-2xl sm:rounded-[2rem] border border-gray-200 p-3 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 mx-auto relative overflow-hidden z-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 items-center">
              {/* Column 1: Search */}
              <div className="relative flex items-center bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors px-4 py-3 sm:py-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 focus-within:border-[#FF7112] group">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#FF7112]/90 transition-colors shrink-0" />
                <input
                  type="text"
                  placeholder="Search car brand or model (e.g. Civic, Alto)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-bold text-gray-900 placeholder:text-gray-400 w-full ml-3"
                />
              </div>

              {/* Column 2: Main City */}
              <div className="relative flex flex-col justify-center bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors px-4 py-2 sm:py-3 cursor-pointer group focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 focus-within:border-[#FF7112]">
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest pl-1 mb-0.5">Location</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedArea('');
                  }}
                  className="bg-transparent border-none outline-none text-sm sm:text-base font-extrabold text-gray-900 w-full appearance-none cursor-pointer p-0 m-0 leading-tight"
                >
                  <option value="" disabled>Select Main City</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-amber-500 transition-colors" />
              </div>

              {/* Column 3: Area/Locality */}
              <div className={`relative flex flex-col justify-center bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 transition-colors px-4 py-2 sm:py-3 cursor-pointer group ${selectedCity !== 'All Cities' && selectedCity ? 'hover:border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 focus-within:border-[#FF7112]' : 'opacity-60 cursor-not-allowed'}`}>
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest pl-1 mb-0.5">Locality</label>
                <select 
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  disabled={selectedCity === 'All Cities' || !selectedCity}
                  className="bg-transparent border-none outline-none text-sm sm:text-base font-extrabold text-gray-900 w-full appearance-none cursor-pointer p-0 m-0 leading-tight disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <option value="">{selectedCity !== 'All Cities' && selectedCity ? 'All Areas' : 'Select City First'}</option>
                  {selectedCity !== 'All Cities' && CITY_AREAS[selectedCity]?.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-colors ${selectedCity !== 'All Cities' && selectedCity ? 'group-focus-within:text-amber-500' : 'opacity-50'}`} />
              </div>

              {/* Column 4: Search Action Button */}
              <button className="bg-gray-950 hover:bg-gray-900 text-white rounded-xl sm:rounded-2xl font-black uppercase text-xs tracking-widest py-4 sm:py-5 px-6 transition-all shadow-[0_5px_15px_rgba(3,7,18,0.2)] hover:shadow-[0_8px_25px_rgba(3,7,18,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer w-full h-full">
                <Search className="w-4 h-4 text-amber-500" />
                Search Fleet
              </button>
            </div>
          </div>

          {/* SMART FILTERS (Below Main Bar) */}
          <div className="flex flex-wrap items-center gap-3 mb-10 px-2">
            {/* Price Filter Pill */}
            <div className="relative group inline-block">
              <select 
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-200 hover:border-gray-300 text-xs font-bold text-gray-700 px-4 py-2 rounded-full cursor-pointer transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100 pr-8"
              >
                <option value="All Budgets">All Budgets</option>
                <option value="Below 5k/day">Below 5k/day</option>
                <option value="5k - 10k/day">5k - 10k/day</option>
                <option value="Above 10k/day">Above 10k/day</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none group-hover:text-gray-600" />
            </div>

            {/* Transmission Mode */}
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
               {['All', 'Automatic', 'Manual'].map(trans => (
                 <button
                   key={trans}
                   type="button"
                   onClick={() => setSelectedTransmission(trans)}
                   className={`text-[10px] sm:text-xs font-bold tracking-wide px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                     selectedTransmission === trans 
                     ? 'bg-gray-900 text-white shadow-sm'
                     : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                   }`}
                 >
                   {trans}
                 </button>
               ))}
            </div>

            {/* Driver Preference Pill Option Toggle */}
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
               {['Any', 'Self-Drive', 'With Driver'].map(pref => (
                 <button
                   key={pref}
                   type="button"
                   onClick={() => setDriverPreference(pref)}
                   className={`text-[10px] sm:text-xs font-bold tracking-wide px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                     driverPreference === pref 
                     ? 'bg-gray-900 text-white shadow-sm'
                     : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                   }`}
                 >
                   {pref}
                 </button>
               ))}
            </div>

             {/* Clear Filters (if active) */}
             <div className="ml-auto flex flex-wrap items-center gap-4">
               <span className="text-xs font-semibold text-gray-500 font-mono hidden sm:inline-block">
                  Found <strong className="text-gray-950 font-black">{filteredCars.length}</strong> matches
                </span>
                {(searchQuery || selectedCity !== 'All Cities' || selectedArea || priceFilter !== 'All Budgets' || driverPreference !== 'Any' || selectedTransmission !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCity('All Cities');
                      setSelectedArea('');
                      setPriceFilter('All Budgets');
                      setDriverPreference('Any');
                      setSelectedTransmission('All');
                    }}
                    className="text-[10px] font-black uppercase text-[#E05A00] hover:text-[#B34700] transition-colors cursor-pointer tracking-wider flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Clear All Filters
                  </button>
                )}
             </div>
          </div>

          {/* Cars Grid */}
          <div>
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <RentalCarSkeleton key={`skeleton-${idx}`} />
                ))}
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-gray-200 text-center animate-fade-in shadow-sm px-6 max-w-2xl mx-auto my-8">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-300">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="text-gray-950 font-black text-2xl tracking-tight">No cars available in this region yet</h3>
                <p className="text-gray-500 text-sm mt-3 max-w-sm font-medium leading-relaxed">
                  We are constantly expanding our vetted peer-to-peer fleet. If you can't find what you need, post a custom request and let owners find you!
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setViewMode('requests')}
                    className="bg-[#FF7112] hover:bg-[#E05A00] text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg shadow-orange-100 cursor-pointer"
                  >
                    Post a Request
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedCity('All Cities');
                      setSelectedArea('');
                    }}
                    className="bg-gray-950 hover:bg-black text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg cursor-pointer"
                  >
                    Browse All Cities
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car, idx) => {
                  const currentStatus = car.availabilityStatus || (car.status === 'Booked' ? 'Rented Out' : 'Available');
                  const isAvailable = currentStatus === 'Available';
                  
                  return (
                    <ScrollReveal direction="up" delay={idx * 0.1} key={car.id}>
                    <div
                      className={`h-full bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between ${!isAvailable ? 'opacity-75 grayscale-[20%]' : 'opacity-100'}`}
                    >
                      {/* Card Image and City Badge */}
                      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden group">
                        <CarImageCarousel car={car} />
                        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10 pointer-events-none">
                          <span className="bg-gray-900/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-md">
                            <MapPin className="w-3.5 h-3.5 text-[#FF7112]/90" />
                            {car.city}
                          </span>
                          {car.isVerified && (
                            <span className="bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-md border border-emerald-500/30">
                              <ShieldCheck className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                              Verified Car
                            </span>
                          )}
                          {car.rentalsCompleted !== undefined && car.rentalsCompleted > 5 && (car.rating !== undefined && car.rating >= 4.8) && (
                            <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-550 backdrop-blur-md text-gray-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-md border border-amber-300 animate-pulse">
                              <span>⭐</span> Top Partner
                            </span>
                          )}
                        </div>
                        <div className="absolute top-4 right-4 focus-within:z-50">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border ${
                            isAvailable 
                              ? 'bg-green-500 text-white border-green-400' 
                              : 'bg-amber-500 text-white border-amber-400'
                          }`}>
                            {isAvailable ? 'Available' : '🔴 Rented Out'}
                          </span>
                        </div>
                      </div>

                      {/* Card Info Content */}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-extrabold text-xl text-gray-900 tracking-tight leading-tight">
                              {car.name}
                            </h3>
                          </div>
                          
                          {/* Transmission & Fuel Features */}
                          <div className="flex flex-wrap items-center gap-2 my-3 text-xs font-bold text-gray-500">
                            <span className="bg-gray-100 px-2.5 py-1 rounded-md text-gray-700 font-semibold">
                              {car.transmission}
                            </span>
                            <span className="bg-gray-100 px-2.5 py-1 rounded-md text-gray-700 font-semibold">
                              {car.fuelType || 'Petrol'}
                            </span>
                            {(!car.ownerName || car.id.startsWith('rc-')) && (
                              <span className="flex items-center gap-1 text-[#E05A00] bg-[#FF7112]/10 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase">
                                <Sliders className="w-3.5 h-3.5 text-[#FF7112]/90" /> Dual-Control
                              </span>
                            )}
                          </div>

                          {/* Vetted Landlord Reference details */}
                          <div className="bg-gray-55 border border-gray-150 rounded-2xl p-3.5 my-3 flex flex-col gap-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-400 font-medium">Vetted Owner:</span>
                              <span className="font-extrabold text-gray-800 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                {car.ownerName || 'GoDriveify Partner'}
                              </span>
                            </div>
                            {car.ownerPhone && (
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400 font-medium">Owner Phone:</span>
                                <span className="font-mono font-bold text-gray-700 select-all">{car.ownerPhone}</span>
                              </div>
                            )}
                            {car.description && (
                              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed border-t border-gray-200/60 pt-1.5 mt-1">
                                {car.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Rent Rates & Action */}
                        <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between gap-2.5">
                          <div>
                            <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none mb-1">Rental Cost</p>
                            <p className="text-gray-950 font-black text-lg sm:text-xl font-mono leading-none">
                              PKR {car.rentPrice}
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mt-1">/ {car.rentUnit || 'Day'}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {car.ownerPhone && (
                              <a 
                                href={isAvailable ? getWhatsAppLink(car) : '#'} 
                                target={isAvailable ? "_blank" : undefined}
                                rel={isAvailable ? "noopener noreferrer" : undefined}
                                className={`p-2.5 rounded-xl flex items-center justify-center transition shadow-lg cursor-pointer sm:px-3.5 ${
                                  isAvailable 
                                    ? 'bg-[#25D366] hover:bg-[#128C7E] text-white shadow-green-100' 
                                    : 'bg-gray-300 text-gray-500 opacity-50 pointer-events-none'
                                }`}
                                title={isAvailable ? "Contact owner on WhatsApp" : "Currently Unavailable"}
                              >
                                <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span className="hidden xs:inline-block font-extrabold text-[10px] ml-1 uppercase">Inquire Now</span>
                              </a>
                            )}
                            <button
                              onClick={() => handleOpenBooking(car)}
                              type="button"
                              disabled={!isAvailable}
                              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                                isAvailable 
                                  ? 'bg-gray-900 text-white hover:bg-black hover:shadow-md shadow-sm' 
                                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                              }`}
                            >
                              {isAvailable ? 'Reserve' : 'Unavailable'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Driving School Practices Note */}
          <div className="mt-16 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 bg-[#FF7112]/10 rounded-2xl flex items-center justify-center text-[#E05A00] shrink-0">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-gray-950 mb-1">Are you an absolute beginner with zero road experience?</h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
                We strongly recommend joining our <a href="/programs" className="text-[#E05A00] underline font-bold">10-day intensive driving courses</a> first. Our instructors provide fully certified manual and automatic gear coaching on official, dual-clutch training vehicles with systematic supervision to teach defense maneuvers prior to renting private practice models.
              </p>
            </div>
          </div>
            </>
          ) : (
            <div className="space-y-16 animate-fade-in">
              <CarRequestsForm />
              <CarRequestsGrid />
            </div>
          )}

        </div>
      </section>

      {/* Booking Dialog Modal */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseBooking}
              className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm"
            />
            
            {/* Modal Body container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full relative z-10 border border-gray-100"
            >
              {/* Image Banner Header */}
              <div className="relative aspect-[21/9] bg-gray-900">
                <img 
                  src={selectedCar.imageUrl} 
                  alt={selectedCar.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-75"
                />
                <button 
                  onClick={handleCloseBooking}
                  type="button"
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-[9px] uppercase font-black bg-[#FF7112] px-2 py-0.5 rounded tracking-widest">Booking Request</span>
                  <h3 className="font-extrabold text-xl mt-1 tracking-tight">{selectedCar.name}</h3>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {bookingSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4 font-sans"
                  >
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">Booking Request Logged!</h4>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                      Assigned dynamic rental vehicle <strong className="text-[#E05A00]">{selectedCar.name}</strong> for <strong className="text-gray-900">{bookingDuration} Days</strong>. To secure your slot instantly, tap the button below to send your **Executive Invoice Statement** to our branch desk officer.
                    </p>
                    
                    <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-xl border max-w-sm mx-auto text-left space-y-1">
                      <div>Assigned Location: <strong className="text-gray-800">{selectedCar.city} Office Hub</strong></div>
                      <div>Total Price Estimate: <strong className="text-[#FF7112] font-mono">PKR {(parseInt(String(selectedCar.rentPrice || '0').replace(/,/g, '')) * bookingDuration).toLocaleString()}</strong></div>
                    </div>

                    <div className="pt-2">
                      <a 
                        href={`https://wa.me/${(selectedCar.ownerPhone || '923097666928').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          [
                            "=============================",
                            "    📄 GODRIVEIFY RENTAL INVOICE   ",
                            "=============================",
                            "👤 CLIENT DETAILS:",
                            `• Name: ${bookingName}`,
                            `• Phone: ${bookingPhone}`,
                            "",
                            "🚗 VEHICLE DETAILS:",
                            `• Model: ${selectedCar.name}`,
                            `• Type: ${selectedCar.type || 'Sedan'}`,
                            `• Transmission: ${selectedCar.transmission}`,
                            `• City Hub: ${selectedCar.city} Office Hub`,
                            "",
                            "📅 TRIP SCHEDULE:",
                            `• Start Date: ${bookingDate}`,
                            `• Duration: ${bookingDuration} ${selectedCar.rentUnit || 'Day'}(s)`,
                            `• Rate: PKR ${selectedCar.rentPrice} / ${selectedCar.rentUnit || 'Day'}`,
                            "",
                            "💰 FINANCIAL SUMMARY:",
                            `• Total Estimated Rent: PKR ${(parseInt(String(selectedCar.rentPrice || '0').replace(/,/g, '')) * bookingDuration).toLocaleString()}`,
                            "=============================",
                            "Generated via GoDriveify Marketplace",
                            "Please confirm reservation slot for this vehicle!"
                          ].join("\n")
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-wide transition shadow-lg shadow-green-100 cursor-pointer"
                      >
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>Send Executive Message</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={submitBooking} className="space-y-4">
                    
                    {/* Car Rates details bar */}
                    <div className="bg-gray-50 p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-gray-600">Location Area:</span>
                      <span className="font-extrabold text-gray-900 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FF7112]/90" /> {selectedCar.city} Office
                      </span>
                    </div>

                    <div className="bg-[#FF7112]/10/55 p-3 rounded-xl border border-[#FF7112]/20 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-[#B34700]">Price Rate:</span>
                      <span className="font-black text-[#E05A00]">
                        PKR {selectedCar.rentPrice} / {selectedCar.rentUnit || 'Day'}
                      </span>
                    </div>

                    {/* Inputs */}
                    <div>
                      <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">Full Name (مکمل نام) *</label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. Hammad Javed"
                        value={bookingName}
                        onChange={e => setBookingName(e.target.value)}
                        className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">Phone / WhatsApp Number *</label>
                      <input 
                        required
                        type="tel"
                        placeholder="e.g. 0300-1234567"
                        value={bookingPhone}
                        onChange={e => setBookingPhone(e.target.value)}
                        className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none transition font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">Start Date *</label>
                        <input 
                          required
                          type="date"
                          value={bookingDate}
                          onChange={e => setBookingDate(e.target.value)}
                          className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none transition font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">Duration (No. of {selectedCar.rentUnit}s) *</label>
                        <input 
                          required
                          type="number"
                          min="1"
                          max="30"
                          value={bookingDuration}
                          onChange={e => setBookingDuration(Number(e.target.value))}
                          className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none transition font-mono"
                        />
                      </div>
                    </div>

                    {/* Total Price Estimate */}
                    {bookingDuration > 0 && (
                      <div className="bg-gray-900 text-white rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Total Rent Estimate</p>
                          <p className="text-xl font-black text-[#FF7112]/90">
                            PKR {(parseInt(String(selectedCar.rentPrice || '0').replace(/,/g, '')) * bookingDuration).toLocaleString()}
                          </p>
                        </div>
                        <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-md text-gray-300 max-w-[120px] text-right font-medium">
                          Calculated for {bookingDuration} {selectedCar.rentUnit || 'Day'}s
                        </span>
                      </div>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-[#FF7112] hover:bg-[#E05A00] text-white font-extrabold uppercase tracking-widest text-xs py-3.5 rounded-xl transition shadow-md shadow-red-200 cursor-pointer"
                    >
                      Confirm Rental Appointment
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ScrollReveal direction="up" delay={0.1}><CTABanner /></ScrollReveal>
      <Footer />
    </div>
  );
}
