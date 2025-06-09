import axios from 'axios';

import { getToken } from '../../shared/utils/TokenStorage';
import { Credentials, FormPassword, Login, Register, UpdateUserInfoRequest, UserProfile, UserResponse } from '../models/UserData';

/** Url de la Api */
const URL = "http://localhost:8080/api/v1/auth";

const getAuthHeaders = async () => {
  const token = await getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

/** Api Get que dice hola de prueba */
export const prueba = async (): Promise<string> => {
  try {
    const response = await axios.get<string>(`${URL}/hello`);
    return response.data;
  } catch (error) {
    console.error("No funciona " + error);
    throw new Error("Falla esta api");
  }
};

/**Api Get: lista de usuarios */
export const getListUsers = async (): Promise<UserResponse[]> => {
  try {
    const headers = await getAuthHeaders();
    const URL2 = URL.replace("auth", "admin");
    const response = await axios.get<UserResponse[]>(
      `${URL2}/list-users`,
      { headers },
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

/** Api Post: Registra el usaurio al no estar logeado
 * @returns token para validar la llamadas de la api
 */
export const registerUser = async (
  UserRegister: Register,
): Promise<Credentials> => {
  try {
    const newUser = await axios.post<Credentials>(
      `${URL}/register`,
      UserRegister,
    );
    return newUser.data;
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
    const token = await axios.post<Credentials>(`${URL}/login`, login);
    return token.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Api Get: Muestra la informacion del usuario actual */
export const getMyUserInfo = async (): Promise<UserProfile> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get<UserProfile>(`${URL}/info-user`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**Api Put: Cambia la contraseña */
export const changePassword = async (
  formPassword: FormPassword): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await axios.put( `${URL}/change-password`, formPassword ,
      { headers });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw error;
  }
};

export const updateUserInfo = async (userData: UpdateUserInfoRequest): Promise<UserResponse> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.patch<UserResponse>(
      `${URL}/info-user`, 
      userData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};
