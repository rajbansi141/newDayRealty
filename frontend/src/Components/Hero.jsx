import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    type: '',
    priceRange: ''
  });

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchFilters.location) queryParams.append('location', searchFilters.location);
    if (searchFilters.type) queryParams.append('type', searchFilters.type);
    // Add logic to parse price range if needed
    
    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* <img 
          src="../assets/Images/House Image for BG.jpg" 
          // alt="Modern Luxury Home" 
          className="w-full h-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-100 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            The Future of Real Estate
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-xl">
            Find Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">Dream Home</span> <br />
            Without The Hassle
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-md">
            Discover a curated selection of potential properties in the most sought-after neighborhoods. Expert guidance, seamless transactions.
          </p>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[2rem] shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Location Input */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-300 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Location (e.g., Kathmandu)"
                className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
              />
            </div>

            {/* Type Dropdown */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Home className="h-5 w-5 text-slate-300 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <select
                className="w-full pl-12 pr-10 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium cursor-pointer"
                value={searchFilters.type}
                onChange={(e) => setSearchFilters({...searchFilters, type: e.target.value})}
              >
                <option value="" className="bg-slate-900 text-slate-400">Property Type</option>
                <option value="House" className="bg-slate-900 text-white">House</option>
                <option value="Apartment" className="bg-slate-900 text-white">Apartment</option>
                <option value="Villa" className="bg-slate-900 text-white">Villa</option>
                <option value="Land" className="bg-slate-900 text-white">Land</option>
                <option value="Commercial" className="bg-slate-900 text-white">Commercial</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Price Range */}
            {/* <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-slate-300 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <select
                className="w-full pl-12 pr-10 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium cursor-pointer"
                value={searchFilters.priceRange}
                onChange={(e) => setSearchFilters({...searchFilters, priceRange: e.target.value})}
              >
                <option value="" className="bg-slate-900 text-slate-400">Budget Range</option>
                <option value="0-10000000" className="bg-slate-900 text-white">Under 1 Cr</option>
                <option value="10000000-30000000" className="bg-slate-900 text-white">1 Cr - 3 Cr</option>
                <option value="30000000-50000000" className="bg-slate-900 text-white">3 Cr - 5 Cr</option>
                <option value="50000000+" className="bg-slate-900 text-white">5 Cr +</option>
              </select>
            </div> */}

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="px-10 py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </motion.div>

        {/* Floating animated badges */}
        {/* <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 1, duration: 1 }}
           className="absolute top-1/2 left-10 hidden xl:flex gap-3 items-center bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10"
        >
           <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              <Home className="w-5 h-5" />
           </div>
           <div className="text-left">
              <p className="text-white font-bold text-sm">New Listing</p>
              <p className="text-emerald-300 text-xs font-medium">Just added today</p>
           </div>
        </motion.div> */}
      </div>
    </section>
  );
}
