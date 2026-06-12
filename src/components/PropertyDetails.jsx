// src/components/PropertyDetails.jsx
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Share2, Heart, BedDouble, Bath, Square, Calendar, User, MessageSquare, Phone, Building2, RefreshCcw, X, ZoomIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import { setEnquiryModalOpen, setSelectedProperty } from '../Redux/uiSlice';
import { useModal } from '../context/ModalContext';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Fix: Use 'data' from properties slice
  const properties = useSelector((state) => state.properties.data);
  const property = properties?.find(p => p.id === id);

  const [selectedImg, setSelectedImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Function to handle "See on the Map" click
  const handleSeeOnMap = () => {
    if (!property) return;
    
    // Get the map location string
    const mapLocation = property.map  || '';
    
    // Create Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocation)}`;
    
    // Open in new tab
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  // useEffect(() => {
  //   if (property) {
  //     dispatch(setSelectedProperty(property));
  //   }
  //   window.scrollTo(0, 0);
  // }, [property, dispatch]);

  if (!property) return (
    <div className="pt-32 pb-20 text-center">
      <h2 className="text-2xl font-bold">Property not found</h2>
      <button onClick={() => navigate('/search')} className="mt-4 text-blue-600 hover:underline cursor-pointer">Back to listings</button>
    </div>
  );

 const { openEnquiryModal } = useModal();

  const openEnquiryModalHandler = (e, property) => {
    e.stopPropagation();
    openEnquiryModal(property);
  };

  // Build images array from API data
  const images = [
    property.hero_image ? `https://properties.omsoftsolution.net.in/public/${property.hero_image}` : '',
    ...(property.images?.map(img => `https://properties.omsoftsolution.net.in/public/${img.image_path}`) || [])
  ].filter(Boolean);

  const details = [
    { label: 'Offer Type:', value: property.offer_type },
    { label: 'Price:', value: `₹${parseFloat(property.price).toLocaleString()}${property.offer_type === 'For Rent' ? '/mo' : ''}` },
    { label: 'Location:', value: property.location_name },
    { label: 'Bedrooms:', value: property.bedrooms },
    { label: 'Property Size:', value: `${property.property_size} ft²` },
    { label: 'Vehicle Spaces:', value: property.vehicle_space || 'N/A' },
    { label: 'Update Date:', value: property.updated_at?.split(' ')[0] || 'N/A' },
    { label: 'Property Type:', value: property.category_name },
    { label: 'Map:', value: property.map || property.location_name },
    { label: 'Area:', value: property.area || 'N/A' },
    { label: 'Bathrooms:', value: property.bathrooms },
    { label: 'Year Built:', value: property.year_built || 'N/A' },
    { label: 'Listing ID:', value: property.listing_id || property.id },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white pt-24 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap no-scrollbar pb-2">
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/search')}>Search Results</span>
          <span>/</span>
          <span>{property.offer_type}</span>
          <span>/</span>
          <span>{property.category_name}s</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">{property.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium mb-4 group cursor-pointer"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to listings
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{property.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-500">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin size={20} className="text-blue-600" />
                <span>{property.map || property.location_name}</span>
                <button 
                  onClick={handleSeeOnMap}
                  className="text-blue-600 hover:underline ml-2 text-sm cursor-pointer transition-colors"
                >
                  See on the Map
                </button>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-4xl md:text-5xl font-black text-slate-900 mb-10">
              ₹{parseFloat(property.price).toLocaleString()}
              {property.offer_type === 'For Rent' && <span className="text-lg font-medium text-gray-400">/mo</span>}
            </div>
            {/* <div className="flex gap-3 mt-6 justify-end">
              <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"><Share2 size={24} /></button>
              <button className="p-3 border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-100 transition-colors group">
                <Heart size={24} className="group-hover:text-red-500 transition-colors" />
              </button>
            </div> */}
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px] mb-16">
          <div 
            className="md:col-span-2 h-full overflow-hidden rounded-3xl relative group cursor-zoom-in" 
            onClick={() => setIsZoomed(true)}
          >
            <img src={images[selectedImg]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={property.title} />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur px-6 py-3 rounded-full font-bold flex items-center gap-2 text-slate-900 shadow-xl">
                <ZoomIn size={20} />
                Click to Zoom
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 h-full gap-4 md:col-span-1">
            {images.slice(1, 3).map((img, i) => (
              <div 
                key={i} 
                className={`h-full overflow-hidden rounded-3xl cursor-pointer transition-all border-4 ${selectedImg === i + 1 ? 'border-blue-500 scale-95' : 'border-transparent hover:opacity-90'}`} 
                onClick={() => setSelectedImg(i + 1)}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
          <div className="hidden md:block col-span-1 relative rounded-3xl overflow-hidden cursor-pointer group" onClick={() => setSelectedImg(0)}>
            <img src={images[0]} className="w-full h-full object-cover blur-[1px] brightness-[0.7] group-hover:scale-110 transition-transform duration-700" alt="" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur px-6 py-3 rounded-2xl font-bold flex items-center gap-2 text-slate-900 shadow-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Calendar size={20} />
                {images.length} Photos
              </div>
            </div>
          </div>
        </div>

        {/* Detail Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Stats Bar */}
            <div className="bg-white rounded-3xl p-8 grid grid-cols-2 md:grid-cols-3 gap-12 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <RefreshCcw size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{property.offer_type}</div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Offer Type</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Building2 size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{property.category_name}s</div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Property Type</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Calendar size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{property.year_built || 'N/A'}</div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Year Build</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <BedDouble size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{property.bedrooms}</div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Bedrooms</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Bath size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{property.bathrooms}</div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Bathrooms</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Square size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{property.property_size} ft²</div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Property Size</div>
                </div>
              </div>
            </div>

            {/* Detailed Table Section */}
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm space-y-10">
              <h2 className="text-3xl font-bold text-slate-900">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">
                {details.map((detail, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-50 group hover:bg-gray-50/50 px-2 transition-colors">
                    <span className="text-lg font-bold text-slate-900">{detail.label}</span>
                    <span className="text-gray-600 font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm space-y-8">
              <h2 className="text-3xl font-bold text-slate-900">Description</h2>
              <p className="text-xl text-gray-500 leading-relaxed font-light">
                {property.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 sticky top-24">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Agent</h3>
              <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-3xl">
                <img 
                  src={property.contact_persion_image ? `https://properties.omsoftsolution.net.in/public/${property.contact_persion_image}` : 'https://via.placeholder.com/56'} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white" 
                  alt="" 
                />
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Exclusive Agent</div>
                  <div className="text-lg font-bold text-slate-900">{property.contact_persion_name}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={(e) => openEnquiryModalHandler(e, property)}
                  className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-100 transition-all active:scale-95"
                >
                  Send Enquiry
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.location.href = `tel:${property.contact_persion_phone}`}
                    className="flex-1 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone size={18} />
                    Call
                  </button>
                  <button 
                    onClick={() => window.open(`https://wa.me/${property.contact_persion_phone}`, '_blank')}
                    className="flex-1 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={18} />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setIsZoomed(false)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-8 right-8 text-white hover:text-blue-400 transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <X size={40} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25 }}
              src={images[selectedImg]}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              alt={property.title}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}