import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { Credentials, Register } from "../shared/models/UserData";
import {
  loginUser as loginService,
  registerUser,
} from "../shared/services/UserService";
import { getToken, removeToken, saveToken } from "../shared/utils/TokenStorage";

//Importar bien para que no falle al usar el token
interface AuthContextData {
  userToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean; // Añadir esto
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: Register) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  userToken: null,
  isAuthenticated: false,
  isAdmin: false, // Añadir esto
  loading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await getToken();
        setUserToken(token);
      } catch (error) {
        console.error("Error al cargar el token", error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const response: Credentials = await loginService({
        identifier,
        password,
      });
      await saveToken(response.token);
      setUserToken(response.token);
      setIsAdmin(response.admin); // Guardar el estado de admin
    } catch (error) {
      console.error("Login fallido:", error);
      throw error;
    }
  };

  const register = async (userData: Register) => {
    try {
      // Usa registerUser en lugar de loginService
      const response: Credentials = await registerUser(userData);
      await saveToken(response.token);
      setUserToken(response.token);
    } catch (error) {
      console.error("Error al registrar:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await removeToken();
      setUserToken(null);
      setIsAdmin(false); // Resetear el estado de admin
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isAuthenticated: !!userToken,
        isAdmin,
        loading,
        login,
        logout,
        register, // Añadir la función de registro aquí
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
