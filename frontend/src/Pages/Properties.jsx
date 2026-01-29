import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, Bed, Bath, Square, Search, Filter, Heart, Star, User, Calendar } from 'lucide-react';

export default function PropertiesPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  const [favorites, setFavorites] = useState(new Set());

  // Mock property data
  const properties = [
    {
      id: 1,
      title: "Luxury Villa in Thamel",
      location: "Thamel, Kathmandu",
      price: 2500000,
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      image: "https://placehold.co/600x400/4f46e5/white?text=Luxury+Villa",
      featured: true,
      // agent: "John Doe",
      
    },
    {
      id: 2,
      title: "Modern Apartment with Mountain View",
      location: "Lalitpur",
      price: 1200000,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "https://placehold.co/600x400/4f46e5/white?text=Modern+Apt",
      featured: false,
      
    },
    {
      id: 3,
      title: "Spacious Family Home",
      location: "Bhaktapur",
      price: 1800000,
      type: "House",
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      image: "https://placehold.co/600x400/4f46e5/white?text=Family+Home",
      featured: true,
      
    },
    {
      id: 4,
      title: "Cozy Studio Apartment",
      location: "Kathmandu",
      price: 800000,
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      image: "https://placehold.co/600x400/4f46e5/white?text=Studio+Apt",
      featured: false,
      
    },
    {
      id: 5,
      title: "Premium Commercial Space",
      location: "Patan",
      price: 3500000,
      type: "Commercial",
      bedrooms: 0,
      bathrooms: 2,
      area: 3500,
      image: "https://placehold.co/600x400/4f46e5/white?text=Commercial",
      featured: true,
      
    },
    {
      id: 6,
      title: "Garden House with Pool",
      location: "Nagarkot",
      price: 2200000,
      type: "House",
      bedrooms: 3,
      bathrooms: 3,
      area: 2500,
      image: "https://placehold.co/600x400/4f46e5/white?text=Garden+House",
      featured: false,
      
    }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredProperties = properties.filter(property => {
    if (selectedFilters.type && property.type !== selectedFilters.type) return false;
    if (selectedFilters.location && !property.location.toLowerCase().includes(selectedFilters.location.toLowerCase())) return false;
    if (selectedFilters.minPrice && property.price < parseInt(selectedFilters.minPrice)) return false;
    if (selectedFilters.maxPrice && property.price > parseInt(selectedFilters.maxPrice)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      
      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/50 shadow-lg mb-8"
          >
            <Home className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">Available Properties</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Find Your Perfect <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Property</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Browse our exclusive collection of premium properties across Nepal. From luxury villas to cozy apartments, find your dream home today.
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-12 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="location"
                  value={selectedFilters.location}
                  onChange={handleFilterChange}
                  placeholder="Search by location..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                name="type"
                value={selectedFilters.type}
                onChange={handleFilterChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Studio">Studio</option>
                <option value="Commercial">Commercial</option>
              </select>
              
              <select
                name="minPrice"
                value={selectedFilters.minPrice}
                onChange={handleFilterChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Min Price</option>
                <option value="500000">500K+</option>
                <option value="1000000">1M+</option>
                <option value="1500000">1.5M+</option>
                <option value="2000000">2M+</option>
              </select>
              
              <select
                name="maxPrice"
                value={selectedFilters.maxPrice}
                onChange={handleFilterChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Max Price</option>
                <option value="1000000">1M</option>
                <option value="2000000">2M</option>
                <option value="3000000">3M</option>
                <option value="5000000">5M+</option>
              </select>
              
              <button className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length} Properties Found
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Sort by: </span>
              <select className="text-blue-600 font-medium">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-64 object-cover"
                    />
                    {property.featured && (
                      <div className="absolute top-4 left-4 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full ${
                        favorites.has(property.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                      } transition-colors duration-300`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.has(property.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{property.title}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">Rs {property.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">For Sale</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.bedrooms} bed</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.bathrooms} bath</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.area} sqft</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 w-8 h-8 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{property.agent}</div>
                          <div className="text-xs text-gray-500">Agent</div>
                        </div>
                      </div>
                      <button className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
