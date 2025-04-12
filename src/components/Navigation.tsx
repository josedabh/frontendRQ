import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import RegisterScreen from '../screens/RegisterScreen';

export const RootStack = createNativeStackNavigator({
    initialRouteName: 'Main',
    screens: {
      Main: MainScreen,
      Login: LoginScreen,
      Register: RegisterScreen
    },
});