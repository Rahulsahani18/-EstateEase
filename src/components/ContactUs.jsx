import { motion } from 'motion/react';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactUs() {
  const contactInfo = [
    {
      icon: <MapPin className="text-[#0EA5E9]" size={40} />,
      title: 'Visit Us',
      detail1: '425 Premier Street, New York',
      detail2: 'Weekdays 9AM to 6PM EST\nWalk-ins welcome',
      buttonText: 'View Map'
    },
    {
      icon: <Phone className="text-[#0EA5E9]" size={40} />,
      title: 'Call Us',
      detail1: '+1 (123) 123-4567',
      detail2: 'Immediate assistance available\nWeekend viewings by request',
      buttonText: 'Call Now'
    },
    {
      icon: <Mail className="text-[#0EA5E9]" size={40} />,
      title: 'Email Us',
      detail1: 'hello@tangiblewp.com',
      detail2: 'Send us your questions anytime\nWe respond within 2 hours',
      buttonText: 'Send Email'
    }
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-[#1B2330] py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex justify-center items-center gap-2 text-sm text-gray-400 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors cursor-pointer">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Contact Us</span>
          </nav>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            Get In Touch
          </motion.h1>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-24 pb-0 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center text-center"
              >
                <div className="mb-10 p-4 bg-blue-50 rounded-full">{item.icon}</div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-lg font-bold text-slate-900 mb-6">{item.detail1}</p>
                <p className="text-gray-500 font-medium whitespace-pre-line mb-10 leading-relaxed">
                  {item.detail2}
                </p>
                <button className="w-full max-w-[200px] border border-[#0EA5E9] text-[#0EA5E9] py-3.5 px-6 rounded-sm font-bold text-sm tracking-tight hover:bg-[#0EA5E9] hover:text-white transition-all cursor-pointer">
                  {item.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[600px] w-full relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.22199047521!2d-74.00411782341258!3d40.71311747139194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a2262cc141f%3A0xe54e60126a31c5b4!2sCity%20Hall%20Park!5e0!3m2!1sen!2sus!4v1715494400000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-80"
        ></iframe>
        <div className="absolute top-8 left-8 bg-white/95 backdrop-blur shadow-2xl p-6 rounded-2xl border border-gray-100 hidden md:block">
          <h4 className="font-bold text-slate-900 mb-2">Our Office</h4>
          <p className="text-sm text-gray-500">425 Premier Street, New York NY 10007</p>
        </div>
      </section>
    </div>
  );
}
