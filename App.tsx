import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import LoginScreen from './src/screens/core/LoginScreen';
import MainScreen from './src/screens/core/MainScreen';
import RegisterScreen from './src/screens/core/RegisterScreen';
import Layout from './src/screens/Layout';
import Datauser from './src/screens/principal/DataUser';

// Define los tipos para las rutas
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Layout: undefined;
  Main:undefined;
  Datauser: undefined;
  Perfil: undefined;
};

// Crea el navegador con los tipos
const Stack = createNativeStackNavigator<RootStackParamList>();

export const userKey = {
  userToken: 'userToken'
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  // Verificar el estado de autenticación al iniciar
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem(userKey.userToken);
      setUserToken(token);
      setIsLoading(false);
    };
    
    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style = { styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{ headerShown: false}}>
          {/**Lanzar la applicación para que funcione */}
        {!userToken ? (
          // Usuario autenticado
          <>
          <Stack.Screen name = "Layout" component = { Layout } />
          <Stack.Screen name = "Datauser" component = { Datauser } />
          </>
        ) : (
          // Usuario no autenticado
          <>
            <Stack.Screen name="Main" component = { MainScreen } />
            <Stack.Screen name="Login" component = { LoginScreen } />
            <Stack.Screen name="Register" component = { RegisterScreen } />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})