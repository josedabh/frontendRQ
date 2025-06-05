import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Card from '../../components/shared/Card';
import colors from '../../shared/themes/constants/colors';
import { AdminStackParamList } from './AdminStackScreen';
import { ScrollView } from 'react-native-gesture-handler';

type AdminNavProp = NativeStackNavigationProp<AdminStackParamList, "AdminHome">;

export default function AdminScreen() {
    const navigation = useNavigation<AdminNavProp>();

    return (
        <SafeAreaView style={{ padding: 16 }}>
            <Text style={styles.title}>Panel de Control</Text>
            {/* ScrollView para todo el formulario */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Card
                    title="📝 Administrar Retos"
                    onPress={() => navigation.navigate("ManageChallenges")}
                />
                <Card
                    title="🏆 Administrar Recompensas"
                    onPress={() => navigation.navigate("ManageProducts")}
                />
                <Card
                    title="🛒 Administrar Historial"
                    onPress={() => navigation.navigate("HistoryRewards")}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: "flex-start",
        gap: 16, // si no lo soporta tu RN, usa marginBottom en cada botón
    },
    button: {
        backgroundColor: "#4e91fc",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        // sombra iOS
        boxShadow: colors.shadow,
        // elevación Android
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 80,
    },
});
