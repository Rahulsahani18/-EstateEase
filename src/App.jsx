/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import Locations from './components/Locations';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ListingPage from './components/ListingPage';
import PropertyDetails from './components/PropertyDetails';
import EnquiryModal from './components/EnquiryModal';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import { fetchProperties } from './store/slices/propertySlice';

function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <Hero onSearch={() => navigate('/search')} />
      <FeaturedProperties onPropertyClick={(p) => navigate(`/property/${p.id}`)} />
      <Locations />
      <Testimonials />
    </main>
  );
}

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<ListingPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

      <Footer />
      <EnquiryModal />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
