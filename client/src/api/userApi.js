import axios from 'axios';

// Function to get the authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// API endpoint URL
const API_URL = 'http://localhost:5000/api/auth'; // Adjust if necessary

// Delete user API call
export const deleteUser = async () => {
    try {
      const response = await axios.delete(`${API_URL}/delete`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
};

// Existing updateUser function
export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/update-user`, userData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
