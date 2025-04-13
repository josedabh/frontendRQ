import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/auth/LoginScreen';
import MainScreen from './src/screens/auth/MainScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import HomeScreen from './src/screens/app/HomeScreen';
import Layout from './src/components/shared/Layout';

// Define los tipos para las rutas
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Layout: undefined;
};

// Crea el navegador con los tipos
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main"
        screenOptions = {{ headerShown: false}}>
        <Stack.Screen name = "Main" component = { MainScreen } />
        <Stack.Screen name = "Login" component = { LoginScreen } />
        <Stack.Screen name = "Register" component = { RegisterScreen } />
        <Stack.Screen name = "Home" component = { HomeScreen } />
        <Stack.Screen name = "Layout" component={ Layout } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}