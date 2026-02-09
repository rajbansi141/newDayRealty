import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Home, Heart, Settings, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('properties');
  const [myProperties, setMyProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchMyProperties = async () => {
        // TODO: Implement API call to fetch user's properties
        setMyProperties([]);
      };

      const fetchFavorites = async () => {
        // TODO: Implement API call to fetch user's favorites
        setFavorites([]);
      };

      await Promise.all([fetchMyProperties(), fetchFavorites()]);
    })();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
                <p className="text-gray-600">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {user?.role === 'user' ? 'User Account' : 'Admin Account'}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'properties', label: 'My Properties', icon: Home },
              { id: 'favorites', label: 'Favorites', icon: Heart },
              { id: 'profile', label: 'Profile Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* My Properties Tab */}
            {activeTab === 'properties' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all">
                    <Plus className="w-5 h-5" />
                    <span>Add New Property</span>
                  </button>
                </div>

                {myProperties.length === 0 ? (
                  <div className="text-center py-16">
                    <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties yet</h3>
                    <p className="text-gray-500 mb-4">Start by adding your first property listing</p>
                    <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all">
                      Add Your First Property
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myProperties.map((property) => (
                      <div key={property.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                        <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                        <p className="text-gray-600 mb-4">{property.location}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 font-bold">Rs {property.price.toLocaleString()}</span>
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Properties</h2>
                {favorites.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h3>
                    <p className="text-gray-500">Browse properties and add them to your favorites</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Favorite properties will be displayed here */}
                  </div>
                )}
              </motion.div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <div className="max-w-2xl space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue={user?.phone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      defaultValue={user?.address}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="pt-4">
                    <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
