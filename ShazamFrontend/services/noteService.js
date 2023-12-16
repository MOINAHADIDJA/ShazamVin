import axiosInstance from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Récupérer les notes par wineId
export const fetchNotesByWine = async (wineId) => {
    console.log("noteservice front");
    const token = await AsyncStorage.getItem('userToken');
    console.log("noteservice front 22");
    return axiosInstance.get(`/api/wine/${wineId}/notes`, {
         headers: { Authorization: `Bearer ${token}` }
    });
};

// Récupérer les notes par userId
export const getNotesByUser = async (userId) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.get(`/api/user/${userId}/notes`, {
         headers: { Authorization: `Bearer ${token}` }
    });
};

// Ajouter une note
export const addNote = async (noteData) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.post('/api/notes', noteData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Mettre à jour une note
export const updateNote = async (noteId, noteData) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.put(`/api/updateNote/${noteId}`, noteData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Supprimer une note
export const deleteNote = async (noteId) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.delete(`/api/deleteNote/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
