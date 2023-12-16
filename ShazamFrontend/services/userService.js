
import axiosInstance from '../axiosConfig';

export const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/users');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
    }
};

