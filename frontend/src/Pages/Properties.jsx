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

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredProperties = properties;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-gray-900 mb-4"
          >
            Find Your Dream Property
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Explore our curated list of premium real estate opportunities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" /> Filters
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    name="type"
                    value={selectedFilters.type}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="location"
                      value={selectedFilters.location}
                      onChange={handleFilterChange}
                      placeholder="Enter location"
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="minPrice"
                      value={selectedFilters.minPrice}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      value={selectedFilters.maxPrice}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
    </div>
  );
}
