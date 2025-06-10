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
import {
  getAdminStatus,
  getToken,
  removeAdminStatus,
  removeToken,
  saveAdminStatus,
  saveToken,
} from "../shared/utils/TokenStorage";

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
    const loadInitialState = async () => {
      try {
        const token = await getToken();
        const adminStatus = await getAdminStatus();

        if (token) {
          setUserToken(token);
          setIsAdmin(adminStatus);
        }
      } catch (error) {
        console.error("Error al cargar el estado inicial:", error);
        setUserToken(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    loadInitialState();
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      setLoading(true);
      const response: Credentials = await loginService({
        identifier,
        password,
      });
      await saveToken(response.token);
      await saveAdminStatus(response.admin);
      setUserToken(response.token);
      setIsAdmin(response.admin);
    } catch (error) {
      console.error("Login fallido:", error);
      throw error;
    } finally {
      setLoading(false);
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
      setLoading(true);
      await removeToken();
      await removeAdminStatus();
      setUserToken(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setLoading(false);
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
