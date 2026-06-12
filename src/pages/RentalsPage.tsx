import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import EarningsCalculator from '../components/EarningsCalculator';
import { CarRequestsForm, CarRequestsGrid } from '../components/CarRequestsDirectory';
import { Car, MapPin, Calendar, Sliders, CheckCircle2, ShieldCheck, X, Phone, DollarSign, Clock, HelpCircle, Filter, Sparkles, ChevronLeft, ChevronRight, Search, ChevronDown, Check, Users } from 'lucide-react';

interface RentalCar {
  id: string;
  name: string;
  transmission: 'Automatic' | 'Manual';
  rentPrice: string; // e.g. "6500" or "12000"
  rentUnit: 'Day' | 'Hour';
  imageUrl: string;
  images?: string[];
  city: string; // e.g. Faisalabad, Lahore, Islamabad, Karachi
  status: 'Available' | 'Booked';
  type: 'Economy' | 'Sedan' | 'Luxury';
  isVerified?: boolean;
  registrationNumber?: string;
  ownerName?: string;
  ownerPhone?: string;
  fuelType?: string;
  description?: string;
  withDriver?: boolean;
  area?: string;
}

const DEFAULT_RENTAL_CARS: RentalCar[] = [
  {
    id: 'rc-1',
    name: 'Honda Civic Pro (VTEC)',
    transmission: 'Automatic',
    rentPrice: '12,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600',
    city: 'Faisalabad',
    status: 'Available',
    type: 'Sedan',
    isVerified: true,
    registrationNumber: 'FSD-22-6710'
  },
  {
    id: 'rc-2',
    name: 'Toyota Yaris Ativ',
    transmission: 'Automatic',
    rentPrice: '6,500',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    city: 'Lahore',
    status: 'Available',
    type: 'Sedan',
    isVerified: true,
    registrationNumber: 'LHR-21-9954'
  },
  {
    id: 'rc-3',
    name: 'Toyota Corolla Altis',
    transmission: 'Manual',
    rentPrice: '7,500',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600',
    city: 'Islamabad',
    status: 'Booked',
    type: 'Sedan',
    isVerified: false,
    registrationNumber: 'ICT-18-5002'
  },
  {
    id: 'rc-4',
    name: 'Suzuki Swift GLX',
    transmission: 'Automatic',
    rentPrice: '5,500',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
    city: 'Karachi',
    status: 'Available',
    type: 'Economy',
    isVerified: true,
    registrationNumber: 'KHI-23-4551'
  },
  {
    id: 'rc-5',
    name: 'Hyundai Elantra GLS',
    transmission: 'Automatic',
    rentPrice: '9,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    city: 'Lahore',
    status: 'Available',
    type: 'Sedan',
    isVerified: true,
    registrationNumber: 'LHR-22-3810'
  },
  {
    id: 'rc-6',
    name: 'Honda City Aspire',
    transmission: 'Manual',
    rentPrice: '6,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    city: 'Faisalabad',
    status: 'Available',
    type: 'Economy',
    isVerified: false,
    registrationNumber: 'FSD-19-4402'
  },
  {
    id: 'rc-7',
    name: 'Toyota Fortuner Legender',
    transmission: 'Automatic',
    rentPrice: '45,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    city: 'Islamabad',
    status: 'Available',
    type: 'Luxury',
    isVerified: true,
    registrationNumber: 'ICT-23-4001',
    fuelType: 'Diesel'
  },
  {
    id: 'rc-8',
    name: 'Mercedes Benz C-Class',
    transmission: 'Automatic',
    rentPrice: '38,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    city: 'Lahore',
    status: 'Available',
    type: 'Luxury',
    isVerified: true,
    registrationNumber: 'LHR-22-9901',
    fuelType: 'Petrol'
  }
];

function CarImageCarousel({ car }: { car: RentalCar }) {
  const images = car.images && car.images.length > 0 ? car.images : [car.imageUrl];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full h-full relative group/carousel">
      <img 
        src={images[currentIndex] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'} 
        alt={`${car.name} - View ${currentIndex + 1}`} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {images.length > 1 && (
        <>
          <button 
            type="button" 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-sm shadow-md cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            type="button" 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-sm shadow-md cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
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
  
  // Booking modal state
  const [selectedCar, setSelectedCar] = useState<RentalCar | null>(null);
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingDuration, setBookingDuration] = useState<number>(3);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Load cars from localStorage, or seed default data
  useEffect(() => {
    const savedCars = localStorage.getItem('rental_cars');
    if (savedCars) {
      try {
        const parsed = JSON.parse(savedCars);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCars(parsed);
        } else {
          setCars(DEFAULT_RENTAL_CARS);
          localStorage.setItem('rental_cars', JSON.stringify(DEFAULT_RENTAL_CARS));
        }
      } catch (e) {
        setCars(DEFAULT_RENTAL_CARS);
        localStorage.setItem('rental_cars', JSON.stringify(DEFAULT_RENTAL_CARS));
      }
    } else {
      setCars(DEFAULT_RENTAL_CARS);
      localStorage.setItem('rental_cars', JSON.stringify(DEFAULT_RENTAL_CARS));
    }
  }, []);

  // Listen for storage changes in case admin updates cars in background
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCars = localStorage.getItem('rental_cars');
      if (savedCars) {
        try {
          const parsed = JSON.parse(savedCars);
          if (Array.isArray(parsed)) {
            setCars(parsed);
          }
        } catch (e) {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Unique list of cities for filtration tabs
  const cities = ['All Cities', 'Faisalabad', 'Lahore', 'Islamabad', 'Karachi'];
  
  const CITY_AREAS: Record<string, string[]> = {
    'Faisalabad': ['Peoples Colony', 'D-Ground', 'Canal Road', 'Samanabad', 'Sargodha Road'],
    'Lahore': ['DHA', 'Gulberg', 'Johar Town', 'Bahria Town', 'Model Town'],
    'Islamabad': ['Blue Area', 'F-7', 'G-11', 'DHA Phase 2', 'E-7'],
    'Karachi': ['Clifton', 'DHA', 'Gulshan-e-Iqbal', 'North Nazimabad']
  };

  const filteredCars = cars.filter(car => {
    // 1. Search filter
    const searchString = `${car.name} ${car.description || ''} ${car.type} ${car.transmission}`.toLowerCase();
    const matchesSearch = !searchQuery || searchString.includes(searchQuery.toLowerCase());

    // 2. City Filter
    const matchesCity = selectedCity === 'All Cities' || car.city.toLowerCase() === selectedCity.toLowerCase();
    
    // 3. Area Filter
    const matchesArea = !selectedArea || car.area === selectedArea || (car.description || '').includes(selectedArea);

    // 4. Price Filter
    let matchesPrice = true;
    const priceNum = parseInt(car.rentPrice.replace(/,/g, '')) || 0;
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
      
      // Also trigger a storage event so other open tabs update
      window.dispatchEvent(new Event('storage'));

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
    const message = `Hi, I am interested in renting your ${car.name} listed on the Driving & Rental platform.`;
    return `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    "name": "Smart Drive Car Rental Fleet Pakistan",
    "description": "Rent premium Honda Civic, Toyota Yaris, or Suzuki Swift manual or automatic cars for practice sessions, driving test preparation, or personal travel in Lahore, Faisalabad, Islamabad, and Karachi.",
    "url": "https://smartdrivefd.com/rentals"
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Rent a Car for Driving Practice & Travel | Smart Drive"
        description="Browse our luxury and economy manual/automatic car rental fleet in Faisalabad, Lahore, Islamabad, and Karachi. High-end rentals starting from 5,500 PKR with smooth booking."
        keywords="car rental for driving test, rent car Faisalabad, rent driving practice car Lahore, automatic car rental Islamabad, manual transmission car rent, car rental packages Pakistan"
        schema={schema}
      />
      <Navbar />

      {/* Hero Header */}
      <section className="relative py-24 bg-gray-950 text-white overflow-hidden bg-[url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gray-950/85"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 font-extrabold tracking-widest text-xs uppercase mb-3"
          >
            Premium Transport Fleet
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Rent a Car for Practice or Travel
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Learn to drive on public roads, pass your driver's licensing test, or enjoy comfortable weekend rentals in major Pakistani cities.
          </motion.p>
        </div>
      </section>

      {/* INTERACTIVE INCOME CALCULATOR COMPONENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16 relative z-20 animate-fade-in">
        <EarningsCalculator />
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
                    ? 'bg-white text-indigo-700 shadow-sm border border-gray-150' 
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
              <span className="text-red-650 font-black tracking-wider text-xs uppercase block mb-2">Our Vehicle Fleet</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-none">
                Select Your Desired Transmission & City
              </h2>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                We provide premium manual and automatic cars equipped with dual auxiliary passenger controls upon practice request to ensure 100% security during your road session. Select your preferred location below.
              </p>
            </div>

            {/* Quick trust seals */}
            <div className="flex items-center gap-4 shrink-0 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="bg-red-50 p-2.5 rounded-xl text-red-600">
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
              <div className="relative flex items-center bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors px-4 py-3 sm:py-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-500 group">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors shrink-0" />
                <input
                  type="text"
                  placeholder="Search car brand or model (e.g. Civic, Alto)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-bold text-gray-900 placeholder:text-gray-400 w-full ml-3"
                />
              </div>

              {/* Column 2: Main City */}
              <div className="relative flex flex-col justify-center bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors px-4 py-2 sm:py-3 cursor-pointer group focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-500">
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
              <div className={`relative flex flex-col justify-center bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 transition-colors px-4 py-2 sm:py-3 cursor-pointer group ${selectedCity !== 'All Cities' && selectedCity ? 'hover:border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-500' : 'opacity-60 cursor-not-allowed'}`}>
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
                    className="text-[10px] font-black uppercase text-red-650 hover:text-red-750 transition-colors cursor-pointer tracking-wider flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Clear All Filters
                  </button>
                )}
             </div>
          </div>

          {/* Cars Grid */}
          <div>
            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto my-8">
                <div className="w-16 h-16 bg-red-50 text-red-650 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No cars available in {selectedCity} at the moment</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                  We are constantly updating our Pakistani regional fleets. Please contact our support office or choose another major city to browse available cars.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <button 
                    onClick={() => {
                      setSelectedCity('');
                      setSelectedArea('');
                    }}
                    type="button"
                    className="bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all cursor-pointer"
                  >
                    See All Cities
                  </button>
                  <a 
                    href="tel:03097666928"
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Support
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car) => {
                  const isAvailable = car.status === 'Available';
                  return (
                    <div
                      key={car.id}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between opacity-100"
                    >
                      {/* Card Image and City Badge */}
                      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden group">
                        <CarImageCarousel car={car} />
                        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10 pointer-events-none">
                          <span className="bg-gray-900/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-md">
                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                            {car.city}
                          </span>
                          {car.isVerified && (
                            <span className="bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-md border border-emerald-500/30">
                              <ShieldCheck className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                              Verified Car
                            </span>
                          )}
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md ${
                            isAvailable 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-red-50 text-red-750 border border-red-100'
                          }`}>
                            {car.status}
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
                              <span className="flex items-center gap-1 text-red-650 bg-red-50 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase">
                                <Sliders className="w-3.5 h-3.5 text-red-500" /> Dual-Control
                              </span>
                            )}
                          </div>

                          {/* Vetted Landlord Reference details */}
                          <div className="bg-gray-55 border border-gray-150 rounded-2xl p-3.5 my-3 flex flex-col gap-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-400 font-medium">Vetted Owner:</span>
                              <span className="font-extrabold text-gray-800 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                {car.ownerName || 'Smart Drive Partner'}
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
                                href={getWhatsAppLink(car)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-[#25D366] hover:bg-[#128C7E] text-white p-2.5 rounded-xl flex items-center justify-center transition shadow-lg shadow-green-100 cursor-pointer sm:px-3.5"
                                title="Contact owner on WhatsApp"
                              >
                                <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span className="hidden xs:inline-block font-extrabold text-[10px] ml-1 uppercase">WhatsApp</span>
                              </a>
                            )}
                            <button
                              onClick={() => handleOpenBooking(car)}
                              type="button"
                              disabled={!isAvailable}
                              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                                isAvailable 
                                  ? 'bg-red-650 text-white hover:bg-red-700 hover:shadow-md shadow-sm' 
                                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                              }`}
                            >
                              {isAvailable ? 'Book' : 'Booked'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Driving School Practices Note */}
          <div className="mt-16 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-650 shrink-0">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-gray-950 mb-1">Are you an absolute beginner with zero road experience?</h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
                We strongly recommend joining our <a href="/programs" className="text-red-650 underline font-bold">10-day intensive driving courses</a> first. Our instructors provide fully certified manual and automatic gear coaching on official, dual-clutch training vehicles with systematic supervision to teach defense maneuvers prior to renting private practice models.
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
                  <span className="text-[9px] uppercase font-black bg-red-600 px-2 py-0.5 rounded tracking-widest">Booking Request</span>
                  <h3 className="font-extrabold text-xl mt-1 tracking-tight">{selectedCar.name}</h3>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {bookingSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">Booking Request Logged!</h4>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                      Assigned dynamic rental vehicle <strong className="text-red-650">{selectedCar.name}</strong> for <strong className="text-gray-900">{bookingDuration} Days</strong>. Our Faisalabad branch desk officer will call you shortly on <strong>{bookingPhone}</strong> to schedule vehicle pickup.
                    </p>
                    <div className="text-xs text-gray-400 bg-gray-50 p-2.5 rounded-xl border max-w-xs mx-auto">
                      Assigned Location: <strong>{selectedCar.city} Office Hub</strong>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={submitBooking} className="space-y-4">
                    
                    {/* Car Rates details bar */}
                    <div className="bg-gray-50 p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-gray-600">Location Area:</span>
                      <span className="font-extrabold text-gray-900 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500" /> {selectedCar.city} Office
                      </span>
                    </div>

                    <div className="bg-red-50/55 p-3 rounded-xl border border-red-100 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-red-800">Price Rate:</span>
                      <span className="font-black text-red-650">
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
                        className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
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
                        className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition font-mono"
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
                          className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition font-mono"
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
                          className="w-full border border-gray-300 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition font-mono"
                        />
                      </div>
                    </div>

                    {/* Total Price Estimate */}
                    {bookingDuration > 0 && (
                      <div className="bg-gray-900 text-white rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Total Rent Estimate</p>
                          <p className="text-xl font-black text-red-500">
                            PKR {(parseInt(selectedCar.rentPrice.replace(/,/g, '')) * bookingDuration).toLocaleString()}
                          </p>
                        </div>
                        <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-md text-gray-300 max-w-[120px] text-right font-medium">
                          Calculated for {bookingDuration} {selectedCar.rentUnit || 'Day'}s
                        </span>
                      </div>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold uppercase tracking-widest text-xs py-3.5 rounded-xl transition shadow-md shadow-red-200 cursor-pointer"
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

      <Footer />
    </div>
  );
}
