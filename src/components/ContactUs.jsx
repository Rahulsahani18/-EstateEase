import { motion } from 'motion/react';
import { MapPin, Phone, Mail, ChevronRight, Send, User, Users, Smartphone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const contactInfo = [
    {
      icon: <MapPin className="text-[#0EA5E9]" size={40} />,
      title: 'Visit Us',
      detail1: '1580a, Sector 62-63 Dividing Road, Near- Sai Vatika Apartments Sector-63, Faridabad',
      detail2: '',
      buttonText: 'View Map',
      action: 'map',
      link: 'https://maps.google.com/?q=1580a+Sector+62-63+Dividing+Road+Faridabad'
    },
    {
      icon: <Phone className="text-[#0EA5E9]" size={40} />,
      title: 'Call Us',
      detail1: '0129-6942003',
      detail2: 'Immediate assistance available\nWeekend viewings by request',
      buttonText: 'Call Now',
      action: 'call',
      link: 'tel:+911296942003'
    },
    {
      icon: <Mail className="text-[#0EA5E9]" size={40} />,
      title: 'Email Us',
      detail1: 'hello@tangiblewp.com',
      detail2: 'Send us your questions anytime\nWe respond within 2 hours',
      buttonText: 'Send Email',
      action: 'email',
      link: 'mailto:hello@tangiblewp.com'
    }
  ];

  const handleButtonClick = (item) => {
    switch(item.action) {
      case 'map':
        window.open(item.link, '_blank');
        break;
      case 'call':
        window.location.href = item.link;
        break;
      case 'email':
        window.location.href = item.link;
        break;
      default:
        console.log('No action defined');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.mobile || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    // Mobile validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          mobile: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

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
      <section className="py-24 pb-16 bg-[#F7F9FC]">
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
                <button 
                  onClick={() => handleButtonClick(item)}
                  className="w-full max-w-[200px] border border-[#0EA5E9] text-[#0EA5E9] py-3.5 px-6 rounded-sm font-bold text-sm tracking-tight hover:bg-[#0EA5E9] hover:text-white transition-all cursor-pointer"
                >
                  {item.buttonText}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact Form Section - Split Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Send Us a Message</h2>
              <p className="text-gray-500 text-lg">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image Side - No Content */}
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=800&fit=crop" 
                    alt="Contact Us"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Form Side */}
                <div className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all"
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all"
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Mobile Number */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all"
                            placeholder="10-digit mobile number"
                            pattern="[0-9]{10}"
                            maxLength="10"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageCircle className="absolute left-3 top-4 text-gray-400" size={18} />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="5"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all resize-none"
                          placeholder="Tell us about your requirements, questions, or feedback..."
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0EA5E9] text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-[#0c8bca] transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center"
                      >
                        ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center"
                      >
                        ❌ Oops! Something went wrong. Please check your information and try again.
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
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
          title="Office Location Map"
        ></iframe>
        <div className="absolute top-8 left-8 bg-white/95 backdrop-blur shadow-2xl p-6 rounded-2xl border border-gray-100 hidden md:block">
          <h4 className="font-bold text-slate-900 mb-2">Our Office</h4>
          <p className="text-sm text-gray-500">425 Premier Street, New York NY 10007</p>
        </div>
      </section>
    </div>
  );
}