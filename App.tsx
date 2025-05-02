import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AuthContext, AuthProvider } from './src/context/AuthContext';
import ChallengeScreen from './src/screens/app/ListChallenge/ChallengeScreen';
import Datauser from './src/screens/app/DataUser';
import LoginScreen from './src/screens/auth/LoginScreen';
import MainScreen from './src/screens/auth/MainScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import Layout from './src/screens/Layout';

// Define los tipos para las rutas
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Layout: undefined;
  Main: undefined;
  Datauser: undefined;
  Perfil: undefined;
  ListChallenge: undefined;
  Challenge: {id:string};
};

// Crea el navegador con los tipos
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Solo mostrar el loader mientras se está verificando el token
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Usuario autenticado
          <>
            <Stack.Screen name="Layout" component={Layout} />
            <Stack.Screen name="Datauser" component={Datauser} />
            <Stack.Screen name="Challenge" 
              component={ChallengeScreen} />
          </>
        ) : (
          // Usuario no autenticado
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});