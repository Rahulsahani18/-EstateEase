// src/components/FeaturedProperties.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import PropertyCard from './PropertyCard';

export default function FeaturedProperties({ onPropertyClick }) {
  const [activeTab, setActiveTab] = useState('Apartment');
  const scrollRef = useRef(null);
  const tabs = ['House', 'Apartment', 'Office', 'Land', 'Industrial'];

  // Fix: Use 'data' instead of 'items'
  const properties = useSelector((state) => state.properties.data);
  const propertiesStatus = useSelector((state) => state.properties.status);

  const filteredProperties = Array.isArray(properties)
    ? properties.filter(property =>
      property.category_name?.toLowerCase() === activeTab.toLowerCase()
    )
    : [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = clientWidth / 4;
      const scrollTo = direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (propertiesStatus === 'loading') {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading featured properties...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-lg font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-500 hover:text-blue-600'
                  }`}
              >
                {tab}s
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll('left')}
              className="p-3 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
            <AnimatePresence mode="popLayout">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={property.id}
                    className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] lg:min-w-[360px] xl:min-w-[380px] snap-start"
                  >
                    <PropertyCard
                      property={property}
                      onClick={() => onPropertyClick(property)}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="w-full py-20 text-center text-gray-400 font-medium">
                  No {activeTab.toLowerCase()}s found in featured listings.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}