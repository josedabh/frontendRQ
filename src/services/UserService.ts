import axios from 'axios';
import { Register } from '../data/user-data';

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