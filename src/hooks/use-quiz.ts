import { useCallback, useRef, useEffect, useMemo } from "react";
import { useSecureStorage } from "@/hooks";
import type { Question, QuizState } from "@/types/quiz";
import { createId } from "@paralleldrive/cuid2";

const TIMER_DURATION = 30; // seconds
const TICK_INTERVAL = 1000; // 1 second in milliseconds

export function useQuiz(questions: readonly Question[]) {
    const initialState = useMemo(
        () => ({
            currentIndex: 0,
            answers: new Array(questions.length).fill(null),
            timeLeft: TIMER_DURATION,
            isTimerMode: true,
            isCompleted: false,
            sessionKey: createId(),
            startTime: Date.now(),
            timeElapsed: 0,
            streak: 0,
            isPaused: false,
        }),
        [questions.length]
    );

    const [state, setState] = useSecureStorage<QuizState>("quiz-state", initialState);
    const timerRef = useRef<ReturnType<typeof setInterval>>();
    const lastTickRef = useRef<number>(Date.now());

    const handleTimerTick = useCallback(() => {
        if (!state || state.isPaused || state.isCompleted) return;

        const now = Date.now();
        const delta = Math.min(now - lastTickRef.current, TICK_INTERVAL * 2);
        lastTickRef.current = now;

        setState((prev) => {
            if (!prev) return prev;

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
                timeLeft: Math.max(0, prev.timeLeft - 1),
                timeElapsed: prev.timeElapsed + delta,
            };
        });
    }, [questions.length, setState, state]);

    useEffect(() => {
        if (!state || state.isCompleted || state.isPaused) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            return;
        }

        timerRef.current = setInterval(handleTimerTick, TICK_INTERVAL);
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [handleTimerTick, state]);

    const actions = useMemo(
        () => ({
            handleAnswer: (answerId: string) => {
                setState((prev) => {
                    if (!prev) return prev;

                    const currentQuestion = questions[prev.currentIndex];
                    if (!currentQuestion) return prev;

                    const isCorrect = answerId === currentQuestion.correctAnswer;
                    const nextIndex = prev.currentIndex + 1;
                    const isCompleted = prev.isTimerMode && nextIndex >= questions.length;

                    return {
                        ...prev,
                        answers: Object.assign([], prev.answers, { [prev.currentIndex]: answerId }),
                        currentIndex: prev.isTimerMode ? nextIndex : prev.currentIndex,
                        timeLeft: TIMER_DURATION,
                        isCompleted,
                        // Only update streak in timer mode
                        streak: prev.isTimerMode ? (isCorrect ? prev.streak + 1 : 0) : 0,
                        timeElapsed: isCompleted ? Date.now() - prev.startTime : prev.timeElapsed,
                    };
                });
            },

            navigateToQuestion: (index: number) => {
                if (!state || index < 0 || index >= questions.length || state.isTimerMode || state.isPaused) return;
                setState((prev) => (prev ? { ...prev, currentIndex: index, timeLeft: TIMER_DURATION } : prev));
            },

            nextQuestion: () => {
                if (!state || state.isTimerMode || state.isPaused || state.isCompleted) return;
                setState((prev) => {
                    if (!prev || prev.currentIndex >= questions.length - 1) return prev;
                    return {
                        ...prev,
                        currentIndex: prev.currentIndex + 1,
                        timeLeft: TIMER_DURATION,
                    };
                });
            },

            previousQuestion: () => {
                if (!state || state.isTimerMode || state.isPaused || state.isCompleted) return;
                setState((prev) => {
                    if (!prev || prev.currentIndex <= 0) return prev;
                    return {
                        ...prev,
                        currentIndex: prev.currentIndex - 1,
                        timeLeft: TIMER_DURATION,
                    };
                });
            },

            toggleTimer: (enabled: boolean) => {
                setState((prev) =>
                    prev
                        ? {
                              ...prev,
                              isTimerMode: enabled,
                              timeLeft: TIMER_DURATION,
                              // Reset streak when switching modes
                              streak: 0,
                          }
                        : prev
                );
            },

            togglePause: () => {
                setState((prev) => (prev ? { ...prev, isPaused: !prev.isPaused } : prev));
                lastTickRef.current = Date.now();
            },

            resetQuiz: () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
                setState({
                    ...initialState,
                    sessionKey: createId(),
                    startTime: Date.now(),
                });
            },

            finishQuiz: () => {
                setState((prev) =>
                    prev
                        ? {
                              ...prev,
                              isCompleted: true,
                              timeElapsed: Date.now() - prev.startTime,
                          }
                        : prev
                );
            },
        }),
        [questions, setState, initialState, state]
    );

    const stats = useMemo(() => {
        if (!state)
            return {
                score: 0,
                progress: 0,
                remaining: questions.length,
                avgTimePerQuestion: 0,
                isLastQuestion: false,
                currentQuestion: null,
                canGoNext: false,
                canGoPrevious: false,
                streak: 0,
                showStreak: false,
            };

        return {
            score: state.answers.reduce((total, answer, index) => total + (answer === questions[index]?.correctAnswer ? 1 : 0), 0),
            progress: Math.min(((state.currentIndex + 1) / questions.length) * 100, 100),
            remaining: Math.max(questions.length - (state.currentIndex + 1), 0),
            avgTimePerQuestion: state.currentIndex > 0 ? Math.round(state.timeElapsed / state.currentIndex) : 0,
            isLastQuestion: state.currentIndex === questions.length - 1,
            currentQuestion: questions[state.currentIndex],
            canGoNext: !state.isTimerMode && !state.isPaused && !state.isCompleted && state.currentIndex < questions.length - 1,
            canGoPrevious: !state.isTimerMode && !state.isPaused && !state.isCompleted && state.currentIndex > 0,
            streak: state.streak,
            showStreak: state.isTimerMode,
        };
    }, [questions, state]);

    return {
        state,
        ...actions,
        ...stats,
    };
}
