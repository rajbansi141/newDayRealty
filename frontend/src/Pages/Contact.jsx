import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Clock, Home } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Our Office",
      content: "Thamel, Kathmandu, Nepal"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "+977 9841234567"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "info@newdayrealty.com"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      content: "Mon-Fri: 9AM - 6PM\nSat: 10AM - 4PM"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      
      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/50 shadow-lg mb-8"
          >
            <MessageSquare className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">Get In Touch</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Contact <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">newDay Realty</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Have questions about buying, selling, or renting property? Our expert team is here to help you every step of the way.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="h-96 bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Home className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Our Location</h3>
                  <p className="text-blue-100">Thamel, Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Visit Us?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center mt-1 shrink-0">✓</div>
                    <span>Personal consultation with our expert agents</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center mt-1 shrink-0">✓</div>
                    <span>View exclusive property listings not available online</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center mt-1 shrink-0">✓</div>
                    <span>Get professional market analysis and pricing advice</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
