import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

import { getToken } from '../../shared/utils/TokenStorage';
import { ChallengeRequest, ChallengeResponse, ChallengeHistoryResponse } from '../models/ChallengeData';
import createAxiosInstance from '../config/axios.config';

/** Url de la Api */
const BASE_URL = "http://vps-5060784-x.dattaweb.com:8080/api/v1/challenge";

// Instancia para rutas protegidas (con token)
const api = createAxiosInstance(BASE_URL);

// Mantener getAuthHeaders para compatibilidad
const getAuthHeaders = async () => {
  const token = await getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

/**Api Get: Consigue el reto por id */
export const getChallengeById = async (
  id: string,
): Promise<ChallengeResponse> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get<ChallengeResponse>(
      `${BASE_URL}/find-challenge/${id}`,
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
      `${BASE_URL}/create-challenge`,
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
    await axios.delete(`${BASE_URL}/delete-challenge/${id}`, { headers });
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
      `${BASE_URL}/update-challenge/${id}`,
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
    const response = await axios.get<ChallengeResponse[]>( `${BASE_URL}/admin/list-challenges`,
      { headers });
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

/**Api Post: Asigna un tipo de verificación a un reto */
export const assignVerificationType = async (challengeId: string, type: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.patch<String>( `${BASE_URL}/${challengeId}/assign-verification/${type}`, {},
     { headers });
    return response.data;
  } catch (error) {
    console.error("Error al asignar el tipo de verificación:", error);
    throw error;
  }
}

/**Api Delete: Elimina el tipo de verificación de un reto */
export const deleteVerificationType = async (challengeId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.delete<void>( `${BASE_URL}/verification/${challengeId}`,
      { headers });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la verification:", error);
    throw error;
  }
}

export const getNextVerificationId = async (type: string): Promise<string> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(
            `/next-verification-id/${type}`,
            {},
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting quiz:", error);
        throw error;
    }
};


/**Quitaar este interface y servicio para despues */
interface CompleteChallengeParams {
  challengeId: string;
  type: string;
  distance: number;
}

export const completeChallenge = async (params: CompleteChallengeParams) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/challenges/verify`,
    params,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const joinChallenge = async (challengeId: string): Promise<void> => {
    try {
        const headers = await getAuthHeaders();
        await axios.post(`${BASE_URL}/join/${challengeId}`, {}, { headers });
    } catch (error) {
        console.error('Error joining challenge:', error);
        throw error;
    }
};

export const listChallengesForUser = async (): Promise<ChallengeResponse[]> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<ChallengeResponse[]>(`${BASE_URL}/user/list-challenges`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al obtener los retos del usuario:", error);
        throw error;
    }
}

export const startChallenge = async (challengeId: string): Promise<ChallengeResponse> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.patch<ChallengeResponse>(
            `${BASE_URL}/start/${challengeId}`, 
            {}, 
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error al iniciar el reto:", error);
        throw error;
    }
};

export const getCompletedChallengesHistory = async (): Promise<ChallengeHistoryResponse[]> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<ChallengeHistoryResponse[]>(
            `${BASE_URL}/history-challenges`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener el historial de retos:", error);
        throw error;
    }
};