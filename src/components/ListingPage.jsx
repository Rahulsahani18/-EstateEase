import { motion, AnimatePresence } from 'motion/react';
import { Search, LayoutGrid, List, X, ChevronDown, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ListingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search filters from navigation state
  const searchFiltersFromHero = location.state?.searchFilters || {};
  
  // Get data from Redux store
  const properties = useSelector((state) => state.properties.data);
  const locations = useSelector((state) => state.locations.data);
  const propertyTypes = useSelector((state) => state.propertyTypes.data);
  
  // Initialize filters with values from Hero search
  const [filters, setFilters] = useState({
    status: searchFiltersFromHero.status || 'All',
    region: searchFiltersFromHero.region || 'Location',
    type: searchFiltersFromHero.type || 'Property Type',
    minPrice: searchFiltersFromHero.minPrice || '',
    maxPrice: searchFiltersFromHero.maxPrice || '',
    beds: 'Bedrooms',
    baths: 'Bathrooms',
    minSize: '',
    query: '',
  });
  
  const [viewMode, setViewMode] = useState('grid');

  // Apply filters to properties
  const filteredProperties = Array.isArray(properties) ? properties.filter(property => {
    // Status filter
    const matchesStatus = filters.status === 'All' || property.offer_type === filters.status;
    
    // Property type filter
    const matchesType = filters.type === 'Property Type' || property.category_name === filters.type;
    
    // Location filter
    const matchesRegion = filters.region === 'Location' || 
                         property.location_name?.toLowerCase().includes(filters.region.toLowerCase()) ||
                         property.area?.toLowerCase().includes(filters.region.toLowerCase());
    
    // Price range filter
    const propertyPrice = parseFloat(property.price);
    const matchesMinPrice = !filters.minPrice || propertyPrice >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || propertyPrice <= parseFloat(filters.maxPrice);
    
    // Bedrooms filter
    const matchesBeds = filters.beds === 'Bedrooms' || parseInt(property.bedrooms) >= parseInt(filters.beds);
    
    // Bathrooms filter
    const matchesBaths = filters.baths === 'Bathrooms' || parseInt(property.bathrooms) >= parseInt(filters.baths);
    
    // Size filter
    const propertySize = parseInt(property.property_size.replace(/,/g, ''));
    const matchesSize = !filters.minSize || propertySize >= parseInt(filters.minSize);
    
    // Search query filter
    const matchesQuery = !filters.query || 
                        property.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                        property.location_name?.toLowerCase().includes(filters.query.toLowerCase());

    return matchesStatus && matchesType && matchesRegion && matchesMinPrice && 
           matchesMaxPrice && matchesBeds && matchesBaths && matchesSize && matchesQuery;
  }) : [];

  // Get unique locations for filter dropdown
  const uniqueLocations = [...new Set(locations.map(loc => loc.title))];
  
  // Get ALL property types from API (no filtering)
  const allPropertyTypes = Array.isArray(propertyTypes) ? propertyTypes : [];

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const removeFilter = (key) => {
    const defaults = { 
      type: 'Property Type', 
      region: 'Location', 
      status: 'All', 
      beds: 'Bedrooms', 
      baths: 'Bathrooms',
      minSize: '',
      query: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(prev => ({ ...prev, [key]: defaults[key] }));
  };

  const clearAll = () => {
    setFilters({
      status: 'All',
      region: 'Location',
      type: 'Property Type',
      minPrice: '',
      maxPrice: '',
      beds: 'Bedrooms',
      baths: 'Bathrooms',
      minSize: '',
      query: '',
    });
  };

  // Debug: Log applied filters and property types
  useEffect(() => {
    console.log('All Property Types from API:', allPropertyTypes);
    console.log('Applied Filters:', filters);
    console.log('Filtered Properties Count:', filteredProperties.length);
  }, [filters, filteredProperties, allPropertyTypes]);

  return (
    <div className="min-h-screen bg-gray-50/30 pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <span className="hover:text-blue-600 transition-colors cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-slate-900">Search Results</span>
          {filters.type !== 'Property Type' && (
            <>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="text-slate-900">{filters.type}s</span>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar FILTERS */}
          <aside className="w-full lg:w-80 space-y-6 shrink-0">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              {/* Offer Type */}
              <div className="space-y-6 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Offer Type</h3>
                <div className="space-y-4">
                  {['For Sale', 'For Rent'].map((status) => (
                    <label key={status} className="flex items-center gap-4 cursor-pointer group" onClick={() => updateFilter('status', filters.status === status ? 'All' : status)}>
                      <div className={`w-6 h-6 border rounded-lg flex items-center justify-center transition-all ${filters.status === status ? 'border-blue-600 bg-blue-600' : 'border-gray-200'}`}>
                        {filters.status === status && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className={`text-base ${filters.status === status ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location - Moved ABOVE Property Type */}
              <div className="space-y-4 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Location</h3>
                <div className="relative">
                  <select 
                    value={filters.region}
                    onChange={(e) => updateFilter('region', e.target.value)}
                    className="w-full appearance-none bg-gray-50 px-4 py-3 rounded-xl text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
                  >
                    <option value="Location">All Locations</option>
                    {uniqueLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Property Type - Now a dropdown like location */}
              <div className="space-y-4 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Property Type</h3>
                <div className="relative">
                  <select 
                    value={filters.type}
                    onChange={(e) => updateFilter('type', e.target.value)}
                    className="w-full appearance-none bg-gray-50 px-4 py-3 rounded-xl text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
                  >
                    <option value="Property Type">All Property Types</option>
                    {allPropertyTypes.map((type) => (
                      <option key={type.id} value={type.title}>{type.title}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-4 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Bedrooms</h3>
                <div className="relative">
                  <select 
                    value={filters.beds}
                    onChange={(e) => updateFilter('beds', e.target.value)}
                    className="w-full appearance-none bg-gray-50 px-4 py-3 rounded-xl text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
                  >
                    <option>Bedrooms</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ Bedrooms</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Bathrooms */}
              <div className="space-y-4 mb-10">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Bathrooms</h3>
                <div className="relative">
                  <select 
                    value={filters.baths}
                    onChange={(e) => updateFilter('baths', e.target.value)}
                    className="w-full appearance-none bg-gray-50 px-4 py-3 rounded-xl text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
                  >
                    <option>Bathrooms</option>
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n}+ Bathrooms</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <button 
                onClick={clearAll}
                className="w-full mt-6 py-4 rounded-2xl border border-gray-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-col mb-8">
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{filteredProperties.length} Results</h1>
              <p className="text-gray-500 text-sm mt-2">Properties that match your criteria</p>

              {/* Active Filters */}
              <div className="flex flex-wrap items-center gap-3 mt-6 border-b border-gray-200 pb-6">
                <AnimatePresence mode="popLayout">
                  {filters.type !== 'Property Type' && (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
                      {filters.type}
                      <button onClick={() => removeFilter('type')} className="hover:rotate-90 transition-transform cursor-pointer"><X size={14} /></button>
                    </motion.div>
                  )}
                  {filters.region !== 'Location' && (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
                      {filters.region}
                      <button onClick={() => removeFilter('region')} className="hover:rotate-90 transition-transform cursor-pointer"><X size={14} /></button>
                    </motion.div>
                  )}
                  {filters.status !== 'All' && (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
                      {filters.status}
                      <button onClick={() => removeFilter('status')} className="hover:rotate-90 transition-transform cursor-pointer"><X size={14} /></button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {(filters.type !== 'Property Type' || filters.region !== 'Location' || filters.status !== 'All') && (
                  <button onClick={clearAll} className="text-gray-500 text-xs cursor-pointer hover:text-blue-600 ">Clear all</button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex justify-end mt-4">
                <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode('grid')} className={`p-2 px-4 cursor-pointer ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}>
                    <LayoutGrid size={18} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 px-4 cursor-pointer ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}>
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2' : 'grid-cols-1'}`}>
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
                <Search size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                <button onClick={clearAll} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}