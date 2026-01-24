// import React from 'react'

// const Navbar = () => {
//   return (
//     <nav className={`flex justify-between h-20`}>
//         <div className="">
//             <h2 className={`text-2xl font-bold `}>newDayRealty</h2>
//         </div>

//         <div className={`flex flex-row gap-5 `}>
//             <h1>Home</h1>
//             <h1>Properties</h1>
//             <h1>About Us</h1>
//         </div>
//     </nav>
//   )
// }

// export default Navbar

import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Apply dark mode class to document
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Properties', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white shadow-lg' 
        : 'bg-white text-gray-900 shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
              isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            }`}>
              R
            </div>
            <span className="text-xl font-bold">NewDay Realty</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium hover:text-blue-600 transition-colors ${
                  isDarkMode ? 'hover:text-blue-400' : ''
                }`}
              >
                {item.name}
              </a>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}>
                Sign In
              </button>
              <button className={`px-4 py-2 rounded-lg font-medium text-white transition-colors ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              }`}>
                Sign Up
              </button>
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                  : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-3">
                  <button className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}>
                    Sign In
                  </button>
                  <button className={`flex-1 px-4 py-2 rounded-lg font-medium text-white ${
                    isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  }`}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
