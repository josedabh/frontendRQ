import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Key } from 'react';

import { Login, Register, UserResponse } from '../models/UserData';

/** Url de la Api */
const url = "http://localhost:8080/api";

/** Api Get que dice hola de prueba */
export const prueba = async (): Promise<string> => {
    try {
        const response = await axios.get<string>(`${url}/user/auth/hello`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("No funciona " + error);
        throw new Error("Falla esta apiS");
    }
}

/**Api Get: lista de usuarios */
export const getUsers = async (): Promise<UserResponse[]> => {
    try {
        const response = await axios.get<UserResponse[]>(`${url}/user/auth/users`);
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
        const newUser = await axios.post<Register>(url + "user/auth/register");
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
        const token = await axios.post<Key>(`${url}/user/auth/login`, { login });
        return token.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**Cambiar */
export const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('token');
};

/**Cambiar */
export const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem('token');
};