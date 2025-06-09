import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../../../App';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import AnswerOption from '../../../components/layout/challenges/AnswerOption';
import { MyButton } from '../../../components/shared/MyButton';
import { useTheme } from '../../../context/ThemeContext';
import { QuizDetailQuestion, UserAnswerDTO } from '../../../shared/models/VerificationData';
import { getQuizDetailsForChallenge, submitQuiz } from '../../../shared/services/VerificationService';
import { Theme } from '../../../shared/themes/themes';

type ValidationQuestRouteProp = RouteProp<RootStackParamList, 'ValidationQuest'>;
type ValidationQuestNavProp = BottomTabNavigationProp<RootStackParamList, 'ValidationQuest'>;

export default function ValidationQuestScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<ValidationQuestNavProp>();
    const route = useRoute<ValidationQuestRouteProp>();

    const [selected, setSelected] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<QuizDetailQuestion | null>(null);
    const [questions, setQuestions] = useState<QuizDetailQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        loadQuizDetails();
    }, []);

    const loadQuizDetails = async () => {
        try {
            setLoading(true);
            if (!route.params?.challengeId) {
                throw new Error('No se proporcionó ID del reto');
            }

            const response = await getQuizDetailsForChallenge(route.params.challengeId);
            setQuestions(response.questions);
            if (response.questions.length > 0) {
                setCurrentQuestion(response.questions[0]);
            }
        } catch (err) {
            console.error('Error loading quiz:', err);
            setError('Error al cargar el quiz');
        } finally {
            setLoading(false);
        }
    };

    // Función para verificar si todas las preguntas están respondidas
    const areAllQuestionsAnswered = () => {
        return questions.every(q => answers[q.questionId]);
    };

    // Modificar la función de selección de respuesta
    const handleSelectAnswer = (questionId: string, answerId: string) => {
        setSelected(answerId);
        setAnswers(prev => ({
            ...prev,
            [questionId]: answerId
        }));
    };

    const handleSubmit = async () => {
        if (!areAllQuestionsAnswered()) {
            Alert.alert('Error', 'Debes responder todas las preguntas');
            return;
        }

        try {
            setLoading(true);
            
            // Transform answers object into UserAnswerDTO array
            const userAnswers: UserAnswerDTO[] = Object.entries(answers).map(([questionId, answerId]) => ({
                questionId,
                answerId
            }));
            console.log('User Answers:', userAnswers);

            await submitQuiz(
                route.params.challengeId, // Make sure to pass userId in navigation params
                userAnswers
            );

            Alert.alert(
                'Éxito', 
                'Quiz enviado correctamente',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } catch (error: any) {
            console.error('Error al enviar quiz:', error);
            Alert.alert(
                'Error',
                error?.response?.data?.message || 'No se pudo enviar el quiz. Por favor, inténtalo de nuevo.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentQuestion(questions[currentQuestionIndex + 1]);
            // Mantener la selección previa si existe
            setSelected(answers[questions[currentQuestionIndex + 1].questionId] || null);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setCurrentQuestion(questions[currentQuestionIndex - 1]);
            // Mantener la selección previa si existe
            setSelected(answers[questions[currentQuestionIndex - 1].questionId] || null);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safe}>
                <ScreenHeader
                    title="Validación"
                    onLeftPress={() => navigation.goBack()}
                    leftLabel="← Volver"
                />
                <ActivityIndicator size="large" color={theme.primary} />
            </SafeAreaView>
        );
    }

    if (error || !currentQuestion) {
        return (
            <SafeAreaView style={styles.safe}>
                <ScreenHeader
                    title="Validación"
                    onLeftPress={() => navigation.goBack()}
                    leftLabel="← Volver"
                />
                <Text style={styles.error}>{error || 'No hay preguntas disponibles'}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScreenHeader
                title={`Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}
                onLeftPress={() => navigation.goBack()}
                leftLabel="← Volver"
            />
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>{currentQuestion.title}</Text>
                </View>

                <View style={styles.card}>
                    {currentQuestion.answers.map((ans, index) => (
                        <AnswerOption
                            key={ans.answerId}
                            id={ans.answerId}
                            label={ans.text}
                            isActive={selected === ans.answerId}
                            isFirst={index === 0}
                            isLast={index === currentQuestion.answers.length - 1}
                            onPress={() => handleSelectAnswer(currentQuestion.questionId, ans.answerId)}
                        />
                    ))}
                </View>

                <View style={styles.navigationContainer}>
                    <MyButton
                        title="← Anterior"
                        onPress={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                    />
                    <MyButton
                        title="Siguiente →"
                        onPress={handleNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <MyButton
                        title="Enviar Respuestas"
                        onPress={handleSubmit}
                        disabled={!areAllQuestionsAnswered()}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: theme.background,
    },
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 16,
    },
    card: {
        backgroundColor: theme.card,
        padding: 16,
        margin: 16,
        borderRadius: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: theme.textTitle,
        marginBottom: 12,
    },
    error: {
        color: theme.error,
        textAlign: 'center',
        margin: 16,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginTop: 'auto',
    },
    buttonContainer: {
        padding: 16,
        marginBottom: 16,
    },
});
