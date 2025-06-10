import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

import { AnswerDTO, QuizDetailResponse, QuizSubmitRequest, QuizSubmitResponse } from '../models/VerificationData';
import { getToken } from '../utils/TokenStorage';
import { API_ROUTES } from '../config/api.config';

/** API base URL */
const URL = API_ROUTES.verification;

// Crear una instancia de axios
const api = axios.create({
    baseURL: URL,
    timeout: 10000
});

// Configurar el interceptor
api.interceptors.request.use(async (config) => {
    const netInfo = await NetInfo.fetch();
    
    if (!netInfo.isConnected) {
        return Promise.reject(new Error('No hay conexión a Internet'));
    }
    
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

const getAuthHeaders = async () => {
    const token = await getToken();
    return {
        Authorization: `Bearer ${token}`,
    };
};

/**
 * Creates a new quiz verification
 * @param quizSubmitRequest Quiz creation request
 */
export const createQuizVerification = async (
    quizSubmitRequest: QuizSubmitRequest
): Promise<void> => {
    try {
        const headers = await getAuthHeaders();
        await axios.post(
            `${URL}/quiz`,
            quizSubmitRequest,
            { headers }
        );
    } catch (error) {
        console.error("Error creating quiz verification:", error);
        throw error;
    }
};

/**
 * Gets a quiz by its ID
 * @param quizId Quiz identifier
 */
export const getQuizForChallenge = async (
    quizId: string
): Promise<QuizSubmitResponse> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<QuizSubmitResponse>(
            `${URL}/quiz/${quizId}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error getting quiz:", error);
        throw error;
    }
};

/**
 * Submits answers for a quiz
 * @param challengeId Challenge identifier
 * @param userId User identifier
 * @param answers List of answers
 */
export const submitQuiz = async (
    challengeId: string,
    userAnswers: AnswerDTO[]
): Promise<void> => {
    try {
        const headers = await getAuthHeaders();
        await axios.post(
            `${URL}/submit-quiz?challengeId=${challengeId}`,
            userAnswers,
            { headers }
        );
    } catch (error) {
        console.error("Error submitting quiz:", error);
        throw error;
    }
};

/**
 * Gets quiz details for a challenge
 * @param challengeId Challenge identifier
 */
export const getQuizDetailsForChallenge = async (
    challengeId: string
): Promise<QuizDetailResponse> => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<QuizDetailResponse>(
            `${URL}/details/${challengeId}`,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error getting quiz details:", error);
        throw error;
    }
};
