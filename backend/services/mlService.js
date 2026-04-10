import axios from 'axios';

// ML API URL from environment or default to localhost
const ML_API_URL = process.env.ML_API_URL || 'http://localhost:5001';

/**
 * Predict house price using ML model
 * @param {Object} propertyData - Property details
 * @returns {Object} Prediction result
 */
export const predictPrice = async (propertyData) => {
  try {
    // Transform data to match ML model format
    const mlData = {
      Bedrooms: parseInt(propertyData.bedrooms) || 0,
      Bathrooms: parseInt(propertyData.bathrooms) || 0,
      Parking: propertyData.parking === 'Available' ? 1 : 0,
      Floors: parseInt(propertyData.floors) || 1,
      'Road Access': parseFloat(propertyData.roadAccess) || 0,
      'Area (sq.ft)': parseFloat(propertyData.area) || 0,
      Location: propertyData.location || propertyData.city || 'Unknown',
    };

    // Call ML API
    const response = await axios.post(`${ML_API_URL}/predict`, mlData, {
      timeout: 90000, // 90 second timeout (for Render free tier wake-up)
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.success) {
      return {
        success: true,
        predictedPrice: response.data.predicted_price,
        pricePerSqft: response.data.price_per_sqft,
        currency: response.data.currency || 'NPR',
        inputData: mlData,
      };
    } else {
      return {
        success: false,
        error: response.data.error || 'Prediction failed',
      };
    }
  } catch (error) {
    console.error('ML Service Error:', error.message);

    // Check if ML API is unreachable
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return {
        success: false,
        error: 'ML service is currently unavailable. Please try again later.',
        details: 'ML API connection failed',
      };
    }

    return {
      success: false,
      error: 'Failed to predict price',
      details: error.message,
    };
  }
};

/**
 * Predict prices for multiple properties (batch)
 * @param {Array} properties - Array of property objects
 * @returns {Object} Batch prediction result
 */
export const predictPriceBatch = async (properties) => {
  try {
    // Transform all properties
    const mlDataArray = properties.map((prop) => ({
      Bedrooms: parseInt(prop.bedrooms) || 0,
      Bathrooms: parseInt(prop.bathrooms) || 0,
      Parking: prop.parking === 'Available' ? 1 : 0,
      Floors: parseInt(prop.floors) || 1,
      'Road Access': parseFloat(prop.roadAccess) || 0,
      'Area (sq.ft)': parseFloat(prop.area) || 0,
      Location: prop.location || prop.city || 'Unknown',
    }));

    // Call ML API batch endpoint
    const response = await axios.post(
      `${ML_API_URL}/predict/batch`,
      { properties: mlDataArray },
      {
        timeout: 10000, // 10 second timeout for batch
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      return {
        success: true,
        predictions: response.data.predictions,
        count: response.data.count,
        currency: response.data.currency || 'NPR',
      };
    } else {
      return {
        success: false,
        error: response.data.error || 'Batch prediction failed',
      };
    }
  } catch (error) {
    console.error('ML Batch Service Error:', error.message);
    return {
      success: false,
      error: 'Failed to predict prices for batch',
      details: error.message,
    };
  }
};

/**
 * Get ML model information
 * @returns {Object} Model info
 */
export const getModelInfo = async () => {
  try {
    const response = await axios.get(`${ML_API_URL}/model/info`, {
      timeout: 3000,
    });

    if (response.data.success) {
      return {
        success: true,
        modelInfo: response.data,
      };
    } else {
      return {
        success: false,
        error: 'Failed to get model info',
      };
    }
  } catch (error) {
    console.error('ML Model Info Error:', error.message);
    return {
      success: false,
      error: 'ML service unavailable',
      details: error.message,
    };
  }
};

/**
 * Check if ML service is available
 * @returns {Boolean} Service status
 */
export const checkMLServiceHealth = async () => {
  try {
    const response = await axios.get(`${ML_API_URL}/`, {
      timeout: 3000,
    });
    return response.data.status === 'running';
  } catch (error) {
    console.error('ML Health Check Failed:', error.message);
    return false;
  }
};

export default {
  predictPrice,
  predictPriceBatch,
  getModelInfo,
  checkMLServiceHealth,
};
