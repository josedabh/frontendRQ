import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export const RootStack = createNativeStackNavigator({
    initialRouteName: 'Main',
    screens: {
      Main: MainScreen,
      Login: LoginScreen,
      Register: RegisterScreen
    },
});