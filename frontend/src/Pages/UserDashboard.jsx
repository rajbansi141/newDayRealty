import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  User, Home, Heart, Settings, LogOut,
  LayoutDashboard, Star, Clock, CheckCircle, XCircle,
  Menu, X, ChevronRight, Bell, Shield, MapPin, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import propertyService from '../services/propertyService';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [purchasedProperties, setPurchasedProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch properties purchased by the user
        const purchasedResult = await propertyService.getProperties({ buyer: user?._id || user?.id });
        if (purchasedResult.success) {
          setPurchasedProperties(purchasedResult.data || []);
        }

        setFavorites([]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'purchased', label: 'Purchased', icon: Clock },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Purchased', value: purchasedProperties.length, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Favorites', value: favorites.length, icon: Star, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? '280px' : '0px',
          x: isSidebarOpen ? 0 : -280
        }}
        className={`fixed lg:relative z-50 h-screen bg-indigo-950 text-white shadow-2xl overflow-hidden`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center space-x-3 mb-12">
            <div className="bg-white p-2 rounded-xl">
              <Home className="w-6 h-6 text-indigo-900" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">newDay Realty</span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-white/10 text-white border-l-4 border-indigo-400 shadow-inner'
                    : 'text-indigo-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-400' : ''}`} />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div layoutId="active" className="ml-auto">
                    <ChevronRight className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="bg-white/5 rounded-2xl p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold truncate">{user?.name}</p>
                  <p className="text-xs text-indigo-300 truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
            </button>
            <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col text-right mr-2">
              <span className="text-sm font-bold text-slate-900">{user?.name}</span>
              <span className="text-xs text-slate-500 capitalize">{user?.role} Account</span>
            </div>
            <button className="p-2 bg-slate-100 text-slate-600 rounded-full relative hover:bg-slate-200 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Welcome Back Section */}
                <div className="bg-linear-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-2">Welcome Back, {user?.name}! 👋</h3>
                    <p className="text-indigo-100 max-w-lg mb-6 opacity-90">
                      Manage your property listings, track approvals, and see how your listings are performing all in one place.
                    </p>
                    <div className="flex space-x-2">
                      <button 
                         onClick={() => setActiveTab('purchased')}
                         className="px-6 py-2.5 bg-white text-indigo-700 rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        View My Purchases
                      </button>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <LayoutDashboard className="w-64 h-64 -rotate-12" />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow"
                    >
                      <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            )}


            {/* Purchased Properties Tab */}
            {activeTab === 'purchased' && (
              <motion.div
                key="purchased"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-black text-slate-900">Your Acquisitions</h2>
                  <p className="text-slate-500 font-medium">Properties you've successfully purchased from our marketplace.</p>
                </div>

                {loading ? (
                   <div className="flex flex-col items-center justify-center py-20">
                      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-slate-500 font-bold animate-pulse">Loading your purchases...</p>
                   </div>
                ) : purchasedProperties.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                      <Clock className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No purchased properties found</h3>
                    <p className="text-slate-500 font-medium mb-8 max-w-sm mx-auto">
                      Found something you like? Explore our listings and make your first purchase!
                    </p>
                    <button 
                      onClick={() => navigate('/properties')}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all"
                    >
                      Browse Marketplace
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {purchasedProperties.map((property) => {
                      const isSoldOut = property.status === 'Sold' && property.soldAt && new Date(property.soldAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                      return (
                        <motion.div 
                          key={property._id} 
                          whileHover={{ y: -8 }}
                          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                          onClick={() => navigate(`/property/${property._id}`)}
                        >
                          <div className="relative aspect-video bg-slate-200">
                          {property.images?.[0] ? (
                            <img src={property.images[0].url || property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <Camera className="w-12 h-12 opacity-20" />
                            </div>
                          )}
                          <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                             <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase text-white shadow-lg bg-emerald-500">
                                Purchased
                             </div>
                             {isSoldOut && (
                               <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase text-white shadow-lg bg-red-600 animate-pulse">
                                 Sold Out
                               </div>
                             )}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-black text-lg text-slate-900 group-hover:text-emerald-600 transition-colors truncate mb-1">{property.title}</h3>
                          <div className="flex items-center text-slate-500 text-sm mb-4">
                            <MapPin className="w-4 h-4 mr-1 text-red-400" />
                            <span className="truncate">{property.location}</span>
                          </div>
                          <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-emerald-600 font-black">
                            <span>Rs {property.price?.toLocaleString()}</span>
                            <span className="text-xs uppercase tracking-tighter">Ownership Confirmed</span>
                          </div>
                        </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 text-center"
              >
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mb-6">
                  <Heart className="w-10 h-10 fill-current opacity-20" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Your wishlist is empty</h2>
                <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
                  Love a property? Click the heart icon on any listing to save it here for later.
                </p>
                <button 
                  onClick={() => window.location.href = '/properties'}
                  className="px-8 py-3 bg-linear-to-r from-indigo-600 to-indigo-800 text-white rounded-2xl font-bold hover:shadow-xl transition-all"
                >
                  Explore Properties
                </button>
              </motion.div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl"
              >
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-indigo-600" />
                    Account Security & Profile
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Member Full Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Primary Email</label>
                        <input
                          type="email"
                          disabled
                          defaultValue={user?.email}
                          className="w-full px-5 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 font-medium cursor-not-allowed"
                        />
                        <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">Email cannot be changed after registration</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number</label>
                        <input
                          type="tel"
                          defaultValue={user?.phone}
                          placeholder="+977-XXXXXXXXXX"
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Mailing Address</label>
                        <input
                          type="text"
                          defaultValue={user?.address}
                          placeholder="Street, City, Country"
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-slate-900 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-slate-100 flex justify-end">
                    <button 
                      onClick={() => toast.success('Profile preferences updated!')}
                      className="px-8 py-4 bg-linear-to-r from-indigo-600 to-indigo-800 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all uppercase tracking-widest text-xs"
                    >
                      Update Database
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
