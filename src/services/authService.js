import apiClient from './api';
import i18next from 'i18next'; // Import i18next

// Register a new user
export const registerUser = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data', // For file uploads
      'Accept-Language': i18next.language,
    },
  };
  const response = await apiClient.post('/users/', formData, config);
  return response.data;
};