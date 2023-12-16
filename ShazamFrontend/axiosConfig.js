// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    
    baseURL: 'http://10.188.81.108:3000/'
    //baseURL: 'http://10.126.8.129:3000/'


});

export default axiosInstance;
