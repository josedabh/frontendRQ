import { Platform } from 'react-native';

const WEB_URL = "http://vps-5060784-x.dattaweb.com:8080";
const ANDROID_URL = "http://200.58.107.89:8080";

const BASE_URL = Platform.OS === 'web' ? WEB_URL : ANDROID_URL;

// Simplificar las rutas para evitar doble slash y problemas de path
export const API_ROUTES = {
    base: `${BASE_URL}/api/v1`,
    auth: `${BASE_URL}/api/v1/auth`,
    admin: `${BASE_URL}/api/v1/admin`,
    challenge: `${BASE_URL}/api/v1/challenge`,
    store: `${BASE_URL}/api/v1/store`,
    verification: `${BASE_URL}/api/v1/verification/challenge`
};