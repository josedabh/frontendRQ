// src/screens/admin/AdminStackScreen.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AdminScreen from './AdminScreen';
import HistoryRewardsScreen from './HistoryRewards/HistoryRewardsScreen';
import AddChallengeScreen from './ManageChallenges/AddChallengeScreen';
import ManageChallengesScreen from './ManageChallenges/ManageChallengesScreen';
import AddRewardScreen from './ManageProducts/AddRewardScreen';
import ManageProductsScreen from './ManageProducts/ManageRewardsScreen';
import AddQuizValidationScreen from './ManageChallenges/AddQuizValidationScreen';

export type AdminStackParamList = {
    AdminHome: undefined;
    AddChallenge: { id?: string | undefined};
    ManageChallenges: undefined;
    AddReward: { id?: number };
    ManageProducts: undefined;
    HistoryRewards: undefined;
    AddQuizValidation: { challengeId: string };
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStackScreen() {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                // Opciones adicionales para mantener el estado
                animation: 'slide_from_right',
                presentation: 'card'
            }}
            initialRouteName="AdminHome"
        >
            <Stack.Screen 
                name="AdminHome" 
                component={AdminScreen}
                // Eliminamos unmountOnBlur ya que no existe en Stack.Screen
                options={{
                    title: 'Panel de Control'
                }}
            />
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
                name="HistoryRewards"
                component={HistoryRewardsScreen} 
                options={{ title: 'Historial de Control' }}
            />
            <Stack.Screen
                name="AddQuizValidation"
                component={AddQuizValidationScreen}
                options={{ title: 'Crear Quiz de Verificación' }}
            />
        </Stack.Navigator>
    );
}
