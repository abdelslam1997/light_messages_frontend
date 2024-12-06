import apiClient from './api';

export const getCurrentUser = async () => {
  const response = await apiClient.get('/users/');
  return response.data;
};

export const listUsers = async () => {
  const response = await apiClient.get('/users/list/');
  return response.data;
}