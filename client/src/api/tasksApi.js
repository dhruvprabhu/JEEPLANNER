import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleTokenExpiry = (error) => {
  if (error.response?.status === 403) {
    return 'Invalid Token';
  }
  return error.message;
};

export const fetchTasksApi = async () => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw handleTokenExpiry(error);
  }
};

export const addTaskApi = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw handleTokenExpiry(error);
  }
};

export const updateTaskApi = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    throw handleTokenExpiry(error);
  }
};

export const deleteTaskApi = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
  } catch (error) {
    throw handleTokenExpiry(error);
  }
};

export const completeTaskApi = async (id) => {
  try {
    await axios.put(`${API_URL}/complete/${id}`, {}, { headers: getAuthHeader() });
  } catch (error) {
    throw handleTokenExpiry(error);
  }
};
