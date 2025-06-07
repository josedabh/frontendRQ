import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ConfirmModal from '../../../components/layout/admin/ConfirmModal';
import { RewardResponse } from '../../../shared/models/StoreData';
import { changeVisbilityReward, deleteReward, getListRewards } from '../../../shared/services/StoreService';
import colors from '../../../shared/themes/constants/colors';
import { AdminStackParamList } from '../AdminStackScreen';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import ButtonGeneric from '../../../components/layout/admin/ButtonGeneric';
import MySearchBar from '../../../components/shared/MySearchBar';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../shared/themes/themes';
import createTextStyles from '../../../shared/themes/styles/textStyles';

export default function ManageRewardsScreen() {
    // Acceso al tema y estilos personalizados
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const textStyles = createTextStyles(theme);
    // Navegación al stack de administración
    const navigation = useNavigation<BottomTabNavigationProp<AdminStackParamList, "ManageProducts">>();
    const [input, setInput] = useState("");
    const [rewards, setRewards] = useState<RewardResponse[]>(
        [
            {
                id: 0,
                name: "",
                description: "",
                points: 0,
                visible: true,
                image: "",
                stock: 0,
            },
        ]
    );

    // Filtro de retos por título
    const filteredRewards = useMemo(() => {
        const query = input.toLowerCase();
        return rewards.filter((rew) => rew.name.toLowerCase().includes(query));
    }, [input, rewards]);

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
    // Para el modal de confirmación de eliminación
    const [toDelete, setToDelete] = useState<RewardResponse | null>(null);
    // Para el nombre de la recompensa a eliminar
    const [rewardToDeleteName, setRewardToDeleteName] = useState<string>('');


    const onDeletePress = (item: RewardResponse) => {
        setToDelete(item);
        setRewardToDeleteName(item.name);
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
                <Text style={textStyles.title}>{item.name}</Text>
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
            {/* Barra de búsqueda */}
            <MySearchBar
                title="Buscar Recompensa"
                value={input}
                onChangeText={setInput}
            />

            {/* Lista de recompensas */}
            <FlatList
                data={filteredRewards}
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
                message={`¿Eliminar "${rewardToDeleteName}"?`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
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
    desc: {
        fontSize: 14,
        color: theme.textSubtitle,
        marginBottom: 6,
    },
    small: {
        fontSize: 12,
        color: theme.textMuted,
    },
    inactive: {
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
});
