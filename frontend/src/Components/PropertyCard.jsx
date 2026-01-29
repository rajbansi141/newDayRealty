import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PropertyCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative max-w-sm"
    >
      {/* Image Section with Zoom Effect */}
      <div className="h-64 bg-linear-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
        {/* Zoom effect on hover */}
        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full absolute inset-0"
        />
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-center">
            <span className="bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              For Sale
            </span>
            <div className="flex space-x-2">
              <button className="bg-white/20 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">Luxury Modern Villa</h3>
          <span className="text-blue-600 font-bold text-lg">Rs 25,00,000</span>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Thamel, Kathmandu</span>
        </div>
        
        {/* Property Features Grid - 2 attractive rows */}
        <div className="space-y-4 mb-5">
          {/* Row 1: Primary Features */}
          <div className="grid grid-cols-2 gap-3">
            {/* Bedrooms & Bathrooms */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-100 hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Rooms inc.</h4>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-xs text-gray-600">Bed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-xs text-gray-600">Bath</div>
                </div>
              </div>
            </motion.div>

            {/* Parking */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-100 hover:border-green-200 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Parking</h4>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-xs text-gray-600">Car</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">4</div>
                  <div className="text-xs text-gray-600">Bike</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Secondary Features */}
          <div className="grid grid-cols-2 gap-3">
            {/* Floors & Garden */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100 hover:border-indigo-200 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Structure</h4>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">3</div>
                  <div className="text-xs text-gray-600">Floors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">✓</div>
                  <div className="text-xs text-gray-600">Garden</div>
                </div>
              </div>
            </motion.div>

            {/* Road Access */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-rose-50 to-rose-100 rounded-xl p-4 border border-rose-100 hover:border-rose-200 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-rose-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Access</h4>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600">13 ft.</div>
                <div className="text-xs text-gray-600">Road Width</div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Agent and Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 w-8 h-8 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Agent</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center space-x-1"
          >
            <span>View Details</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
