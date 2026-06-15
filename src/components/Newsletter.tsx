import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle, Sparkles, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [headingText, setHeadingText] = useState("");
  const targetHeading = "Join Smart Drive Insights";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setHeadingText(targetHeading.slice(0, i + 1));
      i++;
      if (i >= targetHeading.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Email check
  const validateEmail = (val: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(val);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please provide your email address.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please provide a valid email address.');
      return;
    }

    // Success flow - store locally if needed as an aggregate, then set success state
    try {
      const stored = localStorage.getItem('newsletter_subscriptions');
      const list = stored ? JSON.parse(stored) : [];
      list.push({
        email: trimmedEmail,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('newsletter_subscriptions', JSON.stringify(list));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="newsletter-subscription">
      <style>{`
        @keyframes travel-rectangle-newsletter {
          0%, 100% { top: -10px; left: -10px; }
          25% { top: -10px; left: calc(100% - 6px); }
          50% { top: calc(100% - 6px); left: calc(100% - 6px); }
          75% { top: calc(100% - 6px); left: -10px; }
        }
        .animate-travel-rectangle-newsletter { 
          animation: travel-rectangle-newsletter 25s linear infinite; 
          animation-play-state: paused;
        }
        .group:hover .animate-travel-rectangle-newsletter {
          animation-play-state: running;
        }
      `}</style>
      <div className="bg-white border-2 border-red-500 hover:border-red-600 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-100/40 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 group transition-colors duration-500">
        
        {/* Rectangular Red Dot */}
        <div className="absolute w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-travel-rectangle-newsletter shadow-[0_0_15px_5px_#dc2626] z-0 transition-opacity duration-500 pointer-events-none" />

        {/* Subtle Decorative Ambient Background Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-50/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-slate-50 rounded-full blur-2xl pointer-events-none" />

        {/* Text Area */}
        <div className="relative z-10 max-w-xl text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> SMART DRIVE INSIGHTS
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-3">
            {headingText}
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
            Get professional defensive road tips, direct car listing updates, active local Faisalabad driver guidelines, and exclusive passive-income insights sent directly to you. No spam, ever.
          </p>
        </div>

        {/* Input Form Action Area */}
        <div className="relative z-10 w-full lg:max-w-md">
          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form
                key="subscribe-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubscribe}
                className="w-full space-y-2"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition text-sm font-medium text-slate-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-red-700 hover:bg-red-800 active:scale-98 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-red-700/10 shrink-0 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Subscribe Now</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-red-650 font-bold pl-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            ) : (
              <motion.div
                key="subscription-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-slate-50 border border-slate-150 p-6 rounded-2xl flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0 border border-green-100">
                  <CheckCircle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-none mb-1">
                    Subscription Validated!
                  </h4>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                    Thank you for subscribing! Your driving updates are on the way.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
