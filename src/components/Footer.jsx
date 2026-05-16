import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockProperties } from '../data/properties';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blog', path: '/' },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="bg-blue-600 p-2 rounded-lg">
                <div className="flex flex-wrap w-5 gap-0.5">
                  <div className="w-2 h-2 bg-white rounded-sm" />
                  <div className="w-2 h-2 bg-white rounded-sm" />
                  <div className="w-2 h-2 bg-white rounded-sm" />
                  <div className="w-2 h-2 bg-white/50 rounded-sm" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight">EstateEase</span>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed">
              Find your perfect property with expert guidance. We simplify the real estate journey for you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <Phone size={20} className="text-gray-500" />
                <span>(123) 345-6789</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <MapPin size={20} className="text-gray-500" />
                <span>518-520 5th Ave, New York, USA</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <Mail size={20} className="text-gray-500" />
                <span>support@estateease.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8">Latest Properties</h3>
            <div className="space-y-6">
              {mockProperties.slice(0, 3).map((prop) => (
                <Link key={prop.id} to={`/property/${prop.id}`} className="flex gap-4 group cursor-pointer">
                  <img src={prop.images[0]} className="w-20 h-20 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-semibold group-hover:text-blue-400 transition-colors">{prop.title}</h4>
                    <p className="text-blue-500 font-bold">${prop.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-lg cursor-pointer block">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
            <p className="text-gray-400 mb-8">Ready to find your dream home? Connect with our team today.</p>
            <Link to="/contact" className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group cursor-pointer">
              Schedule Now
              <Send size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 font-medium">
            © 2026 EstateEase – Modern Real Estate Platform. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Facebook className="text-gray-500 hover:text-white cursor-pointer transition-colors" size={22} />
            <Twitter className="text-gray-500 hover:text-white cursor-pointer transition-colors" size={22} />
            <Linkedin className="text-gray-500 hover:text-white cursor-pointer transition-colors" size={22} />
            <Instagram className="text-gray-500 hover:text-white cursor-pointer transition-colors" size={22} />
            <Youtube className="text-gray-500 hover:text-white cursor-pointer transition-colors" size={22} />
          </div>
        </div>
      </div>
    </footer>
  );
}
