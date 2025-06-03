import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { MyButton } from '../../../components/shared/MyButton';
import colors from '../../../shared/themes/constants/colors';

export default function AddQuizValidationScreen() {
    const navigation = useNavigation();
    const [quizId, setQuizId] = useState('');
    const [questions, setQuestions] = useState([{ question: '', answers: [{ text: '', correct: false }] }]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', answers: [{ text: '', correct: false }] }]);
    };

    const handleAddAnswer = (questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.push({ text: '', correct: false });
        setQuestions(newQuestions);
    };

    const handleSubmit = async () => {
        const quizData = {
            quizId,
            questions: questions.map(q => ({
                questionId: Math.random().toString(), // Generar un ID único para la pregunta
                question: q.question,
                answers: q.answers.map(a => ({
                    answerId: Math.random().toString(), // Generar un ID único para la respuesta
                    result: a.text,
                    isCorrect: a.correct,
                })),
            })),
        };

        try {
            const response = await axios.post('http://<YOUR_API_URL>/api/verification/quiz', quizData);
            alert(`Quiz creado con ID: ${response.data}`);
        } catch (error) {
            console.error(error);
            alert('Error al crear el quiz');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenHeader
                title='Crear Validación'
                onLeftPress={() => navigation.goBack()}
                leftLabel="← Volver"
            />
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="ID del Quiz"
                    value={quizId}
                    onChangeText={setQuizId}
                />
                {questions.map((q, questionIndex) => (
                    <View key={questionIndex} style={styles.questionContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Pregunta"
                            value={q.question}
                            onChangeText={(text) => {
                                const newQuestions = [...questions];
                                newQuestions[questionIndex].question = text;
                                setQuestions(newQuestions);
                            }}
                        />
                        {q.answers.map((a, answerIndex) => (
                            <View key={answerIndex} style={styles.answerContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Respuesta"
                                    value={a.text}
                                    onChangeText={(text) => {
                                        const newQuestions = [...questions];
                                        newQuestions[questionIndex].answers[answerIndex].text = text;
                                        setQuestions(newQuestions);
                                    }}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="¿Es correcta? (true/false)"
                                    value={String(a.correct)}
                                    onChangeText={(text) => {
                                        const newQuestions = [...questions];
                                        newQuestions[questionIndex].answers[answerIndex].correct = text === 'true';
                                        setQuestions(newQuestions);
                                    }}
                                />
                            </View>
                        ))}
                        <MyButton title="Agregar Respuesta" onPress={() => handleAddAnswer(questionIndex)} />
                    </View>
                ))}
                <View style={styles.buttonContainer}>
                    <MyButton 
                        title="Agregar Pregunta" 
                        onPress={handleAddQuestion}
                        style={styles.btnSave} 
                    />
                    <MyButton 
                        title="Crear Quiz" 
                        onPress={handleSubmit}
                        style={styles.btnCancel} 
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

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
        marginBottom: 10,
    },
    questionContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
    },
    answerContainer: {
        marginBottom: 10,
        padding: 10,
        borderLeftWidth: 2,
        borderLeftColor: colors.primary,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginBottom: 24,
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