import { API_ENDPOINTS, apiFetch } from '../config/api';

// Property Service
class PropertyService {
  // Get all properties
  async getProperties(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });

      const url = `${API_ENDPOINTS.PROPERTIES.BASE}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const data = await apiFetch(url);
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch properties',
      };
    }
  }

  // Get single property
  async getProperty(id) {
    try {
      const data = await apiFetch(API_ENDPOINTS.PROPERTIES.SINGLE(id));
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch property',
      };
    }
  }

  // Get featured properties
  async getFeaturedProperties() {
    try {
      const data = await apiFetch(API_ENDPOINTS.PROPERTIES.FEATURED);
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch featured properties',
      };
    }
  }

  // Search properties
  async searchProperties(searchTerm) {
    try {
      const url = `${API_ENDPOINTS.PROPERTIES.SEARCH}?q=${encodeURIComponent(searchTerm)}`;
      const data = await apiFetch(url);
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Search failed',
      };
    }
  }

  // Create property (authenticated)
  async createProperty(propertyData) {
    try {
      const data = await apiFetch(API_ENDPOINTS.PROPERTIES.BASE, {
        method: 'POST',
        body: JSON.stringify(propertyData),
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create property',
      };
    }
  }

  // Update property (authenticated)
  async updateProperty(id, propertyData) {
    try {
      const data = await apiFetch(API_ENDPOINTS.PROPERTIES.SINGLE(id), {
        method: 'PUT',
        body: JSON.stringify(propertyData),
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update property',
      };
    }
  }

  // Delete property (authenticated)
  async deleteProperty(id) {
    try {
      const data = await apiFetch(API_ENDPOINTS.PROPERTIES.SINGLE(id), {
        method: 'DELETE',
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete property',
      };
    }
  }

  // Purchase property (authenticated)
  async purchaseProperty(id) {
    try {
      const data = await apiFetch(API_ENDPOINTS.PROPERTIES.PURCHASE(id), {
        method: 'PUT',
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to purchase property',
      };
    }
  }
}

export default new PropertyService();
