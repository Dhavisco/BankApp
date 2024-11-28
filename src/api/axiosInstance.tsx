import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL; // Assumes you're using Vite for env variables

// Create an Axios instance
 const axiosInstance = axios.create({
  baseURL: API_URL, // Base URL for your API
  headers: {
    'Content-Type': 'application/json', // Default headers
  },
});

// Automatically attach the token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;