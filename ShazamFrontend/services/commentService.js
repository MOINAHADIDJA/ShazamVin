import axiosInstance from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCommentsByWine = async (wineId) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.get(`/api/wine/${wineId}/comments`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const fetchCommentsByUser = async (userId) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.get(`/api/user/${userId}/comments`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const addComment = async (commentData) => {
    console.log(commentData);
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.post('/api/comments', commentData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateComment = async (commentId, commentData) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.put(`/api/updatecomment/${commentId}`, commentData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteComment = async (commentId) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.delete(`/api/deletecomment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
