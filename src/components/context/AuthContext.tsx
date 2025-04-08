/**Arreglar esto */
// // contexts/AuthContext.tsx
// import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loginUser as loginService, getToken, logout as logoutService } from '../../services/UserService';

// // Define la interfaz para los datos del contexto
// interface AuthContextData {
//   userToken: string | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// // Valores por defecto
// export const AuthContext = createContext<AuthContextData>({
//   userToken: null,
//   isAuthenticated: false,
//   login: async () => {},
//   logout: async () => {}
// });

// // Define las props del proveedor
// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
//   const [userToken, setUserToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Al montar el provider, intentamos cargar el token de AsyncStorage
//   useEffect(() => {
//     const loadToken = async () => {
//       try {
//         const token = await getToken();
//         setUserToken(token);
//       } catch (error) {
//         console.error('Error al cargar el token', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadToken();
//   }, []);

//   // Función para hacer login
//   const login = async (email: string, password: string) => {
//     try {
//       const response = await loginService(email, password);
//       setUserToken(response.toString);
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Función para hacer logout
//   const logout = async () => {
//     await logoutService();
//     setUserToken(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         userToken,
//         isAuthenticated: !!userToken,
//         login,
//         logout,
//       }}
//     >
//       {/* Mientras se carga el token, se puede mostrar un indicador o null */}
//       {loading ? null : children}
//     </AuthContext.Provider>
//   );
// };
