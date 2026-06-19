import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Bike, 
  Truck, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Sun, 
  CloudSun, 
  Sunset, 
  Check, 
  QrCode, 
  HelpCircle,
  TrendingDown
} from 'lucide-react';

const courses = {
  car_manual: {
    name: "Manual Car Driving",
    basePrice: 8000,
    icon: Car,
    tagline: "Total Clutch & Gears Control"
  },
  car_auto: {
    name: "Automatic Car Driving",
    basePrice: 10000,
    icon: Car,
    tagline: "Effortless & Smooth Urban Cruising"
  },
  motorbike: {
    name: "Motorbike Riding",
    basePrice: 4000,
    icon: Bike,
    tagline: "Learn Safety & Balancing Fast"
  },
  ltv: {
    name: "LTV (Commercial/Jeep)",
    basePrice: 12000,
    icon: Truck,
    tagline: "Commercial Vehicle Authorization"
  }
};

const durations = [
  { 
    id: '7_days', 
    name: 'Express Crash Course (7 Days)', 
    multiplier: 0.8, 
    description: 'Intensive high-speed sessions for quick learners',
    icon: Zap,
    tag: "Saver Deal (-20%)"
  },
  { 
    id: '15_days', 
    name: 'Standard Regular Course (15 Days)', 
    multiplier: 1.0, 
    description: 'Highly recommended for complete beginners',
    icon: Calendar,
    tag: "Most Popular"
  },
  { 
    id: '21_days', 
    name: 'Pro Defensive Course (21 Days)', 
    multiplier: 1.3, 
    description: 'Advanced defensive driving & tricky reverse parking',
    icon: ShieldCheck,
    tag: "Complete Mastery"
  }
];

const timings = [
  { id: 'morning', name: 'Morning (08:00 AM - 12:00 PM)', surcharge: 0, icon: Sun },
  { id: 'afternoon', name: 'Afternoon (12:00 PM - 04:00 PM)', surcharge: 0, icon: CloudSun },
  { id: 'evening', name: 'Evening (04:00 PM - 08:00 PM)', surcharge: 500, icon: Sunset } // Evening slots often have high demand
];

export default function CoursePlanner() {
  const [selectedCourse, setSelectedCourse] = useState<'car_manual' | 'car_auto' | 'motorbike' | 'ltv'>('car_manual');
  const [selectedDuration, setSelectedDuration] = useState('15_days');
  const [selectedTiming, setSelectedTiming] = useState('morning');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // GoDriveify Official WhatsApp (Aap isey change kar sakte hain)
  const WHATSAPP_NUMBER = "03097666928"; // Replace with real phone number with country code

  useEffect(() => {
    const base = courses[selectedCourse].basePrice;
    const durMultiplier = durations.find(d => d.id === selectedDuration)?.multiplier || 1.0;
    const timingSurcharge = timings.find(t => t.id === selectedTiming)?.surcharge || 0;

    const calculatedPrice = Math.round((base * durMultiplier) + timingSurcharge);
    setTotalPrice(calculatedPrice);
  }, [selectedCourse, selectedDuration, selectedTiming]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone) {
      alert("Please enter your name and phone number to book!");
      return;
    }

    const courseDetails = courses[selectedCourse].name;
    const durationDetails = durations.find(d => d.id === selectedDuration)?.name || '';
    const timingDetails = timings.find(t => t.id === selectedTiming)?.name || '';

    // Create a beautifully formatted WhatsApp Message
    const message = `*🔥 NEW BOOKING REQUEST - GODRIVEIFY* 🚗💨\n\n` +
                    `*Student Name:* ${studentName}\n` +
                    `*Contact Number:* ${studentPhone}\n` +
                    `---------------------------------------\n` +
                    `*Selected Course:* ${courseDetails}\n` +
                    `*Duration:* ${durationDetails}\n` +
                    `*Preferred Shift:* ${timingDetails}\n` +
                    `---------------------------------------\n` +
                    `*Estimated Fee:* RS. ${totalPrice.toLocaleString()}/- PKR\n\n` +
                    `Please confirm my admission slot and guide me with the next steps! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="course-planner" className="py-24 bg-gradient-to-b from-white via-slate-50/40 to-white border-t border-slate-200/60 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF7112] bg-orange-100/50 border border-orange-200/40 px-4.5 py-2 rounded-2xl inline-flex items-center gap-1.5 mb-4 select-none">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7112]" /> Interactive Admissions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002060] tracking-tight">
            Plan & Estimate Your Driving Course
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
            Customize your vehicle preferences, calculate dynamic course fees based on durations or times, and book your verified slot immediately via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Customization Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Vehicle */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
              <label className="flex items-center gap-2.5 text-xs font-black text-[#002060] uppercase tracking-wider mb-5">
                <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs select-none">1</span>
                Choose Your Vehicle Class
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(courses).map(([key, value]) => {
                  const IconComponent = value.icon;
                  const isSelected = selectedCourse === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedCourse(key as any)}
                      className={`group relative p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                        isSelected
                          ? 'border-[#002060] bg-[#002060] text-white shadow-lg translate-y-[-2px]'
                          : 'border-slate-200/80 bg-white text-slate-700 hover:border-orange-500/50 hover:bg-slate-50/50'
                      }`}
                    >
                      {/* Selection Glow Indicator */}
                      {isSelected && (
                        <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-transparent rounded-bl-full pointer-events-none" />
                      )}

                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl transition-colors ${
                          isSelected ? 'bg-white/10 text-orange-400' : 'bg-slate-50 text-slate-500 group-hover:bg-orange-50 group-hover:text-[#FF7112]'
                        }`}>
                          <IconComponent className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div className="text-right">
                          <span className={`block text-[10px] font-black uppercase tracking-wider leading-none ${
                            isSelected ? 'text-orange-300' : 'text-slate-400'
                          }`}>
                            Base Price
                          </span>
                          <span className="block text-sm font-black mt-1">
                            Rs. {value.basePrice.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-extrabold text-sm leading-tight group-hover:text-[#FF7112] transition-colors">
                          {value.name}
                        </h4>
                        <p className={`text-[11px] mt-1 font-medium leading-normal ${
                          isSelected ? 'text-slate-300' : 'text-slate-400'
                        }`}>
                          {value.tagline}
                        </p>
                      </div>

                      {/* Spark select indicator */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Check className="w-3.5 h-3.5 text-[#FF7112]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Duration */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
              <label className="flex items-center gap-2.5 text-xs font-black text-[#002060] uppercase tracking-wider mb-5">
                <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs select-none">2</span>
                Select Course Duration
              </label>
              <div className="space-y-3.5">
                {durations.map((dur) => {
                  const Icon = dur.icon;
                  const isSelected = selectedDuration === dur.id;
                  const basePrice = courses[selectedCourse].basePrice;
                  const calculatedPrice = Math.round(basePrice * dur.multiplier);

                  return (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`relative w-full p-4.5 rounded-2xl border text-left transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:shadow-xs ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/30'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className={`p-2.5 rounded-xl mt-0.5 shrink-0 transition-colors ${
                          isSelected ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'
                        }`}>
                          <Icon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-extrabold text-[#002060]">
                              {dur.name}
                            </span>
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              dur.id === '7_days' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                : dur.id === '15_days'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                  : 'bg-orange-100 text-orange-850'
                            }`}>
                              {dur.tag}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 block mt-1 font-medium">{dur.description}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-slate-100/80 pt-2 sm:pt-0 shrink-0">
                        <div className="text-left sm:text-right">
                          <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Estimated cost</span>
                          <span className="block text-sm font-black text-slate-800">
                            Rs. {calculatedPrice.toLocaleString()} PKR
                          </span>
                        </div>
                        <span className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-all ${
                          isSelected ? 'border-orange-600 bg-orange-600' : 'border-slate-200'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Shift Timing */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
              <label className="flex items-center gap-2.5 text-xs font-black text-[#002060] uppercase tracking-wider mb-5">
                <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs select-none">3</span>
                Pick Your Training Time Slot
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {timings.map((time) => {
                  const Icon = time.icon;
                  const isSelected = selectedTiming === time.id;
                  return (
                    <button
                      key={time.id}
                      type="button"
                      onClick={() => setSelectedTiming(time.id)}
                      className={`p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center relative ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/20 shadow-xs font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className={`p-2 rounded-full mb-2 ${isSelected ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 block">{time.name.split(' (')[0]}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{time.name.split(' (')[1]?.replace(')', '') || ''}</span>
                      
                      {time.surcharge > 0 ? (
                        <span className="text-[9px] text-orange-600 font-extrabold mt-1.5 bg-orange-100/50 px-2 py-0.5 rounded-full block border border-orange-200/40">
                          +Rs. {time.surcharge} surcharge
                        </span>
                      ) : (
                        <span className="text-[9px] text-emerald-600 font-extrabold mt-1.5 bg-emerald-50 px-2 py-0.5 rounded-full block">
                          No extra surcharges
                        </span>
                      )}

                      {isSelected && (
                        <div className="absolute right-2 top-2">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full inline-block" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Side: Price Summary & Contact Info (Sticky Desktop Panel) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl lg:sticky lg:top-28 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <form onSubmit={handleBooking} className="space-y-6 relative z-10">
              <div>
                <h3 className="text-base font-black uppercase text-slate-100 tracking-wider mb-5 border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span>Admissions Voucher</span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold tracking-normal uppercase bg-slate-850 px-2 py-0.5 rounded-md">Draft Estimator</span>
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Vehicle Class:</span>
                    <strong className="text-slate-100 font-extrabold text-right">{courses[selectedCourse].name}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Course Course:</span>
                    <strong className="text-slate-100 font-extrabold text-right">{durations.find(d => d.id === selectedDuration)?.name.split(' (')[0]}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Preferred Shift:</span>
                    <strong className="text-slate-100 font-extrabold text-right">{timings.find(t => t.id === selectedTiming)?.name.split(' (')[0]}</strong>
                  </div>
                  
                  {/* Subtle Dotted Divider */}
                  <div className="border-t border-dashed border-slate-800 my-4" />
                </div>

                {/* Estimate Pricing display */}
                <div className="bg-gradient-to-r from-orange-600/90 to-orange-600 text-white rounded-2xl p-5 my-6 text-center shadow-lg shadow-orange-900/10 border border-orange-500/15">
                  <span className="text-[10px] text-orange-200 font-black tracking-widest uppercase block mb-1">
                    Estimated Course Fee
                  </span>
                  <span className="text-3xl font-black block tracking-tight">
                    Rs. {totalPrice.toLocaleString()} /-
                  </span>
                  <span className="text-[10px] text-orange-100 block mt-1.5 font-medium leading-normal opacity-90">
                    Includes certified instructor, fuel charges, and prep material.
                  </span>
                </div>
              </div>

              {/* Input Details */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold text-xs select-none">4</span>
                  Contact Information
                </h4>
                
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Your Full Name (e.g., Bilal Khan)"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/40 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-xs text-white placeholder-slate-500 transition-all"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="WhatsApp Phone No. (e.g., 03001234567)"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/40 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-xs text-white placeholder-slate-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4.5 rounded-2xl shadow-lg hover:shadow-emerald-600/10 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-xs uppercase tracking-wider relative group outline-none"
              >
                {/* Embedded dynamic glow effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.113.957 11.48.957 6.04 1.957 1.617 6.329 1.612 11.761c-.001 1.71.463 3.379 1.34 4.814l-.991 3.619 3.701-.984zM18.13 14.12c-.3-.15-1.77-.874-2.043-.974-.273-.1-.472-.15-.672.15s-.57.714-.7 1.154c-.13.44-.26.49-.56.34-.3-.15-1.267-.467-2.414-1.492-.893-.797-1.495-1.782-1.67-2.083-.175-.3-.018-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525C10.1 8.5 9.4 6.78 9.12 6.11c-.273-.651-.55-.563-.75-.573-.196-.01-.42-.01-.645-.01s-.59.085-.9.42c-.31.335-1.185 1.16-1.185 2.825s1.21 3.275 1.375 3.5c.165.225 2.38 3.635 5.765 5.095.805.347 1.433.555 1.923.71.81.258 1.545.222 2.13.135.65-.098 1.77-.724 2.02-1.417.25-.693.25-1.288.175-1.418-.075-.13-.275-.23-.575-.38z" />
                </svg>
                Confirm Booking on WhatsApp
              </button>

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-500 font-medium select-none text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                No advance payment requested. Pay at training ground slot.
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
