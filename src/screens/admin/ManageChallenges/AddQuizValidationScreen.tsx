import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { MyButton } from '../../../components/shared/MyButton';
import colors from '../../../shared/themes/constants/colors';
import { AdminStackParamList } from '../AdminStackScreen';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../shared/themes/themes';
import createTextStyles from '../../../shared/themes/styles/textStyles';

interface Answer {
  text: string;
  correct: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

type RouteProps = RouteProp<AdminStackParamList, 'AddChallenge'>;
type NavProps = BottomTabNavigationProp<AdminStackParamList, 'AddChallenge'>;

export default function AddQuizValidationScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const textStyles = createTextStyles(theme);

  const navigation = useNavigation<NavProps>();
  const route = useRoute<RouteProps>();
  const challengeId = route.params!.id;

  const [quizId, setQuizId] = useState<string>(challengeId);
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', answers: [{ text: '', correct: false }] },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    // Cargar datos de AsyncStorage si existen
    const loadDraft = async () => {
      const draft = await AsyncStorage.getItem('quizDraft');
      if (draft) {
        const parsedDraft = JSON.parse(draft);
        setQuizId(parsedDraft.quizId);
        setQuestions(parsedDraft.questions);
      }
    };
    loadDraft();
  }, []);

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
    const draft = { quizId, questions };
    await AsyncStorage.setItem('quizDraft', JSON.stringify(draft));
    Alert.alert('Borrador guardado');
  };

  const handleSubmit = async () => {
    // Validar que cada pregunta tenga al menos una respuesta correcta
    const isValid = questions.every((q) => q.answers.some((a) => a.correct));
    if (!isValid) {
      Alert.alert('Error', 'Cada pregunta debe tener al menos una respuesta correcta.');
      return;
    }

    const quizData = {
      quizId,
      questions: questions.map((q) => ({
        questionId: Math.random().toString(),
        question: q.question,
        answers: q.answers.map((a) => ({
          answerId: Math.random().toString(),
          result: a.text,
          isCorrect: a.correct,
        })),
      })),
    };

    try {
      const response = await axios.post(
        'http://<YOUR_API_URL>/api/verification/quiz',
        quizData
      );
      Alert.alert(`Quiz creado con ID: ${response.data}`);
      await AsyncStorage.removeItem('quizDraft'); // Limpiar borrador
    } catch (error) {
      console.error(error);
      Alert.alert('Error al crear el quiz');
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title="Crear Validación"
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
        <View style={styles.questionContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pregunta"
            value={questions[currentQuestionIndex].question}
            onChangeText={(text) => {
              const newQuestions = [...questions];
              newQuestions[currentQuestionIndex].question = text;
              setQuestions(newQuestions);
            }}
          />
          {questions[currentQuestionIndex].answers.map((a, answerIndex) => (
            <View key={answerIndex} style={styles.answerContainer}>
              <TextInput
                style={styles.input}
                placeholder="Respuesta"
                value={a.text}
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
          <MyButton title="Crear Quiz" onPress={handleSubmit} />
        </View>

        <View style={styles.navigationContainer}>
          <Button
            title="Anterior"
            onPress={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          />
          <Button
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
    paddingHorizontal: 16,
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
  }
});
