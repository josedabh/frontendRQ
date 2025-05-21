import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ConfirmModal from '../../../components/layout/admin/ConfirmModal';
import { RewardResponse } from '../../../shared/models/StoreData';
import { changeVisbilityReward, deleteReward, getListRewards } from '../../../shared/services/StoreService';
import colors from '../../../shared/themes/constants/colors';
import { AdminStackParamList } from '../AdminStackScreen';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import ButtonGeneric from '../../../components/layout/admin/ButtonGeneric';

export default function ManageRewardsScreen() {
    const navigation = useNavigation<BottomTabNavigationProp<AdminStackParamList, "ManageProducts">>();
    const [rewards, setRewards] = useState<RewardResponse[]>([
        {
            id: 0,
            name: "",
            description: "",
            points: 0,
            visible: true,
            image: "",
            stock: 0,
        },
    ]);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const data = await getListRewards();
                setRewards(data);
            } catch (error) {
                Alert.alert("Error", "No se pudieron cargar los productos");
                console.error(error);
            }
        }
        fetchRewards();
    }
        , []);

    const onCreate = () => {
        navigation.navigate("AddReward");
    };

    const onEdit = (item: RewardResponse) => {
        // Con id: modo “editar”
        navigation.navigate('AddReward', { id: item.id });
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [toDelete, setToDelete] = useState<RewardResponse | null>(null);

    const onDeletePress = (item: RewardResponse) => {
        setToDelete(item);
        setModalVisible(true);
    };

    const handleConfirm = () => {
        if (toDelete) {
            deleteReward(toDelete.id)
                .then(() => setRewards(ps => ps.filter(p => p.id !== toDelete.id)))
                .catch(console.error);
        }
        setModalVisible(false);
        setToDelete(null);
    };

    const handleCancel = () => {
        setModalVisible(false);
        setToDelete(null);
    };

    const onToggleActive = async (item: RewardResponse) => {
        try {
            await changeVisbilityReward(item.id);
            setRewards(rs =>
                rs.map(p => p.id === item.id ? { ...p, visible: !p.visible } : p)
            );
        } catch {
            Alert.alert('Error', 'No se pudo cambiar la visibilidad');
        }
    };

    const renderItem = ({ item }: { item: RewardResponse }) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.small}>
                    Puntos: {item.points} · Stock: {item.stock}
                </Text>
                <Text style={[styles.small, !item.visible && styles.inactive]}>
                    {item.visible ? "Activo" : "Inactivo"}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionBtn}>
                    <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onDeletePress(item)}
                    style={styles.actionBtn}
                >
                    <Text style={styles.actionText}>Borrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onToggleActive(item)}
                    style={styles.actionBtn}
                >
                    <Text style={styles.actionText}>
                        {item.visible ? "Desactivar" : "Activar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header personalizado */}
            <ScreenHeader
                title="Administrar Recompensas"
                onLeftPress={() => navigation.navigate('AdminHome')}
                leftLabel="← Volver"
            />
            {/* Botón para crear un nuevo recompensa */}
            <ButtonGeneric
                label="Crear Recompensa"
                onPress={onCreate}
                prefix="➕"
                containerStyle={{ margin: 16 }}
            />

            {/* Lista de recompensas */}
            <FlatList
                data={rewards}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={<Text style={styles.empty}>No hay productos</Text>}
            />

            {/* Modal de confirmación para eliminar un producto */}
            <ConfirmModal
                visible={modalVisible}
                title="Eliminar recompensa"
                message={`¿Eliminar "${toDelete?.name}"?`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
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
        backgroundColor: "#4e91fc",
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
        paddingBottom: 75,
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
    inactive: {
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
