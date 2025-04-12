import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Key } from 'react';

import { Login, Register, UserResponse } from '../data/user-data';

const url = "http://localhost:8080/api";

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

export const getUsers = async (): Promise<UserResponse[]> => {
    try {
        const response = await axios.get<UserResponse[]>(`${url}/user/auth/users`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

export const registerUser = async (): Promise<Register> => {
    try {
        const newUser = await axios.post<Register>(url + "user/auth/register");
        return newUser.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const loginUser = async (login: Login): Promise<Key> => {
    try {
        const token = await axios.post<Key>(`${url}/user/auth/login`, {
            login
        });
        return token.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('token');
};

export const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem('token');
};