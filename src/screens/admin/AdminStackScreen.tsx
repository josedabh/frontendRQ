// src/screens/admin/AdminStackScreen.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AdminScreen from './AdminScreen';
import AddChallengeScreen from './ManageChallenges/AddChallengeScreen';
import ManageChallengesScreen from './ManageChallenges/ManageChallengesScreen';
import AddRewardScreen from './ManageProducts/AddRewardScreen';
import ManageProductsScreen from './ManageProducts/ManageRewardsScreen';
import ManageUsersScreen from './ManageUsersScreen';

export type AdminStackParamList = {
    AdminHome: undefined;
    AddChallenge: { id: number } | undefined;
    ManageChallenges: undefined;
    AddReward: {id: number} | undefined;
    ManageProducts: undefined;
    ManageUsers: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStackScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AdminHome" component={AdminScreen} />
            <Stack.Screen
                name="AddChallenge"
                component={AddChallengeScreen}
                options={{ title: 'Crear Reto' }}
            />
            <Stack.Screen
                name="ManageChallenges"
                component={ManageChallengesScreen}
                options={{ title: 'Administrar Retos' }}
            />
            <Stack.Screen
                name="AddReward"
                component={AddRewardScreen}
                options={{ title: 'Crear Recompensa' }}
            />
            <Stack.Screen
                name="ManageProducts"
                component={ManageProductsScreen}
                options={{ title: 'Administrar Productos' }}
            />
            <Stack.Screen
                name="ManageUsers"
                component={ManageUsersScreen}
                options={{ title: 'Control de Usuarios' }}
            />
        </Stack.Navigator>
    );
}
