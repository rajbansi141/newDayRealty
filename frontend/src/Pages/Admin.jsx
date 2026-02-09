import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import propertyService from '../services/propertyService';
import userService from '../services/userService';
import contactService from '../services/contactService';
import SellPropertyCard from '../Components/SellPropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Loader2, Users, Home, MessageSquare, Trash2, CheckCircle, XCircle, BarChart3, Settings, LogOut, LayoutDashboard, ChevronRight, Eye, MoreVertical } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
      setStats({
        totalProperties: allProperties.length,
        activeProperties: allProperties.filter(p => p.approved).length,
        totalUsers: userStatsResult.data.totalUsers || 0,
        activeUsers: userStatsResult.data.activeUsers || 0,
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
      fetchProperties();
      fetchStats();
    }
  };

  // User status toggle handler
  const handleToggleUserStatus = async (id) => {
    const result = await userService.toggleUserStatus(id);
    if (result.success) {
      fetchUsers();
      fetchStats();
    }
  };

  // Delete property handler
  const handleDeleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const result = await propertyService.deleteProperty(id);
      if (result.success) {
        fetchProperties();
        fetchStats();
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-64 bg-linear-to-b from-indigo-900 to-purple-900 text-white fixed h-full shadow-xl z-50"
      >
        <div className="p-6">
          <div className="flex items-center mb-10">
            <div className="bg-white p-2 rounded-lg mr-3">
              <span className="text-indigo-800 text-2xl font-bold">🏠</span>
            </div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          
          <nav>
            <ul className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'properties', label: 'Properties', icon: '🏠' },
                { id: 'users', label: 'Users', icon: '👥' },
                { id: 'contacts', label: 'Contacts', icon: '📧' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((item) => (
                <motion.li 
                  key={item.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeSection === item.id 
                        ? 'bg-white text-indigo-900 font-medium' 
                        : 'hover:bg-indigo-800/30'
                    }`}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-300 mr-3 flex items-center justify-center">
              <span className="text-indigo-900 font-bold">{user?.name?.charAt(0) || 'A'}</span>
            </div>
            <div>
              <p className="font-medium">{user?.name || 'Admin'}</p>
              <p className="text-xs opacity-75">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        {/* Top Navigation Bar */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{activeSection}</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full shadow-md cursor-pointer relative">
              <span>🔔</span>
              {stats.pendingContacts > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {stats.pendingContacts}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[ 
                { label: 'Total Properties', value: stats.totalProperties, icon: '🏠', color: 'bg-blue-500' },
                { label: 'Approved Properties', value: stats.activeProperties, icon: '✅', color: 'bg-green-500' },
                { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'bg-purple-500' },
                { label: 'Pending Contacts', value: stats.pendingContacts, icon: '📧', color: 'bg-amber-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6 flex items-center"
                >
                  <div className={`${stat.color} p-4 rounded-lg mr-4`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">📊</span> Property Status Overview
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={propertyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">👥</span> User Growth
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="admins" fill="#6366f1" />
                      <Bar dataKey="users" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">⏰</span> Recent Properties
              </h2>
              <div className="space-y-4">
                {properties.slice(0, 5).map((property) => (
                  <div key={property._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-gray-500 text-sm">{property.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">Rs {property.price?.toLocaleString()}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        property.approved ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {property.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Properties Management Section */}
        {activeSection === 'properties' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Property Management</h2>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowAddPropertyModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors shadow-sm"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Property
                </button>
                <button 
                  onClick={fetchProperties}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <span className="mr-2">🔄</span> Refresh
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{property.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-indigo-600">Rs {property.price?.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>🛏️ {property.bedrooms} | 🛁 {property.bathrooms} | 📏 {property.area} sqft</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          property.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => openPropertyModal(property)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </button>
                        {!property.approved && (
                          <button 
                            onClick={() => handleApproveProperty(property._id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteProperty(property._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Management Section */}
        {activeSection === 'users' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <button 
                onClick={fetchUsers}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <span className="mr-2">🔄</span> Refresh
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                            <span className="font-bold text-gray-600">{user.name?.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => openUserModal(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleToggleUserStatus(user._id)}
                          className={`${
                            user.isActive ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {user.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        {user.role !== 'admin' && (
                          <button 
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contacts Section */}
        {activeSection === 'contacts' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Contact Messages</h2>
              <button 
                onClick={fetchContacts}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <span className="mr-2">🔄</span> Refresh
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {contact.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                          contact.status === 'replied' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {contact.status === 'new' && (
                          <button 
                            onClick={() => handleUpdateContactStatus(contact._id, 'read')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Mark Read
                          </button>
                        )}
                        {contact.status !== 'archived' && (
                          <button 
                            onClick={() => handleUpdateContactStatus(contact._id, 'archived')}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            Archive
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteContact(contact._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">System Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input 
                      type="text" 
                      defaultValue="newDay Realty" 
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors mr-3">
                  Save Changes
                </button>
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Property Detail Modal */}
        {isModalOpen && modalType === 'property' && selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="relative h-64 bg-linear-to-r from-indigo-500 to-purple-600">
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-bold">
                  {selectedProperty.approved ? 'APPROVED' : 'PENDING'}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white opacity-80">{selectedProperty.type?.toUpperCase()}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedProperty.title}</h2>
                <p className="text-gray-600 flex items-center mb-4">
                  <span className="mr-2">📍</span> {selectedProperty.location}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="font-bold text-xl text-indigo-600">Rs {selectedProperty.price?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Area</p>
                    <p className="font-medium">{selectedProperty.area} sqft</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Bedrooms</p>
                    <p className="font-medium">{selectedProperty.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Bathrooms</p>
                    <p className="font-medium">{selectedProperty.bathrooms}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  {!selectedProperty.approved && (
                    <button 
                      onClick={() => {
                        handleApproveProperty(selectedProperty._id);
                        closeModal();
                      }}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve Property
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Detail Modal */}
        {isModalOpen && modalType === 'user' && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-indigo-600">{selectedUser.name?.charAt(0)}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedUser.name}</h2>
                <p className="text-indigo-100">{selectedUser.email}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">User Role</p>
                    <p className="font-bold text-lg capitalize">{selectedUser.role}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Account Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedUser.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedUser.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Member Since</p>
                    <p className="font-medium">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-6 border-t mt-4">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      handleToggleUserStatus(selectedUser._id);
                      closeModal();
                    }}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      selectedUser.isActive 
                        ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {selectedUser.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Add Property Modal */}
        <AnimatePresence>
          {showAddPropertyModal && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddPropertyModal(false)}
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Add New Property</h2>
                  <button
                    onClick={() => setShowAddPropertyModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                
                <div className="p-6">
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
      </main>
    </div>
  );
}
