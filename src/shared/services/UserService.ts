import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

import createAxiosInstance from '../config/axios.config';
import {
  Credentials,
  FormPassword,
  Login,
  Register,
  UpdateUserInfoRequest,
  UserProfile,
  UserResponse,
} from '../models/UserData';
import { API_ROUTES } from '../config/api.config';

/** Url de la Api */
const BASE_URL = API_ROUTES.base;
const ADMIN_URL = API_ROUTES.admin;
const AUTH_URL = API_ROUTES.auth;

// Instancia para rutas públicas (sin token)
const publicApi = axios.create({
    baseURL: AUTH_URL,
    timeout: 10000
});

// Configurar interceptor solo para verificar conexión en rutas públicas
publicApi.interceptors.request.use(async (config) => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
        return Promise.reject(new Error('No hay conexión a Internet'));
    }
    return config;
});

// Instancia para rutas protegidas (con token)
const api = createAxiosInstance(AUTH_URL);
const adminApi = createAxiosInstance(ADMIN_URL);

/** Rutas públicas (sin token) */
/** Api Get que dice hola de prueba */
export const prueba = async (): Promise<string> => {
  try {
    const response = await publicApi.get<string>(`${AUTH_URL}/hello`);
    return response.data;
  } catch (error) {
    console.error("No funciona " + error);
    throw new Error("Falla esta api");
  }
};

export const registerUser = async (
  UserRegister: Register,
): Promise<Credentials> => {
  try {
    const response = await publicApi.post<Credentials>(`${AUTH_URL}/register`, UserRegister);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (login: Login): Promise<Credentials> => {
  try {
    const response = await publicApi.post<Credentials>(`${AUTH_URL}/login`, login);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Rutas protegidas (con token) */
export const getListUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await adminApi.get<UserResponse[]>(`${ADMIN_URL}/list-users`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const getMyUserInfo = async (): Promise<UserProfile> => {
  try {
    const response = await api.get<UserProfile>(`${AUTH_URL}/info-user`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Api Put: Cambia la contraseña */
export const changePassword = async (
  formPassword: FormPassword): Promise<void> => {
  try {
    await api.put(`${AUTH_URL}/change-password`, formPassword);
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw error;
  }
};

export const updateUserInfo = async (userData: UpdateUserInfoRequest): Promise<UserResponse> => {
  try {
    const response = await api.patch<UserResponse>(`${AUTH_URL}/info-user`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};
