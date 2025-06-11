import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AssignVerificationModal from '../../../components/layout/admin/AssignVerificationModal';
import ButtonGeneric from '../../../components/layout/admin/ButtonGeneric';
import ConfirmModal from '../../../components/layout/admin/ConfirmModal';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import MySearchBar from '../../../components/shared/MySearchBar';
import { useTheme } from '../../../context/ThemeContext';
import { ChallengeResponse } from '../../../shared/models/ChallengeData';
import {
    assignVerificationType,
    deleteVerificationType,
    getAllChallenges,
    startChallenge,
} from '../../../shared/services/ChallengeService';
import { Theme } from '../../../shared/themes/themes';
import { getStateLabel } from '../../../shared/utils/Utils';
import { AdminStackParamList } from '../AdminStackScreen';

// Cambiar el tipo de navegación
type ManageChallengesScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList>;

export default function ManageChallengesScreen() {
    // Acceso al tema y estilos personalizados
    const { theme } = useTheme();
    const styles = createStyles(theme);
    // Navegación al stack de administración
    const navigation = useNavigation<ManageChallengesScreenNavigationProp>();
    const [input, setInput] = useState("");
    const [challenges, setChallenges] = useState<ChallengeResponse[]>([]);

    // Filtro de retos por título
    const filteredChallenges = useMemo(() => {
        const query = input.toLowerCase();
        return challenges.filter((ch) => ch.title.toLowerCase().includes(query));
    }, [input, challenges]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllChallenges();
                setChallenges(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchUsers();
    }, []);

    const onCreate = () => {
        navigation.navigate('AddChallenge', { id: undefined });
    };

    const onEdit = (item: ChallengeResponse) => {
        navigation.navigate('AddChallenge', { id: item.id });
    };

    const [verificationModalVisible, setVerificationModalVisible] = useState(false);
    const [removeVerificationModalVisible, setRemoveVerificationModalVisible] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState<ChallengeResponse | null>(null);

    const onVerify = (item: ChallengeResponse) => {
        setSelectedChallenge(item);
        if (item.verificationType != null) {
            setRemoveVerificationModalVisible(true);
        } else {
            setVerificationModalVisible(true);
        }
    };

    const handleAssignVerification = async (type: string) => {
        if (selectedChallenge) {
            try {
                if (type === 'Q') {
                    navigation.navigate('AddQuizValidation', {
                        challengeId: selectedChallenge.id  // Asegúrate de que esto es un string
                    });
                    setVerificationModalVisible(false);
                    return;
                }

                // Para otros tipos de verificación, continuar con el proceso normal
                await assignVerificationType(selectedChallenge.id, type);
                setChallenges(chs =>
                    chs.map(ch =>
                        ch.id === selectedChallenge.id
                            ? { ...ch, verificationType: type }
                            : ch
                    )
                );
                setVerificationModalVisible(false);
            } catch (error) {
                console.error("Error al asignar verificación:", error);
            }
        }
    };

    const handleRemoveVerification = async () => {
        if (selectedChallenge) {
            try {
                await deleteVerificationType(selectedChallenge.id);
                setChallenges(chs =>
                    chs.map(ch =>
                        ch.id === selectedChallenge.id
                            ? { ...ch, verificationType: null }
                            : ch
                    )
                );
                setRemoveVerificationModalVisible(false);
            } catch (error) {
                console.error("Error al quitar verificación:", error);
            }
        }
        setSelectedChallenge(null);
    };

    const handleStartChallenge = async (challengeId: string) => {
        try {
            const updatedChallenge = await startChallenge(challengeId);
            setChallenges(prev =>
                prev.map(ch => ch.id === challengeId ? updatedChallenge : ch)
            );
        } catch (error: any) {
            Alert.alert(
                'Error',
                error?.response?.data?.message || 'No se pudo iniciar el reto'
            );
        }
    };

    // Modificar el renderItem
    const renderItem = ({ item }: { item: ChallengeResponse }) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.small}>
                    Dificultad: {item.difficulty} · Puntos: {item.points}
                </Text>
                <Text style={[styles.small, getStateStyle(item.state)]}>
                    Estado: {getStateLabel(item.state)}
                </Text>
                <Text
                    style={[
                        styles.small,
                        item.verificationType ? styles.verified : styles.unverified,
                    ]}
                >
                    {item.verificationType != null ? "Verificado" : "Pendiente verificación"}
                </Text>
            </View>
            <View style={styles.actions}>
                {item.id && (
                    <>
                        <TouchableOpacity
                            onPress={() => handleStartChallenge(item.id)}
                            style={[styles.actionBtn, styles.startButton]}
                        >
                            <Text style={styles.actionText}>Iniciar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => navigation.navigate('AddChallenge', { id: item.id })} 
                            style={styles.actionBtn}
                        >
                            <Text style={styles.actionText}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => onVerify(item)}
                            style={styles.actionBtn}
                        >
                            <Text style={styles.actionText}>
                                {item.verificationType != null
                                    ? "Quitar verificación"
                                    : "Asignar verificación"}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );

    // Añadir función helper para los estilos
    const getStateStyle = (state: string) => {
        switch (state) {
            case 'CANCELLED':
                return styles.stateCancelled;
            case 'PENDING':
                return styles.statePending;
            case 'IN_PROGRESS':
                return styles.stateInProgress;
            case 'FINISHED':
                return styles.stateFinished;
            default:
                return {};
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Modal para asignar tipo de verificación */}
            <AssignVerificationModal
                visible={verificationModalVisible}
                onClose={() => setVerificationModalVisible(false)}
                onAssign={handleAssignVerification} // Pasar la función para asignar
            />

            {/* Modal para quitar verificación */}
            <ConfirmModal
                visible={removeVerificationModalVisible}
                title="Quitar verificación"
                message="¿Estás seguro de que quieres quitar el tipo de verificación?"
                onConfirm={handleRemoveVerification}
                onCancel={() => {
                    setRemoveVerificationModalVisible(false);
                    setSelectedChallenge(null);
                }}
            />

            {/* Header personalizado */}
            <ScreenHeader
                title="Administrar Retos"
                onLeftPress={() => navigation.navigate('AdminHome')}
                leftLabel="← Volver"
            />

            {/* Barra de búsqueda */}
            <MySearchBar
                title="Buscar reto"
                value={input}
                onChangeText={setInput}
            />

            {/* Botón Crear */}
            <ButtonGeneric
                label="Crear Retos"
                onPress={onCreate}
                prefix="➕"
                containerStyle={{ margin: 16 }}
            />

            {/* Lista de retos */}
            <FlatList
                data={filteredChallenges}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={<Text style={styles.empty}>No hay retos</Text>}
            />
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    createBtn: {
        backgroundColor: theme.buttonPrimary,
        padding: 14,
        margin: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    createText: {
        color: theme.buttonText,
        fontSize: 16,
        fontWeight: "600",
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    separator: {
        height: 12,
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: theme.empty,
        fontSize: 16,
    },
    card: {
        backgroundColor: theme.card,
        borderRadius: 12,
        padding: 16,
        shadowColor: theme.shadowColor,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
        color: theme.textTitle,
    },
    desc: {
        fontSize: 14,
        color: theme.textSubtitle,
        marginBottom: 6,
    },
    small: {
        fontSize: 12,
        color: theme.textMuted,
    },
    verified: {
        color: theme.success,
    },
    unverified: {
        color: theme.error,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: theme.buttonSecondary,
        borderRadius: 6,
        marginHorizontal: 4,
    },
    actionText: {
        fontSize: 12,
        color: theme.buttonText,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.backgroundCard,
        elevation: 2,
    },
    backText: {
        fontSize: 16,
        color: theme.primary,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: theme.textTitle,
    },
    stateCancelled: {
        color: theme.error,
    },
    statePending: {
        color: theme.warning,
    },
    stateInProgress: {
        color: theme.primary,
    },
    stateFinished: {
        color: theme.success,
    },
    startButton: {
        backgroundColor: theme.primary,
    },
});
