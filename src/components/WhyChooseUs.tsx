import { motion } from 'motion/react';
import { ShieldCheck, Clock as ClockIcon, Route, Package, Users } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Best Safety Measures', desc: 'Experienced & Professional Instructors' },
  { icon: ClockIcon, title: 'Customized Training Programs', desc: 'We understand that every learner is unique.' },
  { icon: Route, title: 'Focus On Road Safety', desc: 'Safety is at the core of everything we do.' },
  { icon: Package, title: 'Affordable Packages', desc: 'Get top-quality driving lessons without breaking the bank.' },
  { icon: Users, title: 'Courses For Everyone', desc: 'No matter your background or experience.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white text-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <p className="text-[#FF7112]/90 font-bold uppercase tracking-widest text-sm">Why Choose Us?</p>
            <h2 className="text-5xl md:text-6xl font-bold font-display leading-tight">
              Best Driving Course Even For Beginners
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Choosing the right driving school is the first step toward becoming a skilled and responsible driver. At GoDriveify, we don't just teach you how to drive—we prepare you for real-world road challenges with confidence and competence.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 border border-gray-100 p-8 rounded-3xl group hover:border-[#FF7112]/50 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-[#FF7112]/90 mb-6" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
