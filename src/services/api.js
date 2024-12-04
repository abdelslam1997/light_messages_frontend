import axios from 'axios';

console.log('NODE_ENV:', process.env.NODE_ENV); // Should log "development"
console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (e.g., add auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add authorization token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (e.g., handle errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
