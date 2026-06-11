import { motion } from 'motion/react';
import { Mail, Phone, CheckCircle2 } from 'lucide-react';

export default function AppointmentForm() {
  return (
    <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Your Details</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-400">First Name *</label>
                  <input type="text" className="w-full p-3 rounded-xl bg-gray-800/50 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none text-white transition" placeholder="Anderson" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-400">Last Name *</label>
                  <input type="text" className="w-full p-3 rounded-xl bg-gray-800/50 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none text-white transition" placeholder="Mikoo" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Email Address *</label>
                <input type="email" className="w-full p-3 rounded-xl bg-gray-800/50 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none text-white transition" placeholder="user@website.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Subject *</label>
                <input type="text" className="w-full p-3 rounded-xl bg-gray-800/50 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none text-white transition" placeholder="Driving Classes" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Comments / Questions *</label>
                <textarea rows={4} className="w-full p-3 rounded-xl bg-gray-800/50 border border-white/10 focus:ring-2 focus:ring-red-500 outline-none text-white transition" placeholder="Your comments"></textarea>
              </div>
              <button className="w-full bg-red-600/20 border border-red-500/50 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition shadow-[0_0_15px_rgba(220,38,38,0.3)]">SEND MESSAGE</button>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm">Registrations</p>
            <h2 className="text-5xl font-bold font-display leading-tight">Get Appointments With Our Best Instructors</h2>
            <p className="text-gray-400 text-lg leading-relaxed">Ready to start your driving journey? Booking an appointment with Training Driving School is quick and easy. Whether you're a beginner, need a refresher, or want to prepare for your driving test, we've got the perfect course for you.</p>
            
            <div className="space-y-4">
              {['Flexible scheduling options', 'Professional and experienced instructors', 'Customized driving programs'].map((item, i) => (
                <div key={i} className="flex gap-3 items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-gray-800 rounded-full text-red-500">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Our Email</p>
                        <p className="font-bold">trainingdrivingschool@gmail.com</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-gray-800 rounded-full text-red-500">
                        <Phone className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Our Phone</p>
                        <p className="font-bold">0300 - 1115429</p>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
