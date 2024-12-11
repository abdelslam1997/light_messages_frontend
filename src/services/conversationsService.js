import apiClient from './api';


// Conversations & Messages APIs
export const chatsHistory = async (nextPageNumber=null) => {
    const nextPageParam = nextPageNumber ? `?page=${nextPageNumber}` : '';
    const response = await apiClient.get(`/conversations/${nextPageParam}`);
    // console.log('Recent Conversations Fetched: ', response);
    return response.data;
  }

export const sendMessageAPI = async (receiver, message) => {
    const response = await apiClient.post(`/conversations/${receiver}/messages/`, { message });
    return response.data;
}

export const getMessagesAPI = async (receiver, nextPageNumber=null) => {
    const nextPageParam = nextPageNumber ? `?page=${nextPageNumber}` : '';
    const response = await apiClient.get(`/conversations/${receiver}/messages/${nextPageParam}`);
    // console.log('Messages Fetched: ',response);
    return response.data;
}