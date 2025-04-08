import axios from 'axios';
import { Register } from '../data/user-data';
import { Key } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    id: string;
    name: string;
    email: string;
}
const url = "http://localhost:8081/api"
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>('https://example.com/api/users');
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

export const loginUser = async (email:string, password:string): Promise<Key> => {
    try {
        const token = await axios.post<Key>(`${url}/user/auth/login`, {
            email,
            password
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