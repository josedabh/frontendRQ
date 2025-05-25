import axios from 'axios';

import { getToken } from '../../shared/utils/TokenStorage';
import { ChallengeRequest, ChallengeResponse } from '../models/ChallengeData';

/** Url de la Api */
const URL = "http://localhost:8080/api/v1/challenge";

const getAuthHeaders = async () => {
  const token = await getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};
// const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJleGFtcGxlcGVyZXoiLCJpYXQiOjE3NDU3NzgxMjQsImV4cCI6MTc2MTMzMDEyNH0.F0-YrNxLSBDixzlv3EWn9GTq_BVuzD-i431GZHG-JaRhAQKNStYbrUoTQJuhphV9XnZh5MUBvQ-1JxzHn73_GQ";

/**Api Get: Consigue el reto por id */
export const getChallengeById = async (
  id: string,
): Promise<ChallengeResponse> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get<ChallengeResponse>(
      `${URL}/find-challenge/${id}`,
      { headers },
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

/**Api Post: Crea un reto */
export const createChallenge = async (
  challengeRequest: ChallengeRequest,
): Promise<ChallengeRequest> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.post<ChallengeRequest>(
      `${URL}/create-challenge`,
      challengeRequest,
      { headers },
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el reto:", error);
    throw error;
  }
};

export const deleteChallenge = async (id: string): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await axios.delete(`${URL}/delete-challenge/${id}`, { headers });
  } catch (error) {
    console.error("Error al eliminar el reto:", error);
    throw error;
  }
}

export const updateChallenge = async (
  id: string,
  challengeRequest: ChallengeRequest,
): Promise<ChallengeRequest> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.put<ChallengeRequest>(
      `${URL}/update-challenge/${id}`,
      challengeRequest,
      { headers },
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el reto:", error);
    throw error;
  }
};

export const getAllChallenges = async (): Promise<ChallengeResponse[]> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get<ChallengeResponse[]>( `${URL}/admin/list-challenges`,
      { headers });
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}