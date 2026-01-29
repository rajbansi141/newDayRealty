import React from 'react';
import { motion } from 'framer-motion';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-gray-900 to-black text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-10 w-32 h-32 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">newDay Realty</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner in finding the perfect home. We're dedicated
              to providing exceptional service and making your real estate
              journey seamless.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                "Home",
                "Properties",
                "About Us",
                "Contact",
                "Blog",
                "Careers",
              ].map((item, index) => (
                <motion.li key={index}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Properties</h3>
            <ul className="space-y-3">
              {[
                "For Sale",
                "For Rent",
                "New Developments",
                "Luxury Homes",
                "Commercial",
                "Land",
              ].map((item, index) => (
                <motion.li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                <span className="text-gray-400">Thamel, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-gray-400">+977 9841234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-gray-400">info@newdayrealty.com</span>
              </div>
            </div>

            {/* Newsletter
            <div className="mt-6">
              <h4 className="font-medium mb-3">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <button className="bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-r-lg hover:shadow-lg transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div> */}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              {`© ${new Date().getFullYear()} newDay Realty. All rights reserved.`}
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                  >
                    {item}
                  </a>
                ),
              )}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
