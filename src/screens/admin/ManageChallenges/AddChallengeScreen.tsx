import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import ConfirmModal from '../../../components/layout/admin/ConfirmModal';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { MyButton } from '../../../components/shared/MyButton';
import { useTheme } from '../../../context/ThemeContext';
import { ChallengeRequest, ChallengeResponse } from '../../../shared/models/ChallengeData';
import {
    cancelChallenge,
    createChallenge,
    deleteChallenge,
    getChallengeById,
    updateChallenge,
} from '../../../shared/services/ChallengeService';
import { Theme } from '../../../shared/themes/themes';
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
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [cancelModalVisible, setCancelModalVisible] = useState(false);

    /** Función auxiliar para formatear fechas */
    const formatDate = (date: Date): string => {
        // Ajustamos la fecha para la zona horaria local
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().split('.')[0];
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

    const handleDelete = () => {
        if (!editId) return;
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        if (!editId) return;
        try {
            await deleteChallenge(editId);
            setDeleteModalVisible(false);
            navigation.navigate("ManageChallenges");
        } catch (error) {
            console.error("Error deleting challenge:", error);
        }
    };

    const handleCancel = () => {
        if (!editId) return;
        setCancelModalVisible(true);
    };

    const confirmCancel = async () => {
        if (!editId) return;
        try {
            await cancelChallenge(editId);
            setCancelModalVisible(false);
            navigation.navigate("ManageChallenges");
        } catch (error) {
            console.error("Error cancelling challenge:", error);
        }
    };

    const renderDatePicker = (
        value: Date,
        onChange: (date: Date) => void,
        show: boolean,
        setShow: (show: boolean) => void
    ) => {
        if (Platform.OS === 'web') {
            return (
                <input
                    type="datetime-local"
                    value={formatDate(value)}
                    onChange={(e) => {
                        const newDate = new Date(e.target.value);
                        onChange(newDate);
                    }}
                    style={{
                        padding: 10,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: theme.border,
                        backgroundColor: theme.backgroundCard,
                        color: theme.text,
                        marginTop: 8,
                    }}
                />
            );
        }

        const [tempDate, setTempDate] = useState(value);
        
        const updateDateTime = (hours: number, minutes: number) => {
            const newDate = new Date(tempDate);
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            setTempDate(newDate);
        };

        return (
            <>
                <Pressable
                    style={styles.dateButton}
                    onPress={() => setShow(true)}
                >
                    <Text style={styles.dateButtonText}>
                        {value.toLocaleString()}
                    </Text>
                </Pressable>

                <Modal
                    visible={show}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Seleccionar fecha y hora</Text>
                            
                            {/* Date Picker */}
                            <Picker
                                selectedValue={tempDate.getDate()}
                                style={styles.datePicker}
                                onValueChange={(day) => {
                                    const newDate = new Date(tempDate);
                                    newDate.setDate(day);
                                    setTempDate(newDate);
                                }}
                            >
                                {Array.from({ length: 31 }, (_, i) => (
                                    <Picker.Item 
                                        key={i + 1} 
                                        label={`${i + 1}`} 
                                        value={i + 1}
                                        style={styles.datePickerItem}
                                    />
                                ))}
                            </Picker>

                            {/* Month Picker */}
                            <Picker
                                selectedValue={tempDate.getMonth()}
                                style={styles.datePicker}
                                onValueChange={(month) => {
                                    const newDate = new Date(tempDate);
                                    newDate.setMonth(month);
                                    setTempDate(newDate);
                                }}
                            >
                                {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                                    .map((month, index) => (
                                        <Picker.Item 
                                            key={index} 
                                            label={month} 
                                            value={index}
                                            style={styles.datePickerItem}
                                        />
                                ))}
                            </Picker>

                            {/* Year Picker */}
                            <Picker
                                selectedValue={tempDate.getFullYear()}
                                style={styles.datePicker}
                                onValueChange={(year) => {
                                    const newDate = new Date(tempDate);
                                    newDate.setFullYear(year);
                                    setTempDate(newDate);
                                }}
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <Picker.Item 
                                        key={i} 
                                        label={`${new Date().getFullYear() + i}`} 
                                        value={new Date().getFullYear() + i}
                                        style={styles.datePickerItem}
                                    />
                                ))}
                            </Picker>

                            {/* Time Picker */}
                            <View style={styles.timePickerContainer}>
                                <Picker
                                    selectedValue={tempDate.getHours()}
                                    style={styles.timePicker}
                                    onValueChange={(hours) => updateDateTime(hours, tempDate.getMinutes())}
                                >
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <Picker.Item 
                                            key={i} 
                                            label={i.toString().padStart(2, '0')} 
                                            value={i}
                                            style={styles.timePickerItem}
                                        />
                                    ))}
                                </Picker>

                                <Text style={[styles.timeSeparator, { fontSize: 32 }]}>:</Text>

                                <Picker
                                    selectedValue={tempDate.getMinutes()}
                                    style={styles.timePicker}
                                    onValueChange={(minutes) => updateDateTime(tempDate.getHours(), minutes)}
                                >
                                    {Array.from({ length: 60 }, (_, i) => (
                                        <Picker.Item 
                                            key={i} 
                                            label={i.toString().padStart(2, '0')} 
                                            value={i}
                                            style={styles.timePickerItem}
                                        />
                                    ))}
                                </Picker>
                            </View>

                            {/* Buttons */}
                            <View style={styles.modalButtons}>
                                <MyButton
                                    title="Cancelar"
                                    style={styles.modalButton}
                                    onPress={() => setShow(false)}
                                />
                                <MyButton
                                    title="Aceptar"
                                    style={[styles.modalButton, styles.modalButtonConfirm]}
                                    onPress={() => {
                                        onChange(tempDate);
                                        setShow(false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        );
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
                <View style={styles.picker}>
                    <Picker
                        selectedValue={formData.difficulty}
                        onValueChange={(itemValue) =>
                            setFormData({ ...formData, difficulty: itemValue })
                        }
                        style={{ color: theme.text }}
                        dropdownIconColor={theme.text}
                    >
                        <Picker.Item label="Fácil" value="easy" style={styles.pickerItem} />
                        <Picker.Item label="Media" value="medium" style={styles.pickerItem} />
                        <Picker.Item label="Difícil" value="hard" style={styles.pickerItem} />
                    </Picker>
                </View>

                <Text style={styles.label}>Categoría</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={formData.category}
                        onValueChange={(itemValue) =>
                            setFormData({ ...formData, category: itemValue })
                        }
                        style={{ color: theme.text }}
                        dropdownIconColor={theme.text}
                    >
                        <Picker.Item label="Lectura" value="LECTURA" style={styles.pickerItem} />
                        <Picker.Item label="Deporte" value="DEPORTE" style={styles.pickerItem} />
                        <Picker.Item label="Salud" value="SALUD" style={styles.pickerItem} />
                        <Picker.Item label="Aprendizaje" value="APRENDIZAJE" style={styles.pickerItem} />
                        <Picker.Item label="Hobby" value="HOBBY" style={styles.pickerItem} />
                    </Picker>
                </View>

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
                {renderDatePicker(
                    new Date(formData.startDate),
                    (date) => setFormData({
                        ...formData,
                        startDate: formatDate(date),
                    }),
                    showStartPicker,
                    setShowStartPicker
                )}

                <Text style={styles.label}>Fecha de fin</Text>
                {renderDatePicker(
                    new Date(formData.endDate),
                    (date) => setFormData({
                        ...formData,
                        endDate: formatDate(date),
                    }),
                    showEndPicker,
                    setShowEndPicker
                )}

                {/* Botones de acción */}
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonRow}>
                        <MyButton
                            title="Guardar Reto"
                            style={styles.btnSave}
                            onPress={handleSubmit}
                        />
                        <MyButton
                            title="Volver"
                            style={styles.btnBack}
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    {editId && (
                        <View style={styles.buttonRow}>
                            <MyButton
                                title="Cancelar Reto"
                                style={styles.btnCancel}
                                onPress={handleCancel}
                            />
                            <MyButton
                                title="Borrar Reto"
                                style={styles.btnDelete}
                                onPress={handleDelete}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                visible={deleteModalVisible}
                title="Eliminar reto"
                message="¿Estás seguro de que quieres eliminar este reto?"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteModalVisible(false)}
            />

            {/* Cancel Challenge Modal */}
            <ConfirmModal
                visible={cancelModalVisible}
                title="Cancelar reto"
                message="¿Estás seguro de que quieres cancelar este reto?"
                onConfirm={confirmCancel}
                onCancel={() => setCancelModalVisible(false)}
            />
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
        height: 45,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.backgroundCard,
        color: theme.text,
        justifyContent: 'center',
    },
    pickerItem: {
        color: theme.text,
        fontSize: 16,
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
        marginTop: 24,
        paddingHorizontal: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    btnSave: {
        backgroundColor: theme.success,
        flex: 1,
        marginRight: 8,
        height: 45,
        paddingVertical: 10,
    },
    btnBack: {
        backgroundColor: theme.buttonSecondary,
        flex: 1,
        marginLeft: 8,
        height: 45,
        paddingVertical: 10,
    },
    btnCancel: {
        backgroundColor: theme.warning,
        flex: 1,
        marginRight: 8,
        height: 45,
        paddingVertical: 10,
    },
    btnDelete: {
        backgroundColor: theme.error,
        flex: 1,
        marginLeft: 8,
        height: 45,
        paddingVertical: 10,
    },
    dateButton: {
        borderWidth: 1,
        borderColor: theme.border,
        padding: 12,
        borderRadius: 6,
        backgroundColor: theme.backgroundCard,
        marginTop: 4,
    },
    dateButtonText: {
        color: theme.text,
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: theme.backgroundCard,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.textTitle,
        textAlign: 'center',
        marginBottom: 16,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    timeSeparator: {
        fontSize: 24,
        marginHorizontal: 8,
        color: theme.text,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 8,
    },
    modalButton: {
        flex: 1,
    },
    modalButtonConfirm: {
        backgroundColor: theme.success,
    },
    datePicker: {
        marginTop: 4,
        height: 100,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.backgroundCard,
        color: theme.text,
        justifyContent: 'center',
    },
    datePickerItem: {
        color: theme.text,
        fontSize: 20, // Texto más grande
        height: 150, // Altura más grande para el item
    },
    timePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        height: 150, // Altura más grande
    },
    timePicker: {
        flex: 1,
        height: 150, // Altura más grande
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.backgroundCard,
        color: theme.text,
    },
    timePickerItem: {
        color: theme.text,
        fontSize: 24, 
        height: 150,
    },
});
