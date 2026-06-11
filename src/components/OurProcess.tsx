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
    <section className="py-24 bg-white text-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-red-500 font-bold uppercase tracking-widest text-sm mb-4"
          >
            OUR PROCESS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-display"
          >
            Steps To Get Your Driving Licence With Us
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-red-500/50 transition-all shadow-sm hover:shadow-xl group"
            >
              <div className="flex justify-between items-start mb-8">
                <step.icon className="w-12 h-12 text-red-500" />
                <span className="text-4xl font-bold text-gray-900/10 group-hover:text-red-500/20 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{step.desc}</p>
              <Link to="/pricing" className="flex items-center gap-2 text-red-500 font-bold hover:gap-4 transition-all">
                LEARN MORE <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
