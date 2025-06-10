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

/** Url de la Api */
const BASE_URL = "http://vps-5060784-x.dattaweb.com:8080/api/v1";
const ADMIN_URL = `${BASE_URL}/admin`;
const AUTH_URL = `${BASE_URL}/auth`;

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
    const response = await publicApi.get<string>('/hello');
    return response.data;
  } catch (error) {
    console.error("No funciona " + error);
    throw new Error("Falla esta api");
  }
};

/** Api Post: Registra el usaurio al no estar logeado
 * @returns token para validar la llamadas de la api
 */
export const registerUser = async (
  UserRegister: Register,
): Promise<Credentials> => {
  try {
    const response = await publicApi.post<Credentials>('/register', UserRegister);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Api Post: Inicio de sesion del usuario
 * @returns token para validar la llamadas de la api
 */
export const loginUser = async (login: Login): Promise<Credentials> => {
  try {
    const response = await publicApi.post<Credentials>('/login', login);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Rutas protegidas (con token) */
/** Api Get: lista de usuarios */
export const getListUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await adminApi.get<UserResponse[]>('/list-users');
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

/** Api Get: Muestra la informacion del usuario actual */
export const getMyUserInfo = async (): Promise<UserProfile> => {
  try {
    const response = await api.get<UserProfile>('/info-user');
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
    await api.put('/change-password', formPassword);
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw error;
  }
};

export const updateUserInfo = async (userData: UpdateUserInfoRequest): Promise<UserResponse> => {
  try {
    const response = await api.patch<UserResponse>('/info-user', userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};
