import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

// Define los tipos para las rutas
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}