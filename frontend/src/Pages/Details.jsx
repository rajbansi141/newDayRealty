import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Car, Layers, Move, Calendar, Phone, Mail, User, ChevronLeft, Loader2, Heart, Share2, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import propertyService from '../services/propertyService';

export default function Details() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const result = await propertyService.getProperty(id);
        if (result.success) {
          setProperty(result.data);
        } else {
          setError(result.error || 'Property not found');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChevronLeft className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error || 'Property not found'}</p>
          <Link to="/properties" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (!window.confirm(`Are you sure you want to purchase "${property.title}" for Rs ${property.price?.toLocaleString()}?`)) {
      return;
    }

    try {
      const result = await propertyService.purchaseProperty(id);
      if (result.success) {
        toast.success('Congratulations! Property purchased successfully.');
        setProperty({ ...property, status: 'Sold', isActive: false, soldAt: new Date() });
      } else {
        toast.error(result.error || 'Failed to complete purchase');
      }
    } catch (err) {
      toast.error('An error occurred during purchase');
    }
  };

  const {
    title,
    price,
    location,
    description,
    status,
    bedrooms,
    bathrooms,
    area,
    areaInAana,
    parking,
    floors,
    roadAccess,
    images,
    type,
    yearBuilt,
    agent,
    soldAt
  } = property;

  const isRecentlySold = status === 'Sold' && soldAt && new Date(soldAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const propertyImages = images && images.length > 0 ? images : [{ url: `https://placehold.co/1200x800/4f46e5/white?text=${type || 'Property'}` }];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/properties" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="font-medium">Back</span>
          </Link>
          {/* <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-full hover:bg-gray-100">
              <Share2 className="w-5 h-5" />
            </button>
          </div> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="relative h-[400px] sm:h-[500px]">
                <img 
                  src={propertyImages[activeImage].url} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
                {isRecentlySold && (
                  <div className="absolute top-6 left-6 z-20 bg-red-600 text-white px-6 py-2 rounded-2xl font-black uppercase tracking-widest shadow-2xl border-2 border-white/20 animate-pulse">
                    SOLD OUT
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-full font-bold text-sm shadow-md">
                  {type}
                </div>
              </div>
              {propertyImages.length > 1 && (
                <div className="p-4 bg-gray-50 flex space-x-4 overflow-x-auto scrollbar-hide">
                  {propertyImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img.url} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Overview */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{title}</h1>
                  <p className="text-gray-600 flex items-center text-lg">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    {location}
                  </p>
                </div>
                <div className="bg-blue-50 px-6 py-4 rounded-2xl border border-blue-100 text-center md:text-right">
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Price</p>
                  <p className="text-3xl font-black text-blue-700">Rs {price?.toLocaleString()}</p>
                </div>
              </div>

              {/* Tag Cloud */}
              <div className="flex flex-wrap gap-6 py-8 border-y border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mr-3 text-indigo-600">
                    <Bed className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Bedrooms</p>
                    <p className="text-lg font-bold text-gray-800">{bedrooms || 0}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mr-3 text-indigo-600">
                    <Bath className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Bathrooms</p>
                    <p className="text-lg font-bold text-gray-800">{bathrooms || 0}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mr-3 text-indigo-600">
                    <Square className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Area</p>
                    <p className="text-lg font-bold text-gray-800">{area || 0} sqft</p>
                  </div>
                </div>
                {areaInAana && (
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mr-3 text-indigo-600">
                      <Move className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Area in Aana</p>
                      <p className="text-lg font-bold text-gray-800">{areaInAana} aana</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                  {description}
                </p>
              </div>
            </div>

            {/* Additional Features Table */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center">
                    <Car className="w-4 h-4 mr-2" /> Parking
                  </span>
                  <span className="font-bold text-gray-800">{parking}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center">
                    <Layers className="w-4 h-4 mr-2" /> Floors
                  </span>
                  <span className="font-bold text-gray-800">{floors || 1}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Road Access
                  </span>
                  <span className="font-bold text-gray-800">{roadAccess ? `${roadAccess} ft.` : 'N/A'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Year Built
                  </span>
                  <span className="font-bold text-gray-800">{yearBuilt || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Purchase Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-green-600" /> Interested in this property?
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="text-gray-500 text-sm">
                   By clicking the button below, you'll be redirected to the purchase flow or an inquiry form.
                </div>
                <button 
                  onClick={handlePurchase}
                  disabled={status === 'Sold'}
                  className={`w-full py-5 ${status === 'Sold' ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-green-200 transform hover:-translate-y-1'} text-white rounded-2xl font-black text-xl shadow-lg shadow-green-100 transition-all flex items-center justify-center uppercase tracking-widest`}
                >
                  {status === 'Sold' ? 'ALREADY SOLD' : 'BUY NOW'}
                </button>
              </div>

              <hr className="my-8 border-gray-100" />

              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Agent</h3>
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl mr-4 shadow-sm">
                    {agent?.name ? agent.name.charAt(0) : 'A'}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{agent?.name || 'Property Agent'}</h4>
                    <p className="text-sm text-gray-500">Expert Consultant</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <a href={`tel:${agent?.phone || '9800000000'}`} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Phone className="w-4 h-4 mr-3 text-blue-500" />
                    <span className="font-medium text-sm">{agent?.phone || '+977 980-0000000'}</span>
                  </a>
                  <a href={`mailto:${agent?.email || 'agent@newdayrealty.com'}`} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Mail className="w-4 h-4 mr-3 text-blue-500" />
                    <span className="font-medium text-sm">{agent?.email || 'agent@newdayrealty.com'}</span>
                  </a>
                </div>
              </div>
              
              <p className="text-center text-xs text-gray-400">
                Property ID: <span className="font-mono">{property._id}</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
