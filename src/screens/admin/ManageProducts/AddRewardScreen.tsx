import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MyButton } from '../../../components/shared/MyButton';
import { RewardRequest, RewardResponse } from '../../../shared/models/StoreData';
import { createReward, getRewardById, updateReward } from '../../../shared/services/StoreService';
import colors from '../../../shared/themes/constants/colors';
import { AdminStackParamList } from '../AdminStackScreen';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { Theme } from '../../../shared/themes/themes';
import { useTheme } from '../../../context/ThemeContext';

type RouteProps = RouteProp<AdminStackParamList, 'AddReward'>;
type NavProps = BottomTabNavigationProp<AdminStackParamList, 'AddReward'>;

export default function AddRewardScreen() {
    // Acceso al tema y estilos personalizados
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const navigation = useNavigation<NavProps>();
    const route = useRoute<RouteProps>();
    const editId = route.params?.id;

    const [formData, setFormData] = useState<RewardRequest>({
        name: '',
        description: '',
        points: 0,
        visible: true,
        stock: 0,
    });

    useEffect(() => {
        if (editId != null) {
            (async () => {
                try {
                    const data: RewardResponse = await getRewardById(editId);
                    setFormData({
                        name: data.name,
                        description: data.description,
                        points: data.points,
                        visible: data.visible,
                        stock: data.stock,
                    });
                } catch (e) {
                    console.error(e);
                }
            })();
        }
    }, [editId]);

    const validateForm = (): boolean => {
        if (formData.name.length < 3) {
            Alert.alert('Error', 'El nombre debe tener al menos 3 caracteres');
            return false;
        }
        if (formData.description.length < 5) {
            Alert.alert('Error', 'La descripción debe tener al menos 5 caracteres');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            if (editId != null) {
                await updateReward(editId, formData);
                Alert.alert('Éxito', 'Recompensa actualizada correctamente');
            } else {
                await createReward(formData);
                Alert.alert('Éxito', 'Recompensa creada correctamente');
            }
            navigation.navigate('ManageProducts');
        } catch (error) {
            Alert.alert('Error', 'Falla al guardar la recompensa');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Header */}
            <ScreenHeader
                title={editId ? 'Editar Recompensa' : 'Crear Recompensa'}
                onLeftPress={() => navigation.goBack()}
                leftLabel="← Volver"
            />

            {/* ScrollView para todo el formulario */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* Campos */}
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(t) => setFormData({ ...formData, name: t })}
                    placeholder="Nombre"
                />

                <Text style={styles.label}>Descripción:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    value={formData.description}
                    onChangeText={(t) => setFormData({ ...formData, description: t })}
                    multiline
                    placeholder="Descripción"
                />

                <Text style={styles.label}>Puntos:</Text>
                <TextInput
                    style={styles.input}
                    value={String(formData.points)}
                    onChangeText={(t) => setFormData({ ...formData, points: Number(t) || 0 })}
                    keyboardType="numeric"
                    placeholder="0"
                />

                <Text style={styles.label}>Stock:</Text>
                <TextInput
                    style={styles.input}
                    value={String(formData.stock)}
                    onChangeText={(t) => setFormData({ ...formData, stock: Number(t) || 0 })}
                    keyboardType="numeric"
                    placeholder="0"
                />

                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Visibilidad:</Text>
                    <Switch
                        value={formData.visible}
                        onValueChange={(v) => setFormData({ ...formData, visible: v })}
                    />
                    <Text style={[styles.status, { color: formData.visible ? 'green' : 'gray' }]}>
                        {formData.visible ? 'Activo' : 'Inactivo'}
                    </Text>
                </View>

                {/* Botones al final */}
                <View style={styles.buttonContainer}>
                    <MyButton
                        title={editId ? 'Actualizar' : 'Guardar'}
                        style={styles.btnSave}
                        onPress={handleSubmit}
                    />
                    <MyButton
                        title="Cancelar"
                        style={styles.btnCancel}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.background,
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
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 80,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.border,
        padding: 10,
        borderRadius: 6,
        marginTop: 4,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    status: {
        marginLeft: 8,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    btnSave: {
        backgroundColor: theme.success,
        flex: 1,
        marginRight: 8,
    },
    btnCancel: {
        backgroundColor: theme.error,
        flex: 1,
        marginLeft: 8,
    },
});
