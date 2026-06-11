import { motion } from 'motion/react';
import { Mail, Phone, CheckCircle2 } from 'lucide-react';

export default function AppointmentForm() {
  return (
    <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Info Side (Moved on top for mobile with responsive typography) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6 lg:space-y-8 lg:order-first"
          >
            <p className="text-red-500 font-extrabold uppercase tracking-widest text-xs sm:text-sm">Registrations</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display leading-tight text-white tracking-tight">
              Get Appointments With Our Best Instructors
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
              Ready to start your driving journey? Booking an appointment with Smart Drive is quick and easy. Whether you're a beginner, need a refresher, or want to prepare for your driving test, we've got the perfect course for you.
            </p>
            
            <div className="space-y-3.5">
              {[
                'Flexible scheduling options around Faisalabad', 
                'Professional and experienced instructors (Male & Female)', 
                'Customized driving programs with mock tests'
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start text-xs sm:text-sm text-gray-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4.5">
                <div className="p-3 bg-gray-900 rounded-2xl text-red-500 border border-white/5 shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Our Email</p>
                  <p className="font-semibold text-xs sm:text-sm text-white">trainingdrivingschool@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4.5">
                <div className="p-3 bg-gray-900 rounded-2xl text-red-500 border border-white/5 shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Our Phone</p>
                  <p className="font-semibold text-xs sm:text-sm text-white">0300 - 1115429</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/40 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h3 className="text-xl sm:text-2xl font-black mb-6 text-white font-display">Your Details</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">First Name *</label>
                  <input type="text" required className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition" placeholder="Anderson" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Last Name *</label>
                  <input type="text" required className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition" placeholder="Mikoo" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Email Address *</label>
                <input type="email" required className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition" placeholder="user@website.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Subject *</label>
                <input type="text" required className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition" placeholder="Driving Classes" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Comments / Questions *</label>
                <textarea rows={4} required className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition resize-none" placeholder="Your comments"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-650 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition shadow-[0_0_20px_rgba(220,38,38,0.2)] active:scale-[0.99] cursor-pointer">
                SEND MESSAGE
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
