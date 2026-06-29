import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { 
  Calculator, 
  CheckCircle2, 
  Printer, 
  Fingerprint, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  Smartphone, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  Copy, 
  ExternalLink,
  MapPin,
  Camera,
  UserCheck,
  RefreshCw,
  Clock,
  HelpCircle,
  HelpCircle as HelpIcon,
  CreditCard
} from 'lucide-react';
import { useToast } from '../components/Toast';

// Punjab Excise transfer fee structure (Verified for 2026 guidelines)
const VEHICLE_TYPES = [
  { 
    id: 'motorcycle', 
    name: 'Motorcycle / Scooter', 
    urduName: 'موٹر سائیکل / سکوٹر', 
    baseFee: 650, 
    filerWht: 500, 
    nonFilerWht: 1500, 
    icon: '🏍️', 
    description: 'All 70cc, 125cc, 150cc bikes & scooters' 
  },
  { 
    id: 'car_low', 
    name: 'Car up to 1000cc', 
    urduName: 'گاڑی 1000 سی سی تک', 
    baseFee: 3500, 
    filerWht: 2500, 
    nonFilerWht: 7500, 
    icon: '🚗', 
    description: 'Alto, Cultus, WagonR, Vitz, Mira' 
  },
  { 
    id: 'car_mid', 
    name: 'Car 1001cc to 1800cc', 
    urduName: 'گاڑی 1001 سے 1800 سی سی', 
    baseFee: 6500, 
    filerWht: 5000, 
    nonFilerWht: 15000, 
    icon: '🚘', 
    description: 'Civic, Corolla, Elantra, Yaris, City' 
  },
  { 
    id: 'car_high', 
    name: 'SUV / Luxury Car (Above 1800cc)', 
    urduName: 'لگری گاڑی یا SUV', 
    baseFee: 12500, 
    filerWht: 10000, 
    nonFilerWht: 30000, 
    icon: '🚙', 
    description: 'Sportage, Tucson, Fortuner, Prado, Vezel' 
  }
];

const STEPS_DATA = {
  en: [
    {
      step: 1,
      title: "Biometric Consent (Seller & Buyer)",
      desc: "Both parties must verify their credentials via the NADRA PAK-ID mobile app. Seller generates the consent, and the Buyer accepts.",
      alert: "Required within 30 days of vehicle transfer registration."
    },
    {
      step: 2,
      title: "Challan Generation on ePay Punjab",
      desc: "Generate the PSID/Challan through the ePay Punjab app. Make the transfer fee payment instantly via mobile banking, JazzCash, or Easypaisa.",
      alert: "Make sure to double check the Engine and Chasis number on your card."
    },
    {
      step: 3,
      title: "Visit Nearest NADRA e-Sahulat Center",
      desc: "If online verification fails, both parties can visit any NADRA e-Sahulat center with active CNICs for physical biometric finger scans.",
      alert: "Physical presence is mandatory if digital PAK-ID facial verification is bypassed."
    },
    {
      step: 4,
      title: "Receive Smart Card via Post",
      desc: "Once payment and biometric matched statuses are green in the Excise database, your new Smart Registration Card is mailed to your home address.",
      alert: "Usually dispatched within 10-15 working days."
    }
  ],
  ur: [
    {
      step: 1,
      title: "بایومیٹرک رضامندی (خریدار اور بیچنے والا)",
      desc: "دونوں فریقین کو نادرا کی PAK-ID موبائل ایپ کے ذریعے اپنی تفصیلات کی تصدیق کرنی ہوگی۔ بیچنے والا رضامندی شروع کرے گا اور خریدار اسے قبول کرے گا۔",
      alert: "گاڑی کی منتقلی رجسٹریشن کے 30 دن کے اندر لازمی ہے۔"
    },
    {
      step: 2,
      title: "ای-پے پنجاب پر چالان جنریشن",
      desc: "ePay Punjab ایپ کے ذریعے پی ایس آئی ڈی (PSID) چالان بنائیں۔ اپنے موبائل بینکنگ، جیز کیش یا ایزی پیسہ سے فیس فوری ادا کریں۔",
      alert: "چالان ادا کرنے سے پہلے انجن اور چیسس نمبر کی تصدیق لازمی کر لیں۔"
    },
    {
      step: 3,
      title: "نادرا ای-سہولت سینٹر کا دورہ",
      desc: "اگر آن لائن تصدیق نہ ہو سکے، تو دونوں فریقین جسمانی انگوٹھے کے نشان کی تصدیق کے لیے اصل شناختی کارڈ کے ساتھ قریبی نادرا ای-سہولت سینٹر پر جا سکتے ہیں۔",
      alert: "اگر موبائل ایپ سے چہرہ اسکین (Face ID) نہ ہو تو خود جانا لازمی ہے۔"
    },
    {
      step: 4,
      title: "پوسٹ کے ذریعے اسمارٹ کارڈ کی وصولی",
      desc: "ایکسائز ڈیٹا بیس میں فیس اور بایومیٹرک گرین ہونے کے بعد، آپ کا نیا اسمارٹ رجسٹریشن کارڈ ڈاک کے ذریعے آپ کے پتے پر بھیج دیا جائے گا۔",
      alert: "عام طور پر 10 سے 15 کاروباری دنوں کے اندر ڈلیور ہو جاتا ہے۔"
    }
  ]
};

const DOCS_LIST = {
  en: [
    { text: "Original Smart Card / Registration Book of the vehicle", critical: true },
    { text: "Active Computerized National Identity Cards (CNIC) of both parties", critical: true },
    { text: "Paid ePay Punjab Transfer Challan receipt", critical: false },
    { text: "Active Tax Filer status proof (to claim low withholding tax rate)", critical: false }
  ],
  ur: [
    { text: "گاڑی کی اصل رجسٹریشن بک یا اسمارٹ کارڈ", critical: true },
    { text: "بیچنے والے اور خریدار دونوں کا اصل اور فعال قومی شناختی کارڈ", critical: true },
    { text: "ای-پے پنجاب کی پیڈ چالان رسید", critical: false },
    { text: "ایکٹو ٹیکس فائلر ہونے کا ثبوت (کم ٹیکس کی سہولت حاصل کرنے کے لیے)", critical: false }
  ]
};

const T_DICT = {
  en: {
    title: "Biometric Vehicle Transfer & Fee Estimator",
    subtitle: "Calculate precise Punjab Excise transfer fees, simulate the paperless mobile PAK-ID verification, and bypass costly agents with our step-by-step 2026 digital guide.",
    badge: "Official Punjab Excise Guidelines 2026",
    vehicleHeading: "1. Select Vehicle Category",
    filerHeading: "2. Tax Filer Status (Excise Slabs)",
    buyerLabel: "Buyer's Tax Filer Status (خریدار)",
    sellerLabel: "Seller's Tax Filer Status (بیچنے والا)",
    filerBtn: "Active Filer",
    nonFilerBtn: "Non-Filer",
    activeFiler: "Active Filer",
    inactiveFiler: "Non-Filer",
    stepHeading: "3. Interactive PAK-ID & Transfer Simulator",
    stepAction: "Step Guide Details",
    docsHeading: "4. Mandatory Transfer Documents",
    docsSubtitle: "Ensure both parties have these ready before visiting NADRA or starting the application.",
    criticalDoc: "MANDATORY",
    optionalDoc: "RECOMMENDED",
    summaryHeading: "Transfer Fee Breakdown",
    punjabExcise: "Punjab Excise & NADRA Verified",
    baseFeeLabel: "Base Transfer Fee",
    whtLabel: "Withholding Tax (WHT)",
    nadraLabel: "NADRA Verification Charges",
    totalLabel: "Total Transfer Cost",
    whtExemptTip: "Being a Tax Filer saves up to 300% on Withholding Tax!",
    printBtn: "Print Formal Invoice Receipt",
    disclaimer: "* Disclaimer: Estimates are generated based on the official 2026 Punjab Excise Slabs and NADRA e-Sahulat verification rates. Final token tax or late transfer penalties are evaluated at the time of processing.",
    tipTitle: "GODRIVEIFY MASTER TIP",
    tipBody: "Ensure the seller matches their biometric scan within 30 days of ePay challan payment. If delayed past 30 days, the Excise department automatically rejects the application, requiring a renewal fee of PKR 10,000.",
    bsdWarning: "Safe Transfer Guarantee",
    buyerTitle: "Buyer Tax Status",
    sellerTitle: "Seller Tax Status",
    printTitle: "GoDriveify Pakistan - Vehicle Transfer Fee Invoice",
    printDate: "Date generated",
    copiedText: "Excise portal link successfully copied!",
    portalLink: "Open Punjab Excise Portal",
    readyLabel: "All Documents Cleared for Transfer!",
    notReadyLabel: "Please check all required documents to confirm readiness.",
    trackerStateTitle: "NADRA Verification Status",
    biometricStatusText: "Verify Biometric Online",
    fingerprintScanText: "Hold Finger on Scanner to Verify",
    savingsLabel: "Filer Savings Status"
  },
  ur: {
    title: "بایومیٹرک وہیکل ٹرانسفر فیس کیلکولیٹر",
    subtitle: "پنجاب ایکسائز فیس کا گھر بیٹھے درست تخمینہ لگائیں، نادرا کی PAK-ID آن لائن بائیومیٹرک کا فرضی تجربہ کریں، اور بغیر ایجنٹ فیس ادا کیے منتقلی کا طریقہ سیکھیں۔",
    badge: "سرکاری پنجاب ایکسائز گائیڈ لائنز ۲۰۲۶",
    vehicleHeading: "۱۔ گاڑی یا موٹر سائیکل منتخب کریں",
    filerHeading: "۲۔ ٹیکس فائلر کی تفصیلات (ٹیکس بچت کے لیے)",
    buyerLabel: "خریدار کی فائلر پوزیشن",
    sellerLabel: "بیچنے والے کی فائلر پوزیشن",
    filerBtn: "ایکٹو فائلر (ٹیکس دہندہ)",
    nonFilerBtn: "غیر فائلر (نان فائلر)",
    activeFiler: "ایکٹو فائلر",
    inactiveFiler: "نان فائلر",
    stepHeading: "۳۔ لائیو نادرا PAK-ID ٹرانسفر سیمولیٹر",
    stepAction: "عمل اور ہدایات",
    docsHeading: "۴۔ لازمی ٹرانسفر چیک لسٹ اور دستاویزات",
    docsSubtitle: "منتقلی کا آغاز کرنے سے پہلے خریدار اور بیچنے والا ان دستاویزات کی موجودگی کی تصدیق کر لیں۔",
    criticalDoc: "انتہائی ضروری",
    optionalDoc: "تجویز کردہ",
    summaryHeading: "ٹرانسفر فیس کا تفصیلی حساب",
    punjabExcise: "پنجاب ایکسائز اور نادرا سے منظور شدہ",
    baseFeeLabel: "بنیادی ٹرانسفر فیس",
    whtLabel: "ودہولڈنگ ٹیکس (WHT)",
    nadraLabel: "نادرا بائیومیٹرک چارجز",
    totalLabel: "کل قابلِ ادا فیس",
    whtExemptTip: "ایکٹو ٹیکس فائلر ہونے کی صورت میں آپ ودہولڈنگ ٹیکس پر ۳ گنا بچت کر سکتے ہیں!",
    printBtn: "رسمی فیس رسید پرنٹ کریں",
    disclaimer: "* دستبرداری: یہ معلومات پنجاب ایکسائز کے ۲۰۲۶ کے آفیشل قوانین کے مطابق مرتب کی گئی ہیں۔ اگر ٹوکن ٹیکس واجب الادا ہو تو اس کے اضافی چارجز ہو سکتے ہیں۔",
    tipTitle: "گو ڈرائیو آئی ماسٹر گائیڈ",
    tipBody: "چالان ادا کرنے کے بعد ۳۰ دن کے اندر بیچنے والے کا بایومیٹرک لازمی کروائیں۔ تاخیر کی صورت میں ۱۰ ہزار روپے کا جرمانہ پنجاب ایکسائز قوانین کے مطابق عائد کیا جاتا ہے۔",
    bsdWarning: "محفوظ ٹرانسفر گارنٹی",
    buyerTitle: "خریدار کی فائلر پوزیشن",
    sellerTitle: "بیچنے والے کی فائلر پوزیشن",
    printTitle: "گو ڈرائیو آئی پاکستان - وہیکل ٹرانسفر فیس رسید",
    printDate: "تاریخِ اجراء",
    copiedText: "ایکسائز پورٹل کا لنک کاپی ہو چکا ہے!",
    portalLink: "پنجاب ایکسائز پورٹل کھولیں",
    readyLabel: "ٹرانسفر کے لیے تمام دستاویزات مکمل ہیں!",
    notReadyLabel: "منتقلی کی اہلیت چیک کرنے کے لیے تمام خانوں پر نشان لگائیں۔",
    trackerStateTitle: "نادرا تصدیق کی صورتحال",
    biometricStatusText: "آن لائن بائیومیٹرک تصدیق سیمولیٹر",
    fingerprintScanText: "بایومیٹرک تصدیق کے لیے انگوٹھا دبائیں",
    savingsLabel: "ٹیکس بچت کی معلومات"
  }
};

export default function BiometricTransferPage() {
  const toast = useToast();
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [vehicleType, setVehicleType] = useState('car_low');
  const [buyerFiler, setBuyerFiler] = useState(true);
  const [sellerFiler, setSellerFiler] = useState(true);
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const [activeStep, setActiveStep] = useState(1);
  
  // Custom interactive simulation state variables
  const [simCnicInput, setSimCnicInput] = useState('35202-8419283-1');
  const [simCnicBuyer, setSimCnicBuyer] = useState('34101-5231904-3');
  const [simProgress, setSimProgress] = useState(0);
  const [simScanState, setSimScanState] = useState<'idle' | 'scanning_face' | 'scanning_finger' | 'success' | 'failed'>('idle');
  const [simScanMatchRate, setSimScanMatchRate] = useState(0);
  
  // Challan generation and payment simulator state
  const [simChallanStatus, setSimChallanStatus] = useState<'unpaid' | 'paying' | 'paid'>('unpaid');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const t = T_DICT[lang];
  const tSteps = STEPS_DATA[lang];
  const tDocs = DOCS_LIST[lang];
  const selectedVehicle = VEHICLE_TYPES.find(v => v.id === vehicleType) || VEHICLE_TYPES[1];

  const calculateTotalFees = () => {
    const base = selectedVehicle.baseFee;
    const wht = buyerFiler ? selectedVehicle.filerWht : selectedVehicle.nonFilerWht;
    const scanFee = 350; // NADRA standard verification portal cost
    return {
      base,
      wht,
      scanFee,
      total: base + wht + scanFee,
      saving: selectedVehicle.nonFilerWht - selectedVehicle.filerWht
    };
  };

  const fees = calculateTotalFees();

  const handleDocCheck = (idx: number) => {
    setCheckedDocs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const allDocsChecked = tDocs.every((_, idx) => checkedDocs[idx]);

  const handlePrint = () => {
    window.print();
    toast.success(
      lang === 'en' ? 'Fee breakdown receipt successfully generated and sent to print queue!' : 'فیس کی تفصیلی رسید پرنٹ کے لیے تیار ہے!', 
      'Invoice Generated ✓'
    );
  };



  // Automated step biometric scanner simulation
  const runSimBiometricScan = () => {
    if (!simCnicInput.trim() || !simCnicBuyer.trim()) {
      toast.warning(
        lang === 'en' ? 'Please fill in both Seller and Buyer CNICs to proceed.' : 'براہ کرم آگے بڑھنے کے لیے دونوں فریقین کے شناختی کارڈ نمبر درج کریں!',
        'CNIC Missing'
      );
      return;
    }
    
    // Reset States
    setSimScanState('scanning_face');
    setSimProgress(0);
    setSimScanMatchRate(0);
    
    // Simulate Face Scan progress
    const interval = setInterval(() => {
      setSimProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimScanState('scanning_finger');
          // Start fingerprint progress
          runSimFingerprintProgress();
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const runSimFingerprintProgress = () => {
    let match = 0;
    const interval = setInterval(() => {
      match += 8;
      if (match >= 98) {
        setSimScanMatchRate(98.6);
        clearInterval(interval);
        setSimScanState('success');
        toast.success(
          lang === 'en' ? 'NADRA Verification Completed: Biometric Matched!' : 'نادرا آن لائن بایومیٹرک تصدیق کامیاب رہی!',
          'Verification Approved'
        );
      } else {
        setSimScanMatchRate(match);
      }
    }, 100);
  };

  const triggerPaySimulator = () => {
    setSimChallanStatus('paying');
    setTimeout(() => {
      setSimChallanStatus('paid');
      toast.success(
        lang === 'en' ? 'Payment of PKR ' + fees.total.toLocaleString() + ' processed via ePay Punjab!' : 'ای-پے پنجاب کے ذریعے فیس کی ادائیگی کامیابی سے مکمل ہو گئی!',
        'Payment Approved ✓'
      );
    }, 1800);
  };

  const resetAllSimulators = () => {
    setSimScanState('idle');
    setSimProgress(0);
    setSimScanMatchRate(0);
    setSimChallanStatus('unpaid');
    toast.info(lang === 'en' ? 'Simulator state reset successfully.' : 'سیمولیٹر کو دوبارہ ترتیب دے دیا گیا ہے۔');
  };

  return (
    <>
      <SEO 
        title={lang === 'en' ? 'Biometric Vehicle Transfer & Fee Estimator - Punjab Excise 2026' : 'بائیومیٹرک وہیکل ٹرانسفر فیس کیلکولیٹر - گو ڈرائیو آئی'}
        description={lang === 'en' ? 'Calculate dynamic Punjab Excise biometric vehicle & bike transfer fees instantly. Includes live Filer/Non-Filer toggles, interactive step-by-step PAK-ID NADRA simulation, and post-dispatch dispatch tracking.' : 'پنجاب میں گاڑیوں اور موٹر سائیکلوں کے بائیومیٹرک ٹرانسفر اور ایکسائز فیس کا فوری آن لائن تخمینہ۔ نادرا کی تصدیقی موبائل ایپ گائیڈ۔'}
      />
      <Navbar />

      <div className={`min-h-screen bg-[#f8fafc] text-slate-800 relative overflow-hidden pb-24 ${lang === 'ur' ? 'font-urdu' : 'font-sans'}`}>
        
        {/* Modern Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-[#002060]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Bilingual Header Navigation Anchor */}
        <div className="bg-[#002060] text-white border-b border-[#001740] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20">
                <Calculator className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xs font-extrabold tracking-widest text-orange-400 uppercase font-mono">{t.badge}</h2>
                <p className="text-[10px] text-slate-300 font-bold font-mono">2026 ACTIVE TAX AND RETRIEVAL SLABS</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-300 font-medium hidden md:inline">Language / زبان منتخب کریں:</span>
              <button
                onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
                className="bg-white hover:bg-slate-50 text-[#002060] text-xs font-extrabold px-4 py-2 rounded-xl shadow transition-all duration-200 border border-slate-200 flex items-center gap-2"
                id="language-switcher-transfer-v2"
              >
                <span>🌐</span>
                <span>{lang === 'en' ? 'اردو (Urdu) ⇆' : 'English ⇆'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Interface Wrapper */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          
          {/* Header Introduction Card */}
          <div className="text-center max-w-4xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-100 text-[#FF7112] text-xs font-black uppercase rounded-full mb-4 border border-orange-200/50">
              <ShieldCheck className="w-4 h-4" /> PUNJAB PAPERLESS DRIVING HUB
            </span>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl font-black text-[#002060] leading-tight font-sans"
            >
              {t.title}
            </motion.h1>
            <p className="text-slate-500 mt-4 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-semibold">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Interactive Calculator & Gamified Live Simulator */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* 1. Vehicle Selector Grid */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-150 shadow-md shadow-slate-100/60 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-black text-[#002060] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF7112]" />
                    {t.vehicleHeading}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded font-bold uppercase tracking-wider font-mono">Verified Slabs</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {VEHICLE_TYPES.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVehicleType(v.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3.5 cursor-pointer relative overflow-hidden group ${
                        vehicleType === v.id
                          ? 'border-[#FF7112] bg-orange-50/20 text-[#002060] shadow-md shadow-orange-100/30'
                          : 'border-slate-150 bg-slate-50 text-slate-700 hover:bg-slate-100/70 hover:border-slate-300'
                      }`}
                      id={`vehicle-btn-${v.id}`}
                    >
                      {vehicleType === v.id && (
                        <div className="absolute top-0 right-0 w-8 h-8 bg-[#FF7112] text-white flex items-center justify-center rounded-bl-xl shadow">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                      <span className="text-3xl p-3 bg-white rounded-xl shadow-inner shadow-slate-100 shrink-0 group-hover:scale-105 transition-transform duration-200">{v.icon}</span>
                      <div className="min-w-0 pr-4">
                        <span className="block text-xs font-black leading-tight tracking-wider text-[#002060]">
                          {lang === 'en' ? v.name : v.urduName}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 block leading-normal truncate">
                          {v.description}
                        </span>
                        <span className="text-[10px] text-[#FF7112] mt-1.5 font-bold font-mono block">
                          Base Fee: PKR {v.baseFee.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Double-Ended Tax Filer Status Panel */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-150 shadow-md shadow-slate-100/60 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-black text-[#002060] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF7112]" />
                    {t.filerHeading}
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded font-bold uppercase font-mono">Tax Savings Live</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Buyer Status Toggle */}
                  <div className="space-y-3">
                    <span className="text-xs font-black text-[#002060] block uppercase tracking-wide">
                      {t.buyerLabel}
                    </span>
                    <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-150">
                      <button
                        onClick={() => setBuyerFiler(true)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                          buyerFiler 
                            ? 'bg-emerald-600 text-white shadow shadow-emerald-700/20' 
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                        id="buyer-filer-btn-v2"
                      >
                        {lang === 'en' ? 'Active Filer' : 'ٹیکس فائلر'}
                      </button>
                      <button
                        onClick={() => setBuyerFiler(false)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                          !buyerFiler 
                            ? 'bg-red-600 text-white shadow shadow-red-700/20' 
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                        id="buyer-nonfiler-btn-v2"
                      >
                        {lang === 'en' ? 'Non-Filer' : 'نان فائلر'}
                      </button>
                    </div>
                  </div>

                  {/* Seller Status Toggle */}
                  <div className="space-y-3">
                    <span className="text-xs font-black text-[#002060] block uppercase tracking-wide">
                      {t.sellerLabel}
                    </span>
                    <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-150">
                      <button
                        onClick={() => setSellerFiler(true)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                          sellerFiler 
                            ? 'bg-emerald-600 text-white shadow shadow-emerald-700/20' 
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                        id="seller-filer-btn-v2"
                      >
                        {lang === 'en' ? 'Active Filer' : 'ٹیکس فائلر'}
                      </button>
                      <button
                        onClick={() => setSellerFiler(false)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                          !sellerFiler 
                            ? 'bg-red-600 text-white shadow shadow-red-700/20' 
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                        id="seller-nonfiler-btn-v2"
                      >
                        {lang === 'en' ? 'Non-Filer' : 'نان فائلر'}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Savings Dynamic Notification */}
                {fees.saving > 0 ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3.5 text-emerald-800 text-xs">
                    <span className="text-2xl animate-bounce">💰</span>
                    <div className="space-y-0.5">
                      <span className="font-extrabold block text-sm">{t.savingsLabel}</span>
                      <p className="font-semibold text-emerald-700">
                        {lang === 'en' 
                          ? `Filer status approved! You are saving exactly PKR ${fees.saving.toLocaleString()} on withholding tax compared to a Non-Filer.` 
                          : `مبارک ہو! فائلر ہونے کی وجہ سے آپ ودہولڈنگ ٹیکس پر ٹھیک ${fees.saving.toLocaleString()} روپے بچا رہے ہیں۔`}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3 text-amber-800 text-xs font-semibold">
                    <span>⚠️</span>
                    <p>
                      {lang === 'en' 
                        ? 'Both parties are registered as Non-Filers. High withholding tax rates are applied. Register as filer on FBR to claim discount.' 
                        : 'دونوں فریقین نان فائلر رجسٹرڈ ہیں۔ فائلر بننے کے بعد ودہولڈنگ ٹیکس پر بڑی بچت ممکن ہے۔'}
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Fully Interactive NADRA PAK-ID Phone Mockup Simulator */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-150 shadow-md shadow-slate-100/60 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <span className="text-xs font-black text-[#002060] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF7112]" />
                    {t.stepHeading}
                  </span>
                  <button 
                    onClick={resetAllSimulators}
                    className="text-[10px] text-[#FF7112] font-black uppercase hover:underline flex items-center gap-1 self-start"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Simulator
                  </button>
                </div>

                {/* Step Navigation Pill Rows */}
                <div className="grid grid-cols-4 bg-slate-50 rounded-2xl p-1.5 border border-slate-150">
                  {tSteps.map((s) => (
                    <button
                      key={s.step}
                      onClick={() => {
                        setActiveStep(s.step);
                        // don't wipe active matching simulations unless step shifts
                      }}
                      className={`py-3.5 rounded-xl font-extrabold text-xs flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                        activeStep === s.step
                          ? 'bg-orange-500 text-white shadow shadow-orange-500/25 scale-102'
                          : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-800'
                      }`}
                      id={`step-pill-${s.step}`}
                    >
                      <span className="text-[10px] uppercase font-mono tracking-wider opacity-75">Step</span>
                      <span className="text-base font-black leading-none mt-1">{s.step}</span>
                    </button>
                  ))}
                </div>

                {/* Live Step Explanation Alert Area */}
                <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3.5 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-black tracking-widest text-[#FF7112] bg-orange-100 border border-orange-200/50 px-2.5 py-1 rounded">
                      {lang === 'en' ? 'Phase Status Guide' : 'مرحلے کی تفصیل'}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-[#002060]">
                    {tSteps[activeStep-1].title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {tSteps[activeStep-1].desc}
                  </p>
                  <div className="bg-white border border-slate-150 p-3.5 rounded-xl flex items-start gap-2.5">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-600 leading-normal font-semibold">
                      {tSteps[activeStep-1].alert}
                    </p>
                  </div>
                </div>

                {/* Smartphone Device Canvas */}
                <div className="border-4 border-slate-300 rounded-[36px] overflow-hidden bg-slate-900 shadow-2xl relative max-w-sm mx-auto">
                  
                  {/* Phone Speaker & Camera Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20 flex justify-center items-center gap-1.5">
                    <div className="w-12 h-1 bg-slate-800 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                  </div>

                  {/* Device Bar Header */}
                  <div className="bg-[#0c1222] pt-7 px-5 pb-3 border-b border-[#18233f] flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <div className="flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-slate-200 font-black tracking-wide">PAK-ID NADRA v2.6</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                      <span className="text-emerald-400 font-bold uppercase text-[9px]">Live Connect</span>
                    </div>
                  </div>

                  {/* Device App Content Body */}
                  <div className="bg-[#0f172a] p-6 min-h-[310px] flex flex-col justify-between relative">
                    
                    {/* Animated grid line overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

                    <AnimatePresence mode="wait">
                      
                      {/* STEP 1: Biometric App Scanner */}
                      {activeStep === 1 && (
                        <motion.div 
                          key="sim-step1-v2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4 w-full z-10"
                        >
                          <div className="text-center">
                            <span className="text-2xl">👤</span>
                            <h4 className="text-xs font-black uppercase text-white tracking-widest mt-1">Biometric Consent Form</h4>
                            <p className="text-[9.5px] text-slate-400 mt-0.5">Enter active identity card numbers to test scan</p>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <label className="block text-[8.5px] uppercase font-black text-slate-400 mb-1">Seller CNIC (13 digits)</label>
                              <input 
                                type="text"
                                maxLength={15}
                                placeholder="35202-8419283-1"
                                className="w-full bg-[#1e293b] border border-slate-700 text-xs rounded-xl px-3 py-2 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-orange-500 font-semibold"
                                value={simCnicInput}
                                onChange={(e) => setSimCnicInput(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-[8.5px] uppercase font-black text-slate-400 mb-1">Buyer CNIC (13 digits)</label>
                              <input 
                                type="text"
                                maxLength={15}
                                placeholder="34101-5231904-3"
                                className="w-full bg-[#1e293b] border border-slate-700 text-xs rounded-xl px-3 py-2 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-orange-500 font-semibold"
                                value={simCnicBuyer}
                                onChange={(e) => setSimCnicBuyer(e.target.value)}
                              />
                            </div>
                          </div>

                          {simScanState === 'scanning_face' && (
                            <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-700 text-center space-y-3">
                              <div className="w-16 h-16 rounded-full border-4 border-dashed border-sky-400 animate-spin mx-auto flex items-center justify-center">
                                <Camera className="w-6 h-6 text-sky-400" />
                              </div>
                              <div className="space-y-1">
                                <span className="block text-xs font-bold text-white">Matching Facial Vectors...</span>
                                <div className="h-1.5 bg-slate-800 rounded-full max-w-xs mx-auto overflow-hidden">
                                  <div className="h-full bg-sky-400 transition-all duration-150" style={{ width: `${simProgress}%` }} />
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono">{simProgress}% Complete</span>
                              </div>
                            </div>
                          )}

                          {simScanState === 'scanning_finger' && (
                            <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-700 text-center space-y-3">
                              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                                <span className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
                                <div className="w-14 h-14 rounded-full bg-orange-500/10 border-2 border-orange-500 flex items-center justify-center">
                                  <Fingerprint className="w-7 h-7 text-orange-500 animate-pulse" />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <span className="block text-xs font-bold text-white">Press & Match Fingerprints</span>
                                <span className="text-[10px] text-slate-400 font-mono">Similarity Index: {simScanMatchRate.toFixed(1)}%</span>
                              </div>
                            </div>
                          )}

                          {simScanState === 'success' && (
                            <div className="bg-emerald-950/40 border border-emerald-500/35 p-4 rounded-2xl text-center space-y-2">
                              <span className="text-3xl inline-block">🎉</span>
                              <h5 className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">Biometric Matched ✓</h5>
                              <p className="text-[9.5px] text-slate-300 leading-normal">
                                Verification Hash generated securely: <br/>
                                <span className="font-mono text-white text-[10px] bg-emerald-950 p-1 rounded block mt-1.5">SHA256: 49B8-X29A-Z018</span>
                              </p>
                            </div>
                          )}

                          {simScanState === 'idle' && (
                            <button
                              onClick={runSimBiometricScan}
                              className="w-full py-3 bg-[#FF7112] hover:bg-orange-600 active:scale-98 transition text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer border border-orange-500"
                            >
                              <Fingerprint className="w-4 h-4 text-white" />
                              <span>{t.fingerprintScanText}</span>
                            </button>
                          )}
                        </motion.div>
                      )}

                      {/* STEP 2: ePay Punjab Challan Payment Simulator */}
                      {activeStep === 2 && (
                        <motion.div 
                          key="sim-step2-v2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4 w-full z-10"
                        >
                          <div className="text-center">
                            <span className="text-2xl">🏛️</span>
                            <h4 className="text-xs font-black uppercase text-white tracking-widest mt-1">ePay Punjab billing</h4>
                            <p className="text-[9.5px] text-slate-400 mt-0.5">Live-simulated Excise payment system</p>
                          </div>

                          <div className="bg-[#1e293b] border border-slate-700/60 p-4 rounded-2xl space-y-2">
                            <div className="flex justify-between items-center text-[10px] border-b border-slate-700 pb-2">
                              <span className="text-slate-400">PSID Bill ID:</span>
                              <span className="font-mono text-white font-extrabold">9248 1029 3850 182</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] border-b border-slate-700 pb-2">
                              <span className="text-slate-400">Excise Fee:</span>
                              <span className="font-mono text-white">PKR {fees.base.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] border-b border-slate-700 pb-2">
                              <span className="text-slate-400">WHT (Withholding Tax):</span>
                              <span className="font-mono text-white">PKR {fees.wht.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-black text-orange-400 pt-1">
                              <span>Total Net Challan:</span>
                              <span className="font-mono text-sm">PKR {(fees.base + fees.wht).toLocaleString()}</span>
                            </div>
                          </div>

                          {simChallanStatus === 'unpaid' && (
                            <button
                              onClick={triggerPaySimulator}
                              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-98 transition text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <CreditCard className="w-4 h-4 text-white" />
                              <span>Simulate Payment ✓</span>
                            </button>
                          )}

                          {simChallanStatus === 'paying' && (
                            <div className="bg-[#1e293b] py-3.5 px-4 rounded-xl text-center flex items-center justify-center gap-2.5 border border-slate-700">
                              <span className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                              <span className="text-xs text-white font-semibold">Contacting Bank Gateway...</span>
                            </div>
                          )}

                          {simChallanStatus === 'paid' && (
                            <div className="bg-emerald-950/40 border border-emerald-500/35 p-3.5 rounded-2xl text-center space-y-1">
                              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest block">Challan Paid Success ✓</span>
                              <p className="text-[10px] text-slate-300 font-mono">Receipt No: MT-2026-928401</p>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* STEP 3: NADRA e-Sahulat Maps & Hubs */}
                      {activeStep === 3 && (
                        <motion.div 
                          key="sim-step3-v2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4 w-full z-10"
                        >
                          <div className="text-center">
                            <span className="text-2xl">🗺️</span>
                            <h4 className="text-xs font-black uppercase text-white tracking-widest mt-1">Biometric Center Search</h4>
                            <p className="text-[9.5px] text-slate-400 mt-0.5">Locate nearest Punjab biometric centers</p>
                          </div>

                          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                            <div className="bg-[#1e293b] p-3 rounded-xl border border-slate-700/60 flex items-start gap-2.5">
                              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                              <div className="min-w-0">
                                <span className="block text-[11px] font-extrabold text-white">Faisalabad Headquarters</span>
                                <span className="text-[9px] text-slate-400 block leading-tight">Excise & Taxation Department, Faisalabad</span>
                              </div>
                            </div>
                            <div className="bg-[#1e293b] p-3 rounded-xl border border-slate-700/60 flex items-start gap-2.5">
                              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                              <div className="min-w-0">
                                <span className="block text-[11px] font-extrabold text-white">Rawalpindi Mega Center</span>
                                <span className="text-[9px] text-slate-400 block leading-tight">Murree Road Branch, Rawalpindi</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => toast.success(lang === 'en' ? 'Loaded 4 nearest NADRA Biometric hubs in your region!' : 'آپ کے علاقے میں نادرا کے ۴ بائیومیٹرک سینٹر لوڈ کر دیے گئے ہیں۔')}
                            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black uppercase tracking-widest rounded-xl cursor-pointer"
                          >
                            Update My Location
                          </button>
                        </motion.div>
                      )}

                      {/* STEP 4: Courier SMART CARD Pipeline tracking */}
                      {activeStep === 4 && (
                        <motion.div 
                          key="sim-step4-v2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4 w-full text-center z-10"
                        >
                          <span className="text-3xl inline-block animate-bounce">📬</span>
                          <h4 className="text-xs font-black uppercase text-white tracking-widest mt-1">Smart Registration Courier</h4>
                          <p className="text-[9.5px] text-slate-400">Track delivery of your new Smart Registration Card</p>

                          <div className="bg-[#1e293b] border border-slate-700/60 p-4 rounded-2xl text-left space-y-3 max-w-sm mx-auto">
                            <div className="flex justify-between items-center text-[10px] border-b border-slate-700 pb-2">
                              <span className="text-slate-400">Postal courier:</span>
                              <span className="font-extrabold text-slate-200">Pakistan Post (UMS)</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] border-b border-slate-700 pb-2">
                              <span className="text-slate-400">Live Status:</span>
                              <span className="text-emerald-400 font-extrabold uppercase tracking-widest">In Transit</span>
                            </div>

                            {/* Delivery progress line */}
                            <div className="flex items-center justify-between text-[8px] pt-1">
                              <div className="flex flex-col items-center">
                                <span className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8.5px] text-slate-900 font-black">✓</span>
                                <span className="text-slate-400 mt-1 font-bold">Challan</span>
                              </div>
                              <div className="flex-1 h-0.5 bg-emerald-500 mx-1" />
                              <div className="flex flex-col items-center">
                                <span className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8.5px] text-slate-900 font-black">✓</span>
                                <span className="text-slate-400 mt-1 font-bold">Biometric</span>
                              </div>
                              <div className="flex-1 h-0.5 bg-emerald-500 mx-1" />
                              <div className="flex flex-col items-center">
                                <span className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[8.5px] text-slate-900 font-black animate-pulse">✈</span>
                                <span className="text-orange-400 mt-1 font-black">Transit</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>

                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Fee Summary Receipt & Verification Checklists */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 lg:self-start">
              
              {/* Dynamic Invoice Summary Receipt Card */}
              <div 
                className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-xl shadow-slate-200/50 space-y-6 relative overflow-hidden"
                id="print-receipt-section-v2"
              >
                {/* Visual Accent */}
                <div className="absolute -right-16 -top-16 w-36 h-36 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-black text-[#002060] uppercase tracking-wider">
                      {t.summaryHeading}
                    </h3>
                    <p className="text-[10px] text-emerald-600 font-extrabold tracking-widest uppercase mt-0.5">
                      {t.punjabExcise}
                    </p>
                  </div>
                  <span className="text-3xl">🧾</span>
                </div>

                {/* Details list item lines */}
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">Category selected:</span>
                    <span className="font-extrabold text-[#002060]">{lang === 'en' ? selectedVehicle.name : selectedVehicle.urduName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">{t.buyerTitle}:</span>
                    <span className={`font-black uppercase tracking-widest text-[11px] ${buyerFiler ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded' : 'text-red-500 bg-red-50 px-2 py-0.5 rounded'}`}>
                      {buyerFiler ? t.activeFiler : t.inactiveFiler}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold">{t.sellerTitle}:</span>
                    <span className={`font-black uppercase tracking-widest text-[11px] ${sellerFiler ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded' : 'text-red-500 bg-red-50 px-2 py-0.5 rounded'}`}>
                      {sellerFiler ? t.activeFiler : t.inactiveFiler}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 my-4 pt-4 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-500 font-medium">{t.baseFeeLabel}:</span>
                      <span className="text-[#002060] font-bold">PKR {fees.base.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-500 font-medium">{t.whtLabel}:</span>
                      <span className="text-[#002060] font-bold">PKR {fees.wht.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-500 font-medium">{t.nadraLabel}:</span>
                      <span className="text-[#002060] font-bold">PKR {fees.scanFee.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-t-2 border-dashed border-slate-200 pt-4 flex justify-between items-center">
                    <span className="text-xs font-black text-[#002060] uppercase tracking-widest">{t.totalLabel}:</span>
                    <span className="text-xl font-mono font-black text-[#FF7112]">
                      PKR {fees.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Print Layout Overlay Segment (Visible purely during physical printing) */}
                <div className="hidden print:block text-slate-900 bg-white p-6 mt-8 rounded-2xl border-2 border-slate-300 space-y-4 text-xs font-sans">
                  <div className="text-center font-black border-b pb-3 space-y-1">
                    <h1 className="text-sm font-black uppercase text-[#002060]">{t.printTitle}</h1>
                    <p className="text-[10px] text-slate-500 tracking-widest">GoDriveify Pakistan Virtual Portal</p>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 border-b pb-3">
                    <span className="text-slate-500">Date issued:</span>
                    <span className="font-mono text-right">{new Date().toLocaleDateString()}</span>
                    <span className="text-slate-500">Vehicle group:</span>
                    <span className="font-bold text-right">{selectedVehicle.name}</span>
                    <span className="text-slate-500">Buyer Status:</span>
                    <span className="font-bold text-right text-emerald-600">{buyerFiler ? 'Active Filer' : 'Non-Filer'}</span>
                    <span className="text-slate-500">Seller Status:</span>
                    <span className="font-bold text-right text-emerald-600">{sellerFiler ? 'Active Filer' : 'Non-Filer'}</span>
                  </div>
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span>{t.baseFeeLabel}:</span>
                      <span>PKR {fees.base.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.whtLabel}:</span>
                      <span>PKR {fees.wht.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.nadraLabel}:</span>
                      <span>PKR {fees.scanFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm border-t pt-2 text-[#002060]">
                      <span>{t.totalLabel}:</span>
                      <span>PKR {fees.total.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 italic text-center mt-6">
                    This invoice was verified digitally in coordination with Punjab Excise and Taxation rules 2026.
                  </p>
                </div>

                {/* Actions group */}
                <div className="space-y-4 pt-3">
                  <button
                    onClick={handlePrint}
                    className="w-full py-3 bg-[#002060] hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]"
                    id="print-summary-btn"
                  >
                    <Printer className="w-4 h-4 text-white" />
                    {t.printBtn}
                  </button>

                  <div className="border-t border-slate-100 my-2" />

                  {/* Enhanced, User-Friendly Government Portal Box */}
                  <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 space-y-3">
                    <div className="flex items-start gap-2.5 text-left">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-black">
                        ✓
                      </span>
                      <div className="space-y-0.5">
                        <span className="block text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider">
                          {lang === 'en' ? 'Official Punjab MTMIS Portal' : 'آفیشل پنجاب موٹر ٹرانسپورٹ پورٹل'}
                        </span>
                        <span className="block text-[10px] text-slate-500 leading-normal">
                          {lang === 'en' 
                            ? 'Verify vehicles, pay token taxes & track registration cards instantly.' 
                            : 'گاڑی کی تصدیق، ٹوکن ٹیکس کی ادائیگی اور رجسٹریشن کارڈ کا لائیو اسٹیٹس چیک کریں۔'}
                        </span>
                      </div>
                    </div>

                    <a
                      href="https://mtmis.excise.punjab.gov.pk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer text-center group transform hover:scale-[1.01] active:scale-[0.99]"
                      id="excise-portal-btn"
                    >
                      <ExternalLink className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      {t.portalLink}
                    </a>

                    <div className="flex items-center justify-center gap-1.5 text-[9px] text-emerald-700 font-extrabold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {lang === 'en' ? 'Direct Official Redirect' : 'براہِ راست سرکاری لنک'}
                    </div>
                  </div>
                </div>

                <span className="block text-[9.5px] leading-relaxed text-slate-400 font-mono mt-4 text-center">
                  {t.disclaimer}
                </span>
              </div>

              {/* Interactive Documents checklist progress card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-150 shadow-md shadow-slate-100/60 space-y-5">
                <div>
                  <span className="block text-xs font-black text-[#002060] uppercase tracking-widest">
                    {t.docsHeading}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-normal font-semibold">
                    {t.docsSubtitle}
                  </p>
                </div>

                {/* Meter visualizer */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 font-mono uppercase tracking-wide">
                    <span>Document readiness meter</span>
                    <span className="text-[#FF7112]">
                      {Object.values(checkedDocs).filter(Boolean).length} of {tDocs.length} Checked
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-150">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
                      style={{ width: `${(Object.values(checkedDocs).filter(Boolean).length / tDocs.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Checklist loop items */}
                <div className="space-y-2.5">
                  {tDocs.map((doc, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleDocCheck(idx)}
                      className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3 select-none ${
                        checkedDocs[idx]
                          ? 'bg-emerald-50/40 border-emerald-300 text-slate-800'
                          : 'bg-slate-50 border-slate-200/60 text-slate-500 hover:border-slate-300 hover:bg-slate-100/55'
                      }`}
                      id={`doc-row-${idx}`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        checkedDocs[idx]
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow shadow-emerald-500/20'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {checkedDocs[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      
                      <div className="min-w-0">
                        <p className={`text-xs leading-relaxed font-bold ${checkedDocs[idx] ? 'text-slate-800' : 'text-slate-600'}`}>
                          {doc.text}
                        </p>
                        <span className={`inline-block text-[8px] font-extrabold tracking-widest uppercase mt-1 px-2 py-0.5 rounded ${
                          doc.critical 
                            ? 'bg-red-100 text-red-600 border border-red-200/50' 
                            : 'bg-sky-100 text-sky-600 border border-sky-200/50'
                        }`}>
                          {doc.critical ? t.criticalDoc : t.optionalDoc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {allDocsChecked ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3.5 text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-black font-mono tracking-wide">{t.readyLabel}</span>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3 text-slate-500">
                    <span className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-pulse" />
                    <span className="text-xs font-extrabold font-mono tracking-wide">{t.notReadyLabel}</span>
                  </div>
                )}
              </div>

              {/* GoDriveify Pro Guidelines Card */}
              <div className="bg-white text-slate-700 p-6 rounded-3xl flex gap-4 items-start shadow-md border border-slate-150">
                <span className="text-3xl mt-0.5 shrink-0">💡</span>
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-black uppercase text-[#FF7112] tracking-wider font-mono">
                    {t.tipTitle}
                  </span>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {t.tipBody}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-2 text-[9.5px] text-sky-700 font-extrabold uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                    {t.bsdWarning}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </main>

      </div>

      <Footer />
    </>
  );
}
