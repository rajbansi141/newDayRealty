import { API_ENDPOINTS, apiFetch } from '../config/api';

// Authentication Service
class AuthService {
  // Register new user
  async register(userData) {
    try {
      const data = await apiFetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    }
  }

  // Login user
  async login(email, password) {
    try {
      const data = await apiFetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  }

  // Logout user
  async logout() {
    try {
      await apiFetch(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const data = await apiFetch(API_ENDPOINTS.AUTH.ME);
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get user',
      };
    }
  }

  // Update user details
  async updateDetails(userData) {
    try {
      const data = await apiFetch(API_ENDPOINTS.AUTH.UPDATE_DETAILS, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });

      if (data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Update failed',
      };
    }
  }

  // Update password
  async updatePassword(currentPassword, newPassword) {
    try {
      const data = await apiFetch(API_ENDPOINTS.AUTH.UPDATE_PASSWORD, {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password update failed',
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Get stored user
  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get stored token
  getStoredToken() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
