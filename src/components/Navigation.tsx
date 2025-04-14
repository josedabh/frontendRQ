import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import LoginScreen from '../screens/core/LoginScreen';
import MainScreen from '../screens/core/MainScreen';
import RegisterScreen from '../screens/core/RegisterScreen';

export const RootStack = createNativeStackNavigator({
    initialRouteName: 'Main',
    screens: {
      Main: MainScreen,
      Login: LoginScreen,
      Register: RegisterScreen
    },
});