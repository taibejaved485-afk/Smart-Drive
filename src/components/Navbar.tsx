import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Car, Plus, Check, ChevronRight, User, ShieldCheck, Mail, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRESET_CAR_IMAGE_OPTIONS = [
  {
    url: 'https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600',
    label: 'White Luxury Sedan (Honda Civic Style)'
  },
  {
    url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    label: 'Modern Compact Car (Toyota Yaris Style)'
  },
  {
    url: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600',
    label: 'Premium Blue Sedan (Elantra/Corolla)'
  },
  {
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    label: 'Sports Coupe Crossover'
  },
  {
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
    label: 'Sleek Dark Premium Hatchback'
  },
  {
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    label: 'Rugged SUV Crossover'
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showListCarModal, setShowListCarModal] = useState(false);
  const [step, setStep] = useState(1);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerCity: 'Faisalabad',
    name: '',
    transmission: 'Automatic' as 'Automatic' | 'Manual',
    fuelType: 'Petrol' as 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric',
    city: 'Faisalabad',
    rentPrice: '',
    rentUnit: 'Day' as 'Day' | 'Hour',
    description: '',
    imageUrl: PRESET_CAR_IMAGE_OPTIONS[0].url
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Rent Car', path: '/rentals' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.ownerName.trim() || !formData.ownerPhone.trim()) {
        alert('Please fill out your name and phone number to continue.');
        return;
      }
    } else if (step === 2) {
      if (!formData.name.trim()) {
        alert('Please enter your Car Model Name and Year.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const cleanPhoneForWhatsApp = (phone: string): string => {
    // Standardizes Pakistani phone input to international format
    let cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '92' + cleaned.substring(1);
    } else if (cleaned.startsWith('3')) {
      cleaned = '92' + cleaned;
    }
    return cleaned || '923097666928'; // Default fallback safely
  };

  const handleSubmitOwnerCar = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.rentPrice.trim()) {
      alert('Please specify the rent rate.');
      return;
    }

    const sanitizedPrice = formData.rentPrice.replace(/,/g, '').trim();
    const parsedPrice = parseFloat(sanitizedPrice);
    if (isNaN(parsedPrice)) {
      alert('Please enter a valid price number.');
      return;
    }

    const cleanedPhone = cleanPhoneForWhatsApp(formData.ownerPhone);

    const newOwnerCar = {
      id: 'owner-' + Date.now().toString(),
      name: formData.name,
      ownerName: formData.ownerName,
      ownerPhone: cleanedPhone,
      displayPhone: formData.ownerPhone,
      ownerCity: formData.ownerCity,
      transmission: formData.transmission,
      fuelType: formData.fuelType,
      city: formData.city,
      rentPrice: parsedPrice.toLocaleString(),
      rentUnit: formData.rentUnit,
      description: formData.description || 'Stunning family car listed by registered local owner. Perfect mechanical running order, fully functional AC, comfortable layout.',
      imageUrl: formData.imageUrl,
      status: 'Available' as 'Available' | 'Booked',
      createdAt: new Date().toISOString(),
      approved: false
    };

    // Store in LocalStorage pending_cars
    try {
      const existingPending = localStorage.getItem('pending_cars');
      const pendingList = existingPending ? JSON.parse(existingPending) : [];
      pendingList.unshift(newOwnerCar);
      localStorage.setItem('pending_cars', JSON.stringify(pendingList));

      // Dispatch global storage state updates
      window.dispatchEvent(new Event('pending_cars_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Failed to write car to pending list', err);
    }

    setSubmissionComplete(true);
  };

  const resetListingForm = () => {
    setShowListCarModal(false);
    setSubmissionComplete(false);
    setStep(1);
    setFormData({
      ownerName: '',
      ownerPhone: '',
      ownerCity: 'Faisalabad',
      name: '',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      city: 'Faisalabad',
      rentPrice: '',
      rentUnit: 'Day',
      description: '',
      imageUrl: PRESET_CAR_IMAGE_OPTIONS[0].url
    });
  };

  return (
    <>
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="font-display font-black text-2xl text-red-600 flex items-center gap-1.5 leading-none tracking-tight">
              <span>SMART</span>
              <span className="text-gray-950 font-extrabold text-xl">DRIVE</span>
            </Link>
            
            <div className="hidden lg:flex space-x-6 font-sans font-medium text-sm text-gray-700">
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} className="hover:text-red-600 transition tracking-wide text-uppercase">{link.name.toUpperCase()}</Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={() => {
                  setStep(1);
                  setSubmissionComplete(false);
                  setShowListCarModal(true);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-750 hover:to-red-800 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-md text-xs uppercase tracking-wider cursor-pointer transform hover:scale-102 active:scale-98"
                type="button"
                id="list-car-nav-btn"
              >
                <Car className="w-4 h-4" /> List Your Car / Earn with Us
              </button>
              <button 
                onClick={() => { window.location.href = 'tel:03001115429'; }}
                className="flex items-center gap-2 text-gray-800 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-xl font-bold transition text-xs uppercase tracking-wider cursor-pointer"
                type="button"
              >
                <Phone className="w-4 h-4" /> 03001115429
              </button>
            </div>

            <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden bg-white px-4 pt-2 pb-5 space-y-3.5 border-t font-sans text-sm font-medium text-gray-700">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="block hover:text-red-600 border-b border-gray-50 pb-1.5">{link.name}</Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setStep(1);
                  setSubmissionComplete(false);
                  setShowListCarModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-650 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition text-xs uppercase tracking-wider cursor-pointer"
                type="button"
              >
                <Car className="w-4.5 h-4.5" /> List Your Car
              </button>
              <button 
                onClick={() => { window.location.href = 'tel:03001115429'; }}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-bold transition text-xs uppercase tracking-wider cursor-pointer"
                type="button"
              >
                <Phone className="w-4.5 h-4.5" /> Call support
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* MULTI-STEP CAR OWNER REGISTRATION DIALOG MODAL */}
      <AnimatePresence>
        {showListCarModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-150 flex flex-col my-8 font-sans max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Onboard Your Vehicle</h2>
                    <p className="text-xs text-gray-500 font-medium">Earn daily rent by listing your inactive car</p>
                  </div>
                </div>
                <button 
                  onClick={resetListingForm}
                  className="p-2 hover:bg-gray-200 text-gray-400 hover:text-gray-700 rounded-full transition cursor-pointer"
                  title="Close portal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps Indicator */}
              {!submissionComplete && (
                <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between text-xs sm:text-sm font-bold shrink-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= 1 ? 'bg-red-650 text-white' : 'bg-gray-150 text-gray-500'}`}>1</span>
                    <span className={step >= 1 ? 'text-gray-800' : 'text-gray-400 font-medium'}>Owner Info</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= 2 ? 'bg-red-650 text-white' : 'bg-gray-150 text-gray-500'}`}>2</span>
                    <span className={step >= 2 ? 'text-gray-800' : 'text-gray-400 font-medium'}>Car Specs</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= 3 ? 'bg-red-650 text-white' : 'bg-gray-150 text-gray-500'}`}>3</span>
                    <span className={step >= 3 ? 'text-gray-800' : 'text-gray-400 font-medium'}>Pricing & Terms</span>
                  </div>
                </div>
              )}

              {/* Modal Body Scroll Container */}
              <div className="p-6 md:p-8 overflow-y-auto flex-grow">
                {submissionComplete ? (
                  /* Success Screen */
                  <div className="text-center py-10 px-4 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 leading-snug">Registration Submitted!</h3>
                    <p className="text-sm text-gray-600 max-w-md mx-auto mt-3 leading-relaxed">
                      Zabardast! Your car listing has been sent to the portal administrator for verification. Once approved, local customers in <strong className="text-red-650">{formData.city}</strong> will be able to contact you directly on your WhatsApp number.
                    </p>
                    <div className="bg-gray-50 border rounded-2xl p-4 w-full max-w-sm mt-6 text-left text-xs space-y-2 font-medium">
                      <div className="flex justify-between"><span className="text-gray-400">Owner Name:</span> <span className="font-bold text-gray-800">{formData.ownerName}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Car Model:</span> <span className="font-bold text-gray-800">{formData.name}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Monthly Est. Earnings:</span> <span className="font-extrabold text-green-600 font-mono">PKR {(parseInt(formData.rentPrice.replace(/,/g, '')) * 26 || 150000).toLocaleString()}/mo</span></div>
                    </div>
                    <button 
                      onClick={resetListingForm}
                      className="mt-8 bg-gray-900 hover:bg-gray-850 text-white px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition cursor-pointer"
                      type="button"
                    >
                      Done & Return
                    </button>
                  </div>
                ) : (
                  /* Render Active Step Forms */
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                    {step === 1 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3.5 mb-4 text-blue-800 text-xs sm:text-sm font-semibold leading-relaxed">
                          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <p>
                            Verify that your WhatsApp number is accurate. When customers are interested, they will initiate an instant chat with you using this phone number.
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">Owner Full Name *</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><User className="w-4 h-4" /></span>
                            <input 
                              required
                              type="text" 
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-medium" 
                              placeholder="e.g. Muhammad Ahmad Malik" 
                              value={formData.ownerName} 
                              onChange={e => setFormData({...formData, ownerName: e.target.value})} 
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">WhatsApp Number *</label>
                            <input 
                              required
                              type="tel" 
                              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-mono font-bold" 
                              placeholder="e.g. 03097666928" 
                              value={formData.ownerPhone} 
                              onChange={e => setFormData({...formData, ownerPhone: e.target.value})} 
                            />
                            <p className="text-[10px] text-gray-400 mt-1">Starting with 03xx or international code</p>
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">Your Hometown City *</label>
                            <select 
                              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-medium"
                              value={formData.ownerCity}
                              onChange={e => setFormData({...formData, ownerCity: e.target.value})}
                            >
                              <option value="Faisalabad">Faisalabad (فیصل آباد)</option>
                              <option value="Lahore">Lahore (لاہور)</option>
                              <option value="Islamabad">Islamabad (اسلام آباد)</option>
                              <option value="Karachi">Karachi (کراچی)</option>
                              <option value="Peshawar">Peshawar (پشاور)</option>
                              <option value="Multan">Multan (ملتان)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">Car Model Name & Year *</label>
                          <input 
                            required
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-medium" 
                            placeholder="e.g. Honda City Aspire 1.5 CVT (2023)" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})} 
                          />
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">Transmission *</label>
                            <select 
                              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-medium"
                              value={formData.transmission}
                              onChange={e => setFormData({...formData, transmission: e.target.value as 'Automatic' | 'Manual'})}
                            >
                              <option value="Automatic">Automatic (آٹو)</option>
                              <option value="Manual">Manual (مینول)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">Fuel Type *</label>
                            <select 
                              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-medium"
                              value={formData.fuelType}
                              onChange={e => setFormData({...formData, fuelType: e.target.value as any})}
                            >
                              <option value="Petrol">Petrol</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="Electric">Electric</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">Availability Hub *</label>
                            <select 
                              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-medium"
                              value={formData.city}
                              onChange={e => setFormData({...formData, city: e.target.value})}
                            >
                              <option value="Faisalabad">Faisalabad</option>
                              <option value="Lahore">Lahore</option>
                              <option value="Islamabad">Islamabad</option>
                              <option value="Karachi">Karachi</option>
                            </select>
                          </div>
                        </div>

                        {/* Image Presets Selector */}
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl mt-4">
                          <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Select Car Visual Representation</label>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {PRESET_CAR_IMAGE_OPTIONS.map((imgUrl, idx) => {
                              const isSelected = formData.imageUrl === imgUrl.url;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setFormData({...formData, imageUrl: imgUrl.url})}
                                  className={`aspect-video rounded-xl overflow-hidden border-2 relative transition ${isSelected ? 'border-red-650 scale-95 ring-2 ring-red-100' : 'border-transparent opacity-80 hover:opacity-100'}`}
                                  title={imgUrl.label}
                                >
                                  <img src={imgUrl.url} className="w-full h-full object-cover" alt="Car Visual Option" />
                                  {isSelected && (
                                    <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center">
                                      <span className="bg-red-600 text-white p-0.5 rounded-full"><Check className="w-3 h-3 stroke-[3]" /></span>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {formData.imageUrl && (
                            <p className="text-[10px] text-gray-500 mt-2 font-mono truncate">Selected Asset: {formData.imageUrl}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">Rental price (PKR) *</label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold font-mono text-gray-500">PKR</span>
                              <input 
                                required
                                type="text" 
                                className="w-full pl-13 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-mono font-extrabold" 
                                placeholder="e.g. 7,000" 
                                value={formData.rentPrice} 
                                onChange={e => setFormData({...formData, rentPrice: e.target.value})} 
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">Billing Interval *</label>
                            <select 
                              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-medium"
                              value={formData.rentUnit}
                              onChange={e => setFormData({...formData, rentUnit: e.target.value as 'Day' | 'Hour'})}
                            >
                              <option value="Day">Per Day (روزانہ)</option>
                              <option value="Hour">Per Hour (گھنٹہ)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">Owner Description / Rental Terms *</label>
                          <textarea 
                            required
                            rows={3} 
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-medium resize-none leading-relaxed" 
                            placeholder="Zabardast automatic sedan in pristine mechanical shape. Available with or without driver inside Faisalabad. Car is fully clean, features cold climate control." 
                            value={formData.description} 
                            onChange={e => setFormData({...formData, description: e.target.value})} 
                          />
                        </div>

                        <div className="border border-dashed border-red-200 bg-red-50/50 p-4 rounded-2xl flex items-start gap-3 text-xs leading-relaxed text-red-800 font-medium">
                          <input type="checkbox" required className="mt-1 shrink-0 accent-red-650 cursor-pointer" id="agree-terms" />
                          <label htmlFor="agree-terms" className="cursor-pointer select-none">
                            I confirm that the vehicle details, registration documents, and rental parameters supplied are authentic and comply with Smart Drive marketplace guidelines. I authorize customer contact via WhatsApp.
                          </label>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>

              {/* Footer navigation */}
              {!submissionComplete && (
                <div className="p-5 sm:p-6 border-t border-gray-100 flex justify-between bg-gray-50 shrink-0">
                  <button 
                    onClick={handlePrevStep}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 transition cursor-pointer ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    type="button"
                  >
                    Back
                  </button>

                  {step < 3 ? (
                    <button 
                      onClick={handleNextStep}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 transition shadow-md cursor-pointer"
                      type="button"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={handleSubmitOwnerCar}
                      className="bg-green-600 hover:bg-green-700 text-white px-7 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-md shadow-green-100 flex items-center gap-1.5 cursor-pointer"
                      type="button"
                    >
                      Onboard My Car <Check className="w-4 h-4 stroke-[3]" />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

