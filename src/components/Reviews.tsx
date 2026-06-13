import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Abdul Majeed', text: 'Well done sir g bhot hi acha work kr raha ga apka GoDriveify driving school Faisalabad', rating: 5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Awais Iqbal', text: 'Sir good job ap buhat acha kaam kr rahy han ap ki service buhat achai ha', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Malik Orangzaib', text: 'Mashallah Allah AP ko sir apke staff or apke GoDriveify driving school ko hameshs salamat rakhe', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Sajid Ali', text: 'Best driving school in the city! Instructors are very patient and professional.', rating: 5, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Fatima Naz', text: 'Highly recommend, passed my test on the first attempt thanks to their guidance.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120' },
  { name: 'Hassan Khan', text: 'Great experience, learned a lot about road safety. Thank you!', rating: 4, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120' },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-950 font-display">What Our Students Say</h2>
        
        {/* Desktop grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                {/* Simple Google SVG Icon Representation */}
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <p className="text-gray-700 mb-8 flex-grow">{review.text}</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img src={review.avatar} alt={review.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-full object-cover" />
                <p className="font-bold text-gray-950">{review.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet Infinite Marquee Ticker (Left to Right) */}
        <div className="block md:hidden overflow-hidden relative w-full select-none py-4">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee-mobile {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee-mobile {
              display: flex;
              gap: 1rem;
              width: max-content;
              animation: marquee-mobile 35s linear infinite;
            }
            .animate-marquee-mobile:active {
              animation-play-state: paused;
            }
          `}} />
          
          <div className="animate-marquee-mobile">
            {/* Render reviews duplicated for clean loop effect */}
            {[...reviews, ...reviews].map((review, i) => (
              <div 
                key={i}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col w-[260px] shrink-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <p className="text-gray-700 text-xs mb-4 flex-grow line-clamp-3">{review.text}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <img src={review.avatar} alt={review.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover" />
                  <p className="font-bold text-gray-950 text-xs">{review.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fade gradients on side bounds */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
