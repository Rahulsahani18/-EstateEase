import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    title: 'Exceptional Service',
    text: 'From our first meeting to closing day, the entire process was seamless. Our agent understood exactly what we needed and found us the perfect home within weeks.',
    name: 'Sarah Mitchell',
    role: 'Homeowner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 2,
    title: 'Highly Recommended',
    text: 'We were first-time buyers feeling overwhelmed by the market. Our agent\'s patience and expertise made everything stress-free. We couldn\'t be happier with our new place.',
    name: 'Michael Johnson',
    role: 'First-Time Buyer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold text-slate-900 tracking-tight mb-8">Read Testimonials from Our Satisfied Clients</h2>
            <p className="text-xl text-gray-500 mb-12">
              Discover why our clients love working with us. Read their stories and experiences to understand the value and dedication we bring to every real estate journey.
            </p>
            <div className="flex items-center gap-4">
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                <ChevronLeft size={24} className="text-gray-400" />
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                <ChevronRight size={24} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <motion.div 
                key={review.id}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#fbbf24" className="text-amber-400" />)}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{review.title}</h3>
                  <p className="text-gray-500 leading-relaxed italic">"{review.text}"</p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={review.image} className="w-14 h-14 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-slate-900">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.role}</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-full">
                    <Quote className="text-blue-600" size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
