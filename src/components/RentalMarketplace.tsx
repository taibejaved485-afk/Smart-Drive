import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, MapPin, CheckCircle, Smartphone, SlidersHorizontal, MessageSquare, ChevronRight, HelpCircle, RefreshCw, Key, ShieldCheck, Search, ChevronDown, X, ChevronLeft, Star } from 'lucide-react';

interface RentalCar {
  id: string;
  name: string;
  transmission: 'Automatic' | 'Manual';
  rentPrice: string;
  rentUnit: 'Day' | 'Hour';
  imageUrl: string;
  images?: string[];
  city: string;
  status: 'Available' | 'Booked';
  ownerName?: string;
  ownerPhone?: string;
  fuelType?: string;
  description?: string;
  isVerified?: boolean;
  landlordRating?: number;
  withDriver?: boolean;
}

const GENERAL_DEFAULT_CARS: RentalCar[] = [
  {
    id: 'rc-1',
    name: 'Honda Civic Pro (VTEC)',
    transmission: 'Automatic',
    rentPrice: '12,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1590362891991-f70281b373ee?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1549314488-87cc9c3bc89a?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Faisalabad',
    status: 'Available',
    ownerName: 'Smart Drive Official',
    ownerPhone: '923097666928',
    fuelType: 'Petrol',
    description: 'Pristine, fully loaded automatic sedan.',
    isVerified: true,
    landlordRating: 4.8,
    withDriver: false
  },
  {
    id: 'rc-2',
    name: 'Toyota Yaris Ativ',
    transmission: 'Automatic',
    rentPrice: '6,500',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Lahore',
    status: 'Available',
    ownerName: 'Mian Fawad',
    ownerPhone: '923015467812',
    fuelType: 'Petrol',
    description: 'Clean compact sedan with phenomenal fuel average.',
    isVerified: true,
    landlordRating: 4.5,
    withDriver: true
  },
  {
    id: 'rc-3',
    name: 'Toyota Corolla Altis Grande',
    transmission: 'Automatic',
    rentPrice: '7,500',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Islamabad',
    status: 'Available',
    ownerName: 'Chaudhary Bilal',
    ownerPhone: '923214567890',
    fuelType: 'Petrol',
    description: 'Highly comfortable luxury cruiser.',
    isVerified: false,
    withDriver: false
  },
  {
    id: 'rc-4',
    name: 'Suzuki Swift GLX',
    transmission: 'Automatic',
    rentPrice: '5,500',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Karachi',
    status: 'Available',
    ownerName: 'Hamza Malik',
    ownerPhone: '923331234567',
    fuelType: 'Petrol',
    description: 'Nifty and dynamic city hatchback.',
    isVerified: true,
    landlordRating: 4.9,
    withDriver: false
  },
  {
    id: 'rc-5',
    name: 'Hyundai Elantra GLS',
    transmission: 'Automatic',
    rentPrice: '9,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1549314488-87cc9c3bc89a?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Lahore',
    status: 'Available',
    ownerName: 'Mian Fawad',
    ownerPhone: '923015467812',
    fuelType: 'Petrol',
    description: 'Luxurious premium ride with standard leather suite.',
    isVerified: true,
    landlordRating: 4.7,
    withDriver: true
  },
  {
    id: 'rc-6',
    name: 'Honda City Aspire',
    transmission: 'Manual',
    rentPrice: '6,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Faisalabad',
    status: 'Available',
    ownerName: 'Anas Gujjar',
    ownerPhone: '923097666928',
    fuelType: 'Petrol',
    description: 'Responsive manual drive option, spacious trunk.',
    isVerified: false,
    withDriver: false
  }
];

function MarketplaceCarCard({ car, waUrl }: { car: RentalCar; waUrl: string }) {
  const images = car.images && car.images.length > 0 ? car.images : [car.imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
    <div
      className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full opacity-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Media Header - CAROUSEL */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
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

        {/* Carousel Navigation (Hidden until hover on Desktop, visible on Mobile swipe theoretically) */}
        {images.length > 1 && (
          <>
            <div className={`absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={prevImage}
                className="bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-sm transition-all transform hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-sm transition-all transform hover:scale-110"
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
        
        {/* Availability Label Tag */}
        <span className={`absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
          car.status === 'Available'
            ? 'bg-green-600 text-white'
            : 'bg-amber-500 text-white'
        }`}>
          {car.status}
        </span>

        {/* City Hub Indicator */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm">
          <MapPin className="w-3 h-3 text-red-500" />
          <span>{car.city}</span>
        </div>
      </div>

      {/* Meta Body Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-tight group-hover:text-red-700 transition-colors">
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
            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg">
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
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-xs font-black text-gray-400">PKR</span>
              <span className="text-xl font-black text-gray-950 font-mono tracking-tight">{car.rentPrice}</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mt-1.5">Per {car.rentUnit.toUpperCase()}</span>
          </div>

          {/* Direct WhatsApp Call to Action */}
          <a 
            href={waUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4.5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-lg shadow-green-100 cursor-pointer transform hover:scale-105 active:scale-95"
            title="Contact owner on WhatsApp"
          >
            <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
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
  const cities = ['All Cities', 'Faisalabad', 'Lahore', 'Islamabad', 'Karachi'];

  const CITY_AREAS: Record<string, string[]> = {
    'Faisalabad': ['Peoples Colony', 'D-Ground', 'Canal Road', 'Samanabad', 'Sargodha Road'],
    'Lahore': ['DHA', 'Gulberg', 'Johar Town', 'Bahria Town', 'Model Town'],
    'Islamabad': ['Blue Area', 'F-7', 'G-11', 'DHA Phase 2', 'E-7'],
    'Karachi': ['Clifton', 'DHA', 'Gulshan-e-Iqbal', 'North Nazimabad']
  };

  const reloadInventory = () => {
    let approvedList: RentalCar[] = [];
    const savedApproved = localStorage.getItem('approved_cars');
    if (savedApproved) {
      try {
        approvedList = JSON.parse(savedApproved);
      } catch (e) {
        approvedList = [];
      }
    }

    // Also fall back to loading from standard rental_cars if approved_cars doesn't exist
    // to preserve cross-tab compatibility
    const savedRentalCars = localStorage.getItem('rental_cars');
    let baseList = GENERAL_DEFAULT_CARS;
    if (savedRentalCars) {
      try {
        const parsedRentals = JSON.parse(savedRentalCars);
        if (Array.isArray(parsedRentals) && parsedRentals.length > 0) {
          // Map standard rental cars to make sure they have owners
          baseList = parsedRentals.map(car => ({
            ...car,
            ownerName: car.ownerName || 'Smart Drive Partner',
            ownerPhone: car.ownerPhone || '923097666928',
            fuelType: car.fuelType || 'Petrol',
            description: car.description || 'Pristine rental fleet vehicle.'
          }));
        }
      } catch (err) {
        // use default
      }
    } else {
      localStorage.setItem('rental_cars', JSON.stringify(GENERAL_DEFAULT_CARS));
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

    setCars(uniqueCars);
  };

  useEffect(() => {
    reloadInventory();

    // Listen for storage changes in the browser (cross tabs, modal submissions or admin approvals)
    window.addEventListener('storage', reloadInventory);
    window.addEventListener('pending_cars_updated', reloadInventory);
    
    return () => {
      window.removeEventListener('storage', reloadInventory);
      window.removeEventListener('pending_cars_updated', reloadInventory);
    };
  }, []);

  const filteredCars = cars.filter(car => {
    // 1. Search Query
    const searchString = `${car.name} ${car.description || ''} ${car.fuelType || ''} ${car.transmission}`.toLowerCase();
    const searchMatch = !searchQuery || searchString.includes(searchQuery.toLowerCase());

    // 2. City Filter
    const cityMatch = activeCity === 'All Cities' || car.city.toLowerCase() === activeCity.toLowerCase();
    
    // 3. Area Filter
    const areaMatch = !selectedArea || (car.description || '').toLowerCase().includes(selectedArea.toLowerCase());

    // 4. Price filter
    let priceMatch = true;
    const priceNum = parseInt(car.rentPrice.replace(/,/g, '')) || 0;
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
    const message = `Hi, I am interested in renting your ${car.name} listed on the Driving & Rental platform.`;
    return `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100 font-sans" id="rental-marketplace">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketplace Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-650 font-black text-xs uppercase tracking-widest bg-red-50 border border-red-100 px-4 py-1.5 rounded-full">
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
              <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-red-300 hover:bg-white transition-all duration-300 px-4 py-3 sm:py-4 focus-within:!bg-white focus-within:!border-red-500 focus-within:ring-4 focus-within:ring-red-500/10 group shadow-sm h-full">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-red-600 group-focus-within:scale-110 transition-all shrink-0" />
                <input
                  type="text"
                  placeholder="Enter brand or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-bold text-gray-900 placeholder:text-gray-400 w-full ml-3"
                />
              </div>

              {/* Filter 2: Main Hub */}
              <div className="relative flex flex-col justify-center bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-red-300 hover:bg-white transition-all px-4 py-3 sm:py-0 h-14 sm:h-[4.5rem] cursor-pointer group focus-within:!bg-white focus-within:!border-red-500 focus-within:ring-4 focus-within:ring-red-500/10 shadow-sm">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
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
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-red-500 transition-colors" />
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
                <Search className="w-4 h-4 text-red-500 flex-shrink-0" />
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
                className="text-[10px] font-black uppercase text-red-600 hover:text-red-700 transition-colors cursor-pointer tracking-widest flex items-center gap-1.5 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md"
              >
                <X className="w-3.5 h-3.5" /> Reset Array
              </button>
            )}
          </div>
        </div>

        {/* Marketplace Dynamic Grid */}
        <div>
          {filteredCars.length === 0 ? (
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
                <MarketplaceCarCard key={car.id} car={car} waUrl={getWhatsAppLink(car)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
