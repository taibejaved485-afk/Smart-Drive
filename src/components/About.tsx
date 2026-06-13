import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function About() {
  const features = [
    { title: 'Beginner Driving Course', desc: 'Learn the basics of driving, road signs, and traffic rules with step-by-step guidance.' },
    { title: 'Defensive Driving Training', desc: 'Develop skills to drive safely in all conditions, avoiding potential hazards on the road.' },
    { title: 'License Preparation Course', desc: 'Get expert training to pass your driving test and obtain your license with confidence.' },
    { title: 'Refresher Course', desc: 'Already know how to drive? Improve your skills with professional coaching.' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-red-600 font-bold tracking-widest uppercase text-sm mb-2">About Us</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight tracking-tight">
            We are your reliable, all-in-one platform for experienced and professional driving solutions.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Images Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl shadow-xl overflow-hidden h-80 sm:h-96 group transition-shadow duration-500 hover:shadow-2xl">
              <img src="https://i.pinimg.com/736x/a1/63/96/a1639624eb25cd6c5e373b87f7245cd5.jpg" alt="Driving Lesson 1" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="rounded-3xl shadow-xl overflow-hidden h-80 sm:h-96 sm:mt-16 group transition-shadow duration-500 hover:shadow-2xl">
              <img src="https://i.pinimg.com/736x/a1/1a/e5/a11ae5071f90d92c3531cb1db6894d54.jpg" alt="Driving Lesson 2" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>

          {/* Text Section */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-8">
              Welcome to <strong>GoDriveify Driving School</strong>. Learning to drive is no longer just a basic skill; it is an essential part of independent and responsible living. This is why choosing a professional driving school plays a vital role in developing safe and confident drivers. A high-quality driving school offers structured training that covers traffic laws, road discipline, vehicle control, and defensive driving techniques designed for real road conditions.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-3 group cursor-default">
                  <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-start">
              <Link to="/pricing" className="flex items-center gap-2 border border-red-600 text-red-600 px-6 py-3 rounded-full font-bold hover:bg-red-600 hover:text-white transition shadow-sm hover:shadow-md">
                APPLY NOW <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
