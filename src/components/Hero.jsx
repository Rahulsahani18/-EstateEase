import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Building2, CircleDollarSign, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilters } from '../store/slices/propertySlice';
import HeroImg from '../../public/assets/j1o.jpg';

const propertyTypes = ['Apartment', 'House', 'Office', 'Industrial'];
const regions = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'];

export default function Hero({ onSearch }) {
  const dispatch = useDispatch();
  const searchFilters = useSelector((state) => state.properties.searchFilters);
  const [activeTab, setActiveTab] = useState(searchFilters.status || 'All');

  const handleTabChange = (status) => {
    setActiveTab(status);
    dispatch(setSearchFilters({ status }));
  };

  const handleFilterChange = (updates) => {
    dispatch(setSearchFilters(updates));
  };

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HeroImg} 
          className="w-full h-full object-cover"
          alt="Modern Home Interior"
        />
        {/* Gradient overlay from dark top to transparent bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-20">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Find Your Next Home
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/90 font-medium"
          >
            Where every real estate goal becomes reality.
          </motion.p>
        </div>

        {/* Search Container */}
        <div className="max-w-5xl mx-auto">
          {/* Tabs - Centered */}
          <div className="flex justify-center mb-0">
            <div className="flex gap-1">
              {['All', 'For Sale', 'For Rent'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-12 py-5 rounded-t-xl font-bold text-sm transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-white text-slate-900 translate-y-[1px] relative z-20' 
                      : 'bg-[#F3F4F6]/90 text-slate-500 hover:bg-[#E5E7EB] backdrop-blur-sm'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar - Narrower Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-3 md:p-4 rounded-2xl md:rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center gap-3 relative z-10"
          >
            <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-2">
              <div className="relative w-full md:w-[25%]">
                <select 
                  value={searchFilters.region}
                  onChange={(e) => handleFilterChange({ region: e.target.value })}
                  className="w-full appearance-none bg-white px-5 py-3.5 border border-gray-100 rounded-2xl text-slate-700 font-medium focus:outline-none focus:border-blue-400 transition-all cursor-pointer pr-10"
                >
                  <option>Location</option>
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative w-full md:w-[25%]">
                <select 
                  value={searchFilters.type}
                  onChange={(e) => handleFilterChange({ type: e.target.value })}
                  className="w-full appearance-none bg-white px-5 py-3.5 border border-gray-100 rounded-2xl text-slate-700 font-medium focus:outline-none focus:border-blue-400 transition-all cursor-pointer pr-10"
                >
                  <option>Property Type</option>
                  {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex items-center gap-2 w-full md:w-[45%]">
                <div className="relative flex-1">
                  <input 
                    type="number"
                    placeholder="Min Price"
                    value={searchFilters.minPrice}
                    onChange={(e) => handleFilterChange({ minPrice: e.target.value })}
                    className="w-full bg-white px-5 py-3.5 border border-gray-100 rounded-2xl text-slate-700 font-medium focus:outline-none focus:border-blue-400 transition-all placeholder:text-gray-400"
                  />
                </div>
                
                <span className="text-gray-300 font-bold">-</span>

                <div className="relative flex-1">
                  <input 
                    type="number"
                    placeholder="Max Price"
                    value={searchFilters.maxPrice}
                    onChange={(e) => handleFilterChange({ maxPrice: e.target.value })}
                    className="w-full bg-white px-5 py-3.5 border border-gray-100 rounded-2xl text-slate-700 font-medium focus:outline-none focus:border-blue-400 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={onSearch}
              className="w-full md:w-40 bg-[#2B63E1] hover:bg-[#1E52C9] text-white px-6 py-3.5 rounded-[18px] font-bold text-base transition-all shadow-lg shadow-blue-50 active:scale-95 cursor-pointer"
            >
              Search
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}