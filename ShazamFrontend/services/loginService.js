import axiosInstance from '../axiosConfig';

export const loginService =  async (login, password) => {
    try {
        const response =  await axiosInstance.post('api/auth/login', {
            login,
            password
        });
        console.log(login);
        console.log(password);
        console.log(response.data);
        console.log(response.data.user_token);
        return response.data; // Retourne les données de la réponse (par exemple, le token)
    } catch (error) {
        console.error("Erreur lors de la connexion", error);
        throw error;
    }
};
