import { motion } from 'motion/react';
import { Shield, Award, Handshake, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AboutImg from '../../public/assets/j13o.jpg';

export default function AboutUs() {
  const stats = [
    { label: 'TOTAL PORTFOLIO', value: '$2.5B+' },
    { label: 'YEARS ACTIVE', value: '15+' },
    { label: 'TOTAL SALES', value: '850+' },
    { label: 'RECORD SALE', value: '$45.2M' },
  ];

  const features = [
    {
      icon: <Handshake className="text-blue-500" size={48} />,
      title: 'Strong Network',
      description: 'Work with trusted inspectors, lenders, and attorneys through our established local network.',
      buttonText: 'View Services'
    },
    {
      icon: <Award className="text-blue-500" size={48} />,
      title: 'Proven Results',
      description: 'Consistent track record of successful sales backed by deep local market knowledge.',
      buttonText: 'See Listings'
    },
    {
      icon: <Shield className="text-blue-500" size={48} />,
      title: 'Secure Process',
      description: 'Your information stays protected throughout the entire transaction with clear communication.',
      buttonText: 'Get in Touch'
    }
  ];

  const testimonials = [
    {
      category: 'SMOOTH PROCESS',
      rating: 5,
      text: 'The level of service exceeded all expectations. From initial consultation through closing, every detail was handled with care. Their strong network and deep market knowledge delivered outstanding results in just ten days. This is exactly how real estate should be done.',
      author: 'Michael Harrison',
      role: 'REGIONAL MANAGER',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      category: 'EASY TRANSITION',
      rating: 5,
      text: "Moving from London to Miami required expertise I couldn't find elsewhere. From property tours through final documentation, everything was managed flawlessly. Their responsiveness and local insights made my transition seamless. Truly exceptional five star service delivered.",
      author: 'Charlotte Williams',
      role: 'HR DIRECTOR',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
      category: 'FAMILY TRUSTED',
      rating: 5,
      text: 'Three generations of my family have trusted this agency completely. Their communication is always clear and their local market knowledge stays unmatched. They consistently find properties that fit our needs when others simply cannot. The true standard for professional representation.',
      author: 'Robert Chen',
      role: 'BUSINESS CONSULTANT',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Header */}
      <section className="bg-[#1B2330] py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex justify-center items-center gap-2 text-sm text-gray-400 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors cursor-pointer">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">About Us</span>
          </nav>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            Who We Are
          </motion.h1>
        </div>
      </section>

      {/* About Approach */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-100/50"
            >
              <img 
                src={AboutImg} 
                className="w-full h-full object-cover"
                alt="Our Design Approach"
              />
            </motion.div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-slate-900">About Our Approach</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We take the time to learn what you're looking for and work alongside you to make it happen, step by step.
              </p>
              
              <div className="bg-white p-8 border-l-4 border-yellow-400 shadow-sm">
                <p className="text-xl text-slate-800 font-medium italic mb-4">
                  "Real estate works best when it's personal. We take time to understand your goals and guide you from start to finish."
                </p>
                <div className="text-gray-500 font-medium">— Michael Harrison, Founder & CEO</div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                From first conversation to final closing, we handle every detail with the care and attention your investment deserves.
              </p>

              <button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-8 py-4 rounded-lg font-bold transition-all cursor-pointer shadow-lg shadow-blue-100">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Stories Testimonials */}
      <section className=" bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Client Stories</h2>
            <p className="text-gray-500 font-medium">Over a decade of helping clients find the right property at the right time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-xl shadow-sm border border-gray-50 flex flex-col h-full"
              >
                <div className="text-[10px] font-black text-slate-900 tracking-[0.2em] mb-4">{t.category}</div>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, idx) => (
                    <span key={idx} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                  {t.text}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <img src={t.image} className="w-12 h-12 rounded-full object-cover" alt="" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                    <div className="text-[10px] font-black text-[#0EA5E9] tracking-wider">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-16 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-5xl font-black text-slate-900 mb-2">{s.value}</div>
                <div className="text-xs font-black text-gray-400 tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-500 font-medium">Three core principles that guide how we work with every client.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-xl border border-gray-50 shadow-sm text-center flex flex-col items-center"
              >
                <div className="mb-8">{f.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-10">
                  {f.description}
                </p>
                <button className="px-8 py-3 border border-blue-500 text-blue-500 font-bold rounded-sm hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                  {f.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
