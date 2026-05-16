import { motion } from 'motion/react';
import { BedDouble, Bath, MapPin, Square, Eye, RefreshCw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setEnquiryModalOpen, setSelectedProperty } from '../store/slices/propertySlice';

export default function PropertyCard({ property, onClick }) {
  const dispatch = useDispatch();

  const openEnquiryModal = (p) => {
    dispatch(setSelectedProperty(p));
    dispatch(setEnquiryModalOpen(true));
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden shrink-0">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute top-4 left-4 ${property.status === 'For Sale' ? 'bg-emerald-500' : 'bg-orange-500'} text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg`}>
          {property.status}
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <button 
            onClick={(e) => { e.stopPropagation(); openEnquiryModal(property); }}
            className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-gray-400 mb-6">
          <MapPin size={16} className="text-gray-400" />
          <span className="text-sm font-medium">{property.location}</span>
        </div>

        <div className="mb-6">
          <div className="text-2xl font-bold text-slate-900">
            ${property.price.toLocaleString()}
            {property.status === 'For Rent' && <span className="text-base font-medium text-gray-400 ml-1">/month</span>}
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <BedDouble size={20} className="text-gray-300" />
            <span className="text-sm font-bold text-slate-600">{property.beds}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={20} className="text-gray-300" />
            <span className="text-sm font-bold text-slate-600">{property.baths}</span>
          </div>
          <div className="flex items-center gap-2">
            <Square size={20} className="text-gray-300" />
            <span className="text-sm font-bold text-slate-600">{property.sqft.toLocaleString()} ft²</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={property.agent.image} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              alt={property.agent.name}
            />
            <span className="text-sm font-bold text-slate-700">{property.agent.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
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
