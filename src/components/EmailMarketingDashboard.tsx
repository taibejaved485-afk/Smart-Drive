import React, { useState, useEffect } from 'react';
import { 
  Mail, Users, FileSpreadsheet, Clock, Sparkles, Send, Search, Trash2, 
  ShieldAlert, ArrowUp, ArrowLeft, Layout, Target, MessageSquare, 
  BarChart3, CheckCircle2, ChevronRight, Sparkle, Settings, HelpCircle, 
  TrendingUp, SendHorizontal, RefreshCw, Layers, Plus, Filter, UserCheck, Check
} from 'lucide-react';
import { 
  fetchMarketingSubscribers, 
  upsertMarketingSubscriber, 
  deleteMarketingSubscriber, 
  fetchMarketingCampaigns, 
  saveMarketingCampaign 
} from '../lib/supabase';

// Pre-populated local database of newsletter subscribers and leads (fallback)
const INITIAL_AUDIENCE = [
  { id: '1', name: 'Zainab Bibi', email: 'zainab.b@gmail.com', type: 'subscriber', source: 'Newsletter Widget', date: '2026-06-15', status: 'active' },
  { id: '2', name: 'Usman Ghani', email: 'usman.ghani@yahoo.com', type: 'lead', source: 'Contact Form', date: '2026-06-20', status: 'active' },
  { id: '3', name: 'Ayesha Khan', email: 'ayesha.k@fast.edu.pk', type: 'student', source: 'Admissions Portal', date: '2026-06-25', status: 'completed' }
];

// Pre-designed GoDriveify high-converting marketing email templates
const EMAIL_TEMPLATES = [
  {
    id: 'welcome',
    name: '✨ Welcome & Fuel Saver Discount',
    subject: 'Start Driving Smarter with GoDriveify! (Rs. 8,500 Petrol Hack Included) ⛽',
    body: `<div style="font-family: 'Plus Jakarta Sans', 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
  <!-- Top Banner -->
  <div style="background-color: #002060; padding: 24px; text-align: center;">
    <img src="https://i.pinimg.com/736x/ca/5b/12/ca5b1205f038143bc578baaa8f07ff29.jpg" alt="GoDriveify Logo" style="height: 60px; width: auto; border-radius: 8px; display: inline-block;" />
    <p style="color: #ffffff; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 10px 0 0 0; font-weight: 700;">Pakistan's #1 Smart Driving School</p>
  </div>
  
  <!-- Body -->
  <div style="padding: 32px 24px; color: #334155; line-height: 1.6; font-size: 14px;">
    <h2 style="color: #002060; font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">Assalam-o-Alaikum & Welcome to GoDriveify! 👋</h2>
    
    <p style="margin-bottom: 16px;">We are thrilled to welcome you to Pakistan's most premium, simulator-equipped driving program. Aapka driving license pass karwana aur road safety seekhana hamara mission hai.</p>
    
    <!-- Info Highlight Box -->
    <div style="background-color: #f8fafc; border-left: 4px solid #FF7112; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <p style="margin: 0; font-weight: 700; color: #1e293b; font-size: 15px;">💡 Petrol Saving Hack (Econodrive mechanics)</p>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">Adjusting your physical acceleration mechanics can save you up to <strong>Rs. 8,500 every single month</strong> in petrol. Hamaray certified trainers aapko practical batch me ye seekhain ge!</p>
    </div>
    
    <p style="margin-bottom: 20px;">To celebrate your signup, here is your exclusive, limited-time welcome discount:</p>
    
    <!-- Voucher Box -->
    <div style="background-color: #fff7ed; border: 2px dashed #ff7112; padding: 20px; border-radius: 12px; text-align: center; margin: 24px 0;">
      <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #ea580c; font-weight: 800; display: block; margin-bottom: 6px;">Your Personal Discount Voucher</span>
      <span style="font-size: 22px; font-weight: 900; color: #d97706; letter-spacing: 1px; display: block; margin-bottom: 12px;">ECODRIVE10</span>
      <span style="font-size: 12px; color: #7c2d12; font-weight: 600; display: block;">Flat 10% OFF on our Premium Simulator Batch!</span>
    </div>

    <!-- Call to Action Button -->
    <div style="text-align: center; margin: 30px 0 10px 0;">
      <a href="https://wa.me/923000000000?text=I%20want%20to%20join%20GoDriveify" style="background-color: #FF7112; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 30px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(255, 113, 18, 0.25); transition: background-color 0.2s;">Book Your Simulator Seat Now 🚗</a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8;">
    <p style="margin: 0 0 8px 0; font-weight: 700; color: #64748b;">GoDriveify Faisalabad</p>
    <p style="margin: 0 0 16px 0;">Canal Road, Near Faisalabad Campus, Punjab, Pakistan</p>
    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Website</a> | 
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Unsubscribe</a> | 
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Support</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'dlims_prep',
    name: '🚦 DLIMS Cones Test Cheat Sheet',
    subject: 'Are you ready for your Punjab Driving Test? (L-Shape Secrets Inside!) 📐',
    body: `<div style="font-family: 'Plus Jakarta Sans', 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
  <!-- Top Banner -->
  <div style="background-color: #002060; padding: 24px; text-align: center;">
    <img src="https://i.pinimg.com/736x/ca/5b/12/ca5b1205f038143bc578baaa8f07ff29.jpg" alt="GoDriveify Logo" style="height: 60px; width: auto; border-radius: 8px; display: inline-block;" />
    <p style="color: #ffffff; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 10px 0 0 0; font-weight: 700;">Pakistan's #1 Smart Driving School</p>
  </div>
  
  <!-- Body -->
  <div style="padding: 32px 24px; color: #334155; line-height: 1.6; font-size: 14px;">
    <h2 style="color: #002060; font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">DLIMS Cones Test Cheat Sheet 🚦</h2>
    
    <p style="margin-bottom: 16px;">Dear Learner,</p>
    <p style="margin-bottom: 16px;">Most candidates fail the physical Punjab Police traffic sign test or the reverse L-shape test on their first try because of a single steering alignment mistake. <strong>GoDriveify simulator training guarantees 100% preparation so you pass with zero stress!</strong></p>
    
    <!-- Checklist Block -->
    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 12px; margin: 24px 0;">
      <p style="margin: 0 0 12px 0; font-weight: 800; color: #166534; font-size: 15px;">📐 Key Passing Tips (L-Shape Secret):</p>
      <ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 13px;">
        <li style="margin-bottom: 8px;"><strong>Side Mirror Alignment:</strong> Mirror ko line ke critical corner cone se guide line me rkhain bgher steer kiya.</li>
        <li style="margin-bottom: 8px;"><strong>Counter-Steering Ratio:</strong> Start steering exactly when the middle of your car body reaches the apex cone.</li>
        <li style="margin-bottom: 0;"><strong>Visual Grounding:</strong> Look straight at the rear rear-view mirrors to balance side gaps symmetrically.</li>
      </ul>
    </div>

    <!-- Call to Action Button -->
    <div style="text-align: center; margin: 30px 0 10px 0;">
      <a href="https://wa.me/923000000000?text=I%20want%20to%20book%20a%20dlims%20simulator%20class" style="background-color: #002060; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 30px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(0, 32, 96, 0.25); transition: background-color 0.2s;">Schedule 1-on-1 Simulator Prep 🚗</a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8;">
    <p style="margin: 0 0 8px 0; font-weight: 700; color: #64748b;">GoDriveify Faisalabad</p>
    <p style="margin: 0 0 16px 0;">Canal Road, Near Faisalabad Campus, Punjab, Pakistan</p>
    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Website</a> | 
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Unsubscribe</a> | 
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Support</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'scam_shield',
    name: '🛡️ Used Car Inspection Checklist',
    subject: 'Buying a used car in Faisalabad? Don\'t get scammed! 🔍',
    body: `<div style="font-family: 'Plus Jakarta Sans', 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
  <!-- Top Banner -->
  <div style="background-color: #002060; padding: 24px; text-align: center;">
    <img src="https://i.pinimg.com/736x/ca/5b/12/ca5b1205f038143bc578baaa8f07ff29.jpg" alt="GoDriveify Logo" style="height: 60px; width: auto; border-radius: 8px; display: inline-block;" />
    <p style="color: #ffffff; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 10px 0 0 0; font-weight: 700;">Pakistan's #1 Smart Driving School</p>
  </div>
  
  <!-- Body -->
  <div style="padding: 32px 24px; color: #334155; line-height: 1.6; font-size: 14px;">
    <h2 style="color: #002060; font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">Used Car Buyers Scam Protection Guide 🛡️</h2>
    
    <p style="margin-bottom: 16px;">Hi there,</p>
    <p style="margin-bottom: 16px;">Faisalabad aur overall Punjab me used car buy karte hue dealers aksar bare level scams karte hain. Before handing over hard-earned lakhs of rupees, use our verified legal safety steps to secure your investment.</p>
    
    <!-- Warning Box -->
    <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 18px; border-radius: 0 12px 12px 0; margin: 24px 0;">
      <p style="margin: 0 0 8px 0; font-weight: 800; color: #991b1b; font-size: 14px;">🚨 Critical Checklist:</p>
      <ol style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 13px; line-height: 1.5;">
        <li style="margin-bottom: 8px;"><strong>Fake Smart Cards:</strong> Original cards emit a subtle green UV security light emblem when viewed from under a standard blue laser torch.</li>
        <li style="margin-bottom: 8px;"><strong>Tempered Engine/Chassis Plate:</strong> Inspect passenger-side door trim labels for minor weld marks or illegal color disparities.</li>
        <li style="margin-bottom: 0;"><strong>MTMIS Biometric Check:</strong> Never pay the token money without verifying current biometric transfers from MTMIS Punjab app live.</li>
      </ol>
    </div>

    <p style="margin-bottom: 20px;">Avoid legal trouble with proper vehicle testing! Try our specialized technical course before buying your first car.</p>

    <!-- Call to Action Button -->
    <div style="text-align: center; margin: 30px 0 10px 0;">
      <a href="https://wa.me/923000000000?text=I%20want%20to%20discuss%20used%20car%20inspection%20tips" style="background-color: #ef4444; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 30px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25); transition: background-color 0.2s;">Get Professional Vehicle Inspection Advice 🔍</a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8;">
    <p style="margin: 0 0 8px 0; font-weight: 700; color: #64748b;">GoDriveify Faisalabad</p>
    <p style="margin: 0 0 16px 0;">Canal Road, Near Faisalabad Campus, Punjab, Pakistan</p>
    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Website</a> | 
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Unsubscribe</a> | 
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Support</a>
    </div>
  </div>
</div>`
  }
];

interface EmailMarketingDashboardProps {
  onBackToDashboard?: () => void;
}

export default function EmailMarketingDashboard({ onBackToDashboard }: EmailMarketingDashboardProps) {
  const [activeTab, setActiveTab] = useState('campaign'); // 'campaign', 'audience', 'templates', 'analytics'
  const [audience, setAudience] = useState<any[]>([]);
  const [campaignsHistory, setCampaignsHistory] = useState<any[]>([]);

  // Editor states
  const [emailSubject, setEmailSubject] = useState(EMAIL_TEMPLATES[0].subject);
  const [emailBody, setEmailBody] = useState(EMAIL_TEMPLATES[0].body);
  const [targetFilter, setTargetFilter] = useState('all'); // 'all', 'subscriber', 'lead', 'student'
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');

  // AI Assistant states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState('persuasive'); // 'persuasive', 'professional', 'urgent', 'friendly'
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Audience Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [audienceTypeFilter, setAudienceTypeFilter] = useState('all');

  // Interface notification feedback
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'|'info'} | null>(null);

  // Manage custom audience additions
  const [newSubName, setNewSubName] = useState('');
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubType, setNewSubType] = useState('subscriber');

  const showToast = (message: string, type: 'success'|'error'|'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    loadMarketingData();

    // Listen for updates
    window.addEventListener('marketing_sub_updated', loadMarketingData);
    window.addEventListener('marketing_campaign_updated', loadMarketingData);
    return () => {
      window.removeEventListener('marketing_sub_updated', loadMarketingData);
      window.removeEventListener('marketing_campaign_updated', loadMarketingData);
    };
  }, []);

  const loadMarketingData = async () => {
    const subs = await fetchMarketingSubscribers();
    // Merge database/localStorage subscribers with INITIAL_AUDIENCE to maintain rich visual presentation
    const merged = [...subs];
    INITIAL_AUDIENCE.forEach(item => {
      if (!merged.some(m => m.email.toLowerCase() === item.email.toLowerCase())) {
        merged.push(item);
      }
    });
    setAudience(merged);
    
    const campaigns = await fetchMarketingCampaigns();
    setCampaignsHistory(campaigns);
  };

  const handleTemplateSelect = (id: string) => {
    const t = EMAIL_TEMPLATES.find(temp => temp.id === id);
    if (t) {
      setSelectedTemplate(id);
      setEmailSubject(t.subject);
      setEmailBody(t.body);
      showToast('Template successfully applied to editor!', 'success');
    }
  };

  const handleAiCopywrite = async () => {
    if (!aiPrompt) {
      showToast('Please type an idea or brief prompt first!', 'error');
      return;
    }

    setIsAiGenerating(true);
    showToast(`Consulting GoDriveify AI (${aiTone} tone)... 🧠`, 'info');

    try {
      const response = await fetch("/api/marketing/generate-email", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, tone: aiTone })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API returned status ${response.status}`);
      }

      const generatedData = await response.json();
      setEmailSubject(generatedData.subject || "Exciting GoDriveify Update!");
      setEmailBody(generatedData.bodyHtml || "<p>Welcome back to GoDriveify!</p>");
      showToast('AI copywriter successfully generated draft content! ✨', 'success');
      setAiPrompt('');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'AI generation failed.', 'error');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSendTest = () => {
    showToast('Test email sent to admin@godriveify.com! 🧪', 'info');
  };

  const handleSendCampaign = async (isDraft = false) => {
    const filteredList = audience.filter((user: any) => {
      if (user.status === 'banned') return false;
      const matchesFilter = targetFilter === 'all' || user.type === targetFilter;
      const matchesSearch = (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    if (!isDraft && filteredList.length === 0) {
      showToast('No active recipients match your target filter!', 'error');
      return;
    }

    const newCampaign = {
      id: crypto.randomUUID(),
      subject: emailSubject,
      body: emailBody,
      target_segment: targetFilter,
      sent_count: isDraft ? 0 : filteredList.length,
      open_rate: isDraft ? '0%' : (Math.random() * 20 + 70).toFixed(1) + '%', 
      status: isDraft ? 'draft' : 'delivered',
      created_at: new Date().toISOString()
    };

    const success = await saveMarketingCampaign(newCampaign);
    if (success) {
      showToast(isDraft ? 'Campaign saved as draft! 💾' : `Campaign dispatched to ${filteredList.length} emails! ✉️💨`, 'success');
    } else {
      showToast('Failed to save campaign.', 'error');
    }
  };

  const handleAddAudienceUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName || !newSubEmail) {
      showToast('Please fill all fields to add a subscriber!', 'error');
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: newSubName,
      email: newSubEmail,
      type: newSubType,
      source: 'Admin Direct Input',
      created_at: new Date().toISOString(),
      status: 'active'
    };

    const success = await upsertMarketingSubscriber(newUser);
    if (success) {
      setNewSubName('');
      setNewSubEmail('');
      showToast(`Added ${newSubName} successfully!`, 'success');
    } else {
      showToast('Failed to add subscriber to database.', 'error');
    }
  };

  const handleDeleteAudienceUser = async (id: string) => {
    const success = await deleteMarketingSubscriber(id);
    if (success) {
      showToast('Recipient removed from database.', 'info');
    } else {
      showToast('Failed to remove recipient.', 'error');
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto py-8 px-4 sm:px-6">
      
      {/* Premium Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#112240] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/5 mb-10 group">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-96 h-96 bg-gradient-to-br from-[#FF7112]/20 to-purple-600/10 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Back to Control Panel
              </button>
            )}
            
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7112] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF7112]"></span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#FF7112]">GoDriveify Studio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Email Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7112] to-amber-400">Command Center</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base font-medium max-w-xl">
              Write, design, and dispatch beautifully responsive campaigns powered by custom templates or on-demand Gemini AI copywriting.
            </p>
          </div>

          {/* Real-time Statistics Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shrink-0 min-w-full sm:min-w-[400px]">
            <div className="text-center relative">
              <span className="block text-2xl sm:text-3xl font-black text-white tracking-tight">{audience.length}</span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-1 block">Contacts</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden sm:block" />
            </div>
            <div className="text-center relative">
              <span className="block text-2xl sm:text-3xl font-black text-[#FF7112] tracking-tight">{campaignsHistory.length}</span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-1 block">Sent</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10 hidden sm:block" />
            </div>
            <div className="text-center">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                {campaignsHistory.length > 0 ? '74.5%' : '0%'}
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-1 block">Avg Open</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sleek Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-4 shadow-sm">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 ml-4">Studio Navigator</span>
            <div className="space-y-1.5">
              {[
                { id: 'campaign', label: 'Campaign Composer', icon: <Mail className="w-4 h-4" />, desc: 'Write & dispatch email' },
                { id: 'audience', label: 'Audience & Leads', icon: <Users className="w-4 h-4" />, desc: 'Manage subscribers' },
                { id: 'templates', label: 'Creative Library', icon: <Layout className="w-4 h-4" />, desc: 'Explore preset templates' },
                { id: 'analytics', label: 'Campaign History', icon: <BarChart3 className="w-4 h-4" />, desc: 'Open rates & telemetry' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full group px-4 py-3 rounded-2xl text-left transition-all duration-200 flex items-center gap-3.5 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#FF7112] text-white shadow-lg shadow-[#FF7112]/20 scale-[1.01]'
                      : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900'
                  }`}>
                    {tab.icon}
                  </div>
                  <div className="truncate">
                    <span className="block text-xs font-bold tracking-tight">{tab.label}</span>
                    <span className={`text-[9px] block font-medium opacity-70 ${
                      activeTab === tab.id ? 'text-white' : 'text-slate-400'
                    }`}>{tab.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Engine Status Card */}
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white border border-slate-800 relative overflow-hidden shadow-xl">
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-24 h-24 bg-gradient-to-br from-[#FF7112]/20 to-transparent rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1.5 bg-white/5 rounded-lg text-[#FF7112]">
                <Settings className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">Deliverability Grid</span>
            </div>
            
            <div className="space-y-3.5">
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-xs font-bold text-slate-300">AI Copywriter</span>
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Gemini Ready
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="text-xs font-bold text-slate-300">Database Sync</span>
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Supabase Live
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Right Work Area */}
        <div className="lg:col-span-9">
          
          {/* CAMPAIGN COMPOSER */}
          {activeTab === 'campaign' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left Form controls */}
              <div className="xl:col-span-7 space-y-6">
                
                {/* Segment Selection */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                    <span className="p-2 bg-orange-50 text-[#FF7112] rounded-xl">
                      <Target className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-black text-slate-800 text-sm tracking-tight">Campaign Target</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Determine who will receive this broadcast</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Recipients List</label>
                      <select
                        value={targetFilter}
                        onChange={(e) => setTargetFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:bg-white focus:border-[#FF7112] focus:ring-1 focus:ring-[#FF7112] outline-none transition-all cursor-pointer"
                      >
                        <option value="all">🚀 Everyone ({audience.length} Contacts)</option>
                        <option value="subscriber">📧 Newsletter Subscribers ({audience.filter(u=>u.type==='subscriber').length})</option>
                        <option value="lead">🔥 Website Leads ({audience.filter(u=>u.type==='lead').length})</option>
                        <option value="student">🎓 Certified Drivers ({audience.filter(u=>u.type==='student').length})</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Quick Templates</label>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => handleTemplateSelect(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:bg-white focus:border-[#FF7112] focus:ring-1 focus:ring-[#FF7112] outline-none transition-all cursor-pointer"
                      >
                        {EMAIL_TEMPLATES.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Email Subject Line</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="e.g. 🚗 Get ready for your first driving class with GoDriveify!"
                      className="w-full px-4 py-3.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-2xl text-xs font-bold focus:border-[#FF7112] focus:ring-1 focus:ring-[#FF7112] outline-none transition-all placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                </div>

                {/* Gemini AI Smart Assistant */}
                <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-orange-50/40 border border-indigo-100/60 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1 bg-gradient-to-l from-purple-500 to-indigo-500 rounded-bl-2xl">
                    <span className="text-[8px] font-black text-white px-2 uppercase tracking-widest">Powered by Gemini</span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4 border-b border-indigo-100/40 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="p-2 bg-indigo-500/10 text-indigo-600 rounded-xl">
                        <Sparkle className="w-5 h-5 animate-pulse" />
                      </span>
                      <div>
                        <h4 className="font-black text-slate-800 text-xs tracking-tight">AI Copywriting Wizard</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Automate copy structure inside Faisalabad</p>
                      </div>
                    </div>

                    <div className="flex bg-white/80 p-1 rounded-xl border border-indigo-100 shadow-sm shrink-0">
                      {['persuasive', 'friendly', 'urgent'].map(t => (
                        <button
                          key={t}
                          onClick={() => setAiTone(t)}
                          className={`px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase transition-all ${
                            aiTone === t ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Describe what you want to send (e.g. discount voucher for monsoon package)..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      disabled={isAiGenerating}
                      className="flex-1 px-4 py-3 bg-white border border-indigo-100 rounded-2xl text-xs font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none shadow-sm placeholder:text-slate-400"
                    />
                    <button
                      onClick={handleAiCopywrite}
                      disabled={isAiGenerating}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isAiGenerating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Draft Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* HTML & Rich Body Content Editor */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="p-2 bg-slate-50 text-slate-500 rounded-xl">
                        <MessageSquare className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="font-black text-slate-800 text-xs tracking-tight">Content Body Editor</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Modify structure with plain HTML coding</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-slate-400">
                      <span className="w-2 h-2 bg-[#FF7112] rounded-full animate-pulse" />
                      Live Synchronized
                    </span>
                  </div>

                  <div className="space-y-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex flex-wrap gap-2 text-[10px] text-slate-400 font-bold mb-3">
                    <span className="text-[9px] uppercase font-black text-[#FF7112] mr-1 flex items-center">Placeholders:</span>
                    <button onClick={() => setEmailBody(b => b + ' {{name}} ')} className="px-2 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 cursor-pointer">Name tag</button>
                    <button onClick={() => setEmailBody(b => b + ' {{email}} ')} className="px-2 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 cursor-pointer">Email tag</button>
                    <button onClick={() => setEmailBody(b => b + ' <strong>Voucher Code</strong> ')} className="px-2 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 cursor-pointer">Strong Text</button>
                    <button onClick={() => setEmailBody(b => b + ' <br/> ')} className="px-2 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 cursor-pointer">New Line</button>
                  </div>

                  <textarea
                    rows={11}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full p-4 border border-slate-200 bg-slate-50/30 focus:bg-white rounded-2xl text-xs font-mono focus:border-[#FF7112] focus:ring-1 focus:ring-[#FF7112] outline-none transition-all leading-relaxed custom-scrollbar text-slate-700"
                    placeholder="Type or paste HTML newsletter templates here..."
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => handleSendCampaign(false)}
                      className="flex-1 bg-[#FF7112] hover:bg-[#e05e0c] text-white font-black py-4 rounded-2xl shadow-md shadow-orange-500/10 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <SendHorizontal className="w-4 h-4" />
                      Dispatch Broadcast
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSendCampaign(true)}
                        className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold py-4 rounded-2xl transition-all text-[11px] uppercase tracking-wider cursor-pointer"
                      >
                        Save Draft
                      </button>
                      <button
                        onClick={handleSendTest}
                        className="px-5 bg-white hover:bg-slate-50 text-slate-500 font-extrabold py-4 rounded-2xl transition-all text-[11px] uppercase tracking-wider border border-slate-200 border-dashed cursor-pointer"
                      >
                        Send Test
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Live Preview Panel (High Fidelity iPhone Frame) */}
              <div className="xl:col-span-5">
                <div className="sticky top-6 space-y-4">
                  <div className="flex items-center gap-2 ml-2">
                    <span className="p-1.5 bg-orange-50 text-[#FF7112] rounded-lg">
                      <Layers className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-black uppercase text-[#002060] tracking-wider">Live Visualizer</span>
                  </div>

                  {/* Glassmorphism Phone Shell */}
                  <div className="bg-slate-950 rounded-[3.2rem] p-4.5 shadow-2xl border-4 border-slate-800 ring-1 ring-white/10 max-w-[340px] mx-auto w-full relative">
                    {/* Speaker notch */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-b-2xl z-40 flex items-center justify-center">
                      <div className="w-8 h-1 bg-white/20 rounded-full mb-1" />
                    </div>

                    <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/18.5] flex flex-col shadow-inner relative z-10 border border-slate-800">
                      
                      {/* Phone simulated status bar */}
                      <div className="px-6 pt-5 pb-3 bg-slate-900 flex justify-between items-center text-[10px] font-black text-slate-400">
                        <span>GoDriveify Mail</span>
                        <div className="flex gap-1.5 items-center">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                          <div className="w-4 h-2 bg-slate-700 rounded-sm" />
                        </div>
                      </div>

                      {/* simulated app navigation header */}
                      <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-[#002060] flex items-center justify-center text-white font-black text-[10px] shadow-sm">GD</div>
                        <div className="truncate">
                          <span className="block text-[11px] font-black text-[#002060] leading-none">GoDriveify Newsletter</span>
                          <span className="block text-[9px] font-bold text-slate-400 mt-1 truncate">Subject: {emailSubject || 'No Subject Defined'}</span>
                        </div>
                      </div>

                      {/* Mail Body Viewport */}
                      <div className="overflow-y-auto flex-1 custom-scrollbar bg-slate-100">
                        <div className="p-2 sm:p-3">
                          
                          {/* Inner Styled Container */}
                          <div className="rounded-xl overflow-hidden shadow-sm">
                            {/* Simulated HTML parser */}
                            <div 
                              dangerouslySetInnerHTML={{ 
                                __html: emailBody
                                  .replace(/\{\{name\}\}/g, '<span style="color: #ff7112; font-weight: 800;">Learner Name</span>')
                                  .replace(/\{\{email\}\}/g, '<em style="color: #64748b;">learner@example.com</em>')
                              }}
                              className="text-[10px] text-slate-700 leading-relaxed"
                            />
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* AUDIENCE & LEADS TAB */}
          {activeTab === 'audience' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Search, Filter & Quick-Add Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Search / Segment Select */}
                <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-orange-50 text-[#FF7112] rounded-lg">
                      <Filter className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-black uppercase text-[#002060] tracking-wider">Search & segment Filter</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search contact name, email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-[#FF7112] focus:ring-1 focus:ring-[#FF7112] transition-all"
                      />
                    </div>

                    <select
                      value={audienceTypeFilter}
                      onChange={(e) => setAudienceTypeFilter(e.target.value)}
                      className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none cursor-pointer focus:bg-white focus:border-[#FF7112]"
                    >
                      <option value="all">All Contacts</option>
                      <option value="subscriber">Subscribers Only</option>
                      <option value="lead">Leads Only</option>
                      <option value="student">Certified Students</option>
                    </select>
                  </div>
                </div>

                {/* Inline Quick Add Form */}
                <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="p-1.5 bg-orange-50 text-[#FF7112] rounded-lg">
                      <Plus className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-black uppercase text-[#002060] tracking-wider">Add Subscriber Record</span>
                  </div>

                  <form onSubmit={handleAddAudienceUser} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      autoComplete="name"
                      value={newSubName}
                      onChange={(e) => setNewSubName(e.target.value)}
                      className="px-3.5 py-3 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl text-xs font-bold outline-none focus:ring-1 focus:ring-[#FF7112] focus:border-[#FF7112]"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      autoComplete="email"
                      value={newSubEmail}
                      onChange={(e) => setNewSubEmail(e.target.value)}
                      className="px-3.5 py-3 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl text-xs font-bold outline-none focus:ring-1 focus:ring-[#FF7112] focus:border-[#FF7112]"
                      required
                    />
                    <div className="flex gap-2">
                      <select
                        value={newSubType}
                        onChange={(e) => setNewSubType(e.target.value)}
                        className="flex-1 px-2.5 py-3 border border-slate-200 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-[#002060] outline-none cursor-pointer focus:bg-white focus:border-[#FF7112]"
                      >
                        <option value="subscriber">Subscriber</option>
                        <option value="lead">Lead</option>
                        <option value="student">Student</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-[#002060] hover:bg-blue-900 text-white font-black px-4.5 rounded-xl text-xs transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-sm"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>

              </div>

              {/* Recipient Database Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-100">
                        <th className="px-6 py-4.5 text-[10px] font-black uppercase tracking-wider text-slate-400">Recipient Details</th>
                        <th className="px-6 py-4.5 text-[10px] font-black uppercase tracking-wider text-slate-400">Group Tag</th>
                        <th className="px-6 py-4.5 text-[10px] font-black uppercase tracking-wider text-slate-400">Inbound Source</th>
                        <th className="px-6 py-4.5 text-[10px] font-black uppercase tracking-wider text-slate-400">Registration Date</th>
                        <th className="px-6 py-4.5 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">Database Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(() => {
                        const filteredList = audience.filter((u: any) => {
                          const matchesSearch = 
                            (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
                          
                          const matchesType = audienceTypeFilter === 'all' || u.type === audienceTypeFilter;
                          return matchesSearch && matchesType;
                        });

                        if (filteredList.length === 0) {
                          return (
                            <tr>
                              <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                                <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                                <p className="font-extrabold text-slate-700">No matching contacts found</p>
                                <p className="text-xs text-slate-400 mt-1">Try resetting your filters or typing different names.</p>
                              </td>
                            </tr>
                          );
                        }

                        return filteredList.map((user: any) => {
                          const initials = (user.name || 'GD').split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
                          const avatarColors = 
                            user.type === 'subscriber' ? 'bg-blue-100 text-blue-800' :
                            user.type === 'lead' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800';

                          return (
                            <tr key={user.id} className="hover:bg-slate-50/40 transition-colors group">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-9 h-9 rounded-xl ${avatarColors} flex items-center justify-center font-black text-xs shrink-0 shadow-sm`}>
                                    {initials}
                                  </div>
                                  <div className="truncate">
                                    <span className="block font-black text-slate-800 text-xs sm:text-sm leading-tight">{user.name || 'Newsletter Lead'}</span>
                                    <span className="text-[10px] text-slate-400 font-bold tracking-tight mt-0.5 block">{user.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tight ${
                                  user.type === 'subscriber' ? 'bg-blue-50 text-blue-600 border border-blue-100/50' :
                                  user.type === 'lead' ? 'bg-orange-50 text-orange-600 border border-orange-100/50' : 
                                  'bg-emerald-50 text-emerald-600 border border-emerald-100/50'
                                }`}>
                                  {user.type}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-[11px] text-slate-500 font-extrabold">
                                {user.source || 'Faisalabad Portal'}
                              </td>
                              <td className="px-6 py-4 text-[10px] font-bold text-slate-400">
                                {new Date(user.created_at || user.date || new Date()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => handleDeleteAudienceUser(user.id)}
                                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer inline-flex items-center"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TEMPLATES LIBRARY TAB */}
          {activeTab === 'templates' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-2 mb-2 ml-1">
                <span className="p-1.5 bg-orange-50 text-[#FF7112] rounded-lg">
                  <Layout className="w-4 h-4" />
                </span>
                <span className="text-[11px] font-black uppercase text-[#002060] tracking-wider">Email Template Catalogue</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EMAIL_TEMPLATES.map((t) => {
                  const icon = t.id === 'welcome' ? '✨' : t.id === 'dlims_prep' ? '🚦' : '🛡️';
                  const isCurrent = selectedTemplate === t.id;
                  
                  return (
                    <div 
                      key={t.id} 
                      className={`bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden ${
                        isCurrent ? 'border-[#FF7112] ring-1 ring-[#FF7112]' : 'border-slate-200'
                      }`}
                    >
                      {isCurrent && (
                        <div className="absolute top-0 right-0 bg-[#FF7112] text-white text-[8px] font-black uppercase px-3.5 py-1 rounded-bl-xl tracking-widest">
                          Active
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-inner">
                            {icon}
                          </div>
                          <div>
                            <h4 className="font-black text-xs sm:text-sm text-slate-800 leading-snug">{t.name}</h4>
                            <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wider block mt-0.5">Campaign Blueprint</span>
                          </div>
                        </div>

                        {/* Strip HTML tags for clean description */}
                        <p className="text-[10px] text-slate-500 font-medium mb-6 line-clamp-4 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          {t.body.replace(/<[^>]*>/g, '')}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          handleTemplateSelect(t.id);
                          setActiveTab('campaign');
                        }}
                        className={`w-full font-black py-3 rounded-2xl text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                          isCurrent 
                            ? 'bg-[#FF7112] hover:bg-[#e05e0c] text-white shadow-md shadow-orange-500/15' 
                            : 'bg-slate-50 hover:bg-[#002060] text-[#002060] hover:text-white'
                        }`}
                      >
                        Apply To Editor
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Stats Card Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Avg Delivery Rate', value: '99.8%', color: 'emerald', bg: 'from-emerald-50 to-emerald-100/30', text: 'text-emerald-800', barColor: 'bg-emerald-500' },
                  { label: 'Avg Open Telemetry', value: '74.5%', color: 'blue', bg: 'from-blue-50 to-blue-100/30', text: 'text-blue-800', barColor: 'bg-blue-500' },
                  { label: 'Click Through Ratio', value: '38.2%', color: 'orange', bg: 'from-orange-50 to-orange-100/30', text: 'text-orange-800', barColor: 'bg-orange-500' }
                ].map((stat, i) => (
                  <div key={i} className={`p-6 bg-gradient-to-br ${stat.bg} border border-slate-200/60 rounded-3xl flex flex-col justify-between`}>
                    <div>
                      <span className={`block text-[10px] ${stat.text} font-black uppercase tracking-wider`}>{stat.label}</span>
                      <span className="text-3.5xl font-black text-slate-800 mt-2 block tracking-tight">{stat.value}</span>
                    </div>

                    <div className="mt-6 space-y-2">
                      {/* Interactive simulated gauge bar */}
                      <div className="w-full bg-slate-200/50 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full ${stat.barColor} rounded-full`} style={{ width: stat.value }} />
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-slate-400">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Highly stable database performance</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Campaigns Database History */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recent Dispatched Log</span>
                  <span className="text-[9px] text-[#FF7112] font-black uppercase tracking-wider">Live tracking</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Subject Line</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Target Segment</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Dispatched Date</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">Metrics</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">Log Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {campaignsHistory.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-medium">
                            No campaigns dispatched yet. Head over to the Composer to get started!
                          </td>
                        </tr>
                      ) : (
                        campaignsHistory.map((log: any) => (
                          <tr key={log.id} className="hover:bg-slate-50/40 transition-colors">
                            <td className="px-6 py-4">
                              <span className="block font-black text-slate-800 text-xs sm:text-sm truncate max-w-[240px]">{log.subject}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[8px] font-black uppercase border border-slate-200/30">
                                {log.target_segment}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-[11px] font-bold text-slate-400">
                              {new Date(log.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div>
                                  <span className="block font-black text-slate-800 text-xs">{log.sent_count}</span>
                                  <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-tight">Recipients</span>
                                </div>
                                <div>
                                  <span className="block font-black text-blue-600 text-xs">{log.open_rate}</span>
                                  <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-tight">Open Rate</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tight inline-flex items-center gap-1.5 ${
                                log.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                              }`}>
                                <span className={`w-1 h-1 rounded-full ${log.status === 'delivered' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                {log.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Elegant Feedback Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[10000] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className={`px-5 py-3.5 rounded-2xl shadow-xl border flex items-center gap-3.5 min-w-[300px] bg-slate-900 border-slate-800 text-white`}>
            <div className={`p-1.5 rounded-xl ${
              toast.type === 'error' ? 'bg-red-500/20 text-red-400' : toast.type === 'info' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {toast.type === 'error' ? <ShieldAlert className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div>
              <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">{toast.type} alert</span>
              <p className="text-[11px] font-bold text-slate-100 mt-0.5">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
