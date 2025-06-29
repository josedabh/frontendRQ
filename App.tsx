import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';

import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { NetworkProvider, useNetwork } from './src/context/NetworkContext';
import { ThemeProvider } from './src/context/ThemeContext';
import AdminStackScreen, { AdminStackParamList } from './src/screens/admin/AdminStackScreen';
import ChallengeScreen from './src/screens/app/ListChallenge/ChallengeScreen';
import ValidationQuestScreen from './src/screens/app/ListChallenge/ValidationQuestScreen';
import StoreScreen from './src/screens/app/ListStore/StoreScreen';
import Datauser from './src/screens/app/Profile/DataUser';
import HistoryChallengesScreen from './src/screens/app/Profile/HistoryChallengesScreen';
import HistoryShoppingScreen from './src/screens/app/Profile/HistoryShoppingScreen';
import ThemeScreen from './src/screens/app/Profile/ThemeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import MainScreen from './src/screens/auth/MainScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import Layout from './src/screens/Layout';
import NoInternetScreen from './src/screens/NoInternetScreen';
import PermissionHandler from './src/components/shared/PermissionHandler';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Layout: undefined;
  Datauser: undefined;
  Theme: undefined;
  Challenge: { id: string };
  Store: { id: number };
  Home: undefined;
  Admin: {
    screen: keyof AdminStackParamList;
    params?: any;
  };
  ValidationQuest: { 
    challengeId: string;
  };
  HistoryShopping: undefined;
  HistoryChallenges: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // Auth screens
        <>
          <RootStack.Screen name="Main" component={MainScreen} />
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // App screens
        <>
          <RootStack.Screen name="Layout" component={Layout} />
          <RootStack.Screen name="Datauser" component={Datauser} />
          <RootStack.Screen name="Theme" component={ThemeScreen} />
          <RootStack.Screen name="Challenge" component={ChallengeScreen} />
          <RootStack.Screen name="ValidationQuest" component={ValidationQuestScreen} />
          <RootStack.Screen name="HistoryShopping" component={HistoryShoppingScreen} />
          <RootStack.Screen name="HistoryChallenges" component={HistoryChallengesScreen} />
          <RootStack.Screen name="Store" component={StoreScreen} />
          <RootStack.Screen name="Admin" component={AdminStackScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NetworkProvider>
        <ThemeProvider>
          <AuthProvider>
            <NavigationContainer>
              <PermissionHandler />
              <NetworkAwareApp />
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </NetworkProvider>
    </GestureHandlerRootView>
  );
}

function NetworkAwareApp() {
  const { isConnected } = useNetwork();

  if (!isConnected) {
    return <NoInternetScreen />;
  }

  return <AppNavigator />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

if(__DEV__) {
  axios.interceptors.request.use(request => {
    console.log('Starting Request:', {
      url: request.url,
      method: request.method,
      headers: request.headers
    });
    return request;
  });
}