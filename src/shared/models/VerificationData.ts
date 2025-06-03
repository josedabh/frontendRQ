export interface QuizSubmitRequest {
    quizId: string;
    questions: Question[];
}

export interface Question {
    questionId: string;
    question: string;
    answers: Answer[];
}

export interface Answer {
    answerId: string;
    result: string;
    correct: boolean;
}
