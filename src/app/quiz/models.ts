export interface QuizObject {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface QuizUserAnswer {
    quizObject: QuizObject;
    userAnswer: string;
    isAnswerCorrect: boolean;
    isAnswerSkipped: boolean;
}

export interface QuizState {
    currentQuizIndex: number;
    quizUserAnswer: QuizUserAnswer[];
}