/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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
import AppPreloader from './components/AppPreloader';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <ToastProvider>
      {showPreloader && <AppPreloader onComplete={() => setShowPreloader(false)} />}
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
