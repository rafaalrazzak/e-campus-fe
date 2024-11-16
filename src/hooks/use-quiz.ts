import { useCallback, useRef, useEffect, useMemo } from "react";
import { useSecureStorage } from "@/hooks";
import type { QuizState, Question, StorageValidation } from "@/types/quiz";
import { generateKeyQuiz } from "@/lib/crypto";

const TIMER_DURATION = 30;
const STORAGE_KEY = "quiz-state";

// Move types to separate file if not already done
interface UseQuizReturn {
    state: QuizState;
    moveToNextQuestion: () => void;
    handleAnswerSelect: (answerIndex: number) => void;
    handleQuestionSelect: (index: number) => void;
    toggleTimerMode: (enabled: boolean) => void;
    resetQuiz: () => void;
    calculateScore: () => number | null;
    pauseQuiz: () => void;
    resumeQuiz: () => void;
    finishQuiz: () => void;
    isPaused: boolean;
    timeElapsed: number;
    averageTimePerQuestion: number;
    isLastQuestion: boolean;
    progressPercentage: number;
    questionsRemaining: number;
    currentStreak: number;
}

// Memoized validator function
const validateQuizState = (state: unknown): StorageValidation => {
    if (!state || typeof state !== "object") {
        return { isValid: false, error: "Invalid state structure" };
    }

    const requiredProps = ["currentIndex", "answers", "timeLeft", "isTimerMode", "isCompleted", "sessionKey", "startTime", "timeElapsed", "streak", "isPaused", "lastAnswerTime"];

    const typedState = state as Record<string, unknown>;

    for (const prop of requiredProps) {
        if (!(prop in typedState)) {
            return { isValid: false, error: `Missing required property: ${prop}` };
        }
    }

    if (!Array.isArray(typedState.answers)) {
        return { isValid: false, error: "Answers must be an array" };
    }

    return { isValid: true };
};

export function useQuiz(questions: readonly Question[]): UseQuizReturn {
    // Memoize initial state
    const initialState = useMemo(
        () => ({
            currentIndex: 0,
            answers: Array(questions.length).fill(null),
            timeLeft: TIMER_DURATION,
            isTimerMode: true,
            isCompleted: false,
            sessionKey: generateKeyQuiz(),
            startTime: Date.now(),
            timeElapsed: 0,
            streak: 0,
            isPaused: false,
            lastAnswerTime: Date.now(),
        }),
        [questions.length]
    );

    const [state, setState] = useSecureStorage<QuizState>(STORAGE_KEY, initialState, validateQuizState);

    const timerRef = useRef<NodeJS.Timeout>();
    const lastTickRef = useRef<number>(Date.now());

    // Optimized timer effect
    useEffect(() => {
        if (state.isCompleted || state.isPaused) {
            timerRef.current && clearInterval(timerRef.current);
            return;
        }

        const handleTick = () => {
            const now = Date.now();
            const delta = now - lastTickRef.current;
            lastTickRef.current = now;

            setState((prev) => {
                if (prev.timeLeft <= 1 && prev.isTimerMode) {
                    const nextIndex = prev.currentIndex + 1;
                    const isCompleted = nextIndex >= questions.length;

                    return {
                        ...prev,
                        currentIndex: isCompleted ? prev.currentIndex : nextIndex,
                        timeLeft: TIMER_DURATION,
                        isCompleted,
                        timeElapsed: prev.timeElapsed + delta,
                        streak: 0,
                    };
                }

                return {
                    ...prev,
                    timeLeft: prev.timeLeft - 1,
                    timeElapsed: prev.timeElapsed + delta,
                };
            });
        };

        timerRef.current = setInterval(handleTick, 1000);
        return () => timerRef.current && clearInterval(timerRef.current);
    }, [state.isCompleted, state.isPaused, state.isTimerMode, setState, questions.length]);

    // Memoized action handlers
    const moveToNextQuestion = useCallback(() => {
        setState((prev) => {
            const nextIndex = prev.currentIndex + 1;
            return {
                ...prev,
                currentIndex: nextIndex >= questions.length ? prev.currentIndex : nextIndex,
                timeLeft: TIMER_DURATION,
                isCompleted: nextIndex >= questions.length,
                lastAnswerTime: Date.now(),
            };
        });
    }, [setState, questions.length]);

    const handleAnswerSelect = useCallback(
        (answerIndex: number) => {
            setState((prev) => {
                const newAnswers = [...prev.answers];
                newAnswers[prev.currentIndex] = answerIndex;

                const isCorrect = answerIndex === questions[prev.currentIndex].correctAnswer;
                const nextIndex = prev.currentIndex + 1;
                const isCompleted = nextIndex >= questions.length;

                return {
                    ...prev,
                    answers: newAnswers,
                    currentIndex: prev.isTimerMode && !isCompleted ? nextIndex : prev.currentIndex,
                    timeLeft: TIMER_DURATION,
                    isCompleted: prev.isTimerMode && isCompleted,
                    lastAnswerTime: Date.now(),
                    streak: isCorrect ? prev.streak + 1 : 0,
                    timeElapsed: isCompleted ? Date.now() - prev.startTime : prev.timeElapsed,
                };
            });
        },
        [setState, questions]
    );

    const handleQuestionSelect = useCallback(
        (index: number) => {
            setState((prev) =>
                !prev.isTimerMode && !prev.isPaused
                    ? {
                          ...prev,
                          currentIndex: index,
                          timeLeft: TIMER_DURATION,
                          lastAnswerTime: Date.now(),
                      }
                    : prev
            );
        },
        [setState]
    );

    // Quiz control functions
    const toggleTimerMode = useCallback(
        (enabled: boolean) => {
            setState((prev) => ({
                ...prev,
                isTimerMode: enabled,
                timeLeft: TIMER_DURATION,
            }));
        },
        [setState]
    );

    const resetQuiz = useCallback(() => {
        timerRef.current && clearInterval(timerRef.current);
        setState({
            ...initialState,
            sessionKey: generateKeyQuiz(),
            startTime: Date.now(),
            lastAnswerTime: Date.now(),
        });
    }, [setState, initialState]);

    const pauseQuiz = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isPaused: true,
            lastAnswerTime: Date.now(),
        }));
    }, [setState]);

    const resumeQuiz = useCallback(() => {
        lastTickRef.current = Date.now();
        setState((prev) => ({
            ...prev,
            isPaused: false,
            lastAnswerTime: Date.now(),
        }));
    }, [setState]);

    const finishQuiz = useCallback(() => {
        setState((prev) => {
            const allAnswered = prev.answers.every((answer) => answer !== null);
            return allAnswered
                ? {
                      ...prev,
                      isCompleted: true,
                      timeElapsed: Date.now() - prev.startTime,
                      lastAnswerTime: Date.now(),
                  }
                : prev;
        });
        timerRef.current && clearInterval(timerRef.current);
    }, [setState]);

    // Memoized calculations
    const calculatedValues = useMemo(
        () => ({
            calculateScore: () => state.answers.reduce((score, answer, index) => (score ?? 0) + (answer === questions[index].correctAnswer ? 1 : 0), 0),
            averageTimePerQuestion: state.currentIndex > 0 ? state.timeElapsed / state.currentIndex : 0,
            isLastQuestion: state.currentIndex === questions.length - 1,
            progressPercentage: ((state.currentIndex + 1) / questions.length) * 100,
            questionsRemaining: questions.length - (state.currentIndex + 1),
        }),
        [state.answers, state.currentIndex, state.timeElapsed, questions]
    );

    return {
        state,
        moveToNextQuestion,
        handleAnswerSelect,
        handleQuestionSelect,
        toggleTimerMode,
        resetQuiz,
        calculateScore: calculatedValues.calculateScore,
        pauseQuiz,
        resumeQuiz,
        finishQuiz,
        isPaused: state.isPaused,
        timeElapsed: state.timeElapsed,
        averageTimePerQuestion: calculatedValues.averageTimePerQuestion,
        isLastQuestion: calculatedValues.isLastQuestion,
        progressPercentage: calculatedValues.progressPercentage,
        questionsRemaining: calculatedValues.questionsRemaining,
        currentStreak: state.streak,
    };
}
