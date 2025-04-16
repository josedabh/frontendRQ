import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser as loginService } from '../services/UserService';

interface AuthContextData {
    userToken: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
    userToken: null,
    isAuthenticated: false,
    login: async () => {},
    logout: async () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

// Funciones auxiliares para manejar el token
const TOKEN_KEY = 'userToken';

const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(TOKEN_KEY);
};

const saveToken = async (token: string): Promise<void> => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
};

const removeToken = async (): Promise<void> => {
    await AsyncStorage.removeItem(TOKEN_KEY);
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await getToken();
                setUserToken(token);
            } catch (error) {
                console.error('Error al cargar el token', error);
            } finally {
                setLoading(false);
            }
        };

        loadToken();
    }, []);

    const login = async (identifier: string, password: string) => {
        try {
            const response = await loginService({ identifier, password });
            const token = response.toString();
            await saveToken(token);
            setUserToken(token);
        } catch (error) {
            console.error('Login fallido:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await removeToken();
            setUserToken(null);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                userToken,
                isAuthenticated: !!userToken,
                login,
                logout,
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
