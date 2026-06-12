/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO'; // Import SEO component
import { fetchProperties } from './Redux/propertiesSlice';
import { fetchLocations } from './Redux/locationsSlice';
import { fetchPropertyTypes } from './Redux/propertyTypesSlice';

// Home component with SEO
function Home() {
  const navigate = useNavigate();
  
  return (
    <>
      <SEO pageType="home" />
      <main>
        <Hero onSearch={() => navigate('/search')} />
        <FeaturedProperties onPropertyClick={(p) => navigate(`/property/${p.id}`)} />
        <Locations />
        <Testimonials />
      </main>
    </>
  );
}

// About component with SEO
function About() {
  return (
    <>
      <SEO pageType="about" />
      <AboutUs />
    </>
  );
}

// Contact component with SEO
function Contact() {
  return (
    <>
      <SEO pageType="contact" />
      <ContactUs />
    </>
  );
}

// Properties Listing component with SEO
function PropertiesListing() {
  return (
    <>
      <SEO pageType="properties" />
      <ListingPage />
    </>
  );
}

// Property Details component with dynamic SEO
function PropertyDetailsWrapper() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const property = useSelector((state) => 
    state.properties.items?.find(p => p.id === parseInt(id))
  );
  const propertiesStatus = useSelector((state) => state.properties.status);
  
  useEffect(() => {
    if (!property && propertiesStatus === 'succeeded') {
      // Property not found in loaded properties
      console.log('Property not found');
    }
  }, [property, propertiesStatus]);
  
  return (
    <>
      <SEO 
        pageType="property-details"
        customData={{
          title: property ? `${property.title} | EstateEase` : 'Property Details | EstateEase',
          description: property?.description 
            ? property.description.substring(0, 160) 
            : 'View detailed information about this property including price, location, amenities, and more.',
          image: property?.imageUrl || property?.images?.[0] || '/images/default-og-image.jpg',
          keywords: `${property?.title}, real estate, property for sale, ${property?.location}, ${property?.city}`,
          url: `${window.location.origin}/property/${id}`
        }}
      />
      <PropertyDetails />
    </>
  );
}

// Main App Content with Routes
function AppContent() {
  const dispatch = useDispatch();
  
  // Get states for loading indicators
  const properties = useSelector((state) => state.properties);
  const locations = useSelector((state) => state.locations);
  const propertyTypes = useSelector((state) => state.propertyTypes);

  // Separate dispatches for each API
  useEffect(() => {
    dispatch(fetchProperties());
    dispatch(fetchLocations());
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<PropertiesListing />} />
        <Route path="/property/:id" element={<PropertyDetailsWrapper />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <EnquiryModal />
    </div>
  );
}

// Main App component with HelmetProvider
export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}