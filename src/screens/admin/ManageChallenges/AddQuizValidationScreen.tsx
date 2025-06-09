import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { MyButton } from '../../../components/shared/MyButton';
import { useTheme } from '../../../context/ThemeContext';
import { Question, QuizSubmitRequest } from '../../../shared/models/VerificationData';
import { assignVerificationType } from '../../../shared/services/ChallengeService';
import { createQuizVerification } from '../../../shared/services/VerificationService';
import colors from '../../../shared/themes/constants/colors';
import createTextStyles from '../../../shared/themes/styles/textStyles';
import { Theme } from '../../../shared/themes/themes';
import { AdminStackParamList } from '../AdminStackScreen';

type RouteProps = RouteProp<AdminStackParamList, 'AddQuizValidation'>;
type NavProps = BottomTabNavigationProp<AdminStackParamList, 'AddQuizValidation'>;

export default function AddQuizValidationScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const textStyles = createTextStyles(theme);

    const navigation = useNavigation<NavProps>();
    const route = useRoute<RouteProps>();

    const [challengeId, setChallengeId] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>(
        [{ question: '', answers: [{ text: '', correct: false }] }],
    );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const loadVerificationInfo = async () => {
        try {
            setIsLoading(true);
            
            if (!route.params?.challengeId) {
                throw new Error('No se proporcionó ID del reto');
            }

            // Obtener el ID completo directamente del endpoint de asignación
            const assignedId = await assignVerificationType(route.params.challengeId, "Q");
            
            if (!assignedId) {
                throw new Error('No se pudo generar ID de verificación');
            }

            // Guardar el ID en el estado
            setChallengeId(assignedId.toString());

            console.log('ID asignado:', assignedId); // Para depuración

        } catch (error) {
            console.error("Error en loadVerificationInfo:", error);
            Alert.alert(
                "Error",
                "No se pudo preparar el quiz. Por favor, inténtalo de nuevo."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Modificar el useEffect para manejar mejor la carga inicial
    useEffect(() => {
        const initializeQuiz = async () => {
            if (route.params?.challengeId) {
                await loadVerificationInfo();
            }
        };

        initializeQuiz();
    }, [route.params?.challengeId]);

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { question: '', answers: [{ text: '', correct: false }] },
        ]);
        setCurrentQuestionIndex(questions.length); // Mover a la nueva pregunta
    };

    const handleRemoveQuestion = () => {
        if (questions.length === 1) {
            Alert.alert('No puedes borrar la última pregunta.');
            return;
        }
        Alert.alert(
            'Confirmar',
            '¿Estás seguro de que quieres borrar esta pregunta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Borrar',
                    style: 'destructive',
                    onPress: () => {
                        const newQuestions = [...questions];
                        newQuestions.splice(currentQuestionIndex, 1);
                        setQuestions(newQuestions);
                        // Ajustar índice si es necesario
                        if (currentQuestionIndex >= newQuestions.length) {
                            setCurrentQuestionIndex(newQuestions.length - 1);
                        }
                    },
                },
            ]
        );
    };

    const handleAddAnswer = (questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.push({ text: '', correct: false });
        setQuestions(newQuestions);
    };

    const handleRemoveAnswer = (questionIndex: number, answerIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.splice(answerIndex, 1);
        setQuestions(newQuestions);
    };

    const handleSaveDraft = async () => {
        const draft = { challengeId, questions };
        await AsyncStorage.setItem('quizDraft', JSON.stringify(draft));
        Alert.alert('Borrador guardado');
    };

    // Función de validación mejorada
    const validateForm = (): boolean => {
        if (!challengeId) {
            Alert.alert('Error', 'ID del reto no puede estar vacío.');
            return false;
        }
        for (const q of questions) {
            if (!q.question.trim()) {
                Alert.alert('Error', 'Todas las preguntas deben tener un enunciado.');
                return false;
            }
            if (q.answers.length < 2) {
                Alert.alert('Error', 'Cada pregunta debe tener al menos dos respuestas.');
                return false;
            }
            if (!q.answers.some((a) => a.correct)) {
                Alert.alert('Error', 'Cada pregunta debe tener al menos una respuesta correcta.');
                return false;
            }
            for (const a of q.answers) {
                if (!a.text.trim()) {
                    Alert.alert('Error', 'Las respuestas no pueden estar vacías.');
                    return false;
                }
            }
        }
        return true;
    };

    // Modificar el handleSubmit para verificar el ID
    const handleSubmit = async () => {
        if (!challengeId) {
            Alert.alert('Error', 'No se pudo generar el ID del quiz');
            return;
        }

        if (!validateForm()) return;

        try {
            setIsLoading(true);
            const quizData: QuizSubmitRequest = {
                quizId: challengeId,
                questions: questions.map((q) => ({
                    questionId: '',
                    question: q.question.trim(),
                    answers: q.answers.map((a) => ({
                        answerId: '',
                        result: a.text.trim(),
                        isCorrect: a.correct,
                    })),
                })),
            };

            console.log('Datos del quiz a enviar:', quizData); // Para depuración
            await createQuizVerification(quizData);
            await AsyncStorage.removeItem('quizDraft');
            Alert.alert('Éxito', 'Quiz creado correctamente');
            navigation.goBack();
        } catch (error: any) {
            console.error('Error al crear el quiz:', error);
            Alert.alert(
                'Error',
                error?.response?.data?.message || 'No se pudo crear el quiz. Por favor, inténtalo de nuevo.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScreenHeader
                title="Crear Quiz"
                onLeftPress={() => navigation.goBack()}
                leftLabel="← Volver"
            />
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.label}>ID del Reto (quizId)</Text>
                <TextInput
                    value={challengeId || ''}
                    editable={false}
                    style={[styles.input, { backgroundColor: theme.backgroundAlt }]}
                />
                <View style={styles.questionContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Pregunta"
                        value={questions[currentQuestionIndex].question || ''}
                        onChangeText={(text) => {
                            const newQuestions = [...questions];
                            newQuestions[currentQuestionIndex].question = text;
                            setQuestions(newQuestions);
                        }}
                    />
                    {questions[currentQuestionIndex]?.answers.map((a, answerIndex) => (
                        <View key={answerIndex} style={styles.answerContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Respuesta"
                                value={a.text || ''} // Valor por defecto
                                onChangeText={(text) => {
                                    const newQuestions = [...questions];
                                    newQuestions[currentQuestionIndex].answers[answerIndex].text = text;
                                    setQuestions(newQuestions);
                                }}
                            />
                            <View style={styles.checkboxContainer}>
                                <BouncyCheckbox
                                    isChecked={a.correct}
                                    onPress={() => {
                                        const newQuestions = [...questions];
                                        newQuestions[currentQuestionIndex].answers[answerIndex].correct =
                                            !a.correct;
                                        setQuestions(newQuestions);
                                    }}
                                    fillColor={colors.primary}
                                />
                                <Text style={textStyles.normal}>¿Es correcta?</Text>
                            </View>
                            <MyButton
                                title="Borrar Respuesta"
                                onPress={() => handleRemoveAnswer(currentQuestionIndex, answerIndex)}
                                style={{ backgroundColor: colors.danger }}
                            />
                        </View>
                    ))}
                    <MyButton title="Agregar Respuesta" onPress={() => handleAddAnswer(currentQuestionIndex)} />
                </View>

                <View style={styles.buttonContainer}>
                    <MyButton title="Guardar Borrador" onPress={handleSaveDraft} />
                    <MyButton title="Agregar Pregunta" onPress={handleAddQuestion} />
                    <MyButton title="Borrar Pregunta" onPress={handleRemoveQuestion} style={{ backgroundColor: colors.danger }} />
                    <MyButton 
                        title="Crear Quiz" 
                        onPress={handleSubmit}
                        disabled={isLoading} // Solo deshabilitar mientras carga
                    />
                </View>

                <View style={styles.navigationContainer}>
                    <MyButton
                        title="Anterior"
                        onPress={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                    />
                    <MyButton
                        title="Siguiente"
                        onPress={handleNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: theme.background,
        paddingBottom: 50,
    },
    container: {
        padding: 16,
        backgroundColor: theme.background,
        flex: 1,
        borderRadius: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.border,
        padding: 10,
        borderRadius: 6,
        marginTop: 4,
        marginBottom: 10,
        backgroundColor: theme.backgroundCard,
        color: theme.text,
    },
    questionContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 6,
        backgroundColor: theme.card,
    },
    answerContainer: {
        marginBottom: 10,
        padding: 10,
        borderLeftWidth: 2,
        borderLeftColor: theme.primary,
        backgroundColor: theme.backgroundAlt,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 8,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 24, // Añadir margen inferior
        paddingHorizontal: 16,
        width: '100%', // Asegurar que ocupa todo el ancho
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkboxLabel: {
        color: theme.text,
        marginLeft: 8,
    },
    deleteButton: {
        backgroundColor: theme.error,
    },
    primaryButton: {
        backgroundColor: theme.buttonPrimary,
    },
    secondaryButton: {
        backgroundColor: theme.buttonSecondary,
    },
    buttonText: {
        color: theme.buttonText,
        fontSize: 14,
        fontWeight: '600',
    },
    label: {
        color: theme.text,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
});
