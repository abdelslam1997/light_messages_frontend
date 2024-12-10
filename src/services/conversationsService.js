import apiClient from './api';


// Conversations & Messages APIs
export const chatsHistory = async () => {
    const response = await apiClient.get(`/conversations/`);
    return response.data;
  }
  
export const sendMessageAPI = async (receiver, message) => {
    const response = await apiClient.post(`/conversations/${receiver}/messages/`, { message });
    return response.data;
}

export const getMessagesAPI = async (receiver) => {
    const response = await apiClient.get(`/conversations/${receiver}/messages/`);
    return response.data;
}