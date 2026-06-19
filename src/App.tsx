/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './HomePage';
import BlogPage from './pages/BlogPage';
import AdminPage from './pages/AdminPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import ServicesPage from './pages/ServicesPage';
import Programs from './pages/ServicesPage'; // alias if referenced
import RentalsPage from './pages/RentalsPage';
import CarSalePage from './pages/CarSalePage';
import QuizPage from './pages/QuizPage';
import BackToTopButton from './components/BackToTopButton';
import { ToastProvider } from './components/Toast';

export default function App() {
  useEffect(() => {
    // 1. Create the Audio object for preloading the engine start audio file
    const engineAudio = new Audio("https://assets.mixkit.co/active_storage/sfx/2653/2653-84.wav");
    engineAudio.preload = "auto";
    engineAudio.volume = 0.55; // perfect balance

    let hasPlayed = false;

    const playEngineSound = () => {
      if (hasPlayed) return;
      
      const playPromise = engineAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasPlayed = true;
            // Clean up event listeners once played successfully
            removeEventListeners();
          })
          .catch((error) => {
            console.log("Audio play deferred or blocked by browser policies. Waiting for user interaction...", error);
          });
      }
    };

    const handleUserInteraction = () => {
      playEngineSound();
    };

    const removeEventListeners = () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    // Attempt autoplay immediately (some browsers/configurations allow it, e.g. hybrid app shells or custom settings)
    playEngineSound();

    // Attach listeners for standard user interactions (forces play as soon as browser allows it)
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      removeEventListeners();
    };
  }, []);

  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/programs" element={<ServicesPage />} />
            <Route path="/rentals" element={<RentalsPage />} />
            <Route path="/car-sale" element={<CarSalePage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        <WhatsAppButton />
        <BackToTopButton />
      </BrowserRouter>
    </ToastProvider>
  );
}
