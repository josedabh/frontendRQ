import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { getToken } from '../utils/TokenStorage';

const createAxiosInstance = (baseURL: string) => {
    const api = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    api.interceptors.request.use(async (config) => {
        try {
            const netInfo = await NetInfo.fetch();
            
            if (!netInfo.isConnected) {
                return Promise.reject(new Error('No hay conexión a Internet'));
            }
            
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            
            return config;
        } catch (error) {
            console.error('Error en interceptor:', error);
            return Promise.reject(error);
        }
    });

    return api;
};

export default createAxiosInstance;