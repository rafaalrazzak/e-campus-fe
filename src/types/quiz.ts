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
}

export interface Question {
    id: string;
    text: string;
    options: Array<{
        id: string;
        text: string;
    }>;
    correctAnswer: string;
}
