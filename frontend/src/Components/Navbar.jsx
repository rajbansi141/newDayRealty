import React, { useState } from "react";
import { Menu, X, Home, User, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Helper function to get nav link classes
  const getNavLinkClass = ({ isActive }) => {
    return `${
      isActive 
        ? "text-blue-600 font-semibold" 
        : "text-gray-700 hover:text-blue-600"
    } font-medium transition-colors`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
            >
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                newDay Realty
              </span>
            </motion.div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" end>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -2 }}
                  className={getNavLinkClass({ isActive })}
                >
                  Home
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="h-0.5 bg-blue-600 mt-1"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
            <NavLink to="/properties">
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -2 }}
                  className={getNavLinkClass({ isActive })}
                >
                  Properties
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="h-0.5 bg-blue-600 mt-1"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
            <NavLink to="/about">
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -2 }}
                  className={getNavLinkClass({ isActive })}
                >
                  About
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="h-0.5 bg-blue-600 mt-1"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
            <NavLink to="/contact">
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -2 }}
                  className={getNavLinkClass({ isActive })}
                >
                  Contact
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="h-0.5 bg-blue-600 mt-1"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          </div>

          {/* Right side actions - User Profile / Sign In */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <NavLink 
                  to={isAdmin() ? "/admin" : "/dashboard"}
                  className="flex items-center space-x-2 text-gray-700 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="hidden lg:inline">{user?.name}</span>
                </NavLink>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 hover:shadow-lg transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <User className="w-4 h-4" />
                <span>Log In</span>
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-4/5 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col p-6 space-y-6">
                <NavLink
                  to="/"
                  end
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/properties"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  Properties
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  Contact
                </NavLink>

                <div className="pt-6 border-t border-gray-100 flex flex-col space-y-3">
                  {isAuthenticated() ? (
                    <>
                      <NavLink 
                        to={isAdmin() ? "/admin" : "/dashboard"}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                          <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                        </div>
                      </NavLink>
                      <button 
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 hover:shadow-lg transition-all duration-300"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <User className="w-4 h-4" />
                      <span>Log In</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
