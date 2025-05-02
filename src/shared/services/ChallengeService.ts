import axios from 'axios';

import { getToken } from '../../context/AuthContext';
import { ChallengeCard, ChallengeResponse } from '../models/ChallengeData';

/** Url de la Api */
const URL = "http://localhost:8080/api/v1/challenge";

const getAuthHeaders = async () => {
    const token = await getToken();
    return {
        Authorization: `Bearer ${token}`,
    };
};
// const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJleGFtcGxlcGVyZXoiLCJpYXQiOjE3NDU3NzgxMjQsImV4cCI6MTc2MTMzMDEyNH0.F0-YrNxLSBDixzlv3EWn9GTq_BVuzD-i431GZHG-JaRhAQKNStYbrUoTQJuhphV9XnZh5MUBvQ-1JxzHn73_GQ";

/**Api Get: lista de retos para cards */
export const getUserChallengeCard = async (): Promise<ChallengeCard[]> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<ChallengeCard[]>(`${URL}/user/list-challenges`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};

/**Api Get: Consigue el reto por id */
export const getChallengeById = async (id:string): Promise<ChallengeResponse> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<ChallengeResponse>(`${URL}/find-challenge/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};