import React, { useState, useEffect } from 'react';
import { Coins, ShieldCheck, TrendingUp, Info } from 'lucide-react';

type CarType = 'Economy' | 'Sedan' | 'Luxury';

export default function EarningsCalculator() {
  const [carType, setCarType] = useState<CarType>('Sedan');
  const [days, setDays] = useState<number>(15);
  const [displayEarnings, setDisplayEarnings] = useState<number>(105000);

  // Earnings rates
  const rates = {
    Economy: 4000,
    Sedan: 7000,
    Luxury: 15000,
  };

  const currentRate = rates[carType];

  // Calculate dynamic retention bonus based on days slider
  let retentionBonus = 0;
  let bonusBadge = null;
  let bonusHelper = '';

  if (days >= 1 && days <= 9) {
    retentionBonus = 0;
    bonusHelper = "Lock 10 days to unlock cash bonus";
  } else if (days >= 10 && days <= 20) {
    retentionBonus = 5000;
    bonusHelper = "✨ Growth Tier Unlocked (+PKR 5,000)";
    bonusBadge = (
      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide">
        ✨ Growth Tier Unlocked
      </span>
    );
  } else if (days >= 21 && days <= 30) {
    retentionBonus = 12000;
    bonusHelper = "💎 Elite Partner Tier Unlocked (+PKR 12,000)";
    bonusBadge = (
      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide shadow-sm animate-pulse">
        💎 Elite Partner Tier Unlocked
      </span>
    );
  }

  // Update total estimation output to include retention bonus
  const targetEarnings = (currentRate * days) + retentionBonus;
  const sliderPercentage = ((days - 1) / (30 - 1)) * 100;

  // Smooth dynamic count transition
  useEffect(() => {
    let start = displayEarnings;
    const end = targetEarnings;
    if (start === end) return;

    const duration = 350; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.round(start + (end - start) * easeProgress);
      
      setDisplayEarnings(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetEarnings]);

  return (
    <div id="income-calculator-section" className="bg-white text-slate-900 rounded-3xl overflow-hidden border border-slate-100 shadow-xl relative font-sans">
      {/* Abstract background decorative brand glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7112]/100/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="p-6 sm:p-10 lg:p-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-[#E05A00] font-extrabold tracking-widest text-xs uppercase bg-[#FF7112]/10 border border-[#FF7112]/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Coins className="w-3.5 h-3.5 text-[#E05A00]" />
            Passive Income Program
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Calculate Your Earnings
          </h2>
          <p className="text-slate-500 mt-3 text-sm max-w-xl mx-auto leading-relaxed">
            Own an idle vehicle in Pakistan? List it on GoDriveify's multi-vendor rental directory, choose your availability slots, and start generating monthly revenue in major cities.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Inputs Panel */}
          <div className="lg:col-span-7 bg-slate-50/50 backdrop-blur-md rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            
            {/* Step 1: Select Car Category */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                1. Select Vehicle Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Economy', 'Sedan', 'Luxury'] as CarType[]).map((type) => {
                  const isActive = carType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCarType(type)}
                      className={`py-3.5 px-3 rounded-xl border text-xs sm:text-sm font-extrabold tracking-wide transition-all outline-none flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        isActive
                          ? 'bg-[#FF7112]/10 text-red-900 border-[#FF7112] shadow-sm ring-1 ring-[#FF7112] scale-[1.01]'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-350 shadow-xs'
                      }`}
                    >
                      <span className="font-sans font-extrabold">{type}</span>
                      <span className={`text-[10px] font-mono ${isActive ? 'text-[#E05A00]/85 font-extrabold' : 'text-slate-400'}`}>
                        PKR {rates[type].toLocaleString()}/day
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Slider for Days Rented */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <label className="block text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                  2. Days Rented Per Month
                </label>
                <div className="flex items-center gap-2">
                  {bonusBadge}
                  <span className="font-mono font-bold text-[#E05A00] bg-[#FF7112]/10 px-3 py-1 rounded-lg border border-[#FF7112]/20 text-sm shrink-0">
                    {days} {days === 1 ? 'Day' : 'Days'}
                  </span>
                </div>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="custom-slider"
                  style={{
                    background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${sliderPercentage}%, #e2e8f0 ${sliderPercentage}%, #e2e8f0 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-slate-450 font-mono">
                  <span>1 day</span>
                  <span>15 days</span>
                  <span>30 days</span>
                </div>
                {/* Text helper for days selection */}
                <p className="text-[11px] text-slate-500 mt-3.5 flex items-center gap-1.5 font-semibold bg-slate-55 bg-slate-100/40 p-2 rounded-lg border border-slate-100/80">
                  <Info className="w-3.5 h-3.5 text-slate-450 shrink-0" />
                  <span>{bonusHelper}</span>
                </p>
              </div>
            </div>

            {/* Program perks mini bullets */}
            <div className="border-t border-slate-100 pt-5 mt-2 grid grid-cols-2 gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">Verified Renters Only</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">100% Retained Revenue</span>
              </div>
            </div>

          </div>

          {/* Outputs Dynamic Panel */}
          <div className="lg:col-span-5 bg-slate-50/60 backdrop-blur-md rounded-2xl border border-slate-100 p-8 text-center relative overflow-hidden flex flex-col justify-between h-full min-h-[300px] shadow-xs">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-rose-600 to-red-800" />
            
            <div className="space-y-2 mt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block mb-1">
                Estimated Monthly Earnings
              </span>
              <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-sans tracking-tight my-2">
                PKR {displayEarnings.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Based on <strong className="text-slate-800 font-extrabold">{days} days</strong> of monthly fleet deployment
              </p>
            </div>

            {/* Receipts Statistics Breakdown */}
            <div className="bg-white border border-slate-100 p-4.5 rounded-xl text-left space-y-2.5 my-6 shadow-xs">
              <div className="flex justify-between text-xs pb-2 border-b border-slate-100/60">
                <span className="text-slate-500 font-medium">Daily Rental payout:</span>
                <span className="font-mono font-bold text-slate-800">PKR {currentRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs pb-2 border-b border-slate-100/60">
                <span className="text-slate-500 font-medium">Loyalty Retention Bonus:</span>
                <span className={`font-mono font-extrabold ${retentionBonus > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {retentionBonus > 0 ? `+ PKR ${retentionBonus.toLocaleString()}` : 'PKR 0'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Annual potential return:</span>
                <span className="font-mono font-bold text-[#E05A00]">PKR {(targetEarnings * 12).toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const listButton = document.getElementById('list-your-car-btn');
                if (listButton) {
                  listButton.click();
                } else {
                  // Fallback: trigger listing modal from header
                  const customModalOpen = new CustomEvent('open-listing-modal');
                  window.dispatchEvent(customModalOpen);
                }
              }}
              className="w-full bg-[#FF7112] hover:bg-[#E05A00] text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-md shadow-red-600/10 cursor-pointer active:scale-[0.98] duration-250 hover:shadow-lg hover:shadow-red-700/20"
            >
              List Your Car &amp; Earn
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
