// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: `${API_URL}/auth/register`,
    LOGIN: `${API_URL}/auth/login`,
    LOGOUT: `${API_URL}/auth/logout`,
    ME: `${API_URL}/auth/me`,
    UPDATE_DETAILS: `${API_URL}/auth/updatedetails`,
    UPDATE_PASSWORD: `${API_URL}/auth/updatepassword`,
  },
  
  // Properties
  PROPERTIES: {
    BASE: `${API_URL}/properties`,
    SINGLE: (id) => `${API_URL}/properties/${id}`,
    FEATURED: `${API_URL}/properties/featured`,
    SEARCH: `${API_URL}/properties/search`,
    APPROVE: (id) => `${API_URL}/properties/${id}/approve`,
  },
  
  // Contact
  CONTACT: {
    BASE: `${API_URL}/contact`,
    SINGLE: (id) => `${API_URL}/contact/${id}`,
    STATUS: (id) => `${API_URL}/contact/${id}/status`,
    REPLY: (id) => `${API_URL}/contact/${id}/reply`,
  },
  
  // Users (Admin only)
  USERS: {
    BASE: `${API_URL}/users`,
    SINGLE: (id) => `${API_URL}/users/${id}`,
    STATS: `${API_URL}/users/stats`,
    TOGGLE_STATUS: (id) => `${API_URL}/users/${id}/toggle-status`,
  },
};

// Get auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Get auth headers
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Base fetch wrapper with error handling
export const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { error: await response.text() };
    }

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('API Parsing Error:', error);
      throw new Error('Server returned an invalid response format');
    }
    console.error('API Error:', error);
    throw error;
  }
};

export default API_URL;
