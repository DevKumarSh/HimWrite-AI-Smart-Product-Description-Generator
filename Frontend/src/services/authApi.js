import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authApi = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the token to requests
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Interceptor to handle 401s (e.g., token expired)
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Dispatch custom event or handle redirect if needed
      window.dispatchEvent(new Event('auth-error'));
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  const response = await authApi.post('/auth/register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await authApi.post('/auth/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logoutUser = async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  // Optional backend call
  await authApi.post('/auth/logout').catch(e => console.log('Logout error', e));
};

export const getProfile = async () => {
  const response = await authApi.get('/auth/profile');
  return response.data;
};

export default authApi;
