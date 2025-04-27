import axios from 'axios';

import { getToken } from '../../context/AuthContext';
import { Key, Login, Register, UserResponse } from '../models/UserData';

/** Url de la Api */
const URL = "http://localhost:8080/api/v1";
// const TOKEN = getToken();
const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJleGFtcGxlcGVyZXoiLCJpYXQiOjE3NDU3NzgxMjQsImV4cCI6MTc2MTMzMDEyNH0.F0-YrNxLSBDixzlv3EWn9GTq_BVuzD-i431GZHG-JaRhAQKNStYbrUoTQJuhphV9XnZh5MUBvQ-1JxzHn73_GQ";

/** Api Get que dice hola de prueba */
export const prueba = async (): Promise<string> => {
    try {
        const response = await axios.get<string>(`${URL}/user/auth/hello`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("No funciona " + error);
        throw new Error("Falla esta api");
    }
}

/**Api Get: lista de usuarios */
export const getListUsers = async (): Promise<UserResponse[]> => {
    try {
        const response = await axios.get<UserResponse[]>(`${URL}/admin/list-users`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

/** Api Post: Registra el usaurio al no estar logeado 
 * @returns token para validar la llamadas de la api
*/
export const registerUser = async (): Promise<Register> => {
    try {
        const newUser = await axios.post<Register>(URL + "user/auth/register");
        return newUser.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/** Api Post: Inicio de sesion del usuario 
 * @returns token para validar la llamadas de la api
*/
export const loginUser = async (login: Login): Promise<Key> => {
    try {
        const token = await axios.post<Key>(`${URL}/user/auth/login`, { login });
        return token.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// /**Cambiar */
// export const getToken = async (): Promise<string | null> => {
//     return await AsyncStorage.getItem('token');
// };

// /**Cambiar */
// export const logout = async (): Promise<void> => {
//     await AsyncStorage.removeItem('token');
// };