import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Car, MapPin, CheckCircle, Smartphone, SlidersHorizontal, MessageSquare, ChevronRight, HelpCircle, RefreshCw, Key, ShieldCheck, Search, ChevronDown, X, ChevronLeft, Star, Maximize2, Calendar } from 'lucide-react';

import { INITIAL_RENTAL_FLEET, RentalCar, isCarComplete } from '../data/inventory';
import { fetchRentalCars, insertCustomerRequest } from '../lib/supabase';

interface MarketplaceImageLightboxProps {
  images: string[];
  initialIndex: number;
  carName: string;
  onClose: () => void;
}

function MarketplaceImageLightbox({ images, initialIndex, carName, onClose }: MarketplaceImageLightboxProps) {
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
      {/* Top bar info */}
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

      {/* Main image stage */}
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
              className="absolute left-3 sm:-left-16 bg-white/10 hover:bg-white/25 text-white p-2.5 sm:p-3 rounded-full backdrop-blur-sm transition-all shadow-lg active:scale-95 cursor-pointer animate-fade-in"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 sm:-right-16 bg-white/10 hover:bg-white/25 text-white p-2.5 sm:p-3 rounded-full backdrop-blur-sm transition-all shadow-lg active:scale-95 cursor-pointer animate-fade-in"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails at bottom */}
      {images.length > 1 && (
        <div className="absolute bottom-6 flex gap-2 overflow-x-auto max-w-full px-4 py-2 z-50 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${idx === index ? 'border-amber-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
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

function RentalMarketplaceSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-200/90 shadow-sm flex flex-col justify-between animate-pulse">
      {/* Media Aspect Ratio Wrapper */}
      <div className="relative aspect-[16/10] bg-gray-200/80 flex items-center justify-center">
        {/* Left top badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
          <div className="w-24 h-5 bg-gray-300 rounded-lg"></div>
          <div className="w-20 h-5 bg-gray-300 rounded-lg"></div>
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
          <div className="w-3/4 h-5 bg-gray-300 rounded-lg mb-3"></div>
          
          {/* Tag Badges */}
          <div className="flex gap-2 mb-3">
            <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
            <div className="w-14 h-4 bg-gray-200 rounded-md"></div>
          </div>

          {/* Vetted Landlord Panel */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="w-20 h-3 bg-gray-200 rounded"></div>
              <div className="w-24 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="w-full h-6 bg-gray-200 rounded mt-1"></div>
          </div>
        </div>

        {/* Price Tag & Action CTAs Skeletons */}
        <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-between gap-3">
          <div>
            <div className="w-12 h-3 bg-gray-200 rounded mb-1"></div>
            <div className="w-20 h-5 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="w-24 h-8 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceCarCard({ car, onReserve }: { car: RentalCar; onReserve: (car: RentalCar) => void; key?: any }) {
  const images = car.images && car.images.length > 0 ? car.images : [car.imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  const isTodayBooked = car.status === 'Booked';
  const isReal = car.hasRealPhoto || 
                 (car.images && car.images.length > 0 && !car.images[0].includes('unsplash.com')) || 
                 (car.imageUrl && !car.imageUrl.includes('unsplash.com') && !car.imageUrl.includes('stock'));

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <div
        className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full opacity-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Visual Media Header - CAROUSEL */}
        <div 
          className={`relative h-48 sm:h-52 overflow-hidden bg-gray-100 ${isReal ? 'cursor-zoom-in' : 'select-none'}`}
          onClick={() => isReal && setShowLightbox(true)}
        >
          {isReal ? (
            <>
              <AnimatePresence initial={false}>
                {images.map((img, index) => (
                  index === currentImageIndex && (
                    <motion.img
                      key={`${car.id}-img-${index}`}
                      src={img}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={`${car.name} - ${index + 1}`}
                      referrerPolicy="no-referrer"
                    />
                  )
                ))}
              </AnimatePresence>

              {/* Floating View Full Pic Icon Badge */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLightbox(true);
                }}
                className="absolute bottom-3 right-3 z-30 bg-black/60 shadow-lg hover:bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-white" />
                View Full Pic
              </button>

              {/* Carousel Navigation (Hidden until hover on Desktop, visible on Mobile swipe theoretically) */}
              {images.length > 1 && (
                <>
                  <div className={`absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                      onClick={prevImage}
                      className="bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex 
                            ? 'w-4 bg-amber-500 shadow-sm' 
                            : 'w-1.5 bg-white/60 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center p-5 text-center select-none">
              <div className="w-12 h-12 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-400 mb-2 border border-slate-300/40">
                <svg className="w-7 h-7 text-slate-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
          )}
        
        {/* Availability Label Tag */}
        <span className={`absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
          car.status === 'Available'
            ? 'bg-green-600 text-white'
            : 'bg-amber-500 text-white'
        }`}>
          {car.status}
        </span>

        {/* City Hub Indicator & Area */}
        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm">
            <MapPin className="w-3 h-3 text-[#FF7112]/90" />
            <span>{car.city}</span>
          </div>
          {(car.area || car.id === '1') && (
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMapModal(true); }}
              className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-gray-800 shadow-sm border border-gray-200/50 hover:bg-white transition"
            >
              <MapPin className="w-2.5 h-2.5 text-[#FF7112]" />
              <span>{car.area || 'Downtown Area'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Meta Body Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-tight group-hover:text-[#E05A00] transition-colors">
            {car.name}
          </h3>
        </div>

        {/* Highlight tags */}
        <div className="flex flex-wrap gap-2 my-3">
          <span className="bg-gray-100 text-gray-700 text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg">
            {car.transmission}
          </span>
          <span className="bg-gray-100 text-gray-700 text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg">
            {car.fuelType || 'Petrol'}
          </span>
          {car.withDriver && (
            <span className="bg-[#FF7112]/10 border border-[#FF7112]/20 text-[#FF7112] text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg">
              With Driver
            </span>
          )}
          {car.isVerified ? (
            <span className="bg-green-50 border border-green-100 text-green-700 text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified Owner
            </span>
          ) : (
            <span className="bg-gray-50 border border-gray-200 text-gray-500 text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg">
              Standard Listing
            </span>
          )}
          {car.rentalsCompleted !== undefined && car.rentalsCompleted > 5 && (car.rating !== undefined && car.rating >= 4.8) && (
            <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-gray-950 text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-amber-300 animate-pulse">
              ⭐ Top Partner
            </span>
          )}
        </div>

        {/* Vetted Owner Reference details */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 my-3 flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium">Landlord / Partner:</span>
            <div className="flex flex-col items-end">
              <span className="font-extrabold text-gray-800 flex items-center gap-1">
                {car.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />}
                {car.ownerName || 'Verified Partner'}
              </span>
              {car.landlordRating && (
                <div className="flex items-center gap-0.5 mt-0.5 text-[10px] font-bold text-gray-600">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{car.landlordRating.toFixed(1)} Rating</span>
                </div>
              )}
            </div>
          </div>
          {car.description && (
            <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed border-t border-gray-200/60 pt-2 mt-1.5">
              {car.description}
            </p>
          )}
        </div>



        {/* Bottom Price & Contact Area */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3 relative">
          <div>
            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-xs font-black text-gray-400">PKR</span>
              <span className="text-xl font-black text-gray-950 font-mono tracking-tight">{car.rentPrice}</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mt-1.5">Per {car.rentUnit.toUpperCase()}</span>
          </div>

          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (isTodayBooked) {
                alert('This car is marked as BOOKED for today. Please wait for an available slot to initiate booking.');
                return;
              }
              onReserve(car);
            }}
            className={`px-4.5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 ${
              isTodayBooked 
                ? 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed hidden' 
                : 'bg-[#FF7112] hover:bg-[#E05A00] text-white shadow-orange-100'
            }`}
            style={isTodayBooked ? { display: 'none' } : {}}
            title={isTodayBooked ? 'Currently Booked' : 'Reserve this vehicle now'}
          >
            {isTodayBooked ? <span className="opacity-0 w-0 h-0 inline-block overflow-hidden absolute">Booked</span> : (
              <>
                <Car className="w-4 h-4 text-white" />
                <span>Reserve</span>
              </>
            )}
          </button>
          
          {isTodayBooked && (
            <span className="bg-[#FF7112]/10 text-[#FF7112] px-4 py-2.5 rounded-xl font-extrabold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center border border-[#FF7112]/20 flex-1 ml-2 text-center">
              Unavailable Today
            </span>
          )}
        </div>
      </div>

      {/* Static Map Placement Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMapModal(false); }} />
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative w-full max-w-2xl flex flex-col z-10 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-black text-gray-900 tracking-tight flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF7112]" />
                Vicinity View: {car.area || 'Downtown Area'}, {car.city}
              </h3>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMapModal(false); }}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-gray-50/50 relative">
              {/* Simulated Map Container with Grayscale/Navy Theme */}
              <div className="w-full h-80 bg-gray-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-200 shadow-inner">
                <div className="absolute inset-0 opacity-40 bg-[url('https://trainingdrivingschool.pk/wp-content/uploads/2025/02/map-pattern-dark.png')] bg-cover bg-center blend-overlay" style={{backgroundImage: 'radial-gradient(circle at center, transparent 0%, #111827 100%), repeating-linear-gradient(45deg, #1f2937 25%, transparent 25%, transparent 75%, #1f2937 75%, #1f2937), repeating-linear-gradient(45deg, #1f2937 25%, #111827 25%, #111827 75%, #1f2937 75%, #1f2937)', backgroundSize: '100% 100%, 20px 20px, 20px 20px', backgroundPosition: '0 0, 0 0, 10px 10px'}}></div>
                
                {/* Radar Ripple Effect */}
                <span className="absolute flex h-24 w-24">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-20"></span>
                  <span className="relative inline-flex rounded-full h-24 w-24 bg-[#FF7112]/10 border border-[#FF7112]/30"></span>
                </span>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,113,18,0.5)] mb-2">
                    <MapPin className="w-6 h-6 text-[#FF7112]" />
                  </div>
                  <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-center shadow-lg border border-gray-200/50">
                    <p className="text-xs font-black uppercase tracking-wider text-gray-900">{car.area || 'Downtown Area'}</p>
                    <p className="text-[10px] font-bold text-gray-500 mt-0.5">{car.city}, Region</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-white">
              <p className="text-xs text-gray-500 max-w-sm">Precise pickup coordinates are provided by the owner upon confirmed WhatsApp booking.</p>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowMapModal(false); }}
                className="px-6 py-2.5 bg-gray-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition hover:bg-gray-800"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    <AnimatePresence>
      {showLightbox && (
        <MarketplaceImageLightbox
          images={images}
          initialIndex={currentImageIndex}
          carName={car.name}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </AnimatePresence>
    </>
  );
}

export default function RentalMarketplace() {
  const [activeCity, setActiveCity] = useState<string>('All Cities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('All Budgets');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('All');
  const [driverPreference, setDriverPreference] = useState<string>('Any');

  const [cars, setCars] = useState<RentalCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Booking reservation states
  const [selectedBookingCar, setSelectedBookingCar] = useState<RentalCar | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingCNIC, setBookingCNIC] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingDuration, setBookingDuration] = useState(3);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const cities = ['All Cities', 'Faisalabad', 'Lahore', 'Islamabad', 'Karachi'];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingCar) return;

    if (!bookingName || !bookingPhone || !bookingCNIC || !bookingDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const reqId = 'bk-' + Date.now();
    try {
      const parsedPrice = parseInt(String(selectedBookingCar.rentPrice || '0').replace(/,/g, '')) || 0;
      await insertCustomerRequest({
        id: reqId,
        carId: selectedBookingCar.id,
        carName: selectedBookingCar.name,
        customerName: bookingName,
        phone: bookingPhone,
        days: String(bookingDuration),
        totalPrice: String(parsedPrice * bookingDuration),
        status: 'pending'
      });
      setBookingSuccess(true);
    } catch (error) {
      console.error('Failed to insert booking draft in database', error);
      alert('Failed to save booking draft. Please check your connection.');
    }
  };

  const getBookingWhatsAppUrl = () => {
    if (!selectedBookingCar) return '';
    const defaultPhone = '923097666928';
    const ownerPhone = selectedBookingCar.ownerPhone ? selectedBookingCar.ownerPhone.replace(/[^0-9]/g, '') : defaultPhone;
    const parsedPrice = parseInt(String(selectedBookingCar.rentPrice || '0').replace(/,/g, '')) || 0;

    const invoiceParts = [
      "=============================",
      "    📄 GODRIVEIFY RENTAL INVOICE   ",
      "=============================",
      "👤 CLIENT DETAILS:",
      `• Name: ${bookingName}`,
      `• Phone/WhatsApp: ${bookingPhone}`,
      `• CNIC: ${bookingCNIC}`,
      "",
      "🚗 VEHICLE DETAILS:",
      `• Model: ${selectedBookingCar.name}`,
      `• Type: ${selectedBookingCar.isVerified ? 'Verified Fleet' : 'General Classified'}`,
      `• Transmission: ${selectedBookingCar.transmission}`,
      `• City Hub: ${selectedBookingCar.city} Office Hub`,
      "",
      "📅 TRIP SCHEDULE:",
      `• Start Date: ${bookingDate}`,
      `• Duration: ${bookingDuration} ${selectedBookingCar.rentUnit || 'Day'}(s)`,
      `• Rate: PKR ${selectedBookingCar.rentPrice} / ${selectedBookingCar.rentUnit || 'Day'}`,
      "",
      "💰 FINANCIAL SUMMARY:",
      `• Total Estimated Rent: PKR ${(parsedPrice * bookingDuration).toLocaleString()}`,
      "=============================",
      "Generated via GoDriveify Marketplace",
      "Draft logged in Database. Please confirm reservation slot!"
    ];

    return `https://wa.me/${ownerPhone}?text=${encodeURIComponent(invoiceParts.join("\n"))}`;
  };

  const CITY_AREAS: Record<string, string[]> = {
    'Faisalabad': ['Millat Town', 'D-Ground', 'Canal Road', 'Peoples Colony', 'Sargodha Road'],
    'Lahore': ['DHA', 'Gulberg', 'Johar Town', 'Bahria Town', 'Model Town'],
    'Islamabad': ['Blue Area', 'F-7', 'G-11', 'DHA Phase 2', 'E-7'],
    'Karachi': ['Clifton', 'DHA', 'Gulshan-e-Iqbal', 'North Nazimabad']
  };

  const reloadInventory = async (forceFetch = false) => {
    if (forceFetch) {
      setIsLoading(true);
    }

    if (forceFetch) {
      try {
        await fetchRentalCars();
      } catch (err) {
        console.error('Failed to pre-fetch from Supabase in Home Marketplace:', err);
      }
    }

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

    // Also fall back to loading from standard rental_cars if approved_cars doesn't exist
    // to preserve cross-tab compatibility
    const savedRentalCars = localStorage.getItem('rental_cars');
    let baseList = INITIAL_RENTAL_FLEET;
    if (savedRentalCars) {
      try {
        const parsedRentals = JSON.parse(savedRentalCars);
        if (Array.isArray(parsedRentals)) {
          // Map standard rental cars to make sure they have owners
          baseList = parsedRentals.map(car => ({
            ...car,
            ownerName: car.ownerName || 'GoDriveify Partner',
            ownerPhone: car.ownerPhone || '923097666928',
            fuelType: car.fuelType || 'Petrol',
            description: car.description || 'Pristine rental fleet vehicle.'
          }));
        }
      } catch (err) {
        // use default
      }
    }

    // Combine standard list with specifically approved user owner cars
    const merged = [...approvedList, ...baseList];
    
    // Remove duplicates based on ID
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

  useEffect(() => {
    reloadInventory(true);

    const handleStorageUpdate = () => reloadInventory(false);
    // Listen for storage changes in the browser (cross tabs, modal submissions or admin approvals)
    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('pending_cars_updated', handleStorageUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('pending_cars_updated', handleStorageUpdate);
    };
  }, []);

  const filteredCars = cars.filter(car => {
    // 1. Search Query
    const searchString = `${car.name || ''} ${car.description || ''} ${car.fuelType || ''} ${car.transmission || ''}`.toLowerCase();
    const searchMatch = !searchQuery || searchString.includes(searchQuery.toLowerCase());

    // 2. City Filter
    const cityStr = car.city || 'Faisalabad';
    const cityMatch = activeCity === 'All Cities' || cityStr.toLowerCase() === activeCity.toLowerCase();
    
    // 3. Area Filter
    const areaMatch = !selectedArea || (car.description || '').toLowerCase().includes(selectedArea.toLowerCase());

    // 4. Price filter
    let priceMatch = true;
    const rentPriceStr = car.rentPrice ? String(car.rentPrice) : '0';
    const priceNum = parseInt(rentPriceStr.replace(/,/g, '')) || 0;
    if (priceFilter === 'Below 5k/day') priceMatch = priceNum < 5000;
    if (priceFilter === '5k - 10k/day') priceMatch = priceNum >= 5000 && priceNum <= 10000;
    if (priceFilter === 'Above 10k/day') priceMatch = priceNum > 10000;

    // 5. Transmission
    const transmissionMatch = selectedTransmission === 'All' || car.transmission === selectedTransmission;

    // 6. Driver pref
    let driverMatch = true;
    const withDriver = (car as any).withDriver;
    if (driverPreference === 'Self-Drive') driverMatch = withDriver !== true;
    if (driverPreference === 'With Driver') driverMatch = withDriver === true;

    return searchMatch && cityMatch && areaMatch && priceMatch && transmissionMatch && driverMatch;
  });

  // Generate WhatsApp contact URL
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
      `• Type: ${car.isVerified ? 'Verified Fleet' : 'General Classified'}`,
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

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100 font-sans" id="rental-marketplace">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketplace Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#E05A00] font-black text-xs uppercase tracking-widest bg-[#FF7112]/10 border border-[#FF7112]/20 px-4 py-1.5 rounded-full">
            Local Peer-to-Peer Marketplace
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-gray-900 tracking-tight mt-4">
            Rent Vehicles From Certified Owners
          </h2>
          <p className="text-gray-500 mt-3 text-sm sm:text-base leading-relaxed">
            Browse verified available rides from our trusted local fleet partners and registered private owners. Lock in direct WhatsApp coordination without any hidden agents.
          </p>
        </div>

        {/* UNIFIED FLEET COMMAND BAR (FUTURISTIC) */}
        <div className="relative mb-6 max-w-[68rem] mx-auto z-20 px-2 sm:px-0">
          {/* Animated Glow Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-[2.5rem] blur-lg opacity-20 sm:opacity-25 transition duration-1000 group-hover:opacity-40 pointer-events-none" />
          
          <div className="bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-[2.25rem] border border-white/60 p-3 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] relative overflow-hidden">
            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50 mix-blend-multiply"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 items-center relative z-10">
              {/* Filter 1: Universal Search */}
              <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-red-300 hover:bg-white transition-all duration-300 px-4 py-3 sm:py-4 focus-within:!bg-white focus-within:!border-[#FF7112] focus-within:ring-4 focus-within:ring-[#FF7112]/10 group shadow-sm h-full">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#FF7112] group-focus-within:scale-110 transition-all shrink-0" />
                <input
                  type="text"
                  placeholder="Enter brand or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-bold text-gray-900 placeholder:text-gray-400 w-full ml-3"
                />
              </div>

              {/* Filter 2: Main Hub */}
              <div className="relative flex flex-col justify-center bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-red-300 hover:bg-white transition-all px-4 py-3 sm:py-0 h-14 sm:h-[4.5rem] cursor-pointer group focus-within:!bg-white focus-within:!border-[#FF7112] focus-within:ring-4 focus-within:ring-[#FF7112]/10 shadow-sm">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF7112]/100 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
                  <label className="text-[9px] font-mono uppercase text-gray-500 tracking-[0.2em] font-semibold">Hub</label>
                </div>
                <select 
                  value={activeCity} 
                  onChange={(e) => {
                    setActiveCity(e.target.value);
                    setSelectedArea('');
                  }}
                  className="bg-transparent border-none outline-none text-sm sm:text-base font-extrabold text-gray-900 w-full appearance-none cursor-pointer p-0 m-0 leading-tight block"
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-[#FF7112]/90 transition-colors" />
              </div>

              {/* Filter 3: Sector/Locality */}
              <div className={`relative flex flex-col justify-center bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl border transition-all px-4 py-3 sm:py-0 h-14 sm:h-[4.5rem] cursor-pointer group shadow-sm ${activeCity !== 'All Cities' && activeCity ? 'border-gray-200/80 hover:border-amber-300 hover:bg-white focus-within:!bg-white focus-within:!border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10' : 'border-gray-100 opacity-60 cursor-not-allowed bg-gray-50/50'}`}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${activeCity !== 'All Cities' && activeCity ? 'bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)]' : 'bg-gray-300'}`}></div>
                  <label className="text-[9px] font-mono uppercase text-gray-500 tracking-[0.2em] font-semibold">Sector</label>
                </div>
                <select 
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  disabled={activeCity === 'All Cities' || !activeCity}
                  className="bg-transparent border-none outline-none text-sm sm:text-base font-extrabold text-gray-900 w-full appearance-none cursor-pointer p-0 m-0 leading-tight disabled:text-gray-400 disabled:cursor-not-allowed block"
                >
                  <option value="">{activeCity !== 'All Cities' && activeCity ? 'All Sectors' : 'Awaiting Hub'}</option>
                  {activeCity !== 'All Cities' && CITY_AREAS[activeCity]?.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors ${activeCity !== 'All Cities' && activeCity ? 'text-gray-400 group-focus-within:text-amber-500' : 'text-gray-300'}`} />
              </div>

              {/* Filter 4: Trigger */}
              <button className="relative overflow-hidden bg-gray-950 hover:bg-black text-white rounded-xl sm:rounded-2xl font-black uppercase text-xs tracking-[0.15em] py-4 sm:py-0 h-14 sm:h-[4.5rem] px-6 transition-all shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(220,38,38,0.25)] hover:scale-[1.02] flex items-center justify-center gap-2.5 w-full group">
                {/* Sweep effect on hover */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <Search className="w-4 h-4 text-[#FF7112]/90 flex-shrink-0" />
                <span className="relative z-10">Scan Fleet</span>
              </button>
            </div>
          </div>
        </div>

        {/* SMART METADATA FILTERS (Technical style) */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-12 px-4 max-w-[68rem] mx-auto">
          {/* Price Category Dashboard */}
          <div className="relative group inline-block">
            <select 
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="appearance-none bg-white/70 backdrop-blur-md border border-gray-200/80 hover:border-gray-300 text-xs font-bold text-gray-700 px-5 py-2.5 rounded-full cursor-pointer transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100 pr-9 font-mono"
            >
              <option value="All Budgets">Rate: ANY</option>
              <option value="Below 5k/day">Rate: &lt; 5K</option>
              <option value="5k - 10k/day">Rate: 5K - 10K</option>
              <option value="Above 10k/day">Rate: &gt; 10K</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none group-hover:text-gray-600" />
          </div>

          {/* Transmission System Toggle */}
          <div className="inline-flex items-center bg-white/70 backdrop-blur-md border border-gray-200/80 rounded-full p-1 shadow-sm relative relative overflow-hidden">
              {['All', 'Automatic', 'Manual'].map(trans => (
                <button
                  key={trans}
                  type="button"
                  onClick={() => setSelectedTransmission(trans)}
                  className={`text-[10px] sm:text-xs font-bold tracking-wide px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer relative z-10 ${
                    selectedTransmission === trans 
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {selectedTransmission === trans && (
                    <motion.div
                      layoutId="transmission-bg"
                      className="absolute inset-0 bg-gray-900 rounded-full -z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {trans === 'All' ? 'SYS: ALL' : trans.toUpperCase()}
                </button>
              ))}
          </div>

          {/* Pilot Mode Toggle */}
          <div className="inline-flex items-center bg-white/70 backdrop-blur-md border border-gray-200/80 rounded-full p-1 shadow-sm relative overflow-hidden">
              {['Any', 'Self-Drive', 'With Driver'].map(pref => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => setDriverPreference(pref)}
                  className={`text-[10px] sm:text-xs font-bold tracking-wide px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer relative z-10 ${
                    driverPreference === pref 
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {driverPreference === pref && (
                    <motion.div
                      layoutId="pilot-bg"
                      className="absolute inset-0 bg-gray-900 rounded-full -z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {pref === 'Any' ? 'PILOT: ANY' : pref.toUpperCase()}
                </button>
              ))}
          </div>

          {/* Stats Bar */}
          <div className="sm:ml-auto flex flex-wrap items-center justify-center w-full sm:w-auto gap-4 mt-2 sm:mt-0">
            <span className="text-xs font-semibold text-gray-500 tracking-wider">
              [ <strong className="text-gray-950 font-black">{filteredCars.length}</strong> ASSETS DETECTED ]
            </span>
            {(searchQuery || activeCity !== 'All Cities' || selectedArea || priceFilter !== 'All Budgets' || driverPreference !== 'Any' || selectedTransmission !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCity('All Cities');
                  setSelectedArea('');
                  setPriceFilter('All Budgets');
                  setDriverPreference('Any');
                  setSelectedTransmission('All');
                }}
                className="text-[10px] font-black uppercase text-[#FF7112] hover:text-[#E05A00] transition-colors cursor-pointer tracking-widest flex items-center gap-1.5 bg-[#FF7112]/10 hover:bg-[#FF7112]/20 px-3 py-1.5 rounded-md"
              >
                <X className="w-3.5 h-3.5" /> Reset Array
              </button>
            )}
          </div>
        </div>

        {/* Marketplace Dynamic Grid */}
        <div>
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <RentalMarketplaceSkeleton key={`skeleton-${idx}`} />
              ))}
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 p-8 shadow-sm flex flex-col items-center justify-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-800">No Cars Live in {activeCity}</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2 leading-relaxed">
                Be the first to list and make money! Click "List Your Car / Earn with Us" in the menu above to onboard your vehicle for local customers.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCars.map(car => (
                <MarketplaceCarCard 
                  key={car.id} 
                  car={car} 
                  onReserve={(selected) => {
                    setSelectedBookingCar(selected);
                    setBookingName('');
                    setBookingPhone('');
                    setBookingCNIC('');
                    setBookingDate(new Date().toISOString().split('T')[0]);
                    setBookingDuration(3);
                    setBookingSuccess(false);
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Booking Dialog Modal */}
      <AnimatePresence>
        {selectedBookingCar && (
          <div className="fixed inset-0 z-[1000] overflow-y-auto flex items-center justify-center p-4">
            {/* Overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBookingCar(null)}
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
                  src={selectedBookingCar.imageUrl} 
                  alt={selectedBookingCar.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-75"
                />
                <button 
                  onClick={() => setSelectedBookingCar(null)}
                  type="button"
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-[9px] uppercase font-black bg-[#FF7112] px-2 py-0.5 rounded tracking-widest">In-App Reservation</span>
                  <h3 className="font-extrabold text-xl mt-1 tracking-tight">{selectedBookingCar.name}</h3>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 font-sans">
                {bookingSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-green-100">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">Booking Draft Logged!</h4>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                      Your booking request for <strong className="text-[#FF7112]">{selectedBookingCar.name}</strong> has been securely logged in our database. Tap below to send your structured ticket invoice to our branch officer via WhatsApp and finalize your slots.
                    </p>
                    
                    <div className="text-xs text-gray-400 bg-gray-50 p-3.5 rounded-xl border max-w-sm mx-auto text-left space-y-1">
                      <div>Customer CNIC: <strong className="text-gray-800 font-mono">{bookingCNIC}</strong></div>
                      <div>Total Price Estimate: <strong className="text-[#FF7112] font-mono font-bold">PKR {((parseInt(String(selectedBookingCar.rentPrice || '0').replace(/,/g, '')) || 0) * bookingDuration).toLocaleString()}</strong></div>
                    </div>

                    <div className="pt-2">
                      <a 
                        href={getBookingWhatsAppUrl()}
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
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {/* Price rates bar */}
                    <div className="bg-gray-50 p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-gray-650">Rate:</span>
                      <span className="font-black text-[#FF7112]">
                        PKR {selectedBookingCar.rentPrice} / {selectedBookingCar.rentUnit || 'Day'}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">Full Name *</label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. Ali Ahmed" name="name" autoComplete="name"
                        value={bookingName}
                        onChange={e => setBookingName(e.target.value)}
                        className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">WhatsApp / Phone *</label>
                      <input 
                        required
                        type="tel"
                        placeholder="e.g. 0300-1234567" name="tel" autoComplete="tel"
                        value={bookingPhone}
                        onChange={e => setBookingPhone(e.target.value)}
                        className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none transition font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">CNIC Number * (شناختی کارڈ نمبر)</label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. 33100-1234567-1"
                        value={bookingCNIC}
                        onChange={e => setBookingCNIC(e.target.value)}
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
                        <label className="block text-xs font-black uppercase text-gray-500 tracking-wider mb-1">Duration (No. of days) *</label>
                        <input 
                          required
                          type="number"
                          min="1"
                          max="90"
                          value={bookingDuration}
                          onChange={e => setBookingDuration(parseInt(e.target.value) || 1)}
                          className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:ring-2 focus:ring-[#FF7112] focus:border-[#FF7112] outline-none transition font-mono"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#FF7112] hover:bg-[#E05A00] text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition shadow-lg shadow-orange-100 cursor-pointer active:scale-95 border-none outline-none"
                    >
                      Log Booking Draft
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
