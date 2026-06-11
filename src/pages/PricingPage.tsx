import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Reviews from '../components/Reviews';
import OurProcess from '../components/OurProcess';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-950 text-white overflow-hidden bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gray-950/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Pricing</h1>
          <p className="text-gray-400">Home / Pricing</p>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-red-500 font-bold tracking-widest text-sm mb-4">PRICING PACKAGE</p>
                <h2 className="text-5xl font-bold text-gray-950 mb-8">Choose A Package That Suits Your Needs</h2>
                <p className="text-gray-600 text-lg leading-relaxed">At Smart Drive, we offer a range of driving packages to suit your needs, skill level, and budget. Whether you're a beginner or looking to refine your driving skills, we've got the perfect package for you.</p>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
                {[
                    { name: "Honda Civic (Manual)", desc: "Learn driving with automatic or manual Honda Civic.", price: "25000/-", features: ["30 Mins Driving Lesson", "40 min Per Day", "10 min Theory Session", "10 Days Course", "Additional Time Available"] },
                    { name: "Honda Civic (Auto)", desc: "Learn driving with automatic or manual Honda Civic.", price: "25000/-", features: ["30 Mins Driving Lesson", "40 min Per Day", "10 min Theory Session", "10 Days Course", "Additional Time Available"] },
                    { name: "Heavy Bike", desc: "Expert lessons for riding heavy motorcycles safely.", price: "50000/-", features: ["60 Mins Driving Lesson", "40 min Per Day", "10 min Theory Session", "10 Days Course", "Additional Time Available"] }
                ].map((pkg, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col"
                    >
                        <div className="flex justify-center mb-8">
                            <div className="p-4 rounded-full bg-gray-50"><svg viewBox="0 0 24 24" className="w-12 h-12 text-gray-800" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5S16.67 13 17.5 13s1.5.67 1.5 1.5S18.33 16 17.5 16zM5 11l1.5-4.5h11L19 11H5z"/></svg></div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-center">{pkg.name}</h3>
                        <p className="text-gray-500 mb-8 font-mono text-center text-sm">{pkg.desc}</p>
                        
                        <div className="bg-red-800 text-white text-3xl font-bold py-4 text-center mb-8 rounded-sm">{pkg.price}</div>
                        
                        <div className="space-y-4 mb-8 flex-grow text-sm font-medium text-gray-700">
                            {pkg.features.map(f => (
                                <div key={f} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-red-600"/> {f}</div>
                            ))}
                        </div>
                        
                        <button className="w-full text-red-600 border-2 border-red-600 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition uppercase tracking-widest flex justify-center items-center gap-2">GET STARTED <span className="text-lg">→</span></button>
                    </motion.div>
                ))}
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h3>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    {[
                        {q: "1. How Long Does It Take To Complete A Driving Course?", a: "The duration of our courses depends on the package you choose. On average, beginners can complete their course in 2 to 4 weeks, while advanced or refresher courses may take 1 to 2 weeks. We offer flexible scheduling to fit your availability."},
                        {q: "2. Do I Need Any Documents To Start My Driving Lessons?", a: "Yes, you generally need a valid learner's permit. We can guide you through the process of obtaining one if you don't have it yet."},
                        {q: "3. Will You Help Me Prepare For The Driving License Test?", a: "Absolutely! Our comprehensive training includes theory practice, practical skill building, and mock tests to ensure you're fully prepared and confident for the official driving test."}
                    ].map((faq, i) => (
                        <div key={i} className="mb-2 border-b border-gray-100 last:border-0">
                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 font-bold text-lg text-left">
                                {faq.q}
                                <ChevronDown className={`w-5 h-5 transition ${openFaq === i ? 'rotate-180' : ''}`}/>
                            </button>
                            {openFaq === i && <p className="px-6 pb-6 text-gray-600">{faq.a}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <Reviews />
            <OurProcess />
        </div>
      </section>

      <Footer />
    </div>
  );
}
