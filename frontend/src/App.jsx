import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import LoadingSpinner from './Components/LoadingSpinner';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Properties from './Pages/Properties';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import UserDashboard from './Pages/UserDashboard';
import SellProperty from './Pages/SellProperty';
import Admin from './Pages/Admin';
import Details from './Pages/Details';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="/property/:id" element={<Details />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected User Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute userOnly={true}>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sell-property" 
              element={
                <ProtectedRoute userOnly={true}>
                  <SellProperty />
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
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </AuthProvider>
  )
}

export default App