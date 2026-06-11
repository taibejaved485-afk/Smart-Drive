
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
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />
      <Hero />
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
      <Footer />
    </div>
  );
}
