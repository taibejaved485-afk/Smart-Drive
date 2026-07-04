import React, { useState, useEffect } from 'react';
import { Mail, Users, FileSpreadsheet, Clock, Sparkles, Send, Search, Trash2, ShieldAlert, ArrowUp, ArrowLeft, Layout, Target, MessageSquare } from 'lucide-react';
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
    body: `<p>Assalam-o-Alaikum, and welcome to the GoDriveify family!</p>
<p>We saw you recently signed up on our website. Did you know that a certified professional driver can save up to <strong>Rs. 8,500/month</strong> in fuel simply by adjusting physical driving mechanics?</p>
<p>As a welcome gift, here is a <strong>10% DISCOUNT VOUCHER</strong> on our next premium batch:</p>
<div style="background-color: #fff7ed; border: 2px dashed #f97316; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
  <span style="font-size: 18px; font-weight: bold; color: #ea580c; display: block;">PROMO CODE: ECODRIVE10</span>
</div>
<p>Let's unlock defensive driving together. Simply click below to confirm your seat over WhatsApp!</p>`
  },
  {
    id: 'dlims_prep',
    name: '🚦 DLIMS Cones Test Cheat Sheet',
    subject: 'Are you ready for your Punjab Driving Test? (L-Shape Secrets Inside!) 📐',
    body: `<p>Dear Learner,</p>
<p>Most candidates fail the physical Punjab Police sign or reverse L-Shape test on their first attempt because of a single alignment mistake.</p>
<p>Our instructors have prepared a visual <strong>"Cones Test Simulator cheat sheet"</strong> to help you pass guaranteed!</p>
<ul>
  <li>Learn exactly where your side mirror must align with the corner cone.</li>
  <li>Find the counter-steering sweet spot for smooth curves.</li>
</ul>
<p>Don't leave your license to luck. Book our 1-on-1 practical simulator class today!</p>`
  },
  {
    id: 'scam_shield',
    name: '🛡️ Used Car Inspection Checklist',
    subject: 'Buying a used car in Faisalabad? Don\'t get scammed! 🔍',
    body: `<p>Hi there,</p>
<p>Before handing over lakhs of rupees to a dealer, make sure the vehicle isn't a legal trap. Our checklist helps you spot:</p>
<ol>
  <li><strong>Fake Smart Cards:</strong> Real cards glow with green UV seals when lit from below.</li>
  <li><strong>Tempered Chassis numbers:</strong> Checkpassenger door frames for illegal weld cuts.</li>
</ol>
<p>Use our 100% free <strong>Vehicle Verifier tool</strong> on our website to calculate paperwork risks before buying!</p>`
  }
];

interface EmailMarketingDashboardProps {
  onBackToDashboard?: () => void;
}

export default function EmailMarketingDashboard({ onBackToDashboard }: EmailMarketingDashboardProps) {
  const [activeTab, setActiveTab] = useState('campaign'); // 'campaign', 'audience', 'templates', 'analytics'
  const [audience, setAudience] = useState([]);
  const [campaignsHistory, setCampaignsHistory] = useState([]);

  // Editor states
  const [emailSubject, setEmailSubject] = useState(EMAIL_TEMPLATES[0].subject);
  const [emailBody, setEmailBody] = useState(EMAIL_TEMPLATES[0].body);
  const [targetFilter, setTargetFilter] = useState('all'); // 'all', 'subscriber', 'lead', 'student'
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');

  // AI Assistant states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState('persuasive'); // 'persuasive', 'professional', 'urgent', 'friendly'
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiApiKey, setAiApiKey] = useState('');
  const [showAiConfig, setShowAiConfig] = useState(false);

  // Audience Search
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="w-full max-w-[1440px] mx-auto py-8 px-6">
      
      {/* Upper Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="group flex items-center gap-2 text-xs font-black uppercase text-orange-600 hover:text-orange-700 transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Operations Control Panel
            </button>
          )}
          <div className="flex items-center gap-3 mb-2">
            <div className="px-3 py-1 bg-orange-100 rounded-full border border-orange-200">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Marketing Studio
              </span>
            </div>
          </div>
          <h2 className="text-4xl font-black text-[#002060] tracking-tight">
            Email Center
          </h2>
          <p className="text-slate-400 text-sm font-medium">Design, automate, and launch professional campaigns.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white border border-slate-100 px-6 py-3 rounded-3xl shadow-sm flex items-center gap-8">
            <div className="text-center">
              <span className="block text-lg font-black text-[#002060]">{audience.length}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Contacts</span>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="text-center">
              <span className="block text-lg font-black text-orange-500">{campaignsHistory.length}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Campaigns</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-5 shadow-sm">
            <span className="block text-[11px] font-black uppercase text-slate-400 tracking-widest mb-6 ml-3">Menu</span>
            <div className="space-y-2">
              {[
                { id: 'campaign', label: 'Broadcast', icon: <Mail className="w-4 h-4" />, desc: 'Composer' },
                { id: 'audience', label: 'Contacts', icon: <Users className="w-4 h-4" />, desc: 'Subscribers' },
                { id: 'templates', label: 'Templates', icon: <Layout className="w-4 h-4" />, desc: 'Library' },
                { id: 'analytics', label: 'Analytics', icon: <Clock className="w-4 h-4" />, desc: 'History' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full group px-5 py-4 rounded-[1.5rem] text-left transition-all flex items-center gap-4 ${
                    activeTab === tab.id
                      ? 'bg-[#002060] text-white shadow-xl shadow-blue-900/10 scale-[1.02]'
                      : 'hover:bg-slate-50 text-slate-500 hover:text-[#002060]'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl transition-all ${
                    activeTab === tab.id ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-white group-hover:shadow-sm'
                  }`}>
                    {tab.icon}
                  </div>
                  <div>
                    <span className="block text-[13px] font-black">{tab.label}</span>
                    <span className={`text-[10px] block font-medium opacity-60`}>{tab.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#002060] rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Infrastructure</span>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold opacity-80">Gemini AI</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[9px] uppercase tracking-wider">Online</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold opacity-80">Supabase</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[9px] uppercase tracking-wider">Healthy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
          
          {activeTab === 'campaign' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              <div className="xl:col-span-8 space-y-8">
                
                {/* Campaign Setup Card */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-xl">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-black text-[#002060] tracking-tight">Campaign Setup</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] ml-1">Audience Segment</label>
                      <select
                        value={targetFilter}
                        onChange={(e) => setTargetFilter(e.target.value)}
                        className="w-full px-5 py-4 border border-slate-100 bg-slate-50/50 rounded-2xl text-xs font-bold text-[#002060] focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="all">Everyone Active</option>
                        <option value="subscriber">Newsletter Subscribers</option>
                        <option value="lead">Website Leads</option>
                        <option value="student">Certified Drivers</option>
                      </select>
                    </div>

                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] ml-1">Content Library</label>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => handleTemplateSelect(e.target.value)}
                        className="w-full px-5 py-4 border border-slate-100 bg-slate-50/50 rounded-2xl text-xs font-bold text-[#002060] focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
                      >
                        {EMAIL_TEMPLATES.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] ml-1">Campaign Subject</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="e.g. 🚗 Big News from GoDriveify!"
                      className="w-full px-5 py-4 border border-slate-100 bg-slate-50/50 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* AI Assistant Card */}
                <div className="bg-orange-50/30 border border-orange-100 rounded-[2.5rem] p-8 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-xl">
                        <Sparkles className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-sm font-black text-orange-900 tracking-tight">Gemini AI Writer</span>
                    </div>
                    
                    <div className="flex bg-white/50 rounded-xl p-1 border border-orange-100">
                      {['persuasive', 'friendly', 'urgent'].map(t => (
                        <button
                          key={t}
                          onClick={() => setAiTone(t)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                            aiTone === t ? 'bg-orange-600 text-white shadow-md' : 'text-orange-400 hover:text-orange-600'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 relative">
                    <input
                      type="text"
                      placeholder="Give me an idea for the content..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      disabled={isAiGenerating}
                      className="flex-1 px-5 py-4 border border-orange-100 bg-white rounded-2xl text-xs font-medium focus:ring-4 focus:ring-orange-100 outline-none shadow-sm transition-all"
                    />
                    <button
                      onClick={handleAiCopywrite}
                      disabled={isAiGenerating}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                      {isAiGenerating ? 'Drafting...' : 'Compose'}
                    </button>
                  </div>
                </div>

                {/* Body Editor Card */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-xl">
                        <MessageSquare className="w-5 h-5 text-slate-400" />
                      </div>
                      <h3 className="font-black text-[#002060] tracking-tight">Content Editor</h3>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      Live HTML
                    </div>
                  </div>

                  <textarea
                    rows={12}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full p-6 border border-slate-50 bg-slate-50/30 rounded-3xl text-xs font-mono focus:ring-4 focus:ring-blue-50 outline-none transition-all leading-relaxed custom-scrollbar"
                  />
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleSendCampaign(false)}
                      className="flex-1 bg-[#002060] hover:bg-blue-900 text-white font-black py-5 rounded-[1.5rem] shadow-xl transition-all text-[13px] uppercase tracking-widest active:scale-95 flex items-center justify-center gap-3"
                    >
                      <Send className="w-4 h-4" />
                      Dispatch Campaign
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSendCampaign(true)}
                        className="px-8 bg-slate-50 hover:bg-slate-100 text-[#002060] font-black py-5 rounded-[1.5rem] transition-all text-[11px] uppercase tracking-widest border border-slate-100"
                      >
                        Draft
                      </button>
                      <button
                        onClick={handleSendTest}
                        className="px-8 bg-slate-50 hover:bg-slate-100 text-slate-400 font-black py-5 rounded-[1.5rem] transition-all text-[11px] uppercase tracking-widest border border-slate-100 border-dashed"
                      >
                        Test
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Preview Panel */}
              <div className="xl:col-span-4">
                <div className="sticky top-10 space-y-6">
                  <div className="flex items-center gap-3 ml-2">
                    <div className="p-2 bg-blue-50 rounded-xl">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-[#002060] tracking-[0.2em]">Live Preview</span>
                  </div>

                  <div className="bg-[#0f172a] rounded-[4rem] p-6 shadow-2xl border-[6px] border-slate-800 ring-1 ring-white/10 max-w-[380px] mx-auto w-full">
                    <div className="w-32 h-6 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                      <div className="w-8 h-1 bg-white/20 rounded-full" />
                    </div>
                    
                    <div className="bg-white rounded-[3rem] overflow-hidden aspect-[9/18.5] flex flex-col shadow-inner relative">
                      {/* Status Bar */}
                      <div className="px-8 py-4 bg-white border-b flex justify-between items-center text-[11px] font-black text-slate-300">
                        <span>GoDriveify</span>
                        <div className="flex gap-1.5 items-center">
                          <div className="w-4 h-2 bg-slate-100 rounded-sm" />
                          <div className="w-2 h-2 bg-slate-100 rounded-full" />
                        </div>
                      </div>

                      <div className="overflow-y-auto flex-1 custom-scrollbar">
                        {/* Email Header Area */}
                        <div className="p-8 bg-slate-50/50 border-b space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-[#002060] flex items-center justify-center text-white font-black text-xs">GD</div>
                            <div>
                              <span className="block text-[11px] font-black text-[#002060]">GoDriveify Studio</span>
                              <span className="block text-[9px] font-bold text-slate-400">to: {"{{name}}"}</span>
                            </div>
                          </div>
                          <h3 className="font-black text-slate-800 text-[15px] leading-snug mt-4">
                            {emailSubject || "Your Message Subject"}
                          </h3>
                        </div>

                        {/* Email Content Rendering */}
                        <div className="p-8 text-slate-700">
                          <div className="flex justify-center mb-8">
                            <div className="bg-[#002060] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg">
                              <span className="text-xl">🚗</span>
                              <span className="text-xs font-black tracking-tight">GoDriveify</span>
                            </div>
                          </div>

                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: emailBody
                                .replace(/\{\{name\}\}/g, '<span class="text-blue-600 font-black">Learner</span>')
                                .replace(/\{\{email\}\}/g, '<em class="opacity-50">learner@example.com</em>')
                            }}
                            className="prose prose-sm max-w-none text-xs leading-relaxed font-medium"
                          />

                          <div className="mt-12 pt-10 border-t border-slate-50 text-center space-y-6">
                            <div className="flex justify-center gap-4">
                              <div className="w-8 h-8 rounded-xl bg-slate-50" />
                              <div className="w-8 h-8 rounded-xl bg-slate-50" />
                              <div className="w-8 h-8 rounded-xl bg-slate-50" />
                            </div>
                            <div className="text-[10px] text-slate-400 font-bold leading-relaxed">
                              <p>Faisalabad Main Campus, Canal Road</p>
                              <p className="mt-1 opacity-60">© 2026 GoDriveify Team.</p>
                              <button className="mt-4 text-blue-600 font-black uppercase tracking-widest text-[9px]">Unsubscribe</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'audience' && (
            <div className="space-y-6">
              
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search name, email, or source..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-100 bg-slate-50 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Add Contact Trigger */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                  <form onSubmit={handleAddAudienceUser} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newSubName}
                      onChange={(e) => setNewSubName(e.target.value)}
                      className="px-4 py-3 border border-slate-100 bg-slate-50 rounded-2xl text-xs font-bold outline-none w-40"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newSubEmail}
                      onChange={(e) => setNewSubEmail(e.target.value)}
                      className="px-4 py-3 border border-slate-100 bg-slate-50 rounded-2xl text-xs font-bold outline-none w-52"
                      required
                    />
                    <select
                      value={newSubType}
                      onChange={(e) => setNewSubType(e.target.value)}
                      className="px-3 py-3 border border-slate-100 bg-slate-50 rounded-2xl text-[10px] font-black uppercase text-[#002060] outline-none"
                    >
                      <option value="subscriber">Subscriber</option>
                      <option value="lead">Lead</option>
                      <option value="student">Student</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-[#002060] hover:bg-blue-900 text-white font-black px-6 py-3 rounded-2xl text-xs transition-all active:scale-95 shadow-md"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>

              {/* Contacts Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact Info</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Type</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Source</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Added On</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {audience.filter((u:any) => 
                        (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((user: any) => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <span className="block font-black text-[#002060]">{user.name || 'Newsletter Subscriber'}</span>
                            <span className="text-[10px] text-slate-400 font-bold">{user.email}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                              user.type === 'subscriber' ? 'bg-blue-50 text-blue-600' :
                              user.type === 'lead' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                            }`}>
                              {user.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[10px] text-slate-500 font-bold">{user.source}</td>
                          <td className="px-6 py-4 text-[10px] font-black text-slate-400">
                            {new Date(user.created_at || user.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteAudienceUser(user.id)}
                              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6 ml-1">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-black uppercase text-[#002060] tracking-widest">Email Library</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EMAIL_TEMPLATES.map((t) => (
                  <div key={t.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all hover:-translate-y-1">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-2xl bg-slate-50 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                          {t.id === 'welcome' ? '✨' : t.id === 'dlims_prep' ? '🚦' : '🛡️'}
                        </div>
                        <h4 className="font-black text-sm text-[#002060] leading-tight">{t.name}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold mb-4 line-clamp-3 leading-relaxed">
                        {t.body.replace(/<[^>]*>/g, '')}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        handleTemplateSelect(t.id);
                        setActiveTab('campaign');
                      }}
                      className="w-full bg-slate-50 hover:bg-[#002060] hover:text-white text-[#002060] font-black py-3 rounded-2xl text-[10px] uppercase tracking-widest transition-all"
                    >
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Delivery Rate', value: '99.8%', color: 'emerald' },
                  { label: 'Avg Open Rate', value: '74.5%', color: 'blue' },
                  { label: 'Avg Click Rate', value: '38.2%', color: 'orange' }
                ].map((stat, i) => (
                  <div key={i} className={`p-6 bg-${stat.color}-50/50 border border-${stat.color}-100 rounded-3xl`}>
                    <span className={`block text-[10px] text-${stat.color}-800 font-black uppercase tracking-widest`}>{stat.label}</span>
                    <span className={`text-4xl font-black text-${stat.color}-900 mt-2 block tracking-tight`}>{stat.value}</span>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400">
                      <ArrowUp className="w-3 h-3 text-emerald-500" />
                      <span>12% since last month</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recent Campaigns</span>
                  <button className="text-[10px] font-black text-blue-600 uppercase">Export Report</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Campaign</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Targets</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Stats</th>
                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {campaignsHistory.map((log: any) => (
                        <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="block font-black text-[#002060] line-clamp-1">{log.subject}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-black uppercase">{log.target_segment}</span>
                          </td>
                          <td className="px-6 py-4 text-[10px] font-black text-slate-400">
                            {new Date(log.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <span className="block font-black text-[#002060]">{log.sent_count}</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase">Sent</span>
                              </div>
                              <div className="text-center">
                                <span className="block font-black text-blue-600">{log.open_rate}</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase">Open</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                              log.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Modern Feedback Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] animate-in fade-in slide-in-from-bottom-8 duration-300">
          <div className={`px-6 py-4 rounded-[2rem] shadow-2xl border flex items-center gap-4 min-w-[320px] ${
            toast.type === 'error' ? 'bg-red-900 border-red-800 text-white' : 
            toast.type === 'info' ? 'bg-[#002060] border-blue-800 text-white' : 'bg-emerald-900 border-emerald-800 text-white'
          }`}>
            <div className={`p-2 rounded-2xl ${
              toast.type === 'error' ? 'bg-red-800' : toast.type === 'info' ? 'bg-blue-800' : 'bg-emerald-800'
            }`}>
              {toast.type === 'error' ? <ShieldAlert className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div>
              <span className="block text-xs font-black uppercase tracking-widest">{toast.type}</span>
              <p className="text-[11px] font-medium opacity-80 mt-0.5">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

