import axios from 'axios';
import i18next from 'i18next';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './authService';
import { toast } from 'react-toastify';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Authorization Header
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Accept-Language'] = i18next.language;
  return config;
});

// Response Interceptor: Handle Expired Tokens
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retries

      try {
        // Attempt to refresh the token
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');

        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        // Update tokens and retry the original request
        setTokens(data.access, refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect to login on failure
        clearTokens();
        // Redirect to login page if we are not already there
        // redirect with href
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
          toast.error('Your session has expired. Please login again.');
        }
      }
    }

    return Promise.reject(error); // Pass through other errors
  }
);

export default apiClient;