import { API_ENDPOINTS, apiFetch } from '../config/api';

// Contact Service
class ContactService {
  // Submit contact form (public)
  async submitContact(contactData) {
    try {
      const data = await apiFetch(API_ENDPOINTS.CONTACT.BASE, {
        method: 'POST',
        body: JSON.stringify(contactData),
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to submit contact form',
      };
    }
  }

  // Get all contacts (admin only)
  async getContacts(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });

      const url = `${API_ENDPOINTS.CONTACT.BASE}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const data = await apiFetch(url);
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch contacts',
      };
    }
  }

  // Get single contact (admin only)
  async getContact(id) {
    try {
      const data = await apiFetch(API_ENDPOINTS.CONTACT.SINGLE(id));
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch contact',
      };
    }
  }

  // Update contact status (admin only)
  async updateContactStatus(id, status) {
    try {
      const data = await apiFetch(API_ENDPOINTS.CONTACT.STATUS(id), {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update status',
      };
    }
  }

  // Reply to contact (admin only)
  async replyToContact(id, replyMessage) {
    try {
      const data = await apiFetch(API_ENDPOINTS.CONTACT.REPLY(id), {
        method: 'PUT',
        body: JSON.stringify({ replyMessage }),
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to send reply',
      };
    }
  }

  // Delete contact (admin only)
  async deleteContact(id) {
    try {
      const data = await apiFetch(API_ENDPOINTS.CONTACT.SINGLE(id), {
        method: 'DELETE',
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete contact',
      };
    }
  }
}

export default new ContactService();
