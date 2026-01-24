import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sync with system theme on initial load
  useEffect(() => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isSystemDark);
    if (isSystemDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const heroSlides = [
    {
      title: "Find Your Dream Home",
      subtitle: "Discover premium properties in prime locations across the city",
      image: "https://placehold.co/1200x600/4F46E5/FFFFFF?text=Luxury+Home"
    },
    {
      title: "Sell With Confidence",
      subtitle: "Get maximum value for your property with our expert marketing strategies",
      image: "https://placehold.co/1200x600/7C3AED/FFFFFF?text=Property+Sale"
    },
    {
      title: "Invest Wisely",
      subtitle: "Access exclusive investment opportunities in high-growth real estate markets",
      image: "https://placehold.co/1200x600/EC4899/FFFFFF?text=Real+Estate+Investment"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${heroSlides[currentSlide].image})`,
          transform: 'scale(1.05)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 bg-white/10 backdrop-blur-md dark:bg-gray-900/10 backdrop-saturate-150 border-b border-white/20 dark:border-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-white">NewDay Realty</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-blue-200 font-medium transition-colors">Home</a>
              <a href="#" className="text-white hover:text-blue-200 font-medium transition-colors">Properties</a>
              <a href="#" className="text-white hover:text-blue-200 font-medium transition-colors">About Us</a>
              <a href="#" className="text-white hover:text-blue-200 font-medium transition-colors">Services</a>
              <a href="#" className="text-white hover:text-blue-200 font-medium transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {!isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 rounded-lg text-white hover:bg-white/20">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {heroSlides[currentSlide].subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Browse Properties
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              Contact Agent
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
