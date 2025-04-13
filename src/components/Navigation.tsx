import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import LoginScreen from '../screens/auth/LoginScreen';
import MainScreen from '../screens/auth/MainScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

export const RootStack = createNativeStackNavigator({
    initialRouteName: 'Main',
    screens: {
      Main: MainScreen,
      Login: LoginScreen,
      Register: RegisterScreen
    },
});