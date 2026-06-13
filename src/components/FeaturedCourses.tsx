import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoredCourse {
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

const DEFAULT_FEATURED = [
  {
    id: "course-1",
    courseTitle: "10 Days Course Package",
    courseDescription: "Learn driving with automatic or manual Honda Civic.",
    courseFee: "25000",
    carImage: "https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600",
    instructorName: "Mr Shahzad",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "course-2",
    courseTitle: "20 Days Course Package",
    courseDescription: "Learn driving with automatic or manual Honda Civic.",
    courseFee: "25000",
    carImage: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
    instructorName: "Ms Alina",
    instructorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "course-3",
    courseTitle: "1 Month Complete Package",
    courseDescription: "Expert lessons for riding heavy motorcycles safely.",
    courseFee: "50000",
    carImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600",
    instructorName: "Mr Ahmed",
    instructorImage: "https://images.unsplash.com/photo-1560250097-0b93528c31e3?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

const INSTRUCTORS = [
  { name: "Mr Shahzad", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Ms Alina", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Mr Ahmed", img: "https://images.unsplash.com/photo-1560250097-0b93528c31e3?auto=format&fit=crop&q=80&w=200&h=200" }
];

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const loadCourses = () => {
      const saved = localStorage.getItem('driving_courses_v2');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as StoredCourse[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mapped = parsed.map((c, i) => {
              const inst = INSTRUCTORS[i % INSTRUCTORS.length];
              return {
                id: c.id,
                title: c.courseTitle,
                desc: c.courseDescription,
                price: c.courseFee,
                image: c.carImage || "https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600",
                instructorName: inst.name,
                instructorImage: inst.img
              };
            });
            setCourses(mapped);
            return;
          }
        } catch (e) {}
      }
      setCourses(DEFAULT_FEATURED.map(c => ({
        id: c.id,
        title: c.courseTitle,
        desc: c.courseDescription,
        price: c.courseFee,
        image: c.carImage,
        instructorName: c.instructorName,
        instructorImage: c.instructorImage
      })));
    };

    loadCourses();
    window.addEventListener('storage', loadCourses);
    window.addEventListener('driving_courses_updated', loadCourses);

    return () => {
      window.removeEventListener('storage', loadCourses);
      window.removeEventListener('driving_courses_updated', loadCourses);
    };
  }, []);

  const nextSlide = () => {
    if (courses.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
  };

  const prevSlide = () => {
    if (courses.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + courses.length) % courses.length);
  };

  const currentCourse = courses[currentIndex] || null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section className="py-20 bg-white text-gray-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-black text-center mb-4 text-gray-950">
          Our Featured Courses
        </h2>
        <p className="text-gray-500 text-center max-w-lg mx-auto mb-16 text-sm sm:text-base">
          Explore our expert-led programs designed to turn you into a safe, licensed, and highly confident driver.
        </p>

        {/* Desktop grid layout (Showing all cards side-by-side) */}
        {courses.length > 0 ? (
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course, i) => (
              <motion.div 
                key={course.id || i}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-red-500/50 transition-all shadow-xl flex flex-col h-full"
              >
                <img src={course.image} alt={course.title} className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <img 
                        src={course.instructorImage}
                        alt={course.instructorName} 
                        className="w-12 h-12 rounded-full object-cover border border-gray-200" 
                      />
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Instructor</p>
                        <p className="font-bold text-gray-950">{course.instructorName}</p>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-950 font-display leading-tight">{course.title}</h3>
                    <p className="text-gray-600 mb-8 text-sm leading-relaxed">{course.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <Link to="/pricing" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition">
                      VIEW COURSE <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="text-2xl font-black text-red-650 font-mono">{course.price} <span className="text-xs text-gray-500 font-sans tracking-normal font-medium">PKR</span></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 font-medium font-sans">
            Loading course templates...
          </div>
        )}

        {/* Mobile & Tablet Slider view (Carousel with controls) */}
        {currentCourse && (
          <div className="block md:hidden max-w-xl mx-auto">
            {/* Carousel Active Content Box */}
            <div className="relative min-h-[520px] w-full flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl flex flex-col h-full w-full"
                >
                  <div className="relative">
                    <img 
                      src={currentCourse.image} 
                      alt={currentCourse.title} 
                      className="w-full h-56 object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                      {currentIndex + 1} / {courses.length}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={currentCourse.instructorImage}
                          alt={currentCourse.instructorName} 
                          className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                        />
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block font-sans">Lead Instructor</span>
                          <p className="font-bold text-gray-950 text-xs">{currentCourse.instructorName}</p>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold font-display text-gray-950 mb-3 tracking-tight">
                        {currentCourse.title}
                      </h3>
                      
                      <p className="text-gray-650 text-xs leading-relaxed mb-6">
                        {currentCourse.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                      <Link 
                        to="/pricing" 
                        className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-full font-bold text-[10.5px] uppercase tracking-wider transition-colors"
                      >
                        VIEW COURSE <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-right font-bold text-gray-400">Total Price</span>
                        <p className="text-xl font-black text-red-600 font-mono">{currentCourse.price} <span className="text-[10px] text-gray-500 font-sans tracking-normal font-medium">PKR</span></p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel controls bar for mobile & tablet */}
            <div className="flex justify-center items-center gap-5 mt-6">
              <button
                onClick={prevSlide}
                className="flex items-center justify-center bg-white hover:bg-red-650 hover:text-white text-gray-800 w-10 h-10 rounded-full shadow-md border border-gray-200 transition-all cursor-pointer active:scale-95"
                aria-label="Previous Course"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex justify-center items-center gap-2">
                {courses.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex 
                        ? 'w-7 bg-red-600' 
                        : 'w-2 bg-gray-350 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex items-center justify-center bg-white hover:bg-red-650 hover:text-white text-gray-800 w-10 h-10 rounded-full shadow-md border border-gray-200 transition-all cursor-pointer active:scale-95"
                aria-label="Next Course"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
