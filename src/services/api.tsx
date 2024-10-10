import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (username: string, password: string) => {
  return await api.post('/register', { username, password });
};

export const loginUser = async (username: string, password: string) => {
  return await api.post('/login', { username, password });
};

export const uploadImage = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);
  return await api.post('/upload', formData, {
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });
};

export const fetchImages = async (token: string) => {
  const response = await api.get('/images', { // Use the instance instead of axios directly
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
