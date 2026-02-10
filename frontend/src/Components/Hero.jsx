import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Home, ChevronRight, Sparkles, Building2, Trees, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchFilters.location) queryParams.append('location', searchFilters.location);
    if (searchFilters.type) queryParams.append('type', searchFilters.type);
    if (searchFilters.minPrice) queryParams.append('minPrice', searchFilters.minPrice);
    if (searchFilters.maxPrice) queryParams.append('maxPrice', searchFilters.maxPrice);
    navigate(`/properties?${queryParams.toString()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0c10]">
      {/* Premium Background System */}
      <div className="absolute inset-0 z-0">
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-linear-to-br from-indigo-600/20 to-transparent blur-[120px]"
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[0%] right-[0%] w-[45%] h-[45%] rounded-full bg-linear-to-tr from-blue-600/15 to-transparent blur-[100px]"
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0a0c10]/50 to-[#0a0c10]" />
        
        {/* Subtle SVG Grid */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-12"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl group-hover:bg-blue-500/30 transition-all duration-500" />
            <span className="relative inline-flex items-center space-x-2 py-2 px-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-blue-400 text-xs font-black tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Elevated Real Estate</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8">
              Where Luxury <br />
              Finds Its <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">Address.</span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.5, duration: 1, ease: "circOut" }}
                  className="absolute bottom-4 left-0 h-3 bg-blue-500/20 -rotate-1 z-0"
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Curating architectural masterpieces and exclusive neighborhood gems for the discerning visionary.
            </p>
          </motion.div>

          {/* Search Section - Replaced with Properties Page Design */}
          <motion.div 
            variants={itemVariants} 
            className="w-full max-w-5xl"
          >
            <div className="bg-white p-4 rounded-2xl shadow-2xl relative z-20 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-auto flex-1 group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors"/>
                    <input 
                        type="text" 
                        placeholder="Search by location..." 
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 font-bold"
                        name="location"
                        value={searchFilters.location}
                        onChange={handleFilterChange}
                    />
                </div>
                 <div className="relative w-full md:w-auto flex-1 group">
                    <select
                        name="type"
                        value={searchFilters.type}
                        onChange={handleFilterChange}
                        className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-bold appearance-none cursor-pointer"
                    >
                        <option value="">All Types</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Commercial">Commercial</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 rotate-90 w-4 h-4 pointer-events-none" />
                </div>
                <input
                    type="number"
                    name="minPrice"
                    value={searchFilters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min Price"
                    className="w-full md:w-32 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-bold"
                />
                <input
                     type="number"
                     name="maxPrice"
                     value={searchFilters.maxPrice}
                     onChange={handleFilterChange}
                     placeholder="Max Price"
                     className="w-full md:w-32 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-bold"
                />
                <button 
                  onClick={handleSearch}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black transition-all active:scale-95 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                    <Search className="w-4 h-4" />
                    Search
                </button>
            </div>
          </motion.div>

          {/* Quick Metrics */}
          {/* <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 pt-6">
            <div className="flex flex-col items-center group">
               <span className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">12k+</span>
               <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Curated Units</span>
            </div>
            <div className="flex flex-col items-center group">
               <span className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">98%</span>
               <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Client Trust</span>
            </div>
            <div className="flex flex-col items-center group">
               <span className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors">24h</span>
               <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Average Response</span>
            </div>
          </motion.div> */}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
      >
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
