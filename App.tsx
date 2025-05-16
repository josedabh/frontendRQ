import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AuthContext, AuthProvider } from './src/context/AuthContext';
import AddChallengeScreen from './src/screens/admin/ManageChallenges/AddChallengeScreen';
import ManageChallengesScreen from './src/screens/admin/ManageChallenges/ManageChallengesScreen';
import ManageProductsScreen from './src/screens/admin/ManageProductsScreen';
import ManageUsersScreen from './src/screens/admin/ManageUsersScreen';
import ChallengeScreen from './src/screens/app/ListChallenge/ChallengeScreen';
import StoreScreen from './src/screens/app/ListStore/StoreScreen';
import Datauser from './src/screens/app/Profile/DataUser';
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
  ListStore: undefined;
  Challenge: { id: string };
  Store: { id: number };
  AdminHome: undefined;
  ManageChallenges: undefined;
  AddChallenge: undefined;
  ManageProducts: undefined;
  ManageUsers: undefined;
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
            <Stack.Screen name="Challenge" component={ChallengeScreen} />
            <Stack.Screen name="Store" component={StoreScreen} />
            <Stack.Screen
              name="AddChallenge"
              component={AddChallengeScreen}
              options={{ title: "Crear Reto" }}
            />
            <Stack.Screen
              name="ManageChallenges"
              component={ManageChallengesScreen}
              options={{ title: "Administrar Retos" }}
            />
            <Stack.Screen
              name="ManageProducts"
              component={ManageProductsScreen}
              options={{ title: "Administrar Productos" }}
            />
            <Stack.Screen
              name="ManageUsers"
              component={ManageUsersScreen}
              options={{ title: "Control de Usuarios" }}
            />
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
    justifyContent: "center",
    alignItems: "center",
  },
});
