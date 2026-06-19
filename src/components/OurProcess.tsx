import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileEdit, Car, Award, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: FileEdit,
    title: 'Apply For Your Learner’s Permit',
    desc: 'We\'ll guide you through the process of applying for your learner\'s permit, including the required documentation and paperwork.',
  },
  {
    number: '02',
    icon: Car,
    title: 'Practice, Practice, Practice',
    desc: 'With your learner\'s permit in hand, you\'ll gain real-world driving experience under the supervision of our instructors, building your confidence on the road.',
  },
  {
    number: '03',
    icon: Award,
    title: 'Pass The Driving Test With Confidence',
    desc: 'With thorough preparation, you\'ll be ready to ace both the written and practical tests. Our students have a high success rate, thanks to our comprehensive training approach.',
  },
];

export default function OurProcess() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-b border-slate-900">
      {/* Background glow effects to match the premium dark look */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-900/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FF7112]/90 font-black uppercase tracking-widest text-xs sm:text-sm mb-4"
          >
            OUR PROCESS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-4"
          >
            How to Earn Your Driving Licence With Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            We simplify your license journey in Faisalabad with simple, structured, and certified steps.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-slate-800/80 hover:border-[#FF7112]/50 hover:bg-slate-900/60 transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,113,18,0.05)] group flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-slate-800/50 rounded-2xl text-[#FF7112]/90 group-hover:bg-orange-500/10 transition-colors">
                    <step.icon className="w-8 h-8 stroke-[2]" />
                  </div>
                  <span className="text-4xl font-extrabold text-slate-800/40 group-hover:text-[#FF7112]/20 transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">{step.title}</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-normal">{step.desc}</p>
              </div>
              <Link to="/pricing" className="flex items-center gap-2 text-[#FF7112]/90 font-black hover:gap-4 transition-all text-xs tracking-wider uppercase">
                LEARN MORE <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
