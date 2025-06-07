import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import AdminStackScreen from './src/screens/admin/AdminStackScreen';
import ChallengeScreen from './src/screens/app/ListChallenge/ChallengeScreen';
import StoreScreen from './src/screens/app/ListStore/StoreScreen';
import Datauser from './src/screens/app/Profile/DataUser';
import LoginScreen from './src/screens/auth/LoginScreen';
import MainScreen from './src/screens/auth/MainScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import Layout from './src/screens/Layout';
import HistoryShoppingScreen from './src/screens/app/Profile/HistoryShoppingScreen';
import ThemeScreen from './src/screens/app/Profile/ThemeScreen';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Layout: undefined;
  Datauser: undefined;
  Theme: undefined;
  Challenge: { id: string };
  Store: { id: number };
  Admin: undefined;
  ValidationQuest: { verificationId: string } | undefined; // Assuming this is the screen for quest validation
  HistoryShopping: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={MainScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
    </RootStack.Navigator>
  );
}

function AppStack() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Layout" component={Layout} />
      <RootStack.Screen name="Datauser" component={Datauser} />
      <RootStack.Screen name="Theme" component={ThemeScreen} />
      <RootStack.Screen name="Challenge" component={ChallengeScreen} />
      <RootStack.Screen
        name="ValidationQuest"
        component={ChallengeScreen} // Assuming this is the screen for quest validation}
      />
      <RootStack.Screen name="HistoryShopping" component={HistoryShoppingScreen} />
      <RootStack.Screen name="Store" component={StoreScreen} />
      <RootStack.Screen name="Admin" component={AdminStackScreen} />
    </RootStack.Navigator>
  );
}

function AppNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const Navigator = useMemo(
    () => (isAuthenticated ? AppStack : AuthStack),
    [isAuthenticated]
  );
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <Navigator />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
