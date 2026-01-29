import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-8"
          >
            <h1 className="text-9xl md:text-[12rem] font-bold text-blue-600/20 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Home className="w-24 h-24 md:w-32 md:h-32 text-blue-600" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto"
          >
            Oops! The property you're looking for doesn't exist. It might have been sold, removed, or the URL is incorrect.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </motion.button>

            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-600 mb-4 font-medium">Quick Links</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/properties">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Browse Properties</span>
                </motion.div>
              </Link>
              <Link to="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>About Us</span>
                </motion.div>
              </Link>
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
                >
                  <Home className="w-4 h-4" />
                  <span>Contact Us</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
