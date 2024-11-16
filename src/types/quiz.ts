export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
}

export interface QuizState {
    currentIndex: number;
    answers: (number | null)[];
    timeLeft: number;
    isTimerMode: boolean;
    isCompleted: boolean;
    sessionKey: string;
    startTime: number;
    timeElapsed: number;
    streak: number;
    isPaused: boolean;
    lastAnswerTime: number;
}

export interface StorageValidation {
    isValid: boolean;
    error?: string;
}