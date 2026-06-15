import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, CheckCircle2, Send, Check } from 'lucide-react';
import { insertDrivingBooking } from '../lib/supabase';

export default function AppointmentForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Beginner Class Driving Session');
  const [comments, setComments] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      alert('Please fill in all required fields, including your Phone Number.');
      return;
    }

    const newBooking = {
      id: 'bk-' + Date.now().toString(),
      fullName: `${firstName} ${lastName}`.trim(),
      email: email,
      phone: phone.trim(),
      subject: subject,
      comments: comments || 'No comments specified.',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    try {
      insertDrivingBooking({
        id: newBooking.id,
        courseId: 'driving-school-form',
        courseName: newBooking.subject,
        price: '15,000', // Default price or free custom estimate
        customerName: newBooking.fullName,
        phone: newBooking.phone,
        email: newBooking.email,
        startingDate: new Date().toLocaleDateString(),
        preferredSlot: newBooking.comments,
        status: 'Pending'
      });
    } catch (err) {
      console.error('Failed to submit driving school booking via Supabase', err);
    }

    setIsSuccess(true);
  };

  const resetFormState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setSubject('Beginner Class Driving Session');
    setComments('');
    setIsSuccess(false);
  };

  return (
    <section className="py-24 bg-gray-950 text-white relative overflow-hidden" id="booking-section">
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
              Ready to start your driving journey? Booking an appointment with GoDriveify is quick and easy. Whether you're a beginner, need a refresher, or want to prepare for your driving test, we've got the perfect course for you.
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
                  <p className="font-semibold text-xs sm:text-sm text-white">info@godriveify.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4.5">
                <div className="p-3 bg-gray-900 rounded-2xl text-red-500 border border-white/5 shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Our Phone</p>
                  <p className="font-semibold text-xs sm:text-sm text-white">03097666928</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/40 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl min-h-[460px] flex flex-col justify-center"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-red-600/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black font-display text-white">Booking Received!</h3>
                <p className="text-gray-300 text-sm max-w-sm mx-auto leading-relaxed">
                  Excellent choice! Your appointment request for <strong className="text-red-500">{firstName}</strong> has been saved under state bookings. Our team will verify your preferred timings and call you shortly.
                </p>
                <button 
                  onClick={resetFormState}
                  className="mt-6 bg-red-650 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition hover:scale-103 cursor-pointer"
                  type="button"
                >
                  Book Another Lesson
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-black mb-6 text-white font-display">Your Details</h3>
                <form className="space-y-5" onSubmit={handleBookingSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">First Name *</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition" 
                        placeholder="e.g. Muhammad" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Last Name *</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition" 
                        placeholder="e.g. Ahmad" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition" 
                      placeholder="e.g. ahmad@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">WhatsApp Phone Number * (رابطہ نمبر - مثال: 03001234567)</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition" 
                      placeholder="e.g. 03097666928" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Course / Subject *</label>
                    <select 
                      className="w-full p-3 rounded-xl bg-gray-800 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option value="Beginner Class Driving Session">Beginner Class Driving Session (15 Days)</option>
                      <option value="Advanced Manual Control">Advanced Manual Control (10 Days)</option>
                      <option value="Female-Only Safe Road Course">Female-Only Safe Road Course (Instructors Provided)</option>
                      <option value="Refresher Traffic Sign Coaching">Refresher Traffic Sign Coaching (5 Days)</option>
                      <option value="Commercial Truck/LTV license prep">Commercial Truck/LTV license prep</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Comments / Questions *</label>
                    <textarea 
                      rows={3} 
                      required 
                      className="w-full p-3 rounded-xl bg-gray-800/40 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-white text-sm transition resize-none leading-relaxed" 
                      placeholder="Tell us about your driving experience or details..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="w-full bg-red-650 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition shadow-[0_0_20px_rgba(220,38,38,0.2)] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2">
                    <span>SEND REQUEST</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

