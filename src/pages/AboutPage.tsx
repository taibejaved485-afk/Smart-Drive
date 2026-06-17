import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import Stats from '../components/Stats';
import WhyChooseUs from '../components/WhyChooseUs';
import Reviews from '../components/Reviews';
import { CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About GoDriveify Driving School Faisalabad",
    "description": "Discover our values, our professional instructors, and our history. GoDriveify is the most trusted driving academy in Faisalabad for female and male students.",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "GoDriveify Driving School",
      "telephone": "03097666928",
      "email": "info@godriveify.com",
      "hasMap": "https://maps.google.com/?q=GoDriveify+Driving+School+Millat+Road+Millat+Town+Faisalabad+Punjab+Pakistan",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Millat Road, Millat Town",
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
      "url": "https://godriveify.com/",
      "sameAs": [
        "https://www.facebook.com/GoDriveify/",
        "https://www.instagram.com/godriveify/",
        "https://www.youtube.com/@godriveify",
        "https://x.com/godriveify?s=11",
        "https://maps.google.com/?q=GoDriveify+Driving+School+Millat+Road+Millat+Town+Faisalabad+Punjab+Pakistan"
      ]
    }
  };

  const features = [
    {
      title: 'Beginner Driving Course',
      desc: 'Learn the basics of driving, road signs, and traffic rules with step-by-step guidance.'
    },
    {
      title: 'Defensive Driving Training',
      desc: 'Develop skills to drive safely in all conditions, avoiding potential hazards on the road.'
    },
    {
      title: 'License Preparation Course',
      desc: 'Get expert training to pass your driving test and obtain your license with confidence.'
    },
    {
      title: 'Refresher Course',
      desc: 'Already know how to drive? Improve your skills with professional coaching.'
    }
  ];

  return (
    <div className="font-sans text-gray-900 bg-white">
      <SEO 
        title="About Our Driving School in Faisalabad | GoDriveify"
        description="Learn more about GoDriveify Driving School. We are Faisalabad's highly-rated educational institution with dedicated courses for manual & automatic vehicles."
        keywords="about driving school, learn manual driving Faisalabad, professional driving lessons, certified car instructors Pakistan, defensive driving training, female driving school history"
        schema={aboutSchema}
      />
      <Navbar />


      {/* Header Banner */}
      <section 
        className="relative h-64 sm:h-80 flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/aa/8c/59/aa8c59af08030bf767a16f053cb78d1c.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-900/40" />
        <div className="relative z-10 text-center px-4">
          <ScrollReveal direction="down">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-display">About Us</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xs sm:text-sm font-medium tracking-widest uppercase">
              Home <span className="text-[#FF7112]/90 mx-2">&rsaquo;</span> About
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About Main Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-[#FF7112] font-bold tracking-widest uppercase text-sm mb-3">About Us</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight tracking-tight max-w-4xl">
              We are your reliable, all-in-one platform for experienced and professional driving solutions.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Images Section on Left */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <ScrollReveal direction="left" delay={0.2} className="h-full">
              <img 
                src="https://i.pinimg.com/736x/a1/63/96/a1639624eb25cd6c5e373b87f7245cd5.jpg" 
                alt="Driving Lesson portrait" 
                className="rounded-3xl shadow-xl w-full h-80 sm:h-[480px] object-cover"
              />
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.4} className="h-full">
              <img 
                src="https://i.pinimg.com/736x/a1/1a/e5/a11ae5071f90d92c3531cb1db6894d54.jpg" 
                alt="Instructor and student checklist" 
                className="rounded-3xl shadow-xl w-full h-80 sm:h-[480px] object-cover mt-8" 
              />
            </ScrollReveal>
          </div>

          {/* Text & Grid Section on Right */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="right" delay={0.2}>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-8">
                Welcome to <span className="text-[#FF7112] font-semibold underline underline-offset-4 decoration-[#FF7112]/30">GoDriveify</span>, the leading <span className="text-[#FF7112] font-semibold underline underline-offset-4 decoration-[#FF7112]/30">Driving lessons in Faisalabad</span>, dedicated to helping learners become skilled, responsible, and confident drivers. Whether you're a beginner or looking to refine your driving skills, our expert instructors ensure a smooth learning experience tailored to your needs.
              </p>
            </ScrollReveal>

            {/* Custom Grid Layout with thin separators */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-100 md:divide-x divide-gray-100 mb-6">
              {/* Feature 1 */}
              <ScrollReveal direction="up" delay={0.3}>
                <div className="py-6 pr-0 md:pr-6 border-b border-gray-100 h-full">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#FF7112] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-950 text-base md:text-lg mb-2">{features[0].title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{features[0].desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature 2 */}
              <ScrollReveal direction="up" delay={0.4}>
                <div className="py-6 md:pl-6 border-b border-gray-100 h-full">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#FF7112] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-950 text-base md:text-lg mb-2">{features[1].title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{features[1].desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature 3 */}
              <ScrollReveal direction="up" delay={0.5}>
                <div className="py-6 pr-0 md:pr-6 border-b md:border-b-0 border-gray-100 h-full">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#FF7112] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-950 text-base md:text-lg mb-2">{features[2].title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{features[2].desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature 4 */}
              <ScrollReveal direction="up" delay={0.6}>
                <div className="py-6 md:pl-6 h-full">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#FF7112] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-950 text-base md:text-lg mb-2">{features[3].title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{features[3].desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment To Excellence Section */}
      <section className="py-16 sm:py-24 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <ScrollReveal direction="right">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-gray-950 leading-tight tracking-tight">
                  Our Commitment To Excellence
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.2}>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  At GoDriveify, we are committed to providing the highest standard of driver education. Our focus is on safety, skill development, and building confidence behind the wheel. We ensure that all our instructors are fully licensed, highly trained, and dedicated to each student's success. Whether you're a beginner or looking to refine your skills, we offer personalized lessons tailored to your needs. We believe in making the learning process enjoyable, effective, and stress-free. Our commitment to excellence drives us to continuously improve our methods and resources, ensuring every student becomes a competent, safe, and responsible driver.
                </p>
              </ScrollReveal>
            </div>

            {/* Image Content */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative">
                <img 
                  src="https://i.pinimg.com/736x/4d/69/18/4d691812c12d4668009b98e812bf8692.jpg" 
                  alt="Driving school training session" 
                  referrerPolicy="no-referrer"
                  className="rounded-3xl shadow-xl w-full h-80 sm:h-[450px] object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Additional Stats, Why Choose Us, and Reviews sections to make the Page outstanding */}
      <Stats />
      <WhyChooseUs />
      <Reviews />

      {/* Our History Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Image */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80" 
                  alt="Driving lesson inside a car" 
                  className="rounded-3xl shadow-xl w-full h-80 sm:h-[450px] object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Right side: Text Content */}
            <div className="space-y-6">
              <ScrollReveal direction="left">
                <p className="text-[#FF7112] font-bold tracking-widest uppercase text-sm">
                  OUR HISTORY
                </p>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.1}>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-gray-950 leading-tight tracking-tight">
                  The History Behind How We Were Founded
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={0.2}>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  Founded with a passion for road safety, we started as a small driving school with a mission to provide professional and reliable driver education. Over the years, we've expanded, earning trust and recognition for our commitment to training confident, skilled drivers.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
}
