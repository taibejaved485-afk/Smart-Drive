import React from 'react';
import { Star } from 'lucide-react';

const row1Reviews = [
  { name: 'Abdul Majeed', text: 'Well done sir g bhot hi acha work kr raha ga apka GoDriveify driving school Faisalabad. Dil khush ho gya seekh k.', rating: 5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Fatima Naz', text: 'Highly recommend, passed my license exam on the very first attempt! All thanks to safe & expert guidance.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Hassan Khan', text: 'Great experience, learned defensive vehicle control and critical signboards. Fully satisfied with the trainers.', rating: 5, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Ayesha Bibi', text: 'Faisalabad ka sab say behtreen academy hai. Female staff k liye nihayat mehfooz aur behtreen environment faraham kia.', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Zainab Rashid', text: 'Incredibly patient teachers. They explained complicated clutch limits in manual Civic so beautifully. Highly recommended!', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120' },
];

const row2Reviews = [
  { name: 'Awais Iqbal', text: 'Sir good job ap buhat acha kaam kr rahy han. Pure Faisalabad mai aesa professional system nahi dekha.', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Sajid Ali', text: 'Best driving school in Punjab. Excellent highway session training with dynamic road situations simulator.', rating: 5, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Maroof Shah', text: 'Awesome experience, passed my driving test without any issues. Instructors are highly skilled and punctual.', rating: 5, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Ali Raza', text: 'Custom training track guidelines are extremely helpful. Specially steering control techniques and reverse parallel parking.', rating: 5, avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Waleed Ahmed', text: 'Passed automatic Civic package lesson plans in just 10 days. The dual control safety systems are super comforting.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120' },
];

const row3Reviews = [
  { name: 'Malik Orangzaib', text: 'Mashallah Allah AP ko hamesha khush rakhay aur apke staff k kaam mai barkat dalay. Bohat hi shabash.', rating: 5, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Kashif Mahmood', text: 'Professional demeanor and extreme flexibilities in batch timings. Safest platform for beginners or license aspirants.', rating: 5, avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Saad Sheikh', text: 'Great system for motorcycle and sport-bike configurations too. Very friendly training atmosphere.', rating: 5, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Muhammad Bilal', text: 'Best part is the mock exam setup. They prepare you exactly according to the strict traffic office guidelines.', rating: 5, avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Aqsa Noreen', text: 'Highly recommended for female drivers. Patient guidance by Ms Alina has bolstered my traffic confidence.', rating: 5, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120' },
];

interface ReviewCardProps {
  name: string;
  text: string;
  rating: number;
  avatar: string;
  key?: string;
}

function ReviewCard({ name, text, rating, avatar }: ReviewCardProps) {
  return (
    <div className="bg-white p-4 sm:p-4.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col w-[275px] sm:w-[315px] shrink-0 transition-all duration-300 hover:shadow-md hover:border-[#FF7112]/10 group">
      <div className="flex justify-between items-start mb-2.5">
        <div className="flex gap-0.5">
          {[...Array(rating)].map((_, j) => (
            <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          ))}
        </div>
        {/* Sleek Google Verified badge */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono">G Verified</span>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
      </div>
      <p className="text-gray-650 text-xs leading-relaxed mb-3 font-medium flex-grow italic">
        "{text}"
      </p>
      <div className="flex items-center gap-2.5 pt-2.5 border-t border-gray-100">
        <img 
          src={avatar} 
          alt={name} 
          referrerPolicy="no-referrer" 
          className="w-8 h-8 rounded-full object-cover border border-[#FF7112]/10" 
        />
        <div>
          <p className="font-bold text-gray-950 text-xs tracking-tight">{name}</p>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Faisalabad Alumnus</p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-12 bg-gray-50/70 overflow-hidden relative">
      {/* Dynamic Keyframes Styling injected directly */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-ltr {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: marquee-ltr 55s linear infinite;
        }
        .animate-marquee-rtl {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: marquee-rtl 55s linear infinite;
        }
        .marquee-row:hover .animate-marquee-ltr,
        .marquee-row:hover .animate-marquee-rtl {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center mb-7">
        <span className="inline-flex items-center gap-1.5 bg-[#FF7112]/100/10 text-[#E05A00] font-black text-[10px] tracking-widest uppercase py-1 px-3.5 rounded-full mb-2">
          ⭐ Google Certified Reviews
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 font-display tracking-tight">
          What Our Students Say
        </h2>
        <p className="max-w-lg mx-auto text-xs text-gray-500 font-medium mt-1">
          Discover why thousands of residents across Faisalabad trust GoDriveify for safe, competent, and fully defensive driving education.
        </p>
      </div>

      {/* Cinematic Marquee Containers with Glass Borders */}
      <div className="space-y-3 sm:space-y-3.5 relative select-none">
        
        {/* Row 1: Left to Right Scroll */}
        <div className="overflow-hidden relative w-full py-1 marquee-row">
          <div className="animate-marquee-ltr">
            {/* Duplicated for flawless circular infinite loops */}
            {[...row1Reviews, ...row1Reviews, ...row1Reviews].map((review, i) => (
              <ReviewCard 
                key={`r1-${i}`} 
                name={review.name} 
                text={review.text} 
                rating={review.rating} 
                avatar={review.avatar} 
              />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left Scroll */}
        <div className="overflow-hidden relative w-full py-1 marquee-row">
          <div className="animate-marquee-rtl">
            {/* Duplicated for flawless circular infinite loops */}
            {[...row2Reviews, ...row2Reviews, ...row2Reviews].map((review, i) => (
              <ReviewCard 
                key={`r2-${i}`} 
                name={review.name} 
                text={review.text} 
                rating={review.rating} 
                avatar={review.avatar} 
              />
            ))}
          </div>
        </div>

        {/* Row 3: Left to Right Scroll */}
        <div className="overflow-hidden relative w-full py-1 marquee-row">
          <div className="animate-marquee-ltr">
            {/* Duplicated for flawless circular infinite loops */}
            {[...row3Reviews, ...row3Reviews, ...row3Reviews].map((review, i) => (
              <ReviewCard 
                key={`r3-${i}`} 
                name={review.name} 
                text={review.text} 
                rating={review.rating} 
                avatar={review.avatar} 
              />
            ))}
          </div>
        </div>

        {/* Cinematic Soft Edge Vignettes */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-48 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-48 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-20" />
      </div>

    </section>
  );
}

