import React from 'react';

export default function App() {
  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        {/* Image Section with Hover Zoom */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-5xl font-bold opacity-70">VILLA</span>
          </div>
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
          <div className="absolute inset-0 transform scale-100 group-hover:scale-105 transition-transform duration-500" />
        </div>
        
        {/* Content Section */}
        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800 mb-1 sm:mb-0">Luxury Villa in Thamel</h2>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-600">2,500,000</span>
              {/* <span className="ml-2 text-sm text-gray-500">For Sale</span> */}
            </div>
          </div>
          
          <p className="text-gray-600 flex items-center mb-3">
            <span className="mr-2">📍</span> Thamel, Kathmandu
          </p>
          
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
            <span className="flex items-center">
              <span className="mr-1">🛏️</span> 4 bed
            </span>
            <span className="flex items-center">
              <span className="mr-1">🛁</span> 3 bath
            </span>
            <span className="flex items-center">
              <span className="mr-1">📐</span> 2800 sqft
            </span>
            <span className="flex items-center">
              <span className="mr-1">🅿️🚗</span> 2 car
            </span>
            <span className="flex items-center">
              <span className="mr-1">🅿️🏍️</span> 1 bike
            </span>
            <span className="flex items-center">
              <span className="mr-1">🏢</span> 3 floors
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
              <span className="text-gray-600">Agent</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
