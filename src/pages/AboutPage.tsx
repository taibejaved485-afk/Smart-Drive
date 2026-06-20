import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import Stats from '../components/Stats';
import WhyChooseUs from '../components/WhyChooseUs';
import Reviews from '../components/Reviews';
import { CheckCircle2, Award, ShieldCheck, Star, X, Check, BookOpen, Clock, Heart, Users } from 'lucide-react';
import SEO from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

export default function AboutPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);

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

  const defaultInstructors = [
    {
      id: 'inst-1',
      name: 'Zahid Mahmood',
      role: 'Chief Instructor & Training Lead',
      experience: '15+ Years Exp',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      description: 'Zahid is our head instructor with countless hours of on-road mentoring. He specializes in advanced clutch control, route planning, and defensive road strategies.',
      certifications: ['NHA Certified Lead', 'Advanced Defensive Driving', 'Dual-Pedal Coach'],
      specialty: 'Manual & Automatic',
      rating: 4.9,
      reviews: 320,
      gender: 'Male',
      availability: 'Available',
      hours: '3,800+',
      successRate: '99%',
      languages: ['Urdu', 'Punjabi', 'English'],
      categories: ['Defensive', 'Manual', 'Automatic'],
      detailedBio: 'Zahid Mahmood has served as an elite trainer for over a decade. Formerly a consultant on road discipline, his modules cover tricky situations like heavy motorway traffic, parking in compressed spaces, and slope maintenance without handbrakes.',
      reviewsList: [
        { student: 'Haris Munir', comment: 'Zahid sir made manual driving feel incredibly logical. No stress, highly professional methods!' },
        { student: 'Usman Ghani', comment: 'The highway training is unbeatable. His control tips worked miracles for my confidence.' }
      ]
    },
    {
      id: 'inst-2',
      name: 'Ayesha Khan',
      role: 'Senior Instructor - Female Training',
      experience: '8+ Years Exp',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      description: 'Dedicated to providing a relaxed, secure environment for women. Ayesha is known for her extreme patience, constructive feedback, and mastery of automatic vehicles.',
      certifications: ['Female Safety Lead', 'Automatic Specialist', 'First-Aid Certified'],
      specialty: 'Automatic Transmission Only',
      rating: 5.0,
      reviews: 245,
      gender: 'Female',
      availability: 'Available',
      hours: '2,600+',
      successRate: '100%',
      languages: ['Urdu', 'Punjabi'],
      categories: ['Female Only', 'Automatic'],
      detailedBio: 'Ayesha is leading our female-only training program in Faisalabad. She is highly celebrated for her micro-adjustments techniques, safety prioritization, and structured feedback that leaves no room for nervousness.',
      reviewsList: [
        { student: 'Saba Fatima', comment: 'Ayesha apa is the best instructor ever! Zero panic, she explains every tiny detail so sweetly.' },
        { student: 'Zainab Bibi', comment: 'Loved my 10-day class. I went from never touching a steering wheel to driving to office alone.' }
      ]
    },
    {
      id: 'inst-3',
      name: 'Muhammad Bilal',
      role: 'Senior Defensive Coach',
      experience: '10+ Years Exp',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      description: 'Muhammad is an expert on local traffic laws and highway navigation. He excels at preparing students for tough test routes, ensuring high first-time success rates.',
      certifications: ['License Test Expert', 'Highway Protocol Certified', 'Elite Defensive Coach'],
      specialty: 'Commercial & Light Vehicles',
      rating: 4.8,
      reviews: 198,
      gender: 'Male',
      availability: 'In Session',
      hours: '2,100+',
      successRate: '98%',
      languages: ['Urdu', 'Punjabi', 'English'],
      categories: ['Defensive', 'Manual'],
      detailedBio: 'Bilal focuses deeply on defensive driving theories. His training covers active hazards, brake reaction times under rainfall, and local regulatory protocols to make sure you clear your driving licensing exam with sheer ease.',
      reviewsList: [
        { student: 'Ahmad Raza', comment: 'He knows exactly what testing officers look for. Passed my test in the first attempt!' },
        { student: 'Kamran Shah', comment: 'Professional, punctual, and highly skilled. His highway hazard awareness tips are gold.' }
      ]
    },
    {
      id: 'inst-4',
      name: 'Sania Malik',
      role: 'Patience & Anxiety Coach',
      experience: '5+ Years Exp',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      description: 'Sania specializes in training highly anxious beginners. She implements friendly, high-reassurance techniques to build rapid highway confidence from scratch.',
      certifications: ['Anxiety-Free Certified', 'City General Licensing', 'Beginner Care Coach'],
      specialty: 'Automatic & Manual Dual-Wing',
      rating: 4.9,
      reviews: 154,
      gender: 'Female',
      availability: 'Available',
      hours: '1,400+',
      successRate: '99%',
      languages: ['Urdu', 'English'],
      categories: ['Female Only', 'Automatic', 'Manual'],
      detailedBio: 'Sania combines mental coaching with steering mechanics to support students struggling with driving anxiety. She uses low-stress lanes and steady exposure to build confidence block by block.',
      reviewsList: [
        { student: 'Areeba Jamil', comment: 'I had terrible driving phobia. Sania completely cured it. Highly recommended for beginners!' },
        { student: 'Maria Butt', comment: 'So appreciative of her gentle, repetitive teaching style. She made parallel parking feel like child play.' }
      ]
    }
  ];

  const [instructorsList, setInstructorsList] = useState<any[]>(() => {
    const saved = localStorage.getItem('instructors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Seed and return default if not present
    localStorage.setItem('instructors', JSON.stringify(defaultInstructors));
    return defaultInstructors;
  });

  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('instructors');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setInstructorsList(parsed);
          }
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('instructors_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('instructors_updated', handleSync);
    };
  }, []);

  const instructors = instructorsList;

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

      {/* Meet Our Instructors Section */}
      <section className="py-20 sm:py-28 bg-gray-50 border-t border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <ScrollReveal direction="down">
              <span className="text-[#FF7112] font-black tracking-[0.2em] uppercase text-xs px-3 py-1 bg-orange-50 rounded-full border border-orange-100">Our Team</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gray-950 mt-4 tracking-tight">
                Meet Our Certified Instructors
              </h2>
              <div className="w-16 h-1 bg-[#FF7112] mx-auto my-5 rounded" />
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Filter by team expertise and click any instructor to view their complete teaching experience, certified credentials, and student reviews.
              </p>
            </ScrollReveal>
          </div>

          {/* Filtering Categories Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {['All', 'Female Only', 'Automatic', 'Manual', 'Defensive'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition ${
                  selectedCategory === category
                    ? 'bg-[#FF7112] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-orange-50/55 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors
              .filter((inst) => {
                if (selectedCategory === 'All') return true;
                return inst.categories.includes(selectedCategory);
              })
              .map((inst, index) => (
                <ScrollReveal key={inst.id} direction="up" delay={index * 0.1}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
                    {/* Image and Floating Badges */}
                    <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                      <img 
                        src={inst.image} 
                        alt={inst.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-xs text-white/95 font-black uppercase tracking-wider">
                          🚘 {inst.specialty}
                        </p>
                      </div>
                      {/* Floating Exp & Gender Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        <div className="bg-[#FF7112] text-white text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md shadow-md">
                          {inst.experience}
                        </div>
                        <div className="bg-slate-900/80 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-md w-max">
                          {inst.gender === 'Female' ? '👩 Female Instructor' : '👨 Male Instructor'}
                        </div>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Header: Name & Rating */}
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div>
                          <h3 className="font-display font-black text-gray-950 text-base sm:text-lg leading-tight group-hover:text-[#FF7112] transition-colors">
                            {inst.name}
                          </h3>
                          <p className="text-xs font-semibold text-slate-400 mt-0.5">{inst.role}</p>
                          <div className="mt-1.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                              inst.availability === 'In Session' 
                                ? 'bg-amber-50 text-amber-700 border-amber-200' 
                                : inst.availability === 'On Leave' 
                                  ? 'bg-rose-50 text-rose-700 border-rose-200' 
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                inst.availability === 'In Session' 
                                  ? 'bg-amber-500 animate-pulse' 
                                  : inst.availability === 'On Leave' 
                                    ? 'bg-rose-500' 
                                    : 'bg-emerald-500 animate-pulse'
                              }`} />
                              {inst.availability || 'Available'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200 flex-shrink-0">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-[10px] font-black text-yellow-700">{inst.rating}</span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-gray-500 leading-relaxed mb-4 mt-1">
                        {inst.description}
                      </p>

                      {/* Instructor Core Quick Metrics */}
                      <div className="grid grid-cols-2 gap-2 mb-5 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <div className="border-r border-slate-200">
                          <span className="block text-[8px] uppercase font-black tracking-wider text-slate-400">Success Rate</span>
                          <span className="text-xs font-black text-slate-800">{inst.successRate}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase font-black tracking-wider text-slate-400">Lessons Taught</span>
                          <span className="text-xs font-black text-slate-800">{inst.hours} Hrs</span>
                        </div>
                      </div>

                      {/* Certifications Check / Badges */}
                      <div className="space-y-2 border-t border-gray-100 pt-4 mt-auto">
                        <button
                          onClick={() => setSelectedInstructor(inst)}
                          className="w-full bg-slate-900 text-white hover:bg-[#FF7112] transition-colors duration-200 font-bold text-xs uppercase tracking-wider py-3 rounded-2xl flex items-center justify-center gap-1.5 shadow"
                        >
                          <Users className="w-3.5 h-3.5" /> View Full Profile & Reviews
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>

      {/* Instructor Detail Modal */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setSelectedInstructor(null)} />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-150 overflow-y-auto md:overflow-visible max-h-[88vh] md:max-h-none z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedInstructor(null)}
              className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur hover:bg-white p-2 rounded-full border border-gray-200 text-gray-600 hover:text-gray-950 transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Photo & Speciality */}
              <div className="md:col-span-5 relative bg-slate-950 h-52 md:h-full min-h-[280px]">
                <img 
                  src={selectedInstructor.image} 
                  alt={selectedInstructor.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5">
                  <span className="bg-[#FF7112] text-white text-[9px] uppercase font-black px-2.5 py-1 rounded-md tracking-wider self-start mb-2">
                    {selectedInstructor.experience}
                  </span>
                  <h3 className="text-white font-display font-black text-xl leading-tight">
                    {selectedInstructor.name}
                  </h3>
                  <p className="text-[#FF7112] text-xs font-bold mt-1">
                    {selectedInstructor.role}
                  </p>
                </div>
              </div>

              {/* Information Side */}
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col h-full max-h-[85vh] overflow-y-auto">
                <div>
                  <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-2">Instructor Profile</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedInstructor.detailedBio}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 my-5">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                    <span className="block text-[8px] uppercase font-black text-slate-400 tracking-wider">Success</span>
                    <span className="text-sm font-black text-emerald-600">{selectedInstructor.successRate}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                    <span className="block text-[8px] uppercase font-black text-slate-400 tracking-wider">Lessons</span>
                    <span className="text-sm font-black text-blue-600">{selectedInstructor.hours} hrs</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                    <span className="block text-[8px] uppercase font-black text-slate-400 tracking-wider">Rating</span>
                    <span className="text-sm font-black text-yellow-600">★ {selectedInstructor.rating}</span>
                  </div>
                </div>

                {/* Languages & Extra Badges */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-1.5">Languages Spoken</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedInstructor.languages.map((lang: string) => (
                        <span key={lang} className="text-[10px] font-bold bg-[#FF7112]/10 border border-[#FF7112]/20 text-[#FF7112] px-2.5 py-1 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#FF7112]" /> Badges & Credentials
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedInstructor.certifications.map((cert: string) => (
                        <span key={cert} className="inline-flex items-center gap-1 text-[10px] font-bold bg-orange-50 border border-orange-100 text-orange-700 px-2.5 py-1 rounded-full">
                          <Check className="w-2.5 h-2.5 text-[#FF7112]" /> {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Student Endorsements / Simple Reviews */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <h4 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-3">Student Reviews</h4>
                  <div className="space-y-3">
                    {selectedInstructor.reviewsList.map((rev: any, rIdx: number) => (
                      <div key={rIdx} className="bg-amber-50/40 p-3 rounded-xl border border-amber-100/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black text-gray-900">{rev.student}</span>
                          <span className="text-[10px] font-bold text-slate-400">Verified Student</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Booking CTAs */}
                <div className="mt-6 pt-5 border-t border-slate-150 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/923097666928?text=Assalam-o-Alaikum%2520GoDriveify,%2520I%2520want%2520to%2520book%2520a%2520driving%2520session%2520with%2520instructor%2520${encodeURIComponent(selectedInstructor.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 transition font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl text-center shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.12 1.06 11.5 1.06c-5.437 0-9.863 4.372-9.867 9.802-.001 1.773.475 3.5 1.378 5.027l-.95 3.471 3.586-.92z"/></svg>
                    WhatsApp Request
                  </a>
                  <button
                    onClick={() => {
                      setSelectedInstructor(null);
                      const contactForm = document.getElementById('contact');
                      if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/contact';
                      }
                    }}
                    className="flex-1 bg-slate-900 text-white hover:bg-[#FF7112] transition font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl text-center"
                  >
                    Send Booking Memo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
