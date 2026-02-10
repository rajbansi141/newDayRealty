import React, { useState, useEffect } from 'react';
import { Home, MapPin, Bed, Bath, Square, Search, Filter, Heart, Star, User, Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import propertyService from '../services/propertyService';
import PropertyCard from '../Components/PropertyCard';

export default function PropertiesPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const result = await propertyService.getProperties(selectedFilters);
      if (result.success) {
        setProperties(result.data || []);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [selectedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters(prev => ({ ...prev, [name]: value }));
  };

  const [sortBy, setSortBy] = useState('newest');

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'priceAsc') {
      return (a.price || 0) - (b.price || 0);
    } else if (sortBy === 'priceDesc') {
      return (b.price || 0) - (a.price || 0);
    } else if (sortBy === 'newest') {
      // Assuming createdAt exists, otherwise fallback to _id or keep order
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    return 0;
  });

  const filteredProperties = sortedProperties;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
{/* Page Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 py-20 mb-12 rounded-3xl relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-md"
            >
              Find Your Perfect <span className="text-blue-200">Property</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium"
            >
              Browse our exclusive collection of premium properties across Nepal. From luxury villas to cozy apartments, find your dream home today.
            </motion.p>
          </div>
        </div>

        {/* Search Bar Section - Optional Floating Search */}
        <div className="bg-white p-4 rounded-2xl shadow-lg mb-12 -mt-20 mx-4 md:mx-auto max-w-5xl relative z-20 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-auto flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                <input 
                    type="text" 
                    placeholder="Search by location..." 
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    name="location"
                    value={selectedFilters.location}
                    onChange={handleFilterChange}
                />
            </div>
             <select
                name="type"
                value={selectedFilters.type}
                onChange={handleFilterChange}
                className="w-full md:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
                <option value="">All Types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
            </select>
            <input
                type="number"
                name="minPrice"
                value={selectedFilters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min Price"
                className="w-full md:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <input
                 type="number"
                 name="maxPrice"
                 value={selectedFilters.maxPrice}
                 onChange={handleFilterChange}
                 placeholder="Max Price"
                 className="w-full md:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                Search
            </button>
        </div>

{/* Results & Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50">
          <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">
            {filteredProperties.length} Properties Found
          </h2>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-blue-50 border-none text-blue-700 font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <option value="newest">Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

{/* Properties Grid */}
        <div className="w-full">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
