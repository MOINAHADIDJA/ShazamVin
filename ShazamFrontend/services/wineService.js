
// import axiosInstance from '../axiosConfig';

// export const fetchWines = async () => {
//     try {
//         console.log(234567);
//         const response = await axiosInstance.get('/api/wines');
//         console.log(6666666);
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Erreur lors de la récupération des vins", error);
//     }
// };

import axiosInstance from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchWines = async () => {
    try {
          console.log(234567);
        const token = await AsyncStorage.getItem('userToken');
        const response = await axiosInstance.get('/api/wines', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
          console.log(33333);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des vins", error);
    }
};

export const getWineById = async (wineId) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.get(`/api/wines/${wineId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const addWine = async (wineData) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.post('/api/wine', wineData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};


export const updateWine = async (wineId, wineData) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.put(`/api/updatewine/${wineId}`, wineData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteWine = async (wineId) => {
    const token = await AsyncStorage.getItem('userToken');
    return axiosInstance.delete(`/api/deletewine/${wineId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const searchWines = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axiosInstance.get('/api/search-wines', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du vin recherché", error);
    }
};