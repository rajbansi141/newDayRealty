import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User } from 'lucide-react';

export default function App() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stats, setStats] = useState({ properties: 0, clients: 0, years: 0 });

  // Animation for stats counting up
  useEffect(() => {
    const targetProperties = 500;
    const targetClients = 1000;
    const targetYears = 15;

    const interval = setInterval(() => {
      setStats(prev => {
        const newProperties = prev.properties < targetProperties ? prev.properties + Math.ceil(targetProperties / 50) : targetProperties;
        const newClients = prev.clients < targetClients ? prev.clients + Math.ceil(targetClients / 50) : targetClients;
        const newYears = prev.years < targetYears ? prev.years + Math.ceil(targetYears / 50) : targetYears;
        
        if (newProperties === targetProperties && newClients === targetClients && newYears === targetYears) {
          clearInterval(interval);
        }
        
        return { properties: newProperties, clients: newClients, years: newYears };
      });
    }, 65);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-indigo-600/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        
        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/50 shadow-lg mb-8"
          >
            <Home className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">Trusted by 1000+ Happy Clients</span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Find Your{' '}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dream Home
            </span>{' '}
            with newDay Realty
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Discover your perfect property in the most sought-after neighborhoods. 
            Expert guidance, seamless transactions, and personalized service.
          </motion.p>
          
          {/* Enhanced Search Bar (as shown in the image) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-2 mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Budget Dropdown */}
              <div className="relative flex-1">
                <select className="w-full appearance-none pl-4 pr-10 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option>Select Budget</option>
                  <option>1 crore</option>
                  <option>1 crore - 3 crore</option>
                  <option>3 crore - 5 crore</option>
                  <option>5 crore +</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Type Dropdown */}
              <div className="relative flex-1">
                <select className="w-full appearance-none pl-4 pr-10 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option>Type</option>
                  <option>House</option>
                  <option>Land</option>
                  <option>Apartment</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Location Dropdown */}
              <div className="relative flex-1">
                <select className="w-full appearance-none pl-4 pr-10 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option>Location</option>
                  <option>Bhaktapur</option>
                  <option>Kathmandu</option>
                  <option>Lalitpur</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Property Code/Name Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="PropertyCode/Name"
                  className="w-full pl-4 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Search Button */}
              <button className="bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Search
              </button>
            </div>
          </motion.div>
          
          {/* Stats with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 text-center"
          >
            <div className="group">
              <div className="text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                {stats.properties}+
              </div>
              <div className="text-gray-600">Properties Listed</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                {stats.clients}+
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors">
                {stats.years}+
              </div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Property Cards (Decorative) */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-10 w-32 h-40 bg-white rounded-xl shadow-lg overflow-hidden hidden md:block"
        >
          <div className="bg-gray-200 w-full h-24"></div>
          <div className="p-2">
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 right-10 w-32 h-40 bg-white rounded-xl shadow-lg overflow-hidden hidden md:block"
        >
          <div className="bg-gray-200 w-full h-24"></div>
          <div className="p-2">
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          </div>
        </motion.div> */}
      </section>
    </div>
  );
}
