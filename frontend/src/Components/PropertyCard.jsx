import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Car, Layers, Move, Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/userService';
import { toast } from 'react-toastify';

export default function PropertyCard({ property }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.favorites && property) {
      setIsFavorite(user.favorites.some(id => 
        (typeof id === 'string' ? id : id._id) === property._id
      ));
    }
  }, [user, property]);

  if (!property) return null;

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      toast.info('Please login to add to favorites');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const res = await userService.toggleFavorite(property._id);
      if (res.success) {
        setIsFavorite(res.isFavorite);
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const {
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    areaInAana,
    parking,
    floors,
    roadAccess,
    images,
    featured,
    type,
    status,
    soldAt
  } = property;

  const isSoldOut = status === 'Sold' && soldAt && new Date(soldAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const hasImage = images && images.length > 0;
  const displayImage = hasImage ? images[0].url : null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {/* Image Section with Hover Zoom */}
      <Link to={`/property/${property._id}`} className="relative h-48 sm:h-56 overflow-hidden group block bg-gray-100">
        {hasImage ? (
          <img 
            src={displayImage} 
            alt={title} 
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center p-6 text-center transform scale-100 group-hover:scale-105 transition-transform duration-500 relative">
            <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-50"></div>
            <h3 className="text-white text-2xl font-bold mb-2 shadow-black/10 drop-shadow-lg leading-tight relative z-10">{title}</h3>
            {/* <div className="h-1 w-12 bg-white/50 rounded-full"></div> */}
          </div>
        )}
        {featured && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20 shadow-md">
            Featured
          </div>
        )}
        {isSoldOut && (
          <div className="absolute top-3 inset-x-3 bg-red-600/90 backdrop-blur-sm text-white py-1.5 rounded-xl text-[10px] font-black uppercase text-center tracking-widest shadow-lg z-20 border border-white/20">
            SOLD OUT
          </div>
        )}
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <button
            onClick={toggleFavorite}
            disabled={loading}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm border ${
              isFavorite 
                ? "bg-red-500/90 border-red-400 text-white" 
                : "bg-white/90 border-white/20 text-gray-600 hover:text-red-500 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          <div className="bg-white/90 backdrop-blur-sm text-indigo-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {type}
          </div>
        </div>
      </Link>
      
      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <Link to={`/property/${property._id}`} className="hover:text-blue-600 transition-colors">
            <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{title}</h2>
          </Link>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-blue-600">Rs {price?.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <p className="text-gray-600 flex items-center mb-4 text-sm">
          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
          <span className="line-clamp-1">{location}</span>
        </p>
        
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-2 text-indigo-500" />
            <span>{bedrooms || 0} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-2 text-indigo-500" />
            <span>{bathrooms || 0} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-2 text-indigo-500" />
            <span>{area || 0} sqft</span>
          </div>
          {areaInAana && (
            <div className="flex items-center">
              <Move className="w-4 h-4 mr-2 text-indigo-500" />
              <span>{areaInAana} aana</span>
            </div>
          )}
          <div className="flex items-center">
            <Car className="w-4 h-4 mr-2 text-indigo-500" />
            <span>Parking: {parking}</span>
          </div>
          <div className="flex items-center">
            <Layers className="w-4 h-4 mr-2 text-indigo-500" />
            <span>{floors || 1} floors</span>
          </div>
          {roadAccess && (
            <div className="flex items-center col-span-2">
              <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
              <span>Road access: {roadAccess} ft.</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
              A
            </div>
            <span className="ml-2 text-gray-500 text-xs">Agent</span>
          </div>
          <Link 
            to={`/property/${property._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
