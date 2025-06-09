import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import globalStyles from '../shared/themes/styles/globalStyles';
import AdminStackScreen from './admin/AdminStackScreen';
import HomeScreen from './app/HomeScreen';
import ListChallengesScreen from './app/ListChallenge/ListChallengesScreen';
import ListStoreScreen from './app/ListStore/ListStoreScreen';
import ProfileScreen from './app/Profile/ProfileScreen';
import createGlobalStyles from '../shared/themes/styles/globalStyles';
import { useTheme } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

// 1. Define el tipo RootTabParamList
export type RootTabParamList = {
  Home: undefined;
  ListStore: undefined;
  Perfil: undefined;
  ListChallenge: undefined;
  Datauser: undefined;
  Challenge: undefined;
  Login: undefined;
  ValidationQuest: undefined;
  Admin: undefined;
  ManageChallenges: undefined;
  AddChallenge: undefined;
  AddReward: undefined;
  ManageProducts: undefined;
  ManageUsers: undefined;
  HistoryShopping: undefined;
  Theme: undefined;
  HistoryChallenges: undefined;
};

// 2. Crea el Tab con el tipo genérico
const Tab = createBottomTabNavigator<RootTabParamList>();

// 3. Declara ProfileScreen con BottomTabScreenProps
type ProfileScreenProps = BottomTabScreenProps<RootTabParamList, "Perfil">;

function ProfileScreenWrapper({ navigation, route }: ProfileScreenProps) {
  return <ProfileScreen />;
}

// 4. Implementa el Layout con el Tab.Navigator tipado
export default function Layout() {
  const { theme } = useTheme();
  const { isAdmin } = useContext(AuthContext); // Añadir esto
  const globalStyles = createGlobalStyles(theme);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.buttonPrimary,
        tabBarStyle: {
          ...globalStyles.tabBar,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="ListChallenge"
        component={ListChallengesScreen}
        options={{
          title: "Retos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="star-outline" color={color} size={28} />
          ),
        }}
      />
      {isAdmin && ( // Condicionar la visualización de la pestaña de admin
        <Tab.Screen
          name="Admin"
          component={AdminStackScreen}
          options={{
            title: "Panel de control",
            tabBarIcon: ({ color }) => (
              <Ionicons name="shield-outline" color={color} size={28} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="ListStore"
        component={ListStoreScreen}
        options={{
          title: "Tienda",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreenWrapper}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
