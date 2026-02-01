import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoadingSpinner from './Components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Properties from './Pages/Properties';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import UserDashboard from './Pages/UserDashboard';
import Admin from './Pages/Admin';
import Footer from './Components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected User Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              } 
            />

            {/* 404 Catch-all Route */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App