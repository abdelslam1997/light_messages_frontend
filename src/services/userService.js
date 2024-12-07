import apiClient from './api';

export const getCurrentUser = async () => {
  const response = await apiClient.get('/users/');
  return response.data;
};

export const listUsers = async () => {
  const response = await apiClient.get('/users/list/');
  return response.data;
}


// Messages APIs

export const chatsHistory = async () => {
  const response = await apiClient.get(`/messages/`);
  return response.data;
}

export const sendMessageAPI = async (receiver, message) => {
  const response = await apiClient.post('/messages/', { receiver, message });
  return response.data;
}

export const getMessagesAPI = async (receiver) => {
  const response = await apiClient.get(`/messages/${receiver}/`);
  return response.data;
}