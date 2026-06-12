import { motion } from 'motion/react';
import { BedDouble, Bath, MapPin, Square, Eye, RefreshCw } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function PropertyCard({ property, onClick }) {
  const { openEnquiryModal } = useModal();

  const openEnquiryModalHandler = (e, property) => {
    e.stopPropagation();
    openEnquiryModal(property);
  };

  // Build image URL with /public/ path
  const imageUrl = property.hero_image 
    ? `https://properties.omsoftsolution.net.in/public/${property.hero_image}`
    : 'https://via.placeholder.com/400x300?text=No+Image';

  // Format price
  const formattedPrice = parseFloat(property.price).toLocaleString();
  
  // Format property size (remove commas if present)
  const propertySize = property.property_size ? property.property_size.replace(/,/g, '') : '0';
  
  // Get agent image URL
  const agentImageUrl = property.contact_persion_image
    ? `https://properties.omsoftsolution.net.in/public/${property.contact_persion_image}`
    : 'https://via.placeholder.com/40x40?text=Agent';

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group cursor-pointer flex flex-col h-full w-full"
      onClick={onClick}
    >
      {/* Fixed height image container */}
      <div className="relative h-64 w-full overflow-hidden shrink-0 bg-gray-100">
        <img 
          src={imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            e.target.onerror = null;
          }}
        />
        <div className={`absolute top-4 left-4 ${property.offer_type === 'For Sale' ? 'bg-emerald-500' : 'bg-orange-500'} text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg z-10`}>
          {property.offer_type}
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
          <button 
            onClick={(e) => openEnquiryModalHandler(e, property)}
            className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* Fixed height content area with consistent spacing */}
      <div className="p-6 flex flex-col flex-1 min-h-[320px]">
        {/* Title - Fixed height with line clamping */}
        <div className="min-h-[56px]">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {property.title}
          </h3>
        </div>
        
        {/* Location - Fixed height */}
        <div className="min-h-[40px] mb-2">
          <div className="flex items-center gap-1.5 text-gray-400">
            <MapPin size={16} className="text-gray-400 shrink-0" />
            <span className="text-sm font-medium truncate">{property.location_name || property.area || 'Location not specified'}</span>
          </div>
        </div>

        {/* Price - Fixed height */}
        <div className="min-h-[48px] mb-2">
          <div className="text-2xl font-bold text-slate-900">
            ₹{formattedPrice}
            {property.offer_type === 'For Rent' && <span className="text-base font-medium text-gray-400 ml-1">/month</span>}
          </div>
        </div>

        {/* Features - Fixed height */}
        <div className="min-h-[40px] mb-4">
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <BedDouble size={20} className="text-gray-300 shrink-0" />
              <span className="text-sm font-bold text-slate-600">{property.bedrooms || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={20} className="text-gray-300 shrink-0" />
              <span className="text-sm font-bold text-slate-600">{property.bathrooms || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <Square size={20} className="text-gray-300 shrink-0" />
              <span className="text-sm font-bold text-slate-600">{parseInt(propertySize).toLocaleString()} ft²</span>
            </div>
          </div>
        </div>

        {/* Agent and actions - Always at bottom */}
        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img 
              src={agentImageUrl} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
              alt={property.contact_persion_name || 'Agent'}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/40x40?text=Agent';
                e.target.onerror = null;
              }}
            />
            <span className="text-sm font-bold text-slate-700 truncate">{property.contact_persion_name || 'Contact Agent'}</span>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-2.5 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full transition-colors border border-gray-100 cursor-pointer">
              <Eye size={16} />
            </button>
            <button className="p-2.5 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-full transition-colors border border-gray-100 cursor-pointer">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}