import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import globalStyles from '../shared/themes/styles/globalStyles';
import ChallengeScreen from './app/ChallengeScreen';
import HomeScreen from './app/HomeScreen';
import ListChallengesScreen from './app/ListChallengesScreen';
import ProfileScreen from './app/ProfileScreen';
import StoreScreen from './app/StoreScreen';

// 1. Define el tipo RootTabParamList
export type RootTabParamList = {
  Home: undefined;
  Store: undefined;
  Perfil: undefined;
  ListChallenge: undefined;
  Datauser:undefined;
  Challenge: undefined;
  Login: undefined;
};

// 2. Crea el Tab con el tipo genérico
const Tab = createBottomTabNavigator<RootTabParamList>();

// 3. Declara ProfileScreen con BottomTabScreenProps
type ProfileScreenProps = BottomTabScreenProps<RootTabParamList, 'Perfil'>;

function ProfileScreenWrapper({ navigation, route }: ProfileScreenProps) {
  return <ProfileScreen />;
}

// 4. Implementa el Layout con el Tab.Navigator tipado
export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions = {{
        headerShown: false,
        // Color del ícono activo, puedes cambiarlo a tu gusto
        tabBarActiveTintColor: '#ff2058',
        tabBarStyle: globalStyles.tabBar,
      }}
    >
      <Tab.Screen
        name = "Home"
        component = { HomeScreen }
        options = {{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name = "ListChallenge"
        component = { ListChallengesScreen }
        options = {{
          title: 'Retos',
          tabBarIcon: ({ color }) => <Ionicons name="star-outline" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name = "Store"
        component = { StoreScreen }
        options = {{
          title: 'Tienda',
          tabBarIcon: ({ color }) => <Ionicons name="cart-outline" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreenWrapper}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" color={color} size={28} />,
        }}
      />
      {/* <Tab.Screen
        name = "Challenge"
        component = { ChallengeScreen }
        options = {{
          title: 'Challenge',
          tabBarIcon: ({ color }) => <Ionicons name="add" color={color} size={28} />,
        }}
      /> */}
    </Tab.Navigator>
  );
}
