import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { getToken } from '../utils/TokenStorage';

const createAxiosInstance = (baseURL: string) => {
    const api = axios.create({
        baseURL,
        timeout: 10000
    });

    api.interceptors.request.use(async (config) => {
        const netInfo = await NetInfo.fetch();
        
        if (!netInfo.isConnected) {
            return Promise.reject(new Error('No hay conexión a Internet'));
        }
        
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    });

    return api;
};

export default createAxiosInstance;