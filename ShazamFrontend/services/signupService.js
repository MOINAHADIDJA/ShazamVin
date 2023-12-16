// signupService.js
import axiosInstance from '../axiosConfig';


export const signup = async (login, name, password) => {
    try {
        console.log(login, name, password);
        const response = await axiosInstance.post('api/auth/signup', {
            login,
            name,
            password
        });
        return response.data; // Returns the response data
    } catch (error) {
        console.error("Erreur lors de l'inscription", error);
        throw error;
    }
};
