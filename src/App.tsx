/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for dynamic code-splitting and improved Google PageSpeed performance
const HomePage = lazy(() => import('./HomePage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));

// Clean modern skeleton placeholder for page transitioning
function PageLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-sans text-sm tracking-wide">Loading Smart Drive...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
