// src/components/EnquiryModal.jsx
import { X, User, Mail, MessageSquare, Phone, Info } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function EnquiryModal() {
  const { isEnquiryModalOpen, selectedProperty, closeEnquiryModal } = useModal();

  if (!selectedProperty || !isEnquiryModalOpen) return null;

  // Build image URL
  const imageUrl = selectedProperty.hero_image 
    ? `https://properties.omsoftsolution.net.in/public/${selectedProperty.hero_image}`
    : 'https://via.placeholder.com/400x300?text=No+Image';

  const agentImageUrl = selectedProperty.contact_persion_image
    ? `https://properties.omsoftsolution.net.in/public/${selectedProperty.contact_persion_image}`
    : 'https://via.placeholder.com/40x40?text=Agent';

  const formattedPrice = parseFloat(selectedProperty.price).toLocaleString();

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={closeEnquiryModal}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
      />
      
      {/* Modal Container - Centers with padding */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 md:p-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-y-auto max-h-[calc(100vh-2rem)]">
          <div className="flex flex-col md:flex-row">
            {/* Property Mini Preview */}
            <div className="md:w-5/12 bg-slate-50 p-6 border-r border-gray-100">
              <div className="relative h-40 rounded-xl overflow-hidden mb-6">
                <img 
                  src={imageUrl} 
                  className="w-full h-full object-cover" 
                  alt={selectedProperty.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  {selectedProperty.offer_type}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{selectedProperty.title}</h3>
                <div className="text-2xl font-black text-blue-600">
                  ₹{formattedPrice}
                  {selectedProperty.offer_type === 'For Rent' && <span className="text-xs font-medium text-gray-500 ml-1">/mo</span>}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Info size={16} className="text-blue-500" />
                  <span>ID: #{selectedProperty.id?.toString().padStart(4, '0') || '0000'}</span>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <img 
                      src={agentImageUrl} 
                      className="w-10 h-10 rounded-full object-cover" 
                      alt={selectedProperty.contact_persion_name || 'Agent'}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/40x40?text=Agent';
                      }}
                    />
                    <div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Agent</div>
                      <div className="text-sm font-bold text-slate-700">{selectedProperty.contact_persion_name || 'Contact Agent'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="md:w-7/12 p-8 relative">
              <button 
                onClick={closeEnquiryModal}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 cursor-pointer"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Enquiry</h2>
              <p className="text-gray-500 text-sm mb-8">Tell the agent what you're looking for.</p>

              <form className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-xl py-3.5 pl-11 text-sm text-slate-900 outline-none transition-all" 
                      placeholder="Enter your name" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-xl py-3.5 pl-11 text-sm text-slate-900 outline-none transition-all" 
                      placeholder="your@email.com" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-xl py-3.5 pl-11 text-sm text-slate-900 outline-none transition-all" 
                      placeholder="Your phone number" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-gray-400" size={16} />
                    <textarea 
                      rows={3} 
                      className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-xl py-3.5 pl-11 text-sm text-slate-900 outline-none transition-all resize-none" 
                      placeholder="I'm interested in this property. Please contact me with more information." 
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95 cursor-pointer"
                  >
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}