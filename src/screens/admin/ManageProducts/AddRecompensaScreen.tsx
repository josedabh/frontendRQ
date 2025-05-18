import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MyButton } from '../../../components/shared/MyButton';
import { RewardRequest } from '../../../shared/models/StoreData';
import { createReward } from '../../../shared/services/StoreService';
import colors from '../../../shared/themes/constants/colors';
import { AdminStackParamList } from '../AdminStackScreen';

export default function AddRewardScreen() {
    const navigation = useNavigation<BottomTabNavigationProp<AdminStackParamList, "AddReward">>();
    // Estado inicial del formulario con valores por defecto
    const [formData, setFormData] = useState<RewardRequest>({
        name: "",
        description: "",
        points: 0,
        image: "",
        active: true,
        stock: 0,
    });

    /** Valida los campos del formulario según los requisitos */
    const validateForm = (): boolean => {
        if (formData.name.length < 10 || formData.name.length > 200) {
            Alert.alert(
                "Error de validación",
                `El título debe tener entre 10 y 200 caracteres. Actual: ${formData.name.length}`,
            );
            return false;
        }
        if (formData.description.length < 10 || formData.description.length > 200) {
            Alert.alert(
                "Error de validación",
                `La descripción debe tener entre 10 y 200 caracteres. Actual: ${formData.description.length}`,
            );
            return false;
        }
        return true;
    };
    /** Maneja el envío del formulario al backend */
    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            const reward: RewardRequest = {
                ...formData,
            };
            // Aquí puedes llamar a la función para crear el reto en el backend
            await createReward(reward);
            Alert.alert("Éxito", "Recompensa creada correctamente");
            navigation.navigate("ManageProducts");
        } catch (error) {
            Alert.alert("Error", "No se pudo crear la recompensa");
        }
    }
    return (
        <SafeAreaView style={{ padding: 16 }}>
            <View style={styles.container}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Crear Recompensa</Text>
                {/** Campos del formulario */}
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    placeholder="Nombre"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    style={styles.input}
                />
                <Text style={styles.label}>Descripción:</Text>
                <TextInput
                    placeholder="Descripción"
                    value={formData.description}
                    onChangeText={(text) => setFormData({ ...formData, description: text })}
                    style={styles.input}
                />
                <Text style={styles.label}>Puntos:</Text>
                <TextInput
                    placeholder="Puntos"
                    value={formData.points.toString()}
                    onChangeText={(text) => setFormData({ ...formData, points: parseInt(text) })}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text style={styles.label}>Imagen URL:</Text>
                <TextInput
                    placeholder="Imagen URL"
                    value={formData.image}
                    onChangeText={(text) => setFormData({ ...formData, image: text })}
                    style={styles.input}
                />
                <Text style={styles.label}>Stock:</Text>
                <TextInput
                    placeholder="Stock"
                    value={formData.stock.toString()}
                    onChangeText={(text) => setFormData({ ...formData, stock: parseInt(text) })}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Visibilidad:</Text>
                    <Switch
                        value={formData.active}
                        onValueChange={(value) => setFormData({ ...formData, active: value })}
                    />
                    <Text style={[styles.status, { color: formData.active ? 'green' : 'gray' }]}>
                        {formData.active ? 'Activo' : 'Inactivo'}
                    </Text>
                </View>
                {/* Botón de envío */}
                <View style={styles.buttonContainer}>
                    {/** Boton guardar */}
                    <MyButton
                        title="Guardar Recompensa"
                        style={styles.btnSave}
                        onPress={handleSubmit}
                    />

                    {/** Boton volver */}
                    <MyButton
                        title="Volver"
                        style={styles.btnCancel}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.backgroundLight,
        flex: 1,
        borderRadius: 8,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 6,
        marginTop: 4,
    },
    status: {
        marginLeft: 10,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    btnSave: {
        backgroundColor: colors.success,
    },
    btnCancel: {
        backgroundColor: colors.danger,
    },
});