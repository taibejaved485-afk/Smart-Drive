import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Reviews from '../components/Reviews';
import OurProcess from '../components/OurProcess';
import SEO from '../components/SEO';

interface PricingCourse {
  id: string;
  courseTitle: string;
  courseDescription: string;
  courseFee: string;
  carImage: string;
  lessonDuration: string;
  dailyTime: string;
  theoryDuration: string;
  coursePeriod: string;
  additionalTime: string;
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [courses, setCourses] = useState<PricingCourse[]>([]);

  useEffect(() => {
    const syncPricingCourses = () => {
      const saved = localStorage.getItem('drivingCourses');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCourses(parsed);
          } else {
            setCourses(DEFAULT_PRICING_COURSES);
          }
        } catch (e) {
          setCourses(DEFAULT_PRICING_COURSES);
        }
      } else {
        setCourses(DEFAULT_PRICING_COURSES);
        localStorage.setItem('drivingCourses', JSON.stringify(DEFAULT_PRICING_COURSES));
      }
    };

    const DEFAULT_PRICING_COURSES = [
      {
        id: "course-1",
        courseTitle: "Honda Civic (Manual)",
        courseDescription: "Learn driving with automatic or manual Honda Civic.",
        courseFee: "25000",
        carImage: "https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600",
        lessonDuration: "30 Mins Driving Lesson",
        dailyTime: "40 min Per Day",
        theoryDuration: "10 min Theory Session",
        coursePeriod: "10 Days Course",
        additionalTime: "Additional Time Available"
      },
      {
        id: "course-2",
        courseTitle: "Honda Civic (Auto)",
        courseDescription: "Learn driving with automatic or manual Honda Civic.",
        courseFee: "25000",
        carImage: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
        lessonDuration: "30 Mins Driving Lesson",
        dailyTime: "40 min Per Day",
        theoryDuration: "10 min Theory Session",
        coursePeriod: "10 Days Course",
        additionalTime: "Additional Time Available"
      },
      {
        id: "course-3",
        courseTitle: "Heavy Bike",
        courseDescription: "Expert lessons for riding heavy motorcycles safely.",
        courseFee: "50000",
        carImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600",
        lessonDuration: "60 Mins Driving Lesson",
        dailyTime: "40 min Per Day",
        theoryDuration: "10 min Theory Session",
        coursePeriod: "10 Days Course",
        additionalTime: "Additional Time Available"
      }
    ];

    syncPricingCourses();
    window.addEventListener('storage', syncPricingCourses);
    window.addEventListener('driving_courses_updated', syncPricingCourses);

    return () => {
      window.removeEventListener('storage', syncPricingCourses);
      window.removeEventListener('driving_courses_updated', syncPricingCourses);
    };
  }, []);

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "GoDriveify Driving School Lesson Rates",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Honda Civic (Manual) Driving Course",
          "description": "10 Days Course manual gear shifter lessons on Honda Civic."
        },
        "price": "25000",
        "priceCurrency": "PKR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Honda Civic (Automatic) Driving Course",
          "description": "10 Days Course automatic transmission lessons on Honda Civic."
        },
        "price": "25000",
        "priceCurrency": "PKR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Heavy Bike Riding Course",
          "description": "Complete heavy motorcycle training under certified coaches."
        },
        "price": "50000",
        "priceCurrency": "PKR"
      }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Driving School Fees & Lesson Packages | GoDriveify"
        description="Check out our low-cost manual & automatic driving school pricing plans in Faisalabad. Learn in a high-end Honda Civic starting from 25,000 PKR only."
        keywords="driving school fee Faisalabad, car driving class packages, heavy bike license course rates, cheap driving instructor cost, automatic car lesson prices Punjab"
        schema={pricingSchema}
      />
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
                <h2 className="text-3xl md:text-5xl font-bold text-gray-950 mb-8">Choose A Package That Suits Your Needs</h2>
                <p className="text-gray-600 text-lg leading-relaxed">At GoDriveify, we offer a range of driving packages to suit your needs, skill level, and budget. Whether you're a beginner or looking to refine your driving skills, we've got the perfect package for you.</p>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
                {courses.map((pkg, i) => (
                    <motion.div 
                        key={pkg.id || i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-between hover:border-red-100 hover:shadow-2xl hover:shadow-red-50/20 transition-all duration-300"
                    >
                        <div>
                            {/* Course Image frame with zoom hover effect */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 mb-6 group">
                                <img 
                                    src={pkg.carImage || "https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600"} 
                                    alt={pkg.courseTitle} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>

                            <h3 className="text-2xl font-black mb-1.5 text-gray-900 tracking-tight leading-snug">{pkg.courseTitle}</h3>
                            <p className="text-gray-500 mb-6 font-medium text-sm leading-relaxed">{pkg.courseDescription}</p>
                            
                            {/* Professional Pricing Badge */}
                            <div className="bg-red-800 text-white text-3xl font-black py-4 text-center mb-6 rounded-2xl shadow-sm tracking-tight font-sans">
                                {pkg.courseFee}/- <span className="text-xs font-bold font-sans uppercase tracking-widest text-red-200">PKR Only</span>
                            </div>
                            
                            {/* Check bullet parameters from custom admin schema */}
                            <div className="space-y-3 mb-8 text-sm font-semibold text-gray-700">
                                {pkg.lessonDuration && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.lessonDuration}</div>
                                )}
                                {pkg.dailyTime && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.dailyTime}</div>
                                )}
                                {pkg.theoryDuration && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.theoryDuration}</div>
                                )}
                                {pkg.coursePeriod && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.coursePeriod}</div>
                                )}
                                {pkg.additionalTime && (
                                    <div className="flex items-center gap-2.5"><CheckCircle2 className="w-5 h-5 text-red-650 shrink-0"/> {pkg.additionalTime}</div>
                                )}
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => {
                                if ('scrollRestoration' in history) {
                                    history.scrollRestoration = 'manual';
                                }
                                window.scrollTo(0, 0);
                                window.location.reload();
                            }}
                            className="w-full text-red-600 border-2 border-red-600 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition uppercase tracking-widest flex justify-center items-center gap-2 cursor-pointer font-sans"
                        >
                            GET STARTED <span className="text-lg">→</span>
                        </button>
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

      <CTABanner />
      <Footer />
    </div>
  );
}
