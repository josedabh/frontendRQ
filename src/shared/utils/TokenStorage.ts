import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = "userToken";
export const ADMIN_STATUS_KEY = "isAdmin";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const saveAdminStatus = async (isAdmin: boolean) => {
  await AsyncStorage.setItem(ADMIN_STATUS_KEY, JSON.stringify(isAdmin));
};

export const getAdminStatus = async () => {
  const status = await AsyncStorage.getItem(ADMIN_STATUS_KEY);
  return status ? JSON.parse(status) : false;
};

export const removeAdminStatus = async () => {
  await AsyncStorage.removeItem(ADMIN_STATUS_KEY);
};
