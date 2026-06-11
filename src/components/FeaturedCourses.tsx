import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const featuredCourses = [
  {
    title: 'Beginner\'s Driving Course',
    desc: 'Our Beginner Driving Course is designed for individuals with little to no driving experience.',
    instructorName: 'Mr Shahzad',
    instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    price: '25000',
    image: 'https://i.pinimg.com/736x/8d/94/f2/8d94f287eb975536beba8982f203e697.jpg'
  },
  {
    title: 'Defensive Driving Course',
    desc: 'Our Defensive Driving Course teaches proactive driving strategies to help avoid accidents and handle challenging situations.',
    instructorName: 'Ms Alina',
    instructorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    price: '25000',
    image: 'https://i.pinimg.com/1200x/dc/55/5c/dc555cc031dcd21cdd4734c0b11f67df.jpg'
  },
  {
    title: 'Driving License Preparation Course',
    desc: 'Ace Your Driving Test with Confidence. Preparing for your driving license test? This course is designed to ensure you\'re test-ready.',
    instructorName: 'Mr Ahmed',
    instructorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c31e3?auto=format&fit=crop&q=80&w=200&h=200',
    price: '25000',
    image: 'https://i.pinimg.com/736x/a8/77/9c/a8779c31b9eb9b1b5e71358f964cbe4f.jpg'
  },
];

export default function FeaturedCourses() {
  return (
    <section className="py-20 bg-white text-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-gray-950">
          Our Featured Courses
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredCourses.map((course, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-red-500/50 transition-all shadow-xl"
            >
              <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <img 
                    src={course.instructorImage}
                    alt={course.instructorName} 
                    className="w-12 h-12 rounded-full object-cover border border-gray-200" 
                  />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Instructor</p>
                    <p className="font-bold">{course.instructorName}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                <p className="text-gray-600 mb-8">{course.desc}</p>
                <div className="flex items-center justify-between">
                  <Link to="/pricing" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition">
                    VIEW COURSE <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-2xl font-bold text-red-600">{course.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
