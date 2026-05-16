import { motion } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Listings', path: '/search' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-2 rounded-lg">
              <div className="flex flex-wrap w-5 gap-0.5">
                <div className="w-2 h-2 bg-white rounded-sm" />
                <div className="w-2 h-2 bg-white rounded-sm" />
                <div className="w-2 h-2 bg-white rounded-sm" />
                <div className="w-2 h-2 bg-white/50 rounded-sm" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">EstateEase</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={({ isActive }) => 
                  `text-sm font-bold transition-all hover:text-blue-600 cursor-pointer ${
                    isActive ? 'text-blue-600' : 'text-slate-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-700">
              <Phone size={18} className="text-blue-600" />
              <span className="font-semibold">(123) 345-6789</span>
            </div>
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-blue-200 cursor-pointer">
              Contact Us
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 cursor-pointer">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4"
        >
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `block w-full px-4 py-3 rounded-xl font-bold transition-all cursor-pointer ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-gray-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-blue-600 text-white py-4 rounded-xl font-bold cursor-pointer"
          >
            Contact Us
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
