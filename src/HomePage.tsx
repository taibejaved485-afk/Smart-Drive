
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Stats from './components/Stats';
import Lessons from './components/Lessons';
import FeaturedCourses from './components/FeaturedCourses';
import EnrollCTA from './components/EnrollCTA';
import WhyChooseUs from './components/WhyChooseUs';
import AppointmentForm from './components/AppointmentForm';
import OurProcess from './components/OurProcess';
import Reviews from './components/Reviews';
import RentalMarketplace from './components/RentalMarketplace';
import Footer from './components/Footer';
import SEO from './components/SEO';
import { Award, Car, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HomePage() {
  const [activeService, setActiveService] = useState<'learn' | 'rent'>('learn');

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://smartdrivefd.com/#localbusiness",
        "name": "Smart Drive Driving School",
        "image": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600&auto=format&fit=crop",
        "telephone": "0300-1115429",
        "email": "trainingdrivingschool@gmail.com",
        "hasMap": "https://maps.google.com/?q=Smart+Drive+Driving+School+Main+Jaranwala+Road+Near+Peoples+Colony+Faisalabad+Punjab+Pakistan",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Main Jaranwala Road",
          "addressLocality": "Faisalabad",
          "addressRegion": "Punjab",
          "postalCode": "38000",
          "addressCountry": "PK"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "31.4175",
          "longitude": "73.1350"
        },
        "url": "https://smartdrivefd.com/",
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "06:00",
          "closes": "20:00"
        },
        "sameAs": [
          "https://www.facebook.com/GoDriveify/",
          "https://www.instagram.com/godriveify/",
          "https://www.youtube.com/@godriveify",
          "https://x.com/godriveify?s=11",
          "https://maps.google.com/?q=Smart+Drive+Driving+School+Main+Jaranwala+Road+Near+Peoples+Colony+Faisalabad+Punjab+Pakistan"
        ]
      },
      {
        "@type": "EducationalOrganization",
        "name": "Smart Drive Driving Academy",
        "description": "Learn physical manual and automatic car driving with male and female instructors in Faisalabad, Pakistan.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "ratingCount": "380"
        }
      }
    ]
  };

  return (
    <div className="font-sans text-gray-900 bg-gray-50">
      <SEO 
        title="Male & Female Driving School & Multi-Vendor Car Rentals | Smart Drive"
        description="Faisalabad's top dual-platform: Learn physical manual & automatic driving with certified instructors OR rent verified cars directly from verified local owners."
        keywords="driving school Faisalabad, female driving instructor, rent a car Faisalabad, car rentals Pakistan, peer-to-peer car hire, automatic driving class, manual driving lessons"
        schema={homeSchema}
      />
      <Navbar />
      <Hero />

      {/* TWO MAIN SERVICES DUAL-STREAM SELECTION TOGGLE */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 sm:-mt-16 relative z-30 mb-8 font-sans">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-gray-150 flex flex-col md:flex-row gap-5 items-center justify-between">
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg font-black text-gray-950 flex items-center gap-1.5 justify-center md:justify-start">
              <span>Smart Drive Hub</span>
              <Sparkles className="w-4 h-4 text-red-500 fill-red-500/10" />
            </h3>
            <p className="text-xs text-gray-400 font-medium">Choose a portal to start your journey</p>
          </div>

          <div className="flex bg-gray-50/80 p-1.5 rounded-2xl border border-gray-250/20 w-full md:w-auto max-w-lg gap-2">
            <button 
              onClick={() => setActiveService('learn')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeService === 'learn' 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
              }`}
              type="button"
            >
              <Award className="w-4.5 h-4.5" />
              <span>Learn Driving</span>
            </button>
            <button 
              onClick={() => setActiveService('rent')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeService === 'rent' 
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-950/20' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
              }`}
              type="button"
            >
              <Car className="w-4.5 h-4.5" />
              <span>Rent a Car</span>
            </button>
          </div>
        </div>
      </div>

      {/* CONDITIONAL COMPONENT TREE RENDERING WITH INTERACTIVE TRANSITIONS */}
      <AnimatePresence mode="wait">
        {activeService === 'learn' ? (
          <motion.div
            key="driving-school-portal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <Features />
            <About />
            <Stats />
            <Lessons />
            <FeaturedCourses />
            <EnrollCTA />
            <WhyChooseUs />
            <AppointmentForm />
            <OurProcess />
            <Reviews />
          </motion.div>
        ) : (
          <motion.div
            key="rent-car-marketplace"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <RentalMarketplace />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}


