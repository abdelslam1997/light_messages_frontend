import apiClient from './api';

export const getCurrentUser = async () => {
  const response = await apiClient.get('/users/me/');
  return response.data;
};

export const searchUsers = async (searchTerm) => {
  const response = await apiClient.get(`/users/search/?query=${searchTerm}`);
  return response.data;
};