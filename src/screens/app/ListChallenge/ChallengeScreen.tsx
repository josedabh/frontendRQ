import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../../App';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { useTheme } from '../../../context/ThemeContext';
import { ChallengeResponse, getDifficultyLabel } from '../../../shared/models/ChallengeData';
import { getChallengeById, joinChallenge } from '../../../shared/services/ChallengeService';
import createTextStyles from '../../../shared/themes/styles/textStyles';
import { Theme } from '../../../shared/themes/themes';
import { getCategoryLabel } from '../../../shared/utils/Utils';

type ChallengeRouteProp = RouteProp<RootStackParamList, 'Challenge'>;
type ChallengeNavProp = BottomTabNavigationProp<RootStackParamList, 'Challenge'>;

export default function ChallengeScreen() {
    // Acceso al tema y estilos personalizados
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const textStyles = createTextStyles(theme);

    // Acceso a la ruta y navegación
    const route = useRoute<ChallengeRouteProp>();
    const navigation = useNavigation<ChallengeNavProp>();

    // Estado para almacenar los datos del reto
    const [challenge, setChallenge] = useState<ChallengeResponse | null>(null);
    const [joined, setJoined] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await getChallengeById(route.params.id);
            setChallenge(data);
        })();
    }, [route.params.id]);

    // When joined changes to true, navigate to verification screen
    useEffect(() => {
        if (joined && challenge) {
            const vType = challenge.verificationType;
            const vNumber = challenge.verificationNumber;

            if (!vType || !vNumber) {
                Alert.alert('Información', 'No hay datos de verificación para este reto.');
                return;
            }

            if (vType === 'Q') {
                navigation.navigate('ValidationQuest', { 
                    challengeId: challenge.id  // Pasamos el ID del reto directamente
                });
            } else {
                Alert.alert('Verificación', `Tipo '${vType}' no está implementado aún.`);
            }
        }
    }, [joined, challenge, navigation]);

    const handleJoin = async () => {
        try {
            if (!challenge) return;
            
            // Show loading state
            setLoading(true);
            
            // Call join API
            await joinChallenge(challenge.id);
            
            // If successful, set joined to true
            setJoined(true);
        } catch (error: any) {
            console.error('Error joining challenge:', error);
            Alert.alert(
                'Error',
                error?.response?.data?.message || 'No se pudo unir al reto. Por favor, inténtalo de nuevo.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (!challenge) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text>Cargando...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScreenHeader
                title='Detalles del Reto'
                onLeftPress={() => navigation.goBack()} />

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <Text style={textStyles.title}>{challenge.title}</Text>
                    <Text style={[textStyles.normal, styles.marginTop]}>
                        {challenge.description}
                    </Text>

                    <View style={styles.row}>
                        <View style={styles.detailBox}>
                            <Text style={textStyles.normal}>Dificultad</Text>
                            <Text style={styles.detailValue}>
                                {getDifficultyLabel(challenge.difficulty)}
                            </Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text style={textStyles.normal}>Categoría</Text>
                            <Text style={styles.detailValue}>{getCategoryLabel(challenge.category)}</Text>
                        </View>
                    </View>

                    <Text style={[textStyles.normal, styles.marginTop]}>
                        Recompensas:
                    </Text>
                    <View style={styles.bulletList}>
                        <Text style={styles.bullet}>• {challenge.points} puntos</Text>
                        <Text style={styles.bullet}>
                            • Certificado de cazador experto
                        </Text>
                    </View>

                    {!joined ? (
                        <TouchableOpacity
                            style={[
                                styles.joinButton,
                                loading && { opacity: 0.7 }
                            ]}
                            onPress={handleJoin}
                            disabled={loading}
                        >
                            <Text style={styles.joinText}>
                                {loading ? 'Uniéndose...' : 'Unirme'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={[textStyles.normal, styles.marginTop]}>
                            Estás unido al reto. Redirigiendo a la verificación...
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: theme.background
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 16,
        paddingBottom: 32,
    },
    card: {
        backgroundColor: theme.card,
        borderRadius: 16,
        padding: 20,
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    marginTop: {
        marginTop: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    detailBox: {
        flex: 1,
        backgroundColor: theme.background,
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    detailValue: {
        fontWeight: '600',
        marginTop: 4,
        color: theme.text,
    },
    bulletList: {
        marginTop: 8,
        paddingLeft: 8,
    },
    bullet: {
        fontSize: 14,
        marginVertical: 2,
    },
    joinButton: {
        backgroundColor: theme.primary,
        borderRadius: 24,
        paddingVertical: 12,
        marginTop: 20,
        alignItems: 'center',
    },
    joinText: {
        color: theme.text,
        fontSize: 16,
        fontWeight: '600',
    },
});

