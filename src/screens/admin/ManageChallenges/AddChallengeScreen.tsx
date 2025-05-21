import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { MyButton } from '../../../components/shared/MyButton';
import { ChallengeRequest } from '../../../shared/models/ChallengeData';
import { createChallenge } from '../../../shared/services/ChallengeService';
import colors from '../../../shared/themes/constants/colors';
import { AdminStackParamList } from '../AdminStackScreen';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';

type RouteProps = RouteProp<AdminStackParamList, 'AddChallenge'>;
type NavProps = BottomTabNavigationProp<AdminStackParamList, 'AddChallenge'>;

/** Pantalla para crear nuevos retos */
export default function AddChallengeScreen() {
    const navigation = useNavigation<NavProps>();
    const route = useRoute<RouteProps>();
    const editId = route.params?.id;
    // Estado inicial del formulario con valores por defecto
    const [formData, setFormData] = useState<ChallengeRequest>({
        title: "",
        description: "",
        difficulty: "easy",
        startDate: new Date().toISOString().split(".")[0],
        endDate: new Date().toISOString().split(".")[0],
        points: 1,
    });

    // Estados para controlar la visibilidad de los selectores de fecha
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    /** Función auxiliar para formatear fechas */
    const formatDate = (date: Date): string => {
        return date.toISOString().split(".")[0]; // Formato: "2025-05-05T07:06:50"
    };

    /** Valida los campos del formulario según los requisitos */
    const validateForm = (): boolean => {
        if (formData.title.length < 10 || formData.title.length > 200) {
            Alert.alert(
                "Error de validación",
                `El título debe tener entre 10 y 200 caracteres. Actual: ${formData.title.length}`,
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
            const challenge: ChallengeRequest = {
                ...formData,
                startDate: formatDate(new Date(formData.startDate)),
                endDate: formatDate(new Date(formData.endDate)),
            };

            if (typeof createChallenge !== "function") {
                throw new Error("createChallenge no está definido correctamente");
            }

            const response = await createChallenge(challenge);
            Alert.alert("Éxito", "Reto creado correctamente");
            navigation.navigate("ManageChallenges");
        } catch (error: any) {
            Alert.alert(
                "Error",
                `No se pudo crear el reto: ${error.message || "Error desconocido"}`,
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Header */}
            <ScreenHeader
                title={editId ? 'Editar Retos' : 'Crear Retos'}
                onLeftPress={() => navigation.goBack()}
                leftLabel="← Volver"
            />
            {/* ScrollView para todo el formulario */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* Campos del formulario */}
                <Text style={styles.label}>Titulo</Text>
                <TextInput
                    style={styles.input}
                    value={formData.title}
                    onChangeText={(text) => setFormData({ ...formData, title: text })}
                    placeholder="Añadir Reto (mínimo 10 caracteres)"
                />

                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={styles.input}
                    value={formData.description}
                    onChangeText={(text) => setFormData({ ...formData, description: text })}
                    placeholder="Descripción del reto (mínimo 10 caracteres)"
                    multiline
                />

                <Text style={styles.label}>Dificultad</Text>
                <Picker
                    selectedValue={formData.difficulty}
                    onValueChange={(itemValue) =>
                        setFormData({ ...formData, difficulty: itemValue })
                    }
                    style={styles.picker}
                >
                    <Picker.Item label="Fácil" value="easy" />
                    <Picker.Item label="Media" value="medium" />
                    <Picker.Item label="Difícil" value="hard" />
                </Picker>

                <Text style={styles.label}>Puntos</Text>
                <TextInput
                    style={styles.input}
                    value={formData.points.toString()}
                    onChangeText={(text) =>
                        setFormData({ ...formData, points: parseInt(text) || 0 })
                    }
                    placeholder="0"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Fecha de inicio</Text>
                <MyButton
                    title={new Date(formData.startDate).toLocaleDateString()}
                    onPress={() => setShowStartPicker(true)}
                />
                {showStartPicker && (
                    <DateTimePicker
                        value={new Date(formData.startDate)}
                        mode="datetime"
                        display="default"
                        onChange={(_, date) => {
                            if (date)
                                setFormData({
                                    ...formData,
                                    startDate: formatDate(date),
                                });
                            setShowStartPicker(false);
                        }}
                    />
                )}

                <Text style={styles.label}>Fecha de fin</Text>
                <MyButton
                    title={new Date(formData.endDate).toLocaleDateString()}
                    onPress={() => setShowEndPicker(true)}
                />
                {showEndPicker && (
                    <DateTimePicker
                        value={new Date(formData.endDate)}
                        mode="datetime"
                        display="default"
                        onChange={(_, date) => {
                            if (date)
                                setFormData({
                                    ...formData,
                                    endDate: formatDate(date),
                                });
                            setShowEndPicker(false);
                        }}
                    />
                )}

                {/* Botón de envío */}
                <View style={styles.buttonContainer}>
                    {/** Boton guardar */}
                    <MyButton
                        title="Guardar Challenge"
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
            </ScrollView>
        </SafeAreaView>
    );
}

/** Estilos para los componentes de la pantalla */
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.backgroundLight,
        flex: 1,
        borderRadius: 8,
    },
    picker: {
        marginTop: 4,
        height: 40,
        padding: 5,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.backgroundLight,
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
        borderColor: '#ccc',
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
        backgroundColor: colors.success,
        flex: 1,
        marginRight: 8,
    },
    btnCancel: {
        backgroundColor: colors.danger,
        flex: 1,
        marginLeft: 8,
    },
});
