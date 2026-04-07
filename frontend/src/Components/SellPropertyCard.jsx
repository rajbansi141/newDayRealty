import React, { useState, useEffect } from 'react';
import { Home, MapPin, Bed, Bath, Square, Upload, Plus, X, Loader2, Info, Building2, Car, Calendar, DollarSign, FileText, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import propertyService from '../services/propertyService';

export default function SellPropertyCard({ onSuccess, onCancel, isAdminMode = false, initialData = null }) {
  const [images, setImages] = useState(initialData?.images || []);
  const [loading, setLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    type: initialData?.type || '',
    location: initialData?.location || '',
    bedrooms: initialData?.bedrooms || '',
    bathrooms: initialData?.bathrooms || '',
    area: initialData?.area || '',
    areaInAana: initialData?.areaInAana || '',
    areaUnit: initialData?.areaUnit || 'aana',
    price: initialData?.price || '',
    description: initialData?.description || '',
    roadAccess: initialData?.roadAccess || '',
    floors: initialData?.floors || '',
    parking: initialData?.parking || 'Not Available',
    address: initialData?.address || '',
    yearBuilt: initialData?.yearBuilt || new Date().getFullYear(),
  });

  const isEditMode = !!initialData;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].url);
      return newImages.filter((_, i) => i !== index);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset prediction when key fields change
    if (['bedrooms', 'bathrooms', 'area', 'areaInAana', 'location', 'parking', 'floors', 'roadAccess'].includes(name)) {
      setPredictedPrice(null);
    }
  };

  const handleUnitToggle = (newUnit) => {
    if (newUnit === formData.areaUnit) return;
    
    setFormData(prev => {
      const updates = { areaUnit: newUnit };
      if (newUnit === 'sqft' && prev.areaInAana) {
        updates.area = (parseFloat(prev.areaInAana) * 342.25).toFixed(2);
      } else if (newUnit === 'aana' && prev.area) {
        updates.areaInAana = (parseFloat(prev.area) / 342.25).toFixed(2);
      }
      return { ...prev, ...updates };
    });
    
    // Reset prediction when area unit changes
    setPredictedPrice(null);
  };

  // Get price prediction
  const getPricePrediction = async () => {
    // Validate required fields
    if (!formData.bedrooms || !formData.bathrooms || !formData.location) {
      toast.warning('Please fill in bedrooms, bathrooms, and location first');
      return;
    }

    const area = formData.areaUnit === 'aana' && formData.areaInAana 
      ? (parseFloat(formData.areaInAana) * 342.25).toFixed(2)
      : formData.area;

    if (!area || parseFloat(area) <= 0) {
      toast.warning('Please enter a valid area');
      return;
    }

    setLoadingPrediction(true);

    try {
      const result = await propertyService.predictPrice({
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        parking: formData.parking,
        floors: parseInt(formData.floors) || 1,
        roadAccess: parseFloat(formData.roadAccess) || 0,
        area: parseFloat(area),
        location: formData.location,
      });

      if (result.success) {
        setPredictedPrice(result.data);
        toast.success('Price prediction generated!');
      } else {
        toast.error(result.error || 'Failed to predict price');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to get price prediction');
    } finally {
      setLoadingPrediction(false);
    }
  };

  // Auto-predict when key fields are filled
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.bedrooms && formData.bathrooms && formData.location && 
          (formData.area || formData.areaInAana) && !predictedPrice && !loadingPrediction) {
        getPricePrediction();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.bedrooms, formData.bathrooms, formData.location, formData.area, formData.areaInAana]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Prepare data for backend
    // Ensure area (sqft) is always sent as it's required in backend
    const submissionData = { ...formData };
    
    if (formData.areaUnit === 'aana' && formData.areaInAana) {
      submissionData.area = (parseFloat(formData.areaInAana) * 342.25).toFixed(2);
    } else if (formData.areaUnit === 'sqft' && formData.area) {
      submissionData.areaInAana = (parseFloat(formData.area) / 342.25).toFixed(2);
    }

    const propertyData = {
      ...submissionData,
      images: images.map((img, index) => ({
        url: img.url, // In a real app, this would be the actual server URL after upload
        publicId: `mock_id_${index}`
      }))
    };

    if (isAdminMode) {
      propertyData.approved = true;
    }

    try {
      let result;
      if (isEditMode) {
        result = await propertyService.updateProperty(initialData._id, propertyData);
      } else {
        result = await propertyService.createProperty(propertyData);
      }

      if (result.success) {
        toast.success(isEditMode ? 'Property updated successfully!' : 'Property listed successfully!');
        if (onSuccess) onSuccess(result.data);
      } else {
        toast.error('Error: ' + (result.error || result.message));
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
      >
        <div className="bg-slate-900 px-8 py-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {isEditMode ? 'Edit Property Details' : 'Property Details'}
              </h2>
               <p className="text-slate-400 text-sm">Fill in the information below to list your property.</p>
            </div>
            <div className="bg-indigo-600/20 p-3 rounded-xl border border-indigo-500/30">
               <Building2 className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Section 1: Basic Info */}
            <section>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <Info className="w-5 h-5 text-indigo-600" /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                 <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Property Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Modern Villa with Garden in Baluwatar"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                  />
                 </div>

                 <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Property Type</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700 appearance-none"
                    >
                      <option value="">Select Type</option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                 </div>
              </div>
            </section>

             {/* Section 2: Location */}
             <section>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-indigo-600" /> Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">City / Area</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Kathmandu"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Ward 4, Baluwatar Street"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Features */}
            <section>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" /> Features & Amenities
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Bedrooms</label>
                   <div className="relative">
                      <Bed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                      />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Bathrooms</label>
                   <div className="relative">
                      <Bath className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                      />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Floors</label>
                   <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="number"
                        name="floors"
                        value={formData.floors}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                      />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Parking</label>
                   <div className="relative">
                      <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <select
                        name="parking"
                        value={formData.parking}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700 appearance-none"
                      >
                         <option value="Available">Available</option>
                         <option value="Not Available">Not Available</option>
                      </select>
                   </div>
                </div>
                <div className="col-span-2">
                   <label className="block text-sm font-bold text-slate-700 mb-2">Total Area</label>
                   <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Square className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          type="number"
                          name={formData.areaUnit === 'aana' ? 'areaInAana' : 'area'}
                          value={formData.areaUnit === 'aana' ? formData.areaInAana : formData.area}
                          onChange={handleInputChange}
                          placeholder="Area Size"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                        />
                      </div>
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => handleUnitToggle('aana')}
                          className={`px-4 rounded-lg text-sm font-bold transition-all ${formData.areaUnit === 'aana' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Aana
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUnitToggle('sqft')}
                          className={`px-4 rounded-lg text-sm font-bold transition-all ${formData.areaUnit === 'sqft' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Sqft
                        </button>
                      </div>
                   </div>
                </div>
                <div className="col-span-2">
                   <label className="block text-sm font-bold text-slate-700 mb-2">Road Access (ft)</label>
                   <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        name="roadAccess"
                        value={formData.roadAccess}
                        onChange={handleInputChange}
                        placeholder="e.g. 20 ft"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                      />
                   </div>
                </div>
              </div>
            </section>

             {/* Section 4: Description */}
             <section>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <FileText className="w-5 h-5 text-indigo-600" /> Description
              </h3>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Tell us more about your property..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700 resize-none"
              ></textarea>
             </section>

            {/* Section 5: Gallery */}
            <section>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-600" /> Gallery
                </h3>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Max 8 Images</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group aspect-square rounded-xl overflow-hidden shadow-sm border border-slate-100">
                    <img 
                      src={image.url} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors text-white"
                       >
                         <X className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                ))}
                
                {images.length < 8 && (
                  <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-indigo-200 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group">
                    <div className="bg-indigo-50 p-3 rounded-full mb-3 group-hover:bg-indigo-100 transition-colors">
                       <Plus className="w-6 h-6 text-indigo-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600">Add Photo</span>
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
            </section>

            {/* Section 6: AI Price Prediction & Final Price */}
            <section>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                <DollarSign className="w-5 h-5 text-indigo-600" /> Price Information
              </h3>

              {/* AI Price Prediction Button */}
              {!predictedPrice && formData.bedrooms && formData.bathrooms && formData.location && (formData.area || formData.areaInAana) && (
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={getPricePrediction}
                    disabled={loadingPrediction}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loadingPrediction ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing Property...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Get AI Price Suggestion</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* AI Price Prediction Card */}
              <AnimatePresence>
                {predictedPrice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-indigo-600 p-2 rounded-lg">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="text-sm font-bold text-slate-800">AI Price Suggestion</h4>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-slate-600 mb-1">Predicted Price</p>
                            <p className="text-2xl font-bold text-indigo-600">
                              NPR {predictedPrice.predictedPrice?.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <p className="text-xs text-slate-600">Per Sq.Ft</p>
                              <p className="font-bold text-slate-700">
                                NPR {predictedPrice.pricePerSqft?.toLocaleString()}
                              </p>
                            </div>
                            {formData.price && (
                              <div>
                                <p className="text-xs text-slate-600">Difference</p>
                                <p className={`font-bold ${
                                  formData.price > predictedPrice.predictedPrice 
                                    ? 'text-green-600' 
                                    : 'text-orange-600'
                                }`}>
                                  {formData.price > predictedPrice.predictedPrice ? '+' : ''}
                                  {((formData.price - predictedPrice.predictedPrice) / predictedPrice.predictedPrice * 100).toFixed(1)}%
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, price: Math.round(predictedPrice.predictedPrice) }));
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                      >
                        <TrendingUp className="w-4 h-4" />
                        Use This Price
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Final Price Input */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Final Property Price (NPR)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter price or use AI suggestion"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700"
                  />
                </div>
                {formData.price && (
                  <p className="mt-2 text-sm text-slate-600">
                    Price per sq.ft: NPR {(formData.price / (formData.areaUnit === 'aana' ? formData.areaInAana * 342.25 : formData.area)).toLocaleString(undefined, {maximumFractionDigits: 2})}
                  </p>
                )}
              </div>
            </section>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
               {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{isEditMode ? 'Update Property' : 'Submit Listing'}</span>
                )}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
}
