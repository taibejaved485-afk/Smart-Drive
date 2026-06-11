import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function EnrollCTA() {
  return (
    <section className="py-24 bg-[url('https://i.pinimg.com/1200x/5e/33/26/5e332692e6b46b4662892f58557e8871.jpg')] bg-cover bg-center text-white text-center relative">
      <div className="absolute inset-0 bg-gray-900/80"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Enroll Today
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto"
        >
          Ready to start your driving journey? Enroll in one of our courses today and become a safe, confident driver with Smart Drive.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition mx-auto mb-16"
        >
          GET STARTED <ArrowRight className="w-5 h-5" />
        </motion.button>
        
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          src="https://trainingdrivingschool.pk/wp-content/uploads/2025/02/image-2.png"
          alt="Traffic Light Sign"
          className="mx-auto w-48 h-48 object-contain"
        />
      </div>
    </section>
  );
}
