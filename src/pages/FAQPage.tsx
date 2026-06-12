import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Reviews from '../components/Reviews';
import SEO from '../components/SEO';

const faqs = [
  {q: "What Is The Minimum Age Requirement For The Heavy Bike Driving Course?", a: "The minimum age requirement is 18 years, and you must hold a valid learner's permit for motorbikes to start the training."},
  {q: "How Long Does The Heavy Bike Driving Course Take?", a: "Our heavy bike courses are designed to be completed in 2-4 weeks, depending on your prior experience and learning pace. We offer flexible scheduling."},
  {q: "Do I Need Any Prior Experience To Take The Course?", a: "No prior experience is necessary. Our courses cater to all skill levels, from complete beginners to those looking to refine their techniques."},
  {q: "Will I Be Prepared For The Heavy Bike Road Test After The Course?", a: "Yes, our comprehensive training program includes theoretical practice, practical skill-building, and mock road tests to ensure you are fully confident for the official test."},
  {q: "What Type Of Bike Will I Be Trained On?", a: "We provide high-quality, well-maintained training motorbikes that are specifically chosen for their ease of handling and safety features for learners."},
  {q: "Is The Course Refundable If I Decide Not To Continue?", a: "We offer a fair, prorated refund policy if you wish to discontinue your course for legitimate reasons. Please contact our support team to discuss your situation."}
];

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Driving School FAQ - Questions & Answers | GoDriveify"
        description="Got driving questions? Find answers on learner permits, course duration, refunds, and driver test preparation at Faisalabad's GoDriveify driving academy."
        keywords="driving school queries Faisalabad, learner permit age limit Pakistan, heavy bike training rules, fast track driving course FAQ"
        schema={faqSchema}
      />
      <Navbar />

      
      {/* Header */}
      <section 
        className="relative h-64 flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="relative z-10 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">FAQ</h1>
            <p className="text-sm font-medium tracking-widest uppercase">Home &rsaquo; FAQ</p>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="py-12 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-16 mb-16">
            <div>
                <p className="text-red-500 font-bold tracking-widest text-sm mb-4">FAQ</p>
                <h2 className="text-3xl sm:text-5xl font-bold text-gray-950 mb-8">Get Quick Answers To Your Concerns</h2>
            </div>
            <div className="flex items-center">
                <p className="text-gray-600 text-lg leading-relaxed">Have questions? We're here to help! Get quick answers to all your concerns about our courses, schedules, pricing, and more. Reach out today, and we'll provide the information you need!</p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center font-bold text-lg text-left">
                        {faq.q}
                        <ChevronDown className={`w-5 h-5 transition ${openFaq === i ? 'rotate-180' : ''}`}/>
                    </button>
                    {openFaq === i && <p className="mt-4 text-gray-600">{faq.a}</p>}
                </div>
            ))}
        </div>
      </section>

      {/* Enroll Today */}
      <section 
        className="py-24 text-gray-900 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/5e/33/26/5e332692e6b46b4662892f58557e8871.jpg')" }}
      >
        <div className="py-24 px-4">
          <h2 className="text-2xl sm:text-4xl font-bold mb-6">Enroll Today</h2>
           <p className="mb-10 text-lg max-w-xl mx-auto text-gray-700">Ready to start your driving journey? Enroll in one of our courses today and become a safe, confident driver with <span className="font-bold">GoDriveify</span>.</p>
          <button 
            onClick={() => {
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
              window.location.reload();
            }}
            className="bg-red-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-red-700 transition cursor-pointer"
          >
            GET STARTED →
          </button>
        </div>
      </section>

      <Reviews />

      <Footer />
    </div>
  );
}
