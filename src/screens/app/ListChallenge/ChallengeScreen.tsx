import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../../App';
import HeaderNavigation from '../../../components/shared/HeaderNavigation';
import { ChallengeResponse, getDifficultyLabel } from '../../../shared/models/ChallengeData';
import { getChallengeById } from '../../../shared/services/ChallengeService';
import colors from '../../../shared/themes/constants/colors';
import textStyles from '../../../shared/themes/styles/textStyles';
import { getCategoryLabel } from '../../../shared/utils/Utils';

type ChallengeRouteProp = RouteProp<RootStackParamList, 'Challenge'>;
type ChallengeNavProp = BottomTabNavigationProp<RootStackParamList, 'Challenge'>;

export default function ChallengeScreen() {
    const route = useRoute<ChallengeRouteProp>();
    const navigation = useNavigation<ChallengeNavProp>();
    const [challenge, setChallenge] = useState<ChallengeResponse | null>(null);
    const [joined, setJoined] = useState(false);

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

            const verificationId = `${vType}-${vNumber}`;
            if (vType === 'Q') {
                navigation.navigate('ValidationQuest', { verificationId });
            } else {
                Alert.alert('Verificación', `Tipo '${vType}' no está implementado aún.`);
            }
        }
    }, [joined, challenge, navigation]);

    const handleJoin = () => {
        setJoined(true);
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
            <HeaderNavigation onPress={() => navigation.goBack()} />

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
                            style={styles.joinButton}
                            onPress={handleJoin}
                        >
                            <Text style={styles.joinText}>Unirme</Text>
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

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.backgroundLight },
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
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
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
        backgroundColor: colors.backgroundLight,
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    detailValue: {
        fontWeight: '600',
        marginTop: 4,
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
        backgroundColor: colors.primary,
        borderRadius: 24,
        paddingVertical: 12,
        marginTop: 20,
        alignItems: 'center',
    },
    joinText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

