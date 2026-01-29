import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Properties from './Pages/Properties';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/login" element={<Login />} />
            
            {/* 404 Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  )
}

export default App