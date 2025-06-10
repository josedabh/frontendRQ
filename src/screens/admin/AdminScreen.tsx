import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Card from '../../components/shared/Card';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import createTextStyles from '../../shared/themes/styles/textStyles';
import { Theme } from '../../shared/themes/themes';
import { AdminStackParamList } from './AdminStackScreen';
import { RootTabParamList } from '../Layout';
import { getAdminStatus } from '../../shared/utils/TokenStorage';
import { RootStackParamList } from '../../../App';

// Cambiar el tipo de navegación para usar el stack raíz
type AdminScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function AdminScreen() {
    const { theme } = useTheme();
    const { isAdmin } = useContext(AuthContext);
    const styles = createStyles(theme);
    const textStyles = createTextStyles(theme);
    const navigation = useNavigation<AdminScreenNavigationProp>();

    useEffect(() => {
        const checkAdminStatus = async () => {
            const adminStatus = await getAdminStatus();
            if (!adminStatus) {
                // Navegamos al root stack en lugar de Layout
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        };

        checkAdminStatus();
    }, [navigation]);

    const handleNavigation = (screen: keyof AdminStackParamList) => {
        // Usamos la navegación anidada correctamente
        navigation.navigate('Admin', {
            screen: screen
        });
    };

    if (!isAdmin) {
        return null;
    }

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
