import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const images = [
  'https://i.pinimg.com/736x/24/62/6c/24626c0627a7b124ab7fd5354917cf52.jpg',
  'https://i.pinimg.com/736x/f8/48/31/f84831aaa7b100a5eb5a94a7aaaedb82.jpg',
  'https://i.pinimg.com/736x/a9/ca/3e/a9ca3e45b274492b19e010b4207bb7db.jpg',
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images[index]}')` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full flex flex-col items-center justify-center text-center">
        {/* Main Content */}
        <div className="w-full">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl"
          >
            Your Path To Safe And<br />Confident Driving
          </motion.h1>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition flex items-center gap-2 shadow-2xl hover:shadow-red-900/50 mx-auto"
          >
            CALL US <Phone className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
