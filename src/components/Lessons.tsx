import { motion } from 'motion/react';
import { Clock, Shield, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    title: "Beginner Driving Course",
    badge: "Best Seller",
    desc: "Complete step-by-step training for absolute beginners. Master steering wheel controls, accelerator leverage, essential road signs, and premium safe parking fundamentals.",
    duration: "Comprehensive 10-20 Hrs",
    features: [
      "Dual-controlled safety training",
      "Syllabus maps & test checklist",
      "One-on-one private lessons",
      "Free pickup & drop-off service"
    ],
    image: 'https://trainingdrivingschool.pk/wp-content/uploads/2025/02/download-2.jpeg',
    badgeBg: 'bg-red-500/10 text-red-400 border border-red-500/20',
    link: '/pricing'
  },
  {
    title: "Confidence Booster Class",
    badge: "Specialized Training",
    desc: "Designed for individuals seeking to conquer specific driving challenges like highway joins, dense city traffic lanes, nighttime driving, or parallel park layouts.",
    duration: "Flexible Hourly Slots",
    features: [
      "Defensive driving strategies",
      "Motorway & high-speed practice",
      "Overcoming driving anxiety",
      "Customized roadmap focus"
    ],
    image: 'https://trainingdrivingschool.pk/wp-content/uploads/2025/02/download.jpeg',
    badgeBg: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    link: '/pricing'
  },
  {
    title: "Road Test Intensive Prep",
    badge: "98.7% Success Rate",
    desc: "A targeted, rigorous mock test run replicating regulatory criteria perfectly. Deep diagnostic reviews ensure you ace your driver license assessment in one try.",
    duration: "Efficient 3-5 Hrs Trial",
    features: [
      "Mock driving test trials",
      "Real test-route practice driving",
      "Immediate mistake diagnostic",
      "School-certified vehicle use"
    ],
    image: 'https://trainingdrivingschool.pk/wp-content/uploads/2025/02/download-1-1.jpeg',
    badgeBg: 'bg-green-500/10 text-green-400 border border-green-500/20',
    link: '/pricing'
  },
  {
    title: "Road Sign Test",
    badge: "Essential Knowledge",
    desc: "Master all road signs and traffic markings. Our comprehensive guide ensures you understand every rule of the road for a safe driving experience.",
    duration: "Quick 2-3 Hrs Workshop",
    features: [
      "Comprehensive sign identification",
      "Traffic rules & markings mastery",
      "Interactive quizzes",
      "Exam-readiness training"
    ],
    image: 'https://i.pinimg.com/736x/25/e7/a2/25e7a288c9fd2d3dd83056fa2ea0b8aa.jpg',
    badgeBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    link: '/pricing'
  }
];

export default function Lessons() {
  return (
    <section className="py-24 bg-gray-950 text-white relative overflow-hidden" id="courses">
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Section */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-500 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase mb-4 shadow-sm"
          >
            <Shield className="w-3.5 h-3.5" /> Certified Instructors
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-sans font-black leading-tight tracking-tight text-white mb-5"
          >
            Master the Road at Any Age. <br className="hidden md:block"/>
            Because It's Never Too Late to Take the Wheel.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-normal leading-relaxed"
          >
            Flexible custom programs structured perfectly alongside patient, professional trainers to shape you into an extremely safe, completely confident lifelong driver.
          </motion.p>
        </div>
        
        {/* Courses Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-[#0f1115]/90 border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(239,68,68,0.15)] overflow-hidden"
            >
              {/* Image Frame Container */}
              <div className="relative aspect-[16/10] bg-white rounded-2xl p-4 overflow-hidden mb-6 flex items-center justify-center border border-white/10 shadow-md">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105" 
                />
              </div>

              {/* Title & Content */}
              <div className="flex-grow flex flex-col justify-center">
                <h3 className="text-2xl font-black text-white group-hover:text-red-500 transition-colors mb-6 tracking-tight text-center">
                  {course.title}
                </h3>
              </div>

              {/* Pricing Redirect Button */}
              <Link
                to={course.link}
                className="w-full bg-white/5 hover:bg-red-600 text-white border border-white/10 hover:border-transparent py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 group-hover:shadow-lg hover:shadow-red-900/30 transition-all duration-300 tracking-wide text-sm"
              >
                <span>View Plans & Classes</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer info under bento block */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center border-t border-white/5 pt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 text-sm"
        >
          <span className="flex items-center gap-2 bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-300">
            <Award className="w-4 h-4 text-red-500" /> Government Accredited & Approved Curriculum
          </span>
          <span>•</span>
          <p>Need custom timing? <Link to="/contact" className="text-red-500 hover:underline font-bold">Contact Our Support</Link> to design a personalized timeline.</p>
        </motion.div>
      </div>
    </section>
  );
}
