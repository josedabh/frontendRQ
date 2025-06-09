export interface QuizSubmitRequest {
    quizId: string;
    questions: QuestionRequest[];
}

export interface QuestionRequest {
    questionId: string;
    question: string;
    answers: AnswerRequest[];
}

export interface AnswerRequest {
    answerId: string;
    result: string;
    isCorrect: boolean;
}

export interface QuizSubmitResponse {
    quizId: string;
    questions: QuestionResponse[];
}

export interface QuestionResponse {
    questionId: string;
    question: string;
    answers: AnswerResponse[];
}

export interface AnswerResponse {
    answerId: string;
    result: string;
}

export interface AnswerDTO {
    questionId: string;
    answerId: string;
}

export interface Answer {
    text: string;
    correct: boolean;
}

export interface Question {
    question: string;
    answers: Answer[];
}

export interface QuizData {
    quizId: string;
    title: string;
    questions: {
        questionId: string;
        question: string;
        answers: {
            answerId: string;
            result: string;
            isCorrect: boolean;
        }[];
    }[];
}

export interface QuizDetailResponse {
    quizId: string;
    questions: QuizDetailQuestion[];
}

export interface QuizDetailQuestion {
    questionId: string;
    title: string;
    answers: QuizDetailAnswer[];
}

export interface QuizDetailAnswer {
    answerId: string;
    text: string;
}

export interface UserAnswerDTO {
    questionId: string;
    answerId: string;
}
