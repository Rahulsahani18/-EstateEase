import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, LayoutGrid, List, X, ChevronDown, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchFilters } from '../store/slices/propertySlice';

export default function ListingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: properties, searchFilters } = useSelector((state) => state.properties);
  const [viewMode, setViewMode] = useState('grid');

  const filteredProperties = properties.filter(property => {
    const matchesType = searchFilters.type === 'Property Type' || property.type === searchFilters.type;
    const matchesStatus = searchFilters.status === 'All' || property.status === searchFilters.status;
    const matchesRegion = searchFilters.region === 'Region' || 
                         property.location.toLowerCase().includes(searchFilters.region.toLowerCase()) ||
                         property.area?.toLowerCase().includes(searchFilters.region.toLowerCase());
    
    // Price filter
    const matchesMinPrice = !searchFilters.minPrice || property.price >= parseInt(searchFilters.minPrice);
    const matchesMaxPrice = !searchFilters.maxPrice || property.price <= parseInt(searchFilters.maxPrice);
    
    let matchesPriceOption = true;
    if (searchFilters.price !== 'Price') {
      const price = property.price;
      if (searchFilters.price === '$500k - $1M') matchesPriceOption = price >= 500000 && price <= 1000000;
      else if (searchFilters.price === '$1M - $5M') matchesPriceOption = price > 1000000 && price <= 5000000;
      else if (searchFilters.price === '$5M+') matchesPriceOption = price > 5000000;
      else if (searchFilters.price === '< $50,000') matchesPriceOption = price < 50000;
    }

    // New filters
    const matchesBeds = searchFilters.beds === 'Bedrooms' || property.beds >= parseInt(searchFilters.beds);
    const matchesBaths = searchFilters.baths === 'Bathrooms' || property.baths >= parseInt(searchFilters.baths);
    const matchesSize = !searchFilters.minSize || property.sqft >= parseInt(searchFilters.minSize);
    const matchesQuery = !searchFilters.query || 
                        property.title.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
                        property.location.toLowerCase().includes(searchFilters.query.toLowerCase());

    return matchesType && matchesStatus && matchesRegion && matchesPriceOption && matchesMinPrice && matchesMaxPrice && matchesBeds && matchesBaths && matchesSize && matchesQuery;
  });

  const removeFilter = (key) => {
    const defaults = { 
      type: 'Property Type', 
      region: 'Region', 
      price: 'Price', 
      status: 'All', 
      beds: 'Bedrooms', 
      baths: 'Bathrooms',
      minSize: '',
      query: '',
      minPrice: '',
      maxPrice: '',
    };
    dispatch(setSearchFilters({ [key]: defaults[key] }));
  };

  const clearAll = () => {
    dispatch(setSearchFilters({
      type: 'Property Type',
      region: 'Region',
      price: 'Price',
      beds: 'Bedrooms',
      baths: 'Bathrooms',
      minSize: '',
      status: 'All',
      query: '',
      minPrice: '',
      maxPrice: '',
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50/30 pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <span className="hover:text-blue-600 transition-colors cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="hover:text-blue-600 transition-colors cursor-pointer" onClick={() => navigate('/search')}>Search Results</span>
          {searchFilters.type !== 'Property Type' && (
            <>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="text-slate-900">{searchFilters.type}s</span>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar FILTERS - Matching Screenshot */}
          <aside className="w-full lg:w-80 space-y-6 shrink-0">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              {/* Offer Type */}
              <div className="space-y-6 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center justify-between">
                  Offer Type
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]" />
                </h3>
                <div className="space-y-4">
                  {['For Sale', 'For Rent'].map((status) => (
                    <label key={status} className="flex items-center gap-4 cursor-pointer group" onClick={() => dispatch(setSearchFilters({ status: searchFilters.status === status ? 'All' : status }))}>
                      <div className={`w-6 h-6 border rounded-lg flex items-center justify-center transition-all ${searchFilters.status === status ? 'border-[#1A73E8] bg-[#1A73E8]' : 'border-gray-200 group-hover:border-[#1A73E8]'}`}>
                        {searchFilters.status === status && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className={`text-base transition-colors ${searchFilters.status === status ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium group-hover:text-slate-900'}`}>{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-6 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center justify-between">
                  Property Type
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F9AB00]" />
                </h3>
                <div className="space-y-4">
                  {['Apartment', 'House', 'Land', 'Office'].map((type) => (
                    <label key={type} className="flex items-center gap-4 cursor-pointer group" onClick={() => dispatch(setSearchFilters({ type: searchFilters.type === type ? 'Property Type' : type }))}>
                      <div className={`w-6 h-6 border rounded-lg flex items-center justify-center transition-all ${searchFilters.type === type ? 'border-[#1A73E8] bg-[#1A73E8]' : 'border-gray-200 group-hover:border-[#1A73E8]'}`}>
                        {searchFilters.type === type && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className={`text-base transition-colors ${searchFilters.type === type ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium group-hover:text-slate-900'}`}>{type}s</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-4 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center justify-between">
                  Bedrooms
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                </h3>
                <div className="relative group/select">
                  <select 
                    value={searchFilters.beds}
                    onChange={(e) => dispatch(setSearchFilters({ beds: e.target.value }))}
                    className="w-full appearance-none bg-[#F7F9FC] px-6 py-4 border-none rounded-2xl text-base text-slate-600 font-medium tracking-tight cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1E90FF]/30"
                  >
                    <option>Bedrooms</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ Bedrooms</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Bathrooms */}
              <div className="space-y-4 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center justify-between">
                  Bathrooms
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A142F4]" />
                </h3>
                <div className="relative group/select">
                  <select 
                    value={searchFilters.baths}
                    onChange={(e) => dispatch(setSearchFilters({ baths: e.target.value }))}
                    className="w-full appearance-none bg-[#F7F9FC] px-6 py-4 border-none rounded-2xl text-base text-slate-600 font-medium tracking-tight cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1E90FF]/30"
                  >
                    <option>Bathrooms</option>
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n}+ Bathrooms</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Property Size */}
              <div className="space-y-4 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center justify-between">
                  Location
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                </h3>
                <div className="relative group/select">
                  <select 
                    value={searchFilters.region}
                    onChange={(e) => dispatch(setSearchFilters({ region: e.target.value }))}
                    className="w-full appearance-none bg-[#F7F9FC] px-6 py-4 border-none rounded-2xl text-base text-slate-600 font-medium tracking-tight cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1E90FF]/30"
                  >
                    <option value="Region">All Regions</option>
                    {['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <button 
                onClick={clearAll}
                className="w-full mt-6 py-4 rounded-2xl border border-gray-100 text-xs font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content RESULTS */}
          <main className="flex-1 min-w-0">
            {/* Header Controls */}
            <div className="flex flex-col mb-8 p-1">
              <div className="flex flex-col md:flex-row items-baseline gap-4 mb-2">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{filteredProperties.length} Results</h1>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{searchFilters.type === 'Property Type' ? 'All Properties' : searchFilters.type + 's'}</span>
              </div>
              <p className="text-gray-500 text-sm mb-8 font-medium">Find properties that meet your specific architectural criteria.</p>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 pb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <AnimatePresence mode="popLayout">
                    {searchFilters.type !== 'Property Type' && (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest">
                        {searchFilters.type}S
                        <button onClick={() => removeFilter('type')} className="hover:rotate-90 transition-transform"><X size={14} /></button>
                      </motion.div>
                    )}
                    {searchFilters.price !== 'Price' && (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest">
                        {searchFilters.price}
                        <button onClick={() => removeFilter('price')} className="hover:rotate-90 transition-transform"><X size={14} /></button>
                      </motion.div>
                    )}
                    {searchFilters.region !== 'Region' && (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest">
                        {searchFilters.region.toUpperCase()}
                        <button onClick={() => removeFilter('region')} className="hover:rotate-90 transition-transform"><X size={14} /></button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button onClick={clearAll} className="text-gray-500 text-xs font-bold hover:text-blue-600 px-2">Clear all</button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-900">Sort by:</span>
                    <div className="flex items-center gap-6 bg-white border border-gray-200 px-4 py-2.5 rounded-sm min-w-[200px] justify-between cursor-pointer group">
                      <span className="text-sm font-medium text-slate-600">Most Relevant</span>
                      <ChevronDown size={14} className="text-gray-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex bg-white border border-gray-200 rounded-sm overflow-hidden">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-3 transition-all ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-slate-900'}`}>
                      <LayoutGrid size={20} />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-3 transition-all ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-slate-900'}`}>
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredProperties.length > 0 ? (
              <div className={`grid gap-10 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onClick={() => navigate(`/property/${property.id}`)} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No matching properties</h3>
                <p className="text-gray-500 mb-8">Try adjusting your filters or clearing them to see more results.</p>
                <button onClick={clearAll} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">Clear All Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
