import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChallengesScreen from '../../screens/app/ChallengesScreen';
import HomeScreen from '../../screens/app/HomeScreen';
import ProfileScreen from '../../screens/app/ProfileScreen';
import StoreScreen from '../../screens/app/StoreScreen';
import globalStyles from '../../themes/styles/globalStyles';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // Color del ícono activo, puedes cambiarlo a tu gusto
        tabBarActiveTintColor: '#ff2058',
        tabBarStyle: globalStyles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="Retos"
        component={ChallengesScreen}
        options={{
          title: 'Retos',
          tabBarIcon: ({ color }) => <Ionicons name="star-outline" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="Tienda"
        component={StoreScreen}
        options={{
          title: 'Tienda',
          tabBarIcon: ({ color }) => <Ionicons name="cart-outline" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" color={color} size={28} />,
        }}
      />
    </Tab.Navigator>
  );
}
