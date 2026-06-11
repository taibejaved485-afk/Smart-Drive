
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
import SEO from './components/SEO';

export default function HomePage() {
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
          "https://www.facebook.com/SmartDriveFSD",
          "https://www.instagram.com/SmartDriveFSD",
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
    <div className="font-sans text-gray-900">
      <SEO 
        title="Male & Female Driving School in Faisalabad | Smart Drive"
        description="Faisalabad's top driving academy. Learn manual & automatic driving with certified male & female instructors. Safety-focused training for all licenses."
        keywords="driving school Faisalabad, female driving instructor, learn driving car, automatic driving class, manual driving lessons, professional driving academy Pakistan, road test preparation"
        schema={homeSchema}
      />
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

