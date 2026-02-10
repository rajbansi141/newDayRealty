import { API_ENDPOINTS, apiFetch } from '../config/api';

// User Service (Admin only)
class UserService {
  // Get all users (admin only)
  async getUsers(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });

      const url = `${API_ENDPOINTS.USERS.BASE}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const data = await apiFetch(url);
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch users',
      };
    }
  }

  // Get single user (admin only)
  async getUser(id) {
    try {
      const data = await apiFetch(API_ENDPOINTS.USERS.SINGLE(id));
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch user',
      };
    }
  }

  // Get user statistics (admin only)
  async getUserStats() {
    try {
      const data = await apiFetch(API_ENDPOINTS.USERS.STATS);
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch statistics',
      };
    }
  }

  // Update user (admin only)
  async updateUser(id, userData) {
    try {
      const data = await apiFetch(API_ENDPOINTS.USERS.SINGLE(id), {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update user',
      };
    }
  }

  // Delete user (admin only)
  async deleteUser(id) {
    try {
      const data = await apiFetch(API_ENDPOINTS.USERS.SINGLE(id), {
        method: 'DELETE',
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete user',
      };
    }
  }

  // Toggle user status (admin only)
  async toggleUserStatus(id) {
    try {
      const data = await apiFetch(API_ENDPOINTS.USERS.TOGGLE_STATUS(id), {
        method: 'PUT',
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to toggle status',
      };
    }
  }

  // Toggle favorite property
  async toggleFavorite(propertyId) {
    try {
      const data = await apiFetch(API_ENDPOINTS.USERS.TOGGLE_FAVORITE(propertyId), {
        method: 'POST',
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to toggle favorite',
      };
    }
  }

  // Get user's favorites
  async getFavorites() {
    try {
      const data = await apiFetch(API_ENDPOINTS.USERS.FAVORITES);
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch favorites',
      };
    }
  }
}

export default new UserService();
