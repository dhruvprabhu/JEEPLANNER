import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllNotes = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch notes');
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await axios.post(API_URL, noteData, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create note');
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, noteData, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update note');
  }
};

export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete note');
  }
};
