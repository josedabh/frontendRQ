import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Card from '../../components/shared/Card';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import createTextStyles from '../../shared/themes/styles/textStyles';
import { Theme } from '../../shared/themes/themes';
import { RootStackParamList } from '../../../App';

// Cambiar el tipo de navegación para usar el stack raíz
type AdminNavProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdminScreen() {
    const { theme } = useTheme();
    const { isAdmin } = useContext(AuthContext);
    const styles = createStyles(theme);
    const textStyles = createTextStyles(theme);
    const navigation = useNavigation<AdminNavProp>();

    useEffect(() => {
        if (!isAdmin) {
            navigation.replace('Layout');
        }
    }, [isAdmin, navigation]);

    if (!isAdmin) {
        return null;
    }

    const handleNavigation = (screen: string) => {
        // Navegar primero al stack de Admin y luego a la pantalla específica
        navigation.navigate('Admin', {
            screen: screen
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={textStyles.title}>Panel de Control</Text>
                {/* ScrollView para todo el formulario */}
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <Card
                        title="📝 Administrar Retos"
                        onPress={() => handleNavigation("ManageChallenges")}
                    />
                    <Card
                        title="🏆 Administrar Recompensas"
                        onPress={() => handleNavigation("ManageProducts")}
                    />
                    <Card
                        title="🛒 Administrar Historial"
                        onPress={() => handleNavigation("HistoryRewards")}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 16,
        paddingBottom: 70,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 80,
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: "flex-start",
        gap: 16,
    },
    button: {
        backgroundColor: theme.buttonPrimary,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        shadowColor: theme.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: theme.buttonText,
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
    }
});
