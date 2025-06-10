import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../context/ThemeContext';

export default function NoInternetScreen() {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Ionicons name="wifi-off" size={100} color={theme.text} />
            <Text style={[styles.title, { color: theme.text }]}>
                Sin conexión a Internet
            </Text>
            <Text style={[styles.message, { color: theme.text }]}>
                Por favor, verifica tu conexión a Internet para usar la aplicación
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
    },
});