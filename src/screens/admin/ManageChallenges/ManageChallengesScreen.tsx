import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ChallengeResponse } from '../../../shared/models/ChallengeData';
import { getAllChallenges } from '../../../shared/services/ChallengeService';
import colors from '../../../shared/themes/constants/colors';
import { AdminStackParamList } from '../AdminStackScreen';

export default function ManageChallengesScreen() {
    const navigation = useNavigation< BottomTabNavigationProp<AdminStackParamList, "ManageChallenges"> >();
    const [challenges, setChallenges] = useState<ChallengeResponse[]>([
        {
            id: "1",
            title: "Reto Saludable",
            description: "Camina 10,000 pasos al día",
            difficulty: "easy",
            startDate: "2025-05-01T00:00:00",
            endDate: "2025-05-07T23:59:59",
            points: 50,
            state: "active",
        }
    ]);

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
        navigation.navigate("AddChallenge");
    };

    const onEdit = (item: ChallengeResponse) => {
        console.log("Editar reto", item.id);
        // navegar a EditChallengeScreen con item
    };

    const onDelete = (item: ChallengeResponse) => {
        setChallenges(challenges.filter((c) => c.id !== item.id));
    };

    // const onVerify = (item: ChallengeResponse) => {
    //     console.log("Toggle verificación", item.id);
    //     setChallenges(
    //         challenges.map((c) =>
    //             c.id === item.id ? { ...c, verified: !c.verified } : c,
    //         ),
    //     );
    // };

    const renderItem = ({ item }: { item: ChallengeResponse }) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.small}>
                    Dificultad: {item.difficulty} · Puntos: {item.points}
                </Text>
                <Text
                    style={[
                        styles.small,
                        item.state == "PENDING" ? styles.verified : styles.unverified,
                    ]}
                >
                    {item.state == "PENDING" ? "Verificado" : "Pendiente verificación"}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionBtn}>
                    <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onDelete(item)}
                    style={styles.actionBtn}
                >
                    <Text style={styles.actionText}>Borrar</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => onVerify(item)}
                    style={styles.actionBtn}
                >
                    <Text style={styles.actionText}>
                        {item.verified ? "Desmarcar" : "Verificar"}
                    </Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header personalizado */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("AdminHome")}>
                    <Text style={styles.backText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Administrar Retos</Text>
            </View>

            {/* Botón Crear */}
            <TouchableOpacity onPress={onCreate} style={styles.createBtn}>
                <Text style={styles.createText}>➕ Crear Reto</Text>
            </TouchableOpacity>

            {/* Lista de retos */}
            <FlatList
                data={challenges}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={<Text style={styles.empty}>No hay retos</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f8fa",
    },
    createBtn: {
        backgroundColor: colors.primary,
        padding: 14,
        margin: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    createText: {
        color: "#fff",
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
        color: "#888",
        fontSize: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
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
    },
    desc: {
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
    },
    small: {
        fontSize: 12,
        color: "#777",
    },
    verified: {
        color: colors.success,
    },
    unverified: {
        color: colors.danger,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: "#e6e6e6",
        borderRadius: 6,
    },
    actionText: {
        fontSize: 12,
        color: "#333",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 2,
    },
    backText: {
        fontSize: 16,
        color: colors.primary,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
});
