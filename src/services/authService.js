import apiClient from './api';

// Register a new user
export const registerUser = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data', // For file uploads
    },
  };
  const response = await apiClient.post('/users/', formData, config);
  return response.data;
};

// Login a user
export const loginUser = async (formData) => {
  const response = await apiClient.post('/token/', formData);
  if (response.data.access) {
    setTokens(response.data.access, response.data.refresh);
  }
  return response.data;
};


// Tokens
export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('access_token', accessToken);
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
};

export const isLoggedIn = () => {
  // console.log('Access token:', getAccessToken());
  return !!getAccessToken();
};

export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
