import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
          className="bg-linear-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
        >
          <Home className="w-8 h-8 text-white" />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 font-medium"
        >
          Loading...
        </motion.p>

        {/* Loading Dots */}
        <div className="flex space-x-2 justify-center mt-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-2 h-2 bg-blue-600 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
