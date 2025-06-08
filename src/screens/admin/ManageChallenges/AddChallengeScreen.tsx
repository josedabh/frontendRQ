import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { MyButton } from '../../../components/shared/MyButton';
import { ChallengeRequest, ChallengeResponse } from '../../../shared/models/ChallengeData';
import { createChallenge, getChallengeById, updateChallenge } from '../../../shared/services/ChallengeService';
import colors from '../../../shared/themes/constants/colors';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../shared/themes/themes';
import createTextStyles from '../../../shared/themes/styles/textStyles';
import { AdminStackParamList } from '../AdminStackScreen';

type RouteProps = RouteProp<AdminStackParamList, 'AddChallenge'>;
type NavProps = BottomTabNavigationProp<AdminStackParamList, 'AddChallenge'>;

/** Pantalla para crear nuevos retos */
export default function AddChallengeScreen() {
    // Acceso al tema y estilos personalizados
    const { theme } = useTheme();
    const styles = createStyles(theme);
    // Navegación al stack de administración
    const navigation = useNavigation<NavProps>();
    const route = useRoute<RouteProps>();
    const editId = route.params?.id;
    
    useEffect(() => {
        if (editId != null) {
            (async () => {
                try {
                    const data: ChallengeResponse = await getChallengeById(editId);
                    setFormData({
                        title: data.title,
                        description: data.description,
                        difficulty: data.difficulty,
                        category: data.category,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        points: data.points,
                    });
                } catch (e) {
                    console.error(e);
                }
            })();
        }
    }, [editId]);

    // Estado inicial del formulario con valores por defecto
    const [formData, setFormData] = useState<ChallengeRequest>({
        title: "",
        description: "",
        difficulty: "easy",
        category: "LECTURA",
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

            if (editId != null) {
                // Si editId está definido, actualiza el reto
                await updateChallenge(editId, challenge);
                Alert.alert("Éxito", "Reto actualizado correctamente");
            } else {
                await createChallenge(challenge);
                Alert.alert("Éxito", "Reto creado correctamente");
            }
            navigation.navigate("ManageChallenges");
        } catch (error: any) {
            Alert.alert(
                "Error",
                `No se pudo crear el reto: ${error.message || "Error desconocido"}`,
            );
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
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

                <Text style={styles.label}>Categoría</Text>
                <Picker
                    selectedValue={formData.category}
                    onValueChange={(itemValue) =>
                        setFormData({ ...formData, category: itemValue })
                    }
                    style={styles.picker}
                >
                    <Picker.Item label="Lectura" value="LECTURA" />
                    <Picker.Item label="Deporte" value="DEPORTE" />
                    <Picker.Item label="Salud" value="SALUD" />
                    <Picker.Item label="Aprendizaje" value="APRENDIZAJE" />
                    <Picker.Item label="Hobby" value="HOBBY" />
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
const createStyles = (theme: Theme) => StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: theme.background,
        paddingBottom: 50, // Espacio para evitar que el teclado cubra los botones
    },
    container: {
        padding: 16,
        backgroundColor: theme.background,
        flex: 1,
        borderRadius: 8,
    },
    picker: {
        marginTop: 4,
        height: 40,
        padding: 5,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.backgroundCard,
        color: theme.text,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.backgroundCard,
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
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 80,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
        color: theme.textSubtitle,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.border,
        padding: 10,
        borderRadius: 6,
        marginTop: 4,
        backgroundColor: theme.backgroundCard,
        color: theme.text,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    status: {
        marginLeft: 8,
        fontSize: 16,
        color: theme.text,
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
