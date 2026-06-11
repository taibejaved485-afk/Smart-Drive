import React, { useState, useEffect } from 'react';
import { Coins, Calendar, ShieldCheck, TrendingUp, Info } from 'lucide-react';

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
  const targetEarnings = currentRate * days;

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
    <div id="income-calculator-section" className="bg-slate-950 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
      {/* Abstract background decorative amber glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="p-6 sm:p-10 lg:p-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-amber-500 font-extrabold tracking-widest text-xs uppercase bg-amber-950/60 border border-amber-500/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            Passive Income Program
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Calculate Your Earnings
          </h2>
          <p className="text-slate-450 mt-3 text-sm max-w-xl mx-auto leading-relaxed">
            Own an idle vehicle in Pakistan? List it on Smart Drive's multi-vendor rental directory, choose your availability slots, and start generating monthly revenue in major cities.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Inputs Panel */}
          <div className="lg:col-span-7 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Select Car Category */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
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
                      className={`py-3.5 px-3 rounded-xl border text-xs sm:text-sm font-bold tracking-wide transition-all outline-none flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/10 scale-[1.02]'
                          : 'bg-slate-900/80 border-slate-800 text-slate-350 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <span>{type}</span>
                      <span className={`text-[10px] font-mono ${isActive ? 'text-slate-950/80 font-bold' : 'text-slate-500'}`}>
                        PKR {rates[type].toLocaleString()}/day
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Slider for Days Rented */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-xs font-black uppercase text-slate-400 tracking-wider">
                  2. Days Rented Per Month
                </label>
                <span className="font-mono font-bold text-amber-500 bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-500/20 text-sm">
                  {days} {days === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 my-4"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 day</span>
                  <span>15 days</span>
                  <span>30 days</span>
                </div>
              </div>
            </div>

            {/* Program perks mini bullets */}
            <div className="border-t border-slate-800/80 pt-5 mt-2 grid grid-cols-2 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verified Renters Only</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Retained Revenue</span>
              </div>
            </div>

          </div>

          {/* Outputs Dynamic Panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800/90 p-8 text-center relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-blue-500" />
            
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block mb-1">
                Estimated Monthly Earnings
              </span>
              <p className="text-4xl sm:text-5xl font-black text-amber-500 font-mono tracking-tight my-2">
                PKR {displayEarnings.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                Based on <strong className="text-white font-bold">{days} days</strong> of monthly fleet deployment
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-left space-y-1.5 my-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Daily Rental payout:</span>
                <span className="font-mono font-bold text-slate-200">PKR {currentRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Annual potential return:</span>
                <span className="font-mono font-bold text-amber-400">PKR {(targetEarnings * 12).toLocaleString()}</span>
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
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              List Your Car &amp; Earn
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
