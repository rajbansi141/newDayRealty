import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import propertyService from '../services/propertyService';
import userService from '../services/userService';
import contactService from '../services/contactService';
import SellPropertyCard from '../Components/SellPropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Plus, X, Loader2, Users, Home, MessageSquare, Trash2, CheckCircle, XCircle, 
  BarChart3, Settings, LogOut, LayoutDashboard, ChevronRight, Eye, MoreVertical,
  Bell, Shield, Search, Filter, Calendar, ArrowUpRight, Download, Menu, 
  RefreshCw, Mail, MapPin, Star
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  // State management
  const [activeSection, setActiveSection] = useState('dashboard');
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    totalUsers: 0,
    activeUsers: 0,
    pendingContacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [modalType, setModalType] = useState('');

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const fetchProperties = React.useCallback(async () => {
    const result = await propertyService.getProperties();
    if (result.success) {
      setProperties(result.data || []);
    }
  }, []);

  const fetchUsers = React.useCallback(async () => {
    const result = await userService.getUsers();
    if (result.success) {
      setUsers(result.data || []);
    }
  }, []);

  const fetchContacts = React.useCallback(async () => {
    const result = await contactService.getContacts();
    if (result.success) {
      setContacts(result.data || []);
    }
  }, []);

  const fetchStats = React.useCallback(async () => {
    const userStatsResult = await userService.getUserStats();
    const propertiesResult = await propertyService.getProperties();
    const contactsResult = await contactService.getContacts({ status: 'new' });

    if (userStatsResult.success && propertiesResult.success) {
      const allProperties = propertiesResult.data || [];
      const userStats = userStatsResult.data || {};
      setStats({
        totalProperties: allProperties.length,
        activeProperties: allProperties.filter(p => p.approved).length,
        totalUsers: userStats.totalUsers || 0,
        activeUsers: userStats.activeUsers || 0,
        pendingContacts: contactsResult.success ? (contactsResult.data?.length || 0) : 0,
      });
    }
  }, []);

  // Fetch all data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      await Promise.all([
        fetchProperties(),
        fetchUsers(),
        fetchContacts(),
        fetchStats(),
      ]);
      setLoading(false);
    };
    
    fetchDashboardData();
  }, [fetchProperties, fetchUsers, fetchContacts, fetchStats]);

  // Property approval handler
  const handleApproveProperty = async (id) => {
    const result = await propertyService.approveProperty(id);
    if (result.success) {
      toast.success('Property approved successfully!');
      fetchProperties();
      fetchStats();
    } else {
      toast.error(result.error || 'Failed to approve property');
    }
  };
  
  // Property featured toggle handler
  const handleToggleFeatured = async (id) => {
    const result = await propertyService.toggleFeatured(id);
    if (result.success) {
      toast.success(result.message || 'Property featured status updated!');
      fetchProperties();
    } else {
      toast.error(result.error || 'Failed to update featured status');
    }
  };

  // User status toggle handler
  const handleToggleUserStatus = async (id) => {
    const result = await userService.toggleUserStatus(id);
    if (result.success) {
      toast.success('User status updated!');
      fetchUsers();
      fetchStats();
    } else {
      toast.error(result.error || 'Failed to update user status');
    }
  };

  // Delete property handler
  const handleDeleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const result = await propertyService.deleteProperty(id);
      if (result.success) {
        toast.success('Property deleted successfully');
        fetchProperties();
        fetchStats();
      } else {
        toast.error(result.error || 'Failed to delete property');
      }
    }
  };

  // Delete user handler
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This will also delete all their properties.')) {
      const result = await userService.deleteUser(id);
      if (result.success) {
        fetchUsers();
        fetchStats();
      }
    }
  };

  // Contact status update handler
  const handleUpdateContactStatus = async (id, status) => {
    const result = await contactService.updateContactStatus(id, status);
    if (result.success) {
      fetchContacts();
      fetchStats();
    }
  };

  // Delete contact handler
  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const result = await contactService.deleteContact(id);
      if (result.success) {
        fetchContacts();
        fetchStats();
      }
    }
  };

  // Modal handlers
  const openPropertyModal = (property) => {
    setSelectedProperty(property);
    setModalType('property');
    setIsModalOpen(true);
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setModalType('user');
    setIsModalOpen(true);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowEditPropertyModal(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setSelectedUser(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Chart data (mock for now - can be enhanced with real data later)
  const propertyChartData = [
    { month: 'Jan', active: 15, pending: 5, approved: 8 },
    { month: 'Feb', active: 18, pending: 7, approved: 10 },
    { month: 'Mar', active: 22, pending: 4, approved: 12 },
    { month: 'Apr', active: 25, pending: 6, approved: 15 },
    { month: 'May', active: 28, pending: 3, approved: 18 },
    { month: 'Jun', active: 30, pending: 2, approved: 20 },
  ];

  const userGrowthData = [
    { month: 'Jan', admins: 2, users: 45 },
    { month: 'Feb', admins: 2, users: 52 },
    { month: 'Mar', admins: 3, users: 65 },
    { month: 'Apr', admins: 3, users: 78 },
    { month: 'May', admins: 3, users: 85 },
    { month: 'Jun', admins: 4, users: 92 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-600">Loading admin dashboard...</div>
      </div>
    );
  }

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
              <Shield className="w-6 h-6 text-indigo-900" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Admin Panel</span>
          </div>

          <nav className="flex-1 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'properties', label: 'Properties', icon: Home },
              { id: 'users', label: 'User Directory', icon: Users },
              { id: 'contacts', label: 'Inquiries', icon: MessageSquare },
              { id: 'settings', label: 'System', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white border-l-4 border-indigo-400 shadow-inner'
                    : 'text-indigo-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-indigo-400' : ''}`} />
                <span className="font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div layoutId="adminActive" className="ml-auto">
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
                  <p className="text-xs text-indigo-300 truncate">System Overseer</p>
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

      {/* Main Content Area */}
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
            <h2 className="text-xl font-bold text-slate-800 capitalize">{activeSection}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col text-right mr-2">
              <span className="text-sm font-bold text-slate-900">{user?.name}</span>
              <span className="text-xs text-slate-500">Root Access</span>
            </div>
            <button className="p-2 bg-slate-100 text-slate-600 rounded-full relative hover:bg-slate-200 transition-all">
              <Bell className="w-5 h-5" />
              {stats.pendingContacts > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
        </header>

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="p-8 space-y-10">
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { label: 'Market Inventory', value: stats.totalProperties, trend: '+12%', icon: Home, color: 'indigo' },
                { label: 'Approved Assets', value: stats.activeProperties, trend: '94%', icon: CheckCircle, color: 'emerald' },
                { label: 'Active Personnel', value: stats.totalUsers, trend: '+5', icon: Users, color: 'violet' },
                { label: 'Open Inquiries', value: stats.pendingContacts, trend: 'Urgent', icon: MessageSquare, color: 'amber' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden group"
                >
                  <div className={`absolute -right-4 -top-4 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-3xl group-hover:bg-${stat.color}-500/10 transition-colors`} />
                  <div className="relative flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl shadow-sm`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-black px-3 py-1 bg-${stat.color}-100 text-${stat.color}-700 rounded-full tracking-tighter`}>
                        {stat.trend}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Performance Metrics</h3>
                    <p className="text-sm text-slate-500 font-medium tracking-tight">Monthly property approval velocity</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-1 text-xs font-bold text-slate-400">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span>Active</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs font-bold text-slate-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Approved</span>
                    </div>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={propertyChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '20px', 
                          border: 'none', 
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                          padding: '12px 16px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="active" 
                        stroke="#6366f1" 
                        strokeWidth={4} 
                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="approved" 
                        stroke="#10b981" 
                        strokeWidth={4} 
                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">User Acquisition</h3>
                    <p className="text-sm text-slate-500 font-medium tracking-tight">Growth of system participants</p>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                    <Download className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userGrowthData} barGap={8}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                      />
                      <Tooltip 
                         cursor={{ fill: '#f8fafc', radius: 10 }}
                         contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="users" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={20} />
                      <Bar dataKey="admins" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity Analytics */}
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Recent Inventory Updates</h3>
                  <p className="text-sm text-slate-500 font-medium tracking-tight">Latest submissions awaiting audit</p>
                </div>
                <button 
                  onClick={() => setActiveSection('properties')}
                  className="text-xs font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest px-4 py-2 bg-indigo-50 rounded-xl transition-all"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.slice(0, 3).map((property, index) => (
                  <motion.div 
                    key={property._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-slate-50 rounded-[2rem] p-6 border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                     <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                     <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                              property.approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                           }`}>
                              {property.approved ? 'Live' : 'Auditing'}
                           </span>
                           {property.status === 'Sold' && (
                              <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                 Sold
                              </span>
                           )}
                           <span className="ml-auto text-xs font-bold text-slate-400 capitalize">{property.type}</span>
                        </div>
                        <h4 className="font-black text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">{property.title}</h4>
                        <div className="flex items-center text-slate-500 text-xs font-bold mb-4">
                           <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                           <span className="truncate">{property.location}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                           <p className="text-lg font-black text-indigo-600">Rs {property.price?.toLocaleString()}</p>
                           {property.status === 'Sold' && property.buyer ? (
                              <div className="flex items-center text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                                 <Users className="w-3 h-3 mr-1 text-slate-400" />
                                 <span className="truncate max-w-[80px]" title={property.buyer.name}>
                                    {property.buyer.name.split(' ')[0]}
                                 </span>
                              </div>
                           ) : (
                              <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                           )}
                        </div>
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Properties Management Section */}
        {activeSection === 'properties' && (
          <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Property Assets</h2>
                <p className="text-slate-500 font-medium">Manage and audit all listed real estate inventory.</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by ID or Title..."
                    className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-bold placeholder:text-slate-400"
                  />
                </div>
                <button 
                  onClick={() => setShowAddPropertyModal(true)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all text-sm flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>List Asset</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-slate-50/50">
                           <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Asset Identity</th>
                           <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Financials</th>
                           <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                           <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Verification</th>
                           <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Operations</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {properties.map((property) => (
                           <motion.tr 
                              key={property._id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="group hover:bg-slate-50/30 transition-colors"
                           >
                              <td className="px-8 py-6">
                                 <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 overflow-hidden">
                                       {property.images?.[0] ? (
                                          <img src={property.images[0].url} className="w-full h-full object-cover" alt="" />
                                       ) : (
                                          <Home className="w-5 h-5" />
                                       )}
                                    </div>
                                    <div className="overflow-hidden max-w-[200px]">
                                       <p className="font-black text-slate-900 truncate mb-0.5">{property.title}</p>
                                       <p className="text-xs text-slate-500 font-bold flex items-center">
                                          <MapPin className="w-3 h-3 mr-1 text-red-400" />
                                          <span className="truncate">{property.location}</span>
                                       </p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <p className="font-black text-indigo-600 text-lg">Rs {property.price?.toLocaleString()}</p>
                                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{property.type} • {property.area} Sqft</p>
                              </td>
                              <td className="px-8 py-6">
                                 <div className="flex flex-col">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter w-fit mb-1 ${
                                       property.status === 'Sold'
                                       ? 'bg-purple-50 text-purple-600 border border-purple-100'
                                       : 'bg-blue-50 text-blue-600 border border-blue-100'
                                    }`}>
                                       {property.featured && (<span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter bg-amber-100 text-amber-700 border border-amber-200 w-fit mt-1"><Star className="w-2 h-2 mr-1 fill-current" />Featured</span>)}{property.status}
                                    </span>
                                    {property.status === 'Sold' && property.buyer && (
                                       <div className="flex items-center text-xs font-bold text-slate-500">
                                          <Users className="w-3 h-3 mr-1 text-slate-400" />
                                          <span className="truncate max-w-[120px]" title={property.buyer.name}>
                                             {property.buyer.name}
                                          </span>
                                       </div>
                                    )}
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                    property.approved 
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                    : 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse'
                                 }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${property.approved ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    {property.approved ? 'Verified' : 'Pending Review'}
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <div className="flex items-center justify-end space-x-2">
                                     {!property.approved && (
                                        <button 
                                           onClick={() => handleApproveProperty(property._id)}
                                           title="Approve Asset"
                                           className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                        >
                                           <CheckCircle className="w-4 h-4" />
                                        </button>
                                     )}
                                     <button 
                                        onClick={() => handleToggleFeatured(property._id)}
                                        className={`p-2.5 rounded-xl transition-all shadow-sm ${
                                           property.featured 
                                           ? "bg-amber-500 text-white hover:bg-amber-600" 
                                           : "bg-slate-100 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                                        }`}
                                        title={property.featured ? "Remove from Featured" : "Mark as Featured"}
                                     >
                                        <Star className={`w-4 h-4 ${property.featured ? "fill-current" : ""}`} />
                                     </button>
                                     <button 
                                        onClick={() => openPropertyModal(property)}
                                        className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                        title="View Details"
                                     >
                                        <Eye className="w-4 h-4" />
                                     </button>
                                     <button 
                                        onClick={() => handleEditProperty(property)}
                                        className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                                        title="Modify Asset"
                                     >
                                        <Settings className="w-4 h-4" />
                                     </button>
                                     <button 
                                        onClick={() => handleDeleteProperty(property._id)}
                                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                        title="Purge Asset"
                                     >
                                        <Trash2 className="w-4 h-4" />
                                     </button>
                                 </div>
                              </td>
                           </motion.tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               {properties.length === 0 && (
                  <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                     <Home className="w-16 h-16 opacity-10 mb-4" />
                     <p className="font-black uppercase tracking-widest text-xs">No assets indexed in database</p>
                  </div>
               )}
            </div>
          </div>
        )}

        {/* Users Management Section */}
        {activeSection === 'users' && (
          <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">User Directory</h2>
                <p className="text-slate-500 font-medium">Audit and manage system-wide user accounts.</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search personnel..."
                    className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-bold placeholder:text-slate-400"
                  />
                </div>
                <button 
                  onClick={fetchUsers}
                  className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                >
                   <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-slate-50/50">
                           <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Personnel Info</th>
                           <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Access Level</th>
                           <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Account Status</th>
                           <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Administrative Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {users.map((user) => (
                           <motion.tr 
                              key={user._id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="group hover:bg-slate-50/30 transition-colors"
                           >
                              <td className="px-8 py-6">
                                 <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg">
                                       {user.name?.charAt(0)}
                                    </div>
                                    <div className="overflow-hidden">
                                       <p className="font-black text-slate-900 truncate mb-0.5">{user.name}</p>
                                       <p className="text-xs text-slate-500 font-bold truncate">{user.email}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                    user.role === 'admin' 
                                    ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                                    : 'bg-blue-50 text-blue-600 border border-blue-100'
                                 }`}>
                                    <Shield className="w-3 h-3 mr-1.5" />
                                    {user.role}
                                 </span>
                              </td>
                              <td className="px-8 py-6">
                                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                    user.isActive 
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                    : 'bg-slate-100 text-slate-400'
                                 }`}>
                                    {user.isActive ? 'Authorized' : 'Restricted'}
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <div className="flex items-center justify-end space-x-2">
                                     <button 
                                        onClick={() => openUserModal(user)}
                                        className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                                     >
                                        <Eye className="w-4 h-4" />
                                     </button>
                                     <button 
                                        onClick={() => handleToggleUserStatus(user._id)}
                                        title={user.isActive ? "Restrict Account" : "Authorize Account"}
                                        className={`p-2.5 rounded-xl transition-all shadow-sm ${
                                           user.isActive 
                                           ? "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white" 
                                           : "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                                        }`}
                                     >
                                        {user.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                     </button>
                                     {user.role !== 'admin' && (
                                       <button 
                                          onClick={() => handleDeleteUser(user._id)}
                                          className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                       >
                                          <Trash2 className="w-4 h-4" />
                                       </button>
                                    )}
                                 </div>
                              </td>
                           </motion.tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        )}

        {/* Contacts Section */}
        {activeSection === 'contacts' && (
          <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Inquiry Protocol</h2>
                <p className="text-slate-500 font-medium">Capture and audit incoming leads and communications.</p>
              </div>
              <div className="flex items-center space-x-3">
                 <button 
                  onClick={fetchContacts}
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black shadow-sm hover:bg-slate-50 transition-all text-sm flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sync Inbox</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
               {contacts.map((contact) => (
                  <motion.div 
                     key={contact._id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
                  >
                     <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                           <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                              <MessageSquare className="w-7 h-7" />
                           </div>
                           <div>
                              <h4 className="font-black text-slate-900 text-lg mb-0.5">{contact.name}</h4>
                              <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{contact.status} inquiry</p>
                           </div>
                        </div>
                        <div className="flex space-x-2">
                           {contact.status === 'new' && (
                              <button 
                                 onClick={() => handleUpdateContactStatus(contact._id, 'read')}
                                 className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                              >
                                 <Eye className="w-4 h-4" />
                              </button>
                           )}
                           <button 
                              onClick={() => handleDeleteContact(contact._id)}
                              className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                           >
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                     <div className="space-y-4 mb-6">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 transition-all">
                           <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Subject Matter</p>
                           <p className="text-slate-900 font-bold">{contact.subject}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 transition-all">
                           <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Core Message</p>
                           <p className="text-slate-600 font-medium leading-relaxed">{contact.message}</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex items-center space-x-4">
                           <div className="flex items-center text-xs font-bold text-slate-400">
                              <Mail className="w-4 h-4 mr-1.5" />
                              {contact.email}
                           </div>
                        </div>
                        <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                           <Calendar className="w-3 h-3 mr-1.5" />
                           {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                     </div>
                  </motion.div>
               ))}
               {contacts.length === 0 && (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
                     <MessageSquare className="w-20 h-20 opacity-10 mb-6" />
                     <p className="font-black uppercase tracking-widest text-xs">Communication logs are currently empty</p>
                  </div>
               )}
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-10">
               <div className="flex items-center space-x-4 mb-10">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600">
                     <Settings className="w-8 h-8" />
                  </div>
                  <div>
                     <h2 className="text-3xl font-black text-slate-900 tracking-tighter">System Configuration</h2>
                     <p className="text-slate-500 font-medium tracking-tight">Manage global parameters and platform identity.</p>
                  </div>
               </div>
               
               <div className="space-y-10">
                  <section>
                     <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Visual Identity</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <label className="block text-xs font-black text-slate-500 uppercase tracking-tighter mb-2">Platform Nominal</label>
                           <input 
                              type="text" 
                              defaultValue="newDay Realty" 
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-slate-900"
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-black text-slate-500 uppercase tracking-tighter mb-2">Primary Asset Currency</label>
                           <input 
                              type="text" 
                              defaultValue="Rs (NPR)" 
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-slate-900"
                           />
                        </div>
                     </div>
                  </section>

                  <section className="pt-10 border-t border-slate-100">
                     <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Security Protocol</h3>
                     <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-start space-x-4">
                        <Shield className="w-6 h-6 text-amber-600 mt-1" />
                        <div>
                           <p className="font-bold text-amber-900 text-sm">Elevated Privileges Active</p>
                           <p className="text-amber-700 text-xs font-medium">You are currently operating in Root Access mode. All changes will persist across production servers.</p>
                        </div>
                     </div>
                  </section>

                  <div className="flex justify-end pt-10">
                     <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-1 transition-all">
                        Commit Configurations
                     </button>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Property Detail Modal */}
        <AnimatePresence>
          {isModalOpen && modalType === 'property' && selectedProperty && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-72">
                   {selectedProperty.images?.[0] ? (
                      <img src={selectedProperty.images[0].url} className="w-full h-full object-cover" alt="" />
                   ) : (
                      <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600" />
                   )}
                   <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                   <button 
                      onClick={closeModal}
                      className="absolute top-6 right-6 p-2.5 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-all"
                   >
                      <X className="w-5 h-5" />
                   </button>
                   <div className="absolute bottom-8 left-8">
                      <span className="px-3 py-1 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-sm">
                         {selectedProperty.type}
                      </span>
                      <h3 className="text-3xl font-black text-white tracking-tighter">{selectedProperty.title}</h3>
                   </div>
                </div>
                
                <div className="p-10">
                  <div className="flex items-center text-slate-500 font-bold mb-8">
                     <MapPin className="w-4 h-4 mr-2 text-red-500" />
                     {selectedProperty.location}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Price</p>
                      <p className="font-black text-indigo-600">Rs {selectedProperty.price?.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Dimension</p>
                      <p className="font-black text-slate-900">{selectedProperty.area} Sqft</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Sleeps</p>
                      <p className="font-black text-slate-900">{selectedProperty.bedrooms} Units</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Baths</p>
                      <p className="font-black text-slate-900">{selectedProperty.bathrooms} Units</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={closeModal}
                      className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                    >
                      Dismiss
                    </button>
                    {!selectedProperty.approved && (
                      <button 
                        onClick={() => {
                          handleApproveProperty(selectedProperty._id);
                          closeModal();
                        }}
                        className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:shadow-emerald-200 hover:-translate-y-1 transition-all flex items-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Authorize Asset</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* User Detail Modal */}
        <AnimatePresence>
          {isModalOpen && modalType === 'user' && selectedUser && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative bg-white rounded-[3rem] shadow-2xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-linear-to-br from-indigo-600 to-indigo-900 p-12 text-center relative">
                   <button 
                      onClick={closeModal}
                      className="absolute top-6 right-6 p-2.5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
                   >
                      <X className="w-5 h-5" />
                   </button>
                   <div className="w-24 h-24 rounded-[2rem] bg-white mx-auto mb-6 flex items-center justify-center shadow-xl">
                      <span className="text-4xl font-black text-indigo-600">{selectedUser.name?.charAt(0)}</span>
                   </div>
                   <h2 className="text-3xl font-black text-white tracking-tighter mb-1">{selectedUser.name}</h2>
                   <p className="text-indigo-200 font-bold">{selectedUser.email}</p>
                </div>
                
                <div className="p-10">
                  <div className="space-y-8 mb-10">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                         <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Access Protocol</p>
                         <p className="font-black text-slate-900 capitalize">{selectedUser.role} Level</p>
                      </div>
                      <Shield className="w-8 h-8 text-slate-200" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                         <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Network Entry</p>
                         <p className="font-black text-slate-900">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-slate-200" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => {
                        handleToggleUserStatus(selectedUser._id);
                        closeModal();
                      }}
                      className={`flex-1 py-4 rounded-2xl font-black transition-all shadow-lg ${
                        selectedUser.isActive 
                          ? 'bg-amber-500 text-white shadow-amber-100 hover:bg-amber-600' 
                          : 'bg-emerald-500 text-white shadow-emerald-100 hover:bg-emerald-600'
                      }`}
                    >
                      {selectedUser.isActive ? 'Suspend Access' : 'Authorize Login'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* Add Property Modal */}
        <AnimatePresence>
          {showAddPropertyModal && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddPropertyModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b px-8 py-6 flex items-center justify-between">
                  <div>
                     <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Protocol: New Asset Insertion</h2>
                     <p className="text-slate-500 text-sm font-medium">Capture property details for system indexing.</p>
                  </div>
                  <button
                    onClick={() => setShowAddPropertyModal(false)}
                    className="p-3 hover:bg-slate-100 rounded-2xl transition-all"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
                
                <div className="p-10">
                  <SellPropertyCard 
                    isAdminMode={true}
                    onSuccess={() => {
                      setShowAddPropertyModal(false);
                      fetchProperties(); // Refresh properties list
                      fetchStats(); // Also refresh stats as property count might change
                    }}
                    onCancel={() => setShowAddPropertyModal(false)}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Edit Property Modal */}
        <AnimatePresence>
          {showEditPropertyModal && editingProperty && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowEditPropertyModal(false);
                  setEditingProperty(null);
                }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b px-8 py-6 flex items-center justify-between">
                  <div>
                     <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Protocol: Asset Modification</h2>
                     <p className="text-slate-500 text-sm font-medium">Modify existing property data in system indexing.</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowEditPropertyModal(false);
                      setEditingProperty(null);
                    }}
                    className="p-3 hover:bg-slate-100 rounded-2xl transition-all"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
                
                <div className="p-10">
                  <SellPropertyCard 
                    isAdminMode={true}
                    initialData={editingProperty}
                    onSuccess={() => {
                      setShowEditPropertyModal(false);
                      setEditingProperty(null);
                      fetchProperties();
                      fetchStats();
                    }}
                    onCancel={() => {
                      setShowEditPropertyModal(false);
                      setEditingProperty(null);
                    }}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
