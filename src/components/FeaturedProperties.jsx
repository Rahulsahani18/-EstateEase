import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import PropertyCard from './PropertyCard';

export default function FeaturedProperties({ onPropertyClick }) {
  const [activeTab, setActiveTab] = useState('Apartment');
  const scrollRef = useRef(null);
  const tabs = ['House', 'Apartment', 'Office', 'Land', 'Industrial'];
  const properties = useSelector((state) => state.properties.items);

  const filteredProperties = properties.filter(p => 
    p.featured && (activeTab === 'All' || p.type === activeTab)
  );

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by one card width (approx 25% of container)
      const cardWidth = clientWidth / 4;
      const scrollTo = direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-lg font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab 
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
            <AnimatePresence mode="popLayout transition">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={property.id}
                    className="min-w-full md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1.125rem)] snap-start"
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
