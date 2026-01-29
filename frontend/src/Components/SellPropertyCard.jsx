import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, Bed, Bath, Square, Heart, Star, Calendar, User, Phone, Mail, Camera, Upload, Plus, X } from 'lucide-react';

export default function SellPropertyCard() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    propertyType: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    price: '',
    description: ''
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Property listing submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">List Your Property</h1>
          <p className="text-blue-100">Get your property in front of thousands of potential buyers</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Property Images */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">Property Photos</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {images.length < 8 && (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-300">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500">Upload up to 8 high-quality photos of your property</p>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Luxury Villa in Thamel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Studio">Studio</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Thamel, Kathmandu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (NPR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">Rs</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter price"
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <div className="relative">
                  <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (sqft)
                </label>
                <div className="relative">
                  <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Built
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2024"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe your property, including features, amenities, and any other relevant details..."
              ></textarea>
            </div>

            {/* Contact Information */}
            {/* <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+977 9841234567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-lg"
            >
              List My Property
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
