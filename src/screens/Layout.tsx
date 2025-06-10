import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import createGlobalStyles from '../shared/themes/styles/globalStyles';
import AdminStackScreen, { AdminStackParamList } from './admin/AdminStackScreen';
import HomeScreen from './app/HomeScreen';
import ListChallengesScreen from './app/ListChallenge/ListChallengesScreen';
import ListStoreScreen from './app/ListStore/ListStoreScreen';
import ProfileScreen from './app/Profile/ProfileScreen';

// 1. Define el tipo RootTabParamList
export type RootTabParamList = {
  Home: undefined;
  ListStore: undefined;
  Perfil: undefined;
  ListChallenge: undefined;
  Admin: {
    screen: keyof AdminStackParamList;
    params?: any;
  };
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
  const { isAdmin } = useContext(AuthContext);
  const globalStyles = createGlobalStyles(theme);
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.buttonPrimary,
        tabBarStyle: {
          ...globalStyles.tabBar,
        },
      }}
      initialRouteName="Home"
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
      {isAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminStackScreen}
          options={{
            title: "Panel de control",
            tabBarIcon: ({ color }) => (
              <Ionicons name="shield-outline" color={color} size={28} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Admin', {
                screen: 'AdminHome'
              });
            },
          })}
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
