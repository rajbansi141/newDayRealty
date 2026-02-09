import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900 skew-y-3 transform -translate-y-20 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: List Property */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative bg-linear-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-10 md:p-14 overflow-hidden shadow-2xl shadow-indigo-900/50"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80')] opacity-10 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4 leading-tight">
                Want to sell your property?
              </h2>
              <p className="text-indigo-100 mb-8 leading-relaxed max-w-sm">
                List your property with us and get access to thousands of potential buyers. We handle the complexity, you get the results.
              </p>
              {/* <Link 
                to="/sell-property"
                className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg"
              >
                <span>List Your Property</span>
                <ArrowRight className="w-5 h-5" />
              </Link> */}
            </div>
          </motion.div>

          {/* Card 2: Find Home */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative bg-white rounded-[2.5rem] p-10 md:p-14 overflow-hidden shadow-2xl border border-slate-100"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-8">
                <Key className="w-8 h-8 text-slate-900" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                Looking for a dream home?
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed max-w-sm">
                We have a wide range of properties to suit every budget and preference. Let us help you find your perfect match today.
              </p>
              <Link 
                to="/properties"
                className="inline-flex items-center space-x-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-xl shadow-slate-200"
              >
                <span>Browse Listings</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
