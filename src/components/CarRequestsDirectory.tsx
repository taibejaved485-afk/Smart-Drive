import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Car, DollarSign, Send, ShieldCheck, HelpCircle, CheckCircle2, ChevronDown, Check, Clock } from 'lucide-react';
import { insertCustomerRequest } from '../lib/supabase';


export interface CustomerRequest {
  id: string;
  name: string;
  whatsapp: string;
  carModel: string;
  transmission: 'Automatic' | 'Manual' | 'Any';
  city: string;
  area: string;
  startDate: string;
  endDate: string;
  maxBudget: string;
  driverRequired: 'Yes' | 'No';
  status: 'pending' | 'live';
  createdAt: string;
  cnicDoc?: string;
  licenseDoc?: string;
  travelScope?: 'Within City (Local)' | 'Outstation (Long Trip)';
  fuelPreference?: 'Any Fuel' | 'Petrol' | 'Hybrid' | 'Diesel';
  urgency?: 'Standard' | 'Urgent';
  estimatedKM?: 'Under 500 KM' | '500 - 1500 KM' | '1500+ KM';
}

export function CarRequestsForm() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    carModel: '',
    transmission: 'Any' as 'Automatic' | 'Manual' | 'Any',
    city: 'Faisalabad',
    area: '',
    startDate: '',
    endDate: '',
    maxBudget: '',
    driverRequired: 'No' as 'Yes' | 'No',
    travelScope: 'Within City (Local)' as 'Within City (Local)' | 'Outstation (Long Trip)',
    fuelPreference: 'Any Fuel' as 'Any Fuel' | 'Petrol' | 'Hybrid' | 'Diesel',
    urgency: 'Standard' as 'Standard' | 'Urgent',
    estimatedKM: 'Under 500 KM' as 'Under 500 KM' | '500 - 1500 KM' | '1500+ KM',
    cnicDoc: '',
    licenseDoc: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp || !formData.carModel || !formData.maxBudget || !formData.cnicDoc) {
      alert('Please fill out all required fields and upload your CNIC.');
      return;
    }
    if (formData.driverRequired === 'No' && !formData.licenseDoc) {
      alert('Driving License is required for self-drive requests.');
      return;
    }

    const newRequest: CustomerRequest = {
      id: 'req-' + Date.now(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      insertCustomerRequest({
        id: newRequest.id,
        carId: '',
        carName: newRequest.carModel,
        customerName: newRequest.name,
        phone: newRequest.whatsapp,
        days: '3', // Default estimate of days
        totalPrice: newRequest.maxBudget,
        status: 'pending'
      });
    } catch (e) {
      console.error('Failed to post customer custom request via Supabase', e);
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm text-center max-w-xl mx-auto my-8 animate-fade-in">
        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex flex-col items-center justify-center mx-auto mb-4 border border-green-100">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Request Submitted!</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Your car rental request has been logged. Our administration will review and approve it shortly. Once live, verified car owners can contact you directly via WhatsApp to offer their vehicles.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '', whatsapp: '', carModel: '', transmission: 'Any', city: 'Faisalabad', area: '', startDate: '', endDate: '', maxBudget: '', driverRequired: 'No', travelScope: 'Within City (Local)', fuelPreference: 'Any Fuel', urgency: 'Standard', estimatedKM: 'Under 500 KM', cnicDoc: '', licenseDoc: ''
            });
          }}
          className="mt-6 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all inline-block"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cnic' | 'license') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [type === 'cnic' ? 'cnicDoc' : 'licenseDoc']: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 max-w-3xl mx-auto w-full relative z-10 animate-fade-in">
      <div className="mb-8 border-b border-gray-100 pb-5">
        <span className="text-indigo-600 font-extrabold tracking-widest text-[10px] uppercase block mb-1.5 flex items-center gap-1.5">
          <Car className="w-4 h-4" /> Reverse Directory
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">Request a Car</h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">Post your requirements. Verified car owners will reach out directly with their best quotes on WhatsApp.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Customer Info */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Full Name *</label>
            <input 
              required type="text"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium" 
              placeholder="e.g. Asad Malik" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">WhatsApp Number *</label>
            <input 
              required type="tel"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-mono font-bold" 
              placeholder="e.g. 03001234567" 
              value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} 
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Preferred Car Model / Type *</label>
            <input 
              required type="text"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium" 
              placeholder="e.g. Honda Civic, Corolla, or Any SUV" 
              value={formData.carModel} onChange={e => setFormData({...formData, carModel: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Max Budget (PKR / Day) *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold font-mono text-gray-400 text-sm">PKR</span>
              <input 
                required type="text"
                className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-mono font-extrabold" 
                placeholder="e.g. 6000" 
                value={formData.maxBudget} onChange={e => setFormData({...formData, maxBudget: e.target.value})} 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Transmission Preferred</label>
            <div className="relative">
              <select 
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium appearance-none cursor-pointer"
                value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value as any})}
              >
                <option value="Any">Any Transmission</option>
                <option value="Automatic">Automatic only</option>
                <option value="Manual">Manual only</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">City *</label>
            <div className="relative">
              <select 
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium appearance-none cursor-pointer"
                value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
              >
                <option value="Faisalabad">Faisalabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Karachi">Karachi</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Specific Area/Phase</label>
            <input 
              type="text"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium" 
              placeholder="e.g. DHA Phase 2, Millat Town" 
              value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} 
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Travel Scope</label>
            <div className="relative">
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium appearance-none cursor-pointer"
                value={formData.travelScope} onChange={e => setFormData({...formData, travelScope: e.target.value as any})}
              >
                <option value="Within City (Local)">Within City (Local)</option>
                <option value="Outstation (Long Trip)">Outstation (Long Trip)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Fuel Preference</label>
            <div className="relative">
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium appearance-none cursor-pointer"
                value={formData.fuelPreference} onChange={e => setFormData({...formData, fuelPreference: e.target.value as any})}
              >
                <option value="Any Fuel">Any Fuel</option>
                <option value="Petrol">Petrol</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Diesel">Diesel</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Est. Distance</label>
            <div className="relative">
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium appearance-none cursor-pointer"
                value={formData.estimatedKM} onChange={e => setFormData({...formData, estimatedKM: e.target.value as any})}
              >
                <option value="Under 500 KM">Under 500 KM</option>
                <option value="500 - 1500 KM">500 - 1500 KM</option>
                <option value="1500+ KM">1500+ KM</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Urgency</label>
            <div className="relative">
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium appearance-none cursor-pointer"
                value={formData.urgency} onChange={e => setFormData({...formData, urgency: e.target.value as any})}
              >
                <option value="Standard">Standard</option>
                <option value="Urgent">Urgent (within 24 hours)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div className="col-span-2">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Duration / Timings (مدت - مثال: 3 دن یا تاریخیں)</label>
            <input 
              required type="text"
              className="w-full p-3 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium text-gray-700" 
              placeholder="e.g. 5 Days, or Oct 10th to Oct 15th"
              value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Driver Required?</label>
            <div className="relative">
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium appearance-none cursor-pointer"
                value={formData.driverRequired} onChange={e => setFormData({...formData, driverRequired: e.target.value as any})}
              >
                <option value="No">No (Self-Drive)</option>
                <option value="Yes">Yes (With Driver)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Identity Lockbox */}
        <div className="grid sm:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Upload CNIC (Front & Back) *</label>
            <div className={`relative border-2 border-dashed rounded-xl p-4 transition-colors ${formData.cnicDoc ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-indigo-500'}`}>
              <input 
                type="file" accept="image/*" required
                onChange={(e) => handleFileUpload(e, 'cnic')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <ShieldCheck className={`w-6 h-6 mb-2 ${formData.cnicDoc ? 'text-green-500' : 'text-indigo-400'}`} />
                <span className={`text-xs font-bold ${formData.cnicDoc ? 'text-green-700' : 'text-gray-700'}`}>
                  {formData.cnicDoc ? 'CNIC Uploaded ✓' : 'Click to upload CNIC'}
                </span>
                <span className="text-[10px] text-gray-500 mt-1">Secure Identity Lockbox</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-2">Upload Driving License {formData.driverRequired === 'No' ? '*' : '(Optional)'}</label>
            <div className={`relative border-2 border-dashed rounded-xl p-4 transition-colors ${formData.licenseDoc ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-indigo-500'}`}>
              <input 
                type="file" accept="image/*" required={formData.driverRequired === 'No'}
                onChange={(e) => handleFileUpload(e, 'license')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <Car className={`w-6 h-6 mb-2 ${formData.licenseDoc ? 'text-green-500' : 'text-indigo-400'}`} />
                <span className={`text-xs font-bold ${formData.licenseDoc ? 'text-green-700' : 'text-gray-700'}`}>
                  {formData.licenseDoc ? 'License Uploaded ✓' : 'Click to upload License'}
                </span>
                <span className="text-[10px] text-gray-500 mt-1">Required for Self-Drive</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end items-center border-t border-gray-100">
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition shadow-[0_5px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            Post My Request <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}


export function CarRequestsGrid() {
  const [requests, setRequests] = useState<CustomerRequest[]>([]);

  const fetchRequests = () => {
    const data = localStorage.getItem('customer_requests');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          setRequests(parsed.filter(r => r?.status === 'live'));
        } else {
          setRequests([]);
        }
      } catch (err) {
        setRequests([]);
      }
    } else {
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
    window.addEventListener('storage', fetchRequests);
    window.addEventListener('customer_requests_updated', fetchRequests);
    return () => {
      window.removeEventListener('storage', fetchRequests);
      window.removeEventListener('customer_requests_updated', fetchRequests);
    };
  }, []);

  const getWhatsAppLink = (req: CustomerRequest) => {
    let cleanNumber = req.whatsapp.replace(/[^0-9]/g, '');
    if (cleanNumber.startsWith('0')) cleanNumber = '92' + cleanNumber.substring(1);
    
    const days = calculateDays(req.startDate, req.endDate);
    
    // Construct rich text organized layout representing an executive proposal matching client request
    const invoiceParts = [
      "=============================",
      "    📧 GODRIVEIFY PARTNER MATCH   ",
      "=============================",
      "👤 CLIENT DETAILS:",
      `• Name: ${req.name}`,
      `• Requested City: ${req.city} (${req.area || 'All Areas'})`,
      "",
      "🚗 REQUEST DETAILS:",
      `• Vehicle Model Wanted: ${req.carModel}`,
      `• Transmission: ${req.transmission}`,
      "",
      "📅 SCHEDULE SLOTS:",
      `• Start Date: ${req.startDate}`,
      `• End Date: ${req.endDate}`,
      `• Duration: ${days} Day(s)`,
      "",
      "💰 TRANSACTION VALUES:",
      `• Client's Max Budget Rate: PKR ${req.maxBudget}`,
      "=============================",
      "Hello! I am a Verified Partner of GoDriveify. I have the requested car ready. Let's configure your reservation!"
    ];

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(invoiceParts.join("\n"))}`;
  };

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  return (
    <div className="w-full">
      <div className="mb-10 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight">Active Rental Requests</h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Provide your car to verified customers actively looking for rentals. These requests are guaranteed by the platform—contact them instantly via WhatsApp to seal the deal.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-gray-50/40 rounded-[2.5rem] border border-dashed border-gray-200 text-center animate-fade-in px-6 max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-150 flex items-center justify-center mb-6 text-gray-300">
            <Send className="w-8 h-8" />
          </div>
          <h3 className="text-gray-900 font-extrabold text-2xl tracking-tight">No Active Requests Found</h3>
          <p className="text-gray-500 text-sm mt-3 max-w-md font-medium leading-relaxed">
            There are currently no live customer rental inquiries. New requests will appear here once they pass through our moderation quality check.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {requests.map(req => (
            <div key={req.id} className="relative bg-white rounded-[1.5rem] border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col group p-6 sm:p-8 mt-4">
              
              {req.urgency === 'Urgent' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF7112] text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-[0_4px_15px_rgba(220,38,38,0.4)] flex items-center gap-1.5 animate-bounce z-10 border border-[#FF7112]">
                  <span className="text-xs">🔥</span> URGENT REQUEST
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Wanted Car</span>
                </div>
                <div className="flex bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500 stroke-[2.5]" />
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">ID Vetted</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 group-hover:text-indigo-900 transition-colors">
                {req.carModel}
              </h3>

              <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100/80 mb-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><DollarSign className="w-20 h-20" /></div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-1">Customer's Max Budget</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-gray-950 font-mono tracking-tighter">PKR {req.maxBudget}</span>
                  <span className="text-xs text-gray-500 font-bold uppercase">/ Day</span>
                </div>
              </div>

              <div className="space-y-3 flex-grow text-xs sm:text-sm font-medium text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">{req.city}</strong> {req.area && <span className="text-gray-500">({req.area})</span>}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>
                    Duration: <strong className="text-gray-900">{req.startDate}</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>
                    Transmission: <strong className="text-gray-900">{req.transmission}</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-4 h-4 flex items-center justify-center shrink-0 mt-0.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div></span>
                  <span>
                    Driver Required: <strong className={req.driverRequired === 'Yes' ? 'text-indigo-600 font-extrabold' : 'text-gray-900'}>{req.driverRequired}</strong>
                  </span>
                </div>
              </div>

              {/* New Workflow Metadata Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                <div className="bg-white border border-gray-200 rounded-lg text-[9px] font-mono text-gray-700 px-2 py-1.5 flex items-center shadow-sm">
                  <span className="font-extrabold mr-1 text-gray-900">SCOPE:</span> {req.travelScope || 'Within City (Local)'}
                </div>
                <div className="bg-white border border-gray-200 rounded-lg text-[9px] font-mono text-gray-700 px-2 py-1.5 flex items-center shadow-sm">
                  <span className="font-extrabold mr-1 text-gray-900">FUEL:</span> {req.fuelPreference || 'Any Fuel'}
                </div>
                <div className="bg-white border border-gray-200 rounded-lg text-[9px] font-mono text-gray-700 px-2 py-1.5 flex items-center shadow-sm col-span-2 text-center justify-center">
                  <span className="font-extrabold mr-1 text-gray-900">EST. DISTANCE:</span> {req.estimatedKM || 'Under 500 KM'}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                <a 
                  href={getWhatsAppLink(req)}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1fba59] text-white py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-[0_5px_15px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)] cursor-pointer hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Offer a Car
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
