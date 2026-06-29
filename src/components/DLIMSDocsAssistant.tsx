import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, Stethoscope, Download, ArrowRight, CreditCard, ChevronRight, FileBadge2, FileDown, Printer, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import QRCode from 'qrcode';

const LICENSE_TYPES = [
  { id: 'learner', name: 'Learner Permit', urduName: 'لرنر پرمٹ', desc: 'Required first step before regular license.', urduDesc: 'ریگولر لائسنس حاصل کرنے سے پہلے ضروری پہلا مرحلہ۔' },
  { id: 'regular', name: 'Fresh Regular License', urduName: 'نیا ریگولر لائسنس', desc: 'Permanent driving license (requires road test).', urduDesc: 'مستقل ڈرائیونگ لائسنس (روڈ ٹیسٹ پاس کرنا لازمی ہے)۔' },
  { id: 'renewal', name: 'License Renewal', urduName: 'لائسنس کی تجدید', desc: 'For renewing expired or close-to-expiry licenses.', urduDesc: 'میعاد ختم شدہ یا جلد ختم ہونے والے لائسنس کی تجدید کے لیے۔' },
  { id: 'duplicate', name: 'Duplicate License', urduName: 'ڈپلیکیٹ لائسنس', desc: 'In case original license is lost or damaged.', urduDesc: 'اصل لائسنس گم ہونے یا خراب ہونے کی صورت میں۔' },
  { id: 'international', name: 'International License', urduName: 'بین الاقوامی لائسنس', desc: 'For driving outside Pakistan legally.', urduDesc: 'پاکستان سے باہر قانونی طور پر گاڑی چلانے کے لیے۔' }
];

const VEHICLE_CATEGORIES = [
  { id: 'motorcycle', name: 'Motorcycle', urduName: 'موٹر سائیکل', baseLearner: 500, baseRegular: 450, testFee: 50, duplicateFee: 100, internationalFee: 450 },
  { id: 'car_jeep', name: 'Car / Jeep', urduName: 'کار / جیپ', baseLearner: 500, baseRegular: 1350, testFee: 150, duplicateFee: 150, internationalFee: 1350 },
  { id: 'ltv', name: 'LTV (Light Commercial)', urduName: 'ایل ٹی وی (کمرشل)', baseLearner: 500, baseRegular: 1850, testFee: 150, duplicateFee: 150, internationalFee: 1850 },
  { id: 'htv', name: 'HTV (Heavy Commercial)', urduName: 'ایچ ٹی وی (ہیوی)', baseLearner: 500, baseRegular: 1850, testFee: 200, duplicateFee: 200, internationalFee: 1850 }
];

// Document lists mapped dynamically to match license requirements
const DOC_TEMPLATES: Record<string, any[]>  = {
  learner: [
    { text: "Original Computerized National Identity Card (CNIC)", urduText: "اصل شناختی کارڈ (CNIC)", critical: true },
    { text: "Copy of your CNIC", urduText: "شناختی کارڈ کی فوٹو کاپی", critical: true },
    { text: "Processing fee voucher or online payment confirmation", urduText: "آن لائن ادائیگی کا ثبوت یا فیس واؤچر", critical: false }
  ],
  regular: [
    { text: "Original Learner Permit (Must be at least 42 days old)", urduText: "اصل لرنر پرمٹ (کم از کم 42 دن پرانا ہونا ضروری ہے)", critical: true },
    { text: "Original Computerized National Identity Card (CNIC)", urduText: "اصل شناختی کارڈ (CNIC)", critical: true },
    { text: "Copy of CNIC and 2 fresh passport-size photographs", urduText: "شناختی کارڈ کی کاپی اور 2 عدد پاسپورٹ سائز تصاویر", critical: true },
    { text: "Passed Sign & Road Test assessment sheet", urduText: "پاس شدہ سائن اور روڈ ٹیسٹ کی فائل", critical: false }
  ],
  renewal: [
    { text: "Original Expired Driving License", urduText: "اصل پرانا / میعاد ختم شدہ لائسنس", critical: true },
    { text: "Copy of CNIC and 2 fresh passport-size photographs", urduText: "شناختی کارڈ کی کاپی اور 2 عدد پاسپورٹ سائز تصاویر", critical: true },
    { text: "Medical Fitness Certificate (mandatory for age 50+)", urduText: "میڈیکل فٹنس سرٹیفکیٹ (50 سال سے زائد عمر کے لیے لازمی)", conditional: "age" }
  ],
  duplicate: [
    { text: "Police Report (Roznamcha/FIR) confirming loss of license", urduText: "پولیس رپورٹ (روزنامچہ یا FIR) لائسنس گم ہونے کا ثبوت", critical: true },
    { text: "Copy of lost license (if available) or License details", urduText: "گمشدہ لائسنس کی کاپی (اگر دستیاب ہو) یا تفصیلات", critical: false },
    { text: "Copy of CNIC and 2 fresh passport-size photographs", urduText: "شناختی کارڈ کی کاپی اور 2 عدد پاسپورٹ سائز تصاویر", critical: true }
  ],
  international: [
    { text: "Valid Regular Pakistani Driving License", urduText: "پاکستان کا مستقل کارآمد لائسنس", critical: true },
    { text: "Valid Pakistani Passport (valid for at least 6 months)", urduText: "اصل پاسپورٹ (کم از کم 6 ماہ کارآمد)", critical: true },
    { text: "Copy of Passport and National Identity Card (CNIC)", urduText: "پاسپورٹ اور شناختی کارڈ کی فوٹو کاپی", critical: true },
    { text: "2 fresh passport-size photographs (blue background)", urduText: "2 عدد تازہ پاسپورٹ سائز تصاویر (نیلا بیک گراؤنڈ)", critical: true }
  ]
};

export default function DLIMSDocsAssistant() {
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [selectedType, setSelectedType] = useState('learner');
  const [selectedCat, setSelectedCat] = useState('car_jeep');
  const [userAge, setUserAge] = useState(24);
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const [showMedicalModal, setShowMedicalModal] = useState(false);

  const DICTIONARY = {
    en: {
      portalBadge: "DLIMS Punjab License Portal",
      title: "DLIMS Document & Fee Assistant",
      subtitle: "Select your requirements below to calculate exact DLIMS fees and prepare a custom, interactive document checklist before visiting your local licensing center.",
      step1: "What Type of License Do You Need?",
      step2: "Vehicle Category",
      step3: "Applicant Age",
      step4: "Interactive Document Checklist",
      prepared: "Prepared",
      yearsOld: "Years Old",
      underageTitle: "Underage Alert:",
      underageDesc: "Minimal age eligibility is 18 years for Cars/Motorcycles under Punjab traffic laws.",
      medicalTitle: "Medical Required:",
      medicalDesc: "Applicants over 50 years are legally required to submit a verified Doctor Fitness Form-B.",
      htvTitle: "HTV Alert:",
      htvDesc: "Candidates must be at least 22 years of age and hold a regular LTV for 3 years to apply for heavy commercial classes.",
      downloadBlank: "Download Blank Form-B",
      assessmentTitle: "Official Fee Assessment",
      govtFee: "Govt License Fee",
      courierFee: "Govt Delivery/Courier",
      testFee: "Sign & Road Test Ticket",
      totalAmount: "Estimated Total Amount",
      disclaimer: "This estimate reflects the revised DLIMS Punjab 2.0 schedule. Keep matching tickets ready.",
      downloadPdf: "Download PDF Summary",
      verifyWebsite: "Verify On DLIMS Website",
      shareWhatsapp: "Share on WhatsApp",
      printChecklist: "Print Checklist",
      feeNotes: "*Fee structures are automatically sourced from the official DLIMS Punjab schedule. Keep your original CNIC on hand.",
      profileTitle: "Applicant Profile",
      feeAssessment: "Official Fee Assessment",
      mandatoryDocs: "Mandatory Documents Checklist"
    },
    ur: {
      portalBadge: "ڈی ایل آئی ایم ایس پنجاب لائسنس پورٹل",
      title: "ڈی ایل آئی ایم ایس دستاویزات اور فیس اسسٹنٹ",
      subtitle: "سرکاری فیس کا حساب لگانے اور اپنے لائسنسنگ سنٹر جانے سے پہلے شناختی دستاویزات کی لسٹ تیار کرنے کے لیے نیچے دیے گئے آپشنز منتخب کریں۔",
      step1: "آپ کو کس قسم کا لائسنس چاہیے؟",
      step2: "گاڑی کی کیٹیگری",
      step3: "امیدوار کی عمر",
      step4: "انٹرایکٹو شناختی دستاویزات کی لسٹ",
      prepared: "تیار شدہ",
      yearsOld: "سال",
      underageTitle: "کم عمر الرٹ:",
      underageDesc: "پنجاب ٹریفک قوانین کے تحت کار یا موٹر سائیکل کے لیے کم از کم عمر 18 سال ہونا لازمی ہے۔",
      medicalTitle: "میڈیکل فٹنس لازمی:",
      medicalDesc: "50 سال سے زائد عمر کے امیدواروں کے لیے تصدیق شدہ میڈیکل فٹنس فارم-بی جمع کروانا قانونی طور پر لازمی ہے۔",
      htvTitle: "ایچ ٹی وی (ہیوی) الرٹ:",
      htvDesc: "ہیوی کمرشل لائسنس کے لیے امیدوار کی عمر کم از کم 22 سال ہونی چاہیے اور 3 سال پرانا ایل ٹی وی لائسنس ہونا لازمی ہے۔",
      downloadBlank: "میڈیکل فارم-بی ڈاؤن لوڈ کریں",
      assessmentTitle: "سرکاری فیس کا حساب",
      govtFee: "سرکاری لائسنس فیس",
      courierFee: "ڈلیوری اور کورئیر فیس",
      testFee: "سائن اور روڈ ٹیسٹ چارجز",
      totalAmount: "کل تخمینہ شدہ رقم",
      disclaimer: "یہ تخمینہ نئے ڈی ایل آئی ایم ایس شیڈول کے مطابق ہے۔ اصل دستاویزات ساتھ رکھیں۔",
      downloadPdf: "پی ڈی ایف خلاصہ ڈاؤن لوڈ کریں",
      verifyWebsite: "سرکاری ویب سائٹ پر تصدیق کریں",
      shareWhatsapp: "واٹس ایپ پر شیئر کریں",
      printChecklist: "فہرست پرنٹ کریں",
      feeNotes: "*فیس کا ڈھانچہ سرکاری طور پر ڈی ایل آئی ایم ایس پنجاب شیڈول سے لیا گیا ہے۔ اپنا اصل شناختی کارڈ ساتھ رکھیں۔",
      profileTitle: "امیدوار کا پروفائل",
      feeAssessment: "سرکاری فیس کی تفصیلات",
      mandatoryDocs: "ضروری دستاویزات کی فہرست"
    }
  };

  const t = DICTIONARY[language];

  // DLIMS Punjab Fixed Delivery/Courier & Processing Fee
  const COURIER_FEE = 480;

  const calculateFees = () => {
    const category = VEHICLE_CATEGORIES.find(c => c.id === selectedCat);
    if (!category) return { test: 0, govt: 0, courier: 0, total: 0 };

    let test = 0;
    let govt = 0;
    let courier = 0;

    switch (selectedType) {
      case 'learner':
        govt = category.baseLearner;
        test = 0; // No test fee for learning permit
        courier = 0; // Printed instantly or downloaded online
        break;
      case 'regular':
        test = category.testFee;
        govt = category.baseRegular;
        courier = COURIER_FEE;
        break;
      case 'renewal':
        govt = category.baseRegular; // Renewal base equals base fee
        test = 0; // No test for standard renewal
        courier = COURIER_FEE;
        break;
      case 'duplicate':
        govt = category.duplicateFee;
        test = 0;
        courier = COURIER_FEE;
        break;
      case 'international':
        govt = category.internationalFee;
        test = 0;
        courier = COURIER_FEE;
        break;
      default:
        break;
    }

    return {
      test,
      govt,
      courier,
      total: test + govt + courier
    };
  };

  const fees = calculateFees();

  const getDynamicDocsList = () => {
    let baseList = DOC_TEMPLATES[selectedType] || [];
    
    // Add medical form criteria for users above 50 years of age or HTV applicants
    const needsMedical = userAge >= 50 || selectedCat === 'htv';
    
    // Filter & append based on age and category parameters
    let computedList = baseList.filter(doc => {
      if (doc.conditional === "age") {
        return needsMedical;
      }
      return true;
    });

    if (needsMedical && !computedList.some(d => d.text.includes("Medical Certificate"))) {
      computedList = [
        ...computedList,
        {
          text: "Medical Fitness Certificate Form-B (certified by a registered doctor)",
          urduText: "میڈیکل سرٹیفکیٹ فارم-بی (رجسٹرڈ ڈاکٹر سے تصدیق شدہ)",
          critical: true,
          isMedicalDownload: true
        }
      ];
    }

    return computedList;
  };

  const currentDocs = getDynamicDocsList();

  // Reset checked boxes when selections change to prevent state carry-over
  useEffect(() => {
    setCheckedDocs({});
  }, [selectedType, selectedCat, userAge]);

  const handleDocToggle = (index: number) => {
    setCheckedDocs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = currentDocs.length > 0 ? Math.round((completedCount / currentDocs.length) * 100) : 0;

  const getWhatsAppShareLink = () => {
    const typeObj = LICENSE_TYPES.find(t => t.id === selectedType);
    const catObj = VEHICLE_CATEGORIES.find(c => c.id === selectedCat);
    
    const docBullets = currentDocs.map((d, index) => {
      const isChecked = !!checkedDocs[index];
      const checkMarker = isChecked ? '✅ [READY]' : '⬜ [PENDING]';
      const detail = `${d.text} / ${d.urduText}`;
      return `${checkMarker} ${detail}`;
    }).join('\n');

    const totalStr = `Rs. ${fees.total.toLocaleString()}/-`;
    const message = `*📋 GoDriveify DLIMS CHECKLIST*\n` +
                    `-----------------------------\n` +
                    `👤 *Applicant Profile:*\n` +
                    `• License Type: ${typeObj?.name} (${typeObj?.urduName})\n` +
                    `• Vehicle: ${catObj?.name} (${catObj?.urduName})\n` +
                    `• Age: ${userAge} ${language === 'ur' ? 'سال' : 'Years'}\n\n` +
                    `💰 *Fee Breakdown (PKR):*\n` +
                    `• Govt License Fee: Rs. ${fees.govt.toLocaleString()}\n` +
                    (fees.courier > 0 ? `• Courier/Delivery: Rs. ${fees.courier.toLocaleString()}\n` : '') +
                    (fees.test > 0 ? `• Sign/Road Test Fee: Rs. ${fees.test.toLocaleString()}\n` : '') +
                    `• *Total Estimated: Rs. ${fees.total.toLocaleString()} /-*\n\n` +
                    `📄 *Documents Checklist:*\n` +
                    `${docBullets}\n\n` +
                    `Generated via GoDriveify Marketplace Document Assistant. Join GoDriveify Driving School to pass your DLIMS road tests flawlessly!`;
                    
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    
    // Theme colors
    const navyBlue: [number, number, number] = [0, 32, 96]; // #002060
    const accentOrange: [number, number, number] = [255, 113, 18]; // #FF7112
    const slateLight: [number, number, number] = [245, 247, 250]; // #f5f7fa

    // Generate QR Code for GoDriveify
    const websiteUrl = "https://godriveify.com"; // Default to your actual domain
    let qrCodeDataUrl = '';
    try {
      qrCodeDataUrl = await QRCode.toDataURL(websiteUrl, {
        color: {
          dark: '#002060',  // Navy Blue
          light: '#00000000' // Transparent
        },
        margin: 0,
        width: 100
      });
    } catch (err) {
      console.error("Failed to generate QR Code", err);
    }

    
    // ==========================================
    // 1. BRANDED HEADER
    // ==========================================
    doc.setFillColor(navyBlue[0], navyBlue[1], navyBlue[2]);
    doc.rect(0, 0, 210, 45, 'F');
    
    // Geometric accent 
    doc.setFillColor(accentOrange[0], accentOrange[1], accentOrange[2]);
    doc.triangle(170, 0, 210, 0, 210, 40, 'F');
    
    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("DLIMS Assessment", 14, 24);
    
    // Subtitle
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 210, 230);
    doc.text("Official Fee & Required Documents Summary", 14, 32);

    // GoDriveify Logo Text
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(accentOrange[0], accentOrange[1], accentOrange[2]);
    doc.text("GoDriveify", 196, 20, { align: 'right' });
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.text("Driving School", 196, 25, { align: 'right' });

    // Generation Stamp
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.text(`Generated: ${format(new Date(), 'MMM dd, yyyy - hh:mm a')}`, 14, 55);

    // ==========================================
    // 2. APPLICATION DETAILS TABLE
    // ==========================================
    doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Applicant Profile", 14, 68);
    
    const typeObj = LICENSE_TYPES.find(t => t.id === selectedType);
    const catObj = VEHICLE_CATEGORIES.find(c => c.id === selectedCat);
    
    autoTable(doc, {
      startY: 74,
      head: [['Category', 'Selection']],
      body: [
        ['License Type', typeObj?.name || ''],
        ['Vehicle Object', catObj?.name || ''],
        ['Applicant Age', `${userAge} Years Old`]
      ],
      headStyles: { fillColor: slateLight, textColor: navyBlue, fontStyle: 'bold' },
      bodyStyles: { textColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [252, 253, 255] },
      theme: 'grid',
      styles: { cellPadding: 4, fontSize: 10, lineColor: [230, 230, 230], lineWidth: 0.1 },
      margin: { left: 14, right: 14 }
    });

    // ==========================================
    // 3. FEE BREAKDOWN TABLE
    // ==========================================
    const currentY = (doc as any).lastAutoTable.finalY + 16;
    doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Official Fee Assessment", 14, currentY);

    const feeBody = [];
    if (fees.govt > 0) feeBody.push(['Govt License Form Fee', `Rs. ${fees.govt.toLocaleString()}`]);
    if (fees.courier > 0) feeBody.push(['Govt Delivery & Courier Fee', `Rs. ${fees.courier.toLocaleString()}`]);
    if (fees.test > 0) feeBody.push(['Sign & Road Test Processing', `Rs. ${fees.test.toLocaleString()}`]);
    
    // Add bold total row at bottom
    feeBody.push(['Total Estimated Cost', `Rs. ${fees.total.toLocaleString()} /-`]);

    autoTable(doc, {
      startY: currentY + 6,
      head: [['Fee Breakdown', 'Amount (PKR)']],
      body: feeBody,
      headStyles: { fillColor: slateLight, textColor: navyBlue, fontStyle: 'bold' },
      bodyStyles: { textColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [252, 253, 255] },
      theme: 'grid',
      styles: { cellPadding: 5, fontSize: 10, lineColor: [230, 230, 230], lineWidth: 0.1 },
      margin: { left: 14, right: 14 },
      didParseCell: function (data) {
        if (data.row.index === feeBody.length - 1) {
          data.cell.styles.fillColor = [255, 245, 235]; // Light Orange
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = navyBlue;
        }
      }
    });

    // ==========================================
    // 4. REQUIRED DOCUMENTS
    // ==========================================
    const docsY = (doc as any).lastAutoTable.finalY + 16;
    doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Mandatory Documents Checklist", 14, docsY);

    const docsBody = currentDocs.map((d, index) => {
      const isReady = !!checkedDocs[index];
      const status = isReady ? 'Yes ✓' : 'Pending';
      return [
        { 
          content: status, 
          styles: { 
            fontStyle: 'bold', 
            textColor: isReady ? [0, 150, 50] : [200, 50, 50],
            halign: 'center'
          } 
        },
        d.text
      ];
    });

    autoTable(doc, {
      startY: docsY + 6,
      head: [['Prepared', 'Document Requirement']],
      body: docsBody,
      headStyles: { fillColor: slateLight, textColor: navyBlue, fontStyle: 'bold' },
      bodyStyles: { textColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [252, 253, 255] },
      theme: 'grid',
      styles: { cellPadding: 5, fontSize: 10, lineColor: [230, 230, 230], lineWidth: 0.1 },
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 30 }
      }
    });

    // ==========================================
    // 5. FOOTER & PAGINATION
    // ==========================================
    const pageCount = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.setFont("helvetica", "normal");
        
        // Divider line
        doc.setDrawColor(230, 230, 230);
        doc.line(14, 280, 196, 280);
        
        doc.text(`Page ${i} of ${pageCount}`, 14, 288);
        
        // Add QR Code if available
        let textOffset = 196;
        if (qrCodeDataUrl) {
          // Add it right above or next to the footer text, maybe aligned to the right
          doc.addImage(qrCodeDataUrl, 'PNG', 184, 282, 12, 12);
          textOffset = 180;
        }
        
        doc.text(`Official Document strictly for GoDriveify Customers`, textOffset, 288, { align: 'right' });
    }

    doc.save(`DLIMS_Checklist_${format(new Date(), 'yyyyMMdd')}.pdf`);
  };

  return (
    <div className={`max-w-6xl mx-auto my-16 px-6 relative ${language === 'ur' ? 'font-urdu' : 'font-sans'}`} id="dlims-assistant">
      {/* Printable visibility style override */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-checklist, #printable-checklist * {
            visibility: visible;
          }
          #printable-checklist {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 24px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}} />

      {/* Language Toggle */}
      <div className="flex justify-center mb-6 no-print">
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/60 shadow-inner">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-4.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              language === 'en'
                ? 'bg-[#002060] text-white shadow-md'
                : 'text-slate-600 hover:text-[#002060]'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('ur')}
            className={`px-4.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              language === 'ur'
                ? 'bg-[#002060] text-white shadow-md'
                : 'text-slate-600 hover:text-[#002060]'
            }`}
          >
            اردو (Urdu)
          </button>
        </div>
      </div>
      
      {/* Header Block */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7112] bg-[#FF7112]/10 px-4 py-2 rounded-full border border-[#FF7112]/20 mb-4 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t.portalBadge}
        </span>
        <h2 className="text-3xl lg:text-5xl font-black text-[#002060] mt-3 leading-tight tracking-tight">
          {t.title}
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm leading-relaxed font-medium">
          {t.subtitle}
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div id="printable-checklist" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gradient-to-br from-white via-slate-50/50 to-slate-100/50 border border-slate-200/60 rounded-[2.5rem] p-6 lg:p-10 shadow-2xl relative">
        
        {/* Left Interactive Selection Panel (col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: License Type Selection */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <label className="flex items-center gap-2 text-xs font-black text-[#002060] uppercase tracking-widest mb-4">
              <span className="bg-[#002060] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
              {t.step1}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LICENSE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    selectedType === type.id
                      ? 'border-[#002060] bg-[#002060] text-white shadow-lg scale-[1.02]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5 relative z-10">
                    <span className="font-extrabold text-sm flex items-center gap-2">
                       {selectedType === type.id && <CheckCircle2 className="w-4 h-4 text-[#FF7112]" />}
                       {language === 'ur' ? type.urduName : type.name}
                    </span>
                    <span className={`text-[11px] font-bold ${selectedType === type.id ? 'text-orange-400' : 'text-slate-400'}`}>
                      {language === 'ur' ? type.name : type.urduName}
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed relative z-10 ${selectedType === type.id ? 'text-slate-200' : 'text-slate-500'}`}>
                    {language === 'ur' ? type.urduDesc : type.desc}
                  </p>
                  
                  {/* Active background subtle glow */}
                  {selectedType === type.id && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-y-8 translate-x-8" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Vehicle Category & Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            
            {/* Vehicle Selection */}
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-[#002060] uppercase tracking-widest mb-4">
                <span className="bg-[#002060] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
                {t.step2}
              </label>
              <div className="space-y-2.5">
                {VEHICLE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`w-full p-4 rounded-2xl border flex justify-between items-center transition-all duration-300 cursor-pointer ${
                      selectedCat === cat.id
                        ? 'border-[#FF7112] bg-[#FF7112]/10 text-[#FF7112] font-bold shadow-md scale-[1.02]'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-sm font-extrabold flex items-center gap-2">
                       {selectedCat === cat.id && <ChevronRight className="w-4 h-4 text-[#FF7112]" />}
                       {language === 'ur' ? cat.urduName : cat.name}
                    </span>
                    <span className={`text-[11px] font-bold ${selectedCat === cat.id ? 'text-[#FF7112]' : 'text-slate-400'}`}>{language === 'ur' ? cat.name : cat.urduName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Age Input & Live Alerts */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <label className="flex items-center gap-2 text-xs font-black text-[#002060] uppercase tracking-widest mb-4">
                  <span className="bg-[#002060] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">3</span>
                  {t.step3} <span className="text-[#FF7112] font-bold text-[10px] bg-[#FF7112]/10 px-2 py-0.5 rounded-md">({userAge} {t.yearsOld})</span>
                </label>
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm no-print">
                  <input
                    type="number"
                    min="15"
                    max="90"
                    value={userAge}
                    onChange={(e) => setUserAge(Math.max(1, Number(e.target.value)))}
                    className="w-20 px-3 py-2 border border-slate-200 rounded-xl font-black text-xl text-center text-[#002060] focus:ring-2 focus:ring-[#FF7112]/50 focus:border-[#FF7112] focus:outline-none transition-all shadow-inner"
                  />
                  <div className="flex-1 px-2">
                    <input
                      type="range"
                      min="18"
                      max="75"
                      value={userAge}
                      onChange={(e) => setUserAge(Number(e.target.value))}
                      className="w-full accent-[#FF7112] cursor-pointer h-2 bg-slate-200 rounded-full appearance-none"
                    />
                  </div>
                </div>
              </div>

              {/* Age & Category Guideline Warnings */}
              <div className="mt-6 space-y-3 relative z-10">
                {userAge < 18 && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl rounded-l-sm text-red-900 text-xs leading-relaxed flex gap-3 shadow-sm">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p>
                      <strong className="block mb-1 text-red-800">{t.underageTitle}</strong>
                      {t.underageDesc}
                    </p>
                  </div>
                )}
                {userAge >= 50 && (
                  <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl rounded-l-sm text-amber-900 text-xs leading-relaxed flex gap-3 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <Stethoscope className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p>
                      <strong className="block mb-1 text-amber-800">{t.medicalTitle}</strong>
                      {t.medicalDesc}
                    </p>
                  </div>
                )}
                {selectedCat === 'htv' && userAge < 22 && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl rounded-l-sm text-red-900 text-xs leading-relaxed flex gap-3 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p>
                      <strong className="block mb-1 text-red-800">{t.htvTitle}</strong>
                      {t.htvDesc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Live Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-5 gap-4">
              <label className="flex items-center gap-2 text-xs font-black text-[#002060] uppercase tracking-widest">
                <span className="bg-[#002060] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">4</span>
                {t.step4}
              </label>
              <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-2">
                 <FileBadge2 className="w-4 h-4 text-emerald-600" />
                 <span className="text-xs font-black text-emerald-700">
                  {t.prepared}: {completedCount} / {currentDocs.length}
                 </span>
              </div>
            </div>

            {/* Document checklist box */}
            <div className="bg-slate-50/50 rounded-2xl border border-slate-200 shadow-inner p-5 space-y-3">
              
              {/* Progress Indicator */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-6 relative">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500 ease-out relative" 
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,currentColor_25%,transparent_25%,transparent_50%,currentColor_50%,currentColor_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] opacity-20 motion-safe:animate-[slide_1s_linear_infinite]" />
                </div>
              </div>

              {currentDocs.map((doc, index) => {
                const isChecked = !!checkedDocs[index];
                return (
                  <div
                    key={index}
                    onClick={() => handleDocToggle(index)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 flex gap-4 items-start cursor-pointer group hover:-translate-y-0.5 ${
                      isChecked
                        ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950 shadow-md'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    {/* Checkbox Icon */}
                    <div className={`w-5 h-5 rounded-md border-2 mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-slate-50 group-hover:border-slate-400'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    
                    {/* Checklist details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <span className={`text-sm font-bold transition-colors ${isChecked ? 'text-emerald-900' : 'text-slate-800'}`}>
                          {language === 'ur' ? doc.urduText : doc.text}
                        </span>
                        <span className="text-[11px] text-slate-500 font-bold bg-white/50 px-2 py-1 rounded border border-slate-100">
                          {language === 'ur' ? doc.text : doc.urduText}
                        </span>
                      </div>
                      
                      {/* Special Action downloads for Form B */}
                      {doc.isMedicalDownload && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMedicalModal(true);
                          }}
                          className="inline-flex items-center gap-2 mt-3 text-[11px] font-black uppercase text-orange-700 bg-orange-100 hover:bg-[#FF7112] hover:text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {t.downloadBlank}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Financial Assessment Panel (col-span-5) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#002060] to-[#001540] text-white rounded-[2rem] p-8 lg:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden h-fit sticky top-24">
          {/* Subtle background graphics */}
          <div className="absolute -right-12 -top-12 opacity-10 w-64 h-64 rounded-full border-[30px] border-white pointer-events-none" />
          <div className="absolute -left-16 bottom-20 opacity-5 w-48 h-48 rounded-full bg-white blur-3xl pointer-events-none" />

          <div className="space-y-8 z-10">
            <h3 className="text-xl font-extrabold border-b border-white/10 pb-4 flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              {t.assessmentTitle}
            </h3>

            {/* Fee itemization breakdowns */}
            <div className="space-y-4">
              
              {/* Govt License Processing Fee */}
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                <div>
                  <span className="block text-slate-300 font-bold">{t.govtFee}</span>
                  <span className="text-[11px] text-slate-400 font-medium">سرکاری لائسنس فیس</span>
                </div>
                <span className="font-black tracking-wider text-slate-100 text-lg">Rs. {fees.govt.toLocaleString()}</span>
              </div>

              {/* Courier Fee if applicable */}
              {fees.courier > 0 && (
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                  <div>
                    <span className="block text-slate-300 font-bold">{t.courierFee}</span>
                    <span className="text-[11px] text-slate-400 font-medium">ڈلیوری اور کورئیر فیس</span>
                  </div>
                  <span className="font-black tracking-wider text-slate-100 text-lg">Rs. {fees.courier.toLocaleString()}</span>
                </div>
              )}

              {/* Assessment test fee */}
              {fees.test > 0 && (
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                  <div>
                    <span className="block text-slate-300 font-bold">{t.testFee}</span>
                    <span className="text-[11px] text-slate-400 font-medium">ٹیسٹ فائل ٹکٹ چارجز</span>
                  </div>
                  <span className="font-black tracking-wider text-slate-100 text-lg">Rs. {fees.test.toLocaleString()}</span>
                </div>
              )}

            </div>

            {/* Mega Bold Total Output */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center my-8 backdrop-blur-md relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              <span className="text-xs text-[#FF7112] font-black tracking-widest uppercase block mb-2">
                {t.totalAmount}
              </span>
              <span className="text-4xl lg:text-5xl font-black text-emerald-400 tracking-tighter drop-shadow-lg">
                Rs. {fees.total.toLocaleString()}
              </span>
              <span className="text-xl text-emerald-400/80 font-bold ml-1">/-</span>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-4">
                {t.disclaimer}
              </p>
            </div>

          </div>

          {/* Guidelines Links / Actions */}
          <div className="mt-4 pt-6 border-t border-white/10 text-center z-10 flex flex-col gap-3">
             <button
              onClick={handleDownloadPDF}
              className="group inline-flex w-full items-center justify-center gap-3 bg-white text-[#002060] font-black py-4 rounded-xl shadow-xl transition-all duration-300 text-sm uppercase tracking-wider relative overflow-hidden hover:-translate-y-1 hover:bg-slate-50 cursor-pointer no-print"
            >
              <FileDown className="w-5 h-5 text-[#FF7112] bg-[#FF7112]/10 p-1 rounded-md" />
              {t.downloadPdf}
            </button>
            <a
              href={getWhatsAppShareLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl shadow-xl shadow-emerald-600/20 transition-all duration-300 text-sm uppercase tracking-wider relative overflow-hidden hover:-translate-y-1 cursor-pointer no-print"
            >
              <Share2 className="w-5 h-5" />
              {t.shareWhatsapp}
            </a>
            <button
              onClick={() => window.print()}
              className="group inline-flex w-full items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-xl shadow-xl transition-all duration-300 text-sm uppercase tracking-wider relative overflow-hidden hover:-translate-y-1 cursor-pointer no-print"
            >
              <Printer className="w-5 h-5" />
              {t.printChecklist}
            </button>
            <a
              href="https://dlims.punjab.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 bg-[#FF7112] hover:bg-orange-500 text-white font-black py-4 rounded-xl shadow-xl shadow-[#FF7112]/20 transition-all duration-300 text-sm uppercase tracking-wider relative overflow-hidden hover:-translate-y-1 cursor-pointer no-print"
            >
              {t.verifyWebsite}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <span className="text-[10px] text-slate-400 block mt-4 leading-relaxed max-w-xs mx-auto">
              {t.feeNotes}
            </span>
          </div>

        </div>

      </div>

      {/* Embedded Doctor Medical Form-B Modal Dialog */}
      {showMedicalModal && (
        <div className="fixed inset-0 z-[50000] bg-[#002060]/80 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-6 lg:p-8 border border-white/20 animate-in fade-in zoom-in-95 duration-300 ease-out">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-amber-100 p-3 rounded-2xl">
                 <Stethoscope className="w-8 h-8 text-amber-600" />
              </div>
              <button
                onClick={() => setShowMedicalModal(false)}
                className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-black transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <h3 className="text-xl font-black text-[#002060] mb-3">
              {language === 'ur' ? "میڈیکل فٹنس فارم-بی حاصل کریں" : "Download Fitness Form-B"}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              {language === 'ur' 
                ? "50 سال سے زائد عمر کے امیدواروں یا ایچ ٹی وی ہیوی لائسنس کے لیے ضروری ہے کہ وہ اس فارم کو ڈاؤن لوڈ اور پرنٹ کر کے کسی رجسٹرڈ میڈیکل ڈاکٹر سے تصدیق کروائیں۔"
                : "To proceed with DLIMS regular applications (above 50 years of age) or commercial HTV classes, please download, print, and get this physical assessment form stamped by a registered medical practitioner (PMDC)."}
            </p>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3 text-sm text-slate-700 mb-8 shadow-inner">
              <p className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="font-medium">{language === 'ur' ? "1. بنیادی معائنہ:" : "1. Primary checkups:"}</span>
                <strong className="text-slate-900 bg-white px-2 py-1 rounded shadow-sm">{language === 'ur' ? "نظر اور کلر بلائنڈنیس" : "Eye-sight & Colorblindness"}</strong>
              </p>
              <p className="flex justify-between items-center pt-1">
                <span className="font-medium">{language === 'ur' ? "2. مجاز ڈاکٹرز:" : "2. Authorized Doctors:"}</span>
                <strong className="text-slate-900 bg-white px-2 py-1 rounded shadow-sm">{language === 'ur' ? "سرکاری یا رجسٹرڈ ڈاکٹر" : "Govt / PMDC Doctor"}</strong>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://dlims.punjab.gov.pk/assets/form/Form_B.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-[#FF7112] hover:bg-[#E05A00] text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {language === 'ur' ? "سرکاری لنک کھولیں" : "Get Official PDF Link"}
              </a>
              <button
                onClick={() => setShowMedicalModal(false)}
                className="flex w-full items-center justify-center bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer"
              >
                {language === 'ur' ? "منسوخ کریں" : "Cancel and close"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
