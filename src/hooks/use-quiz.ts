import { useCallback, useRef, useEffect, useMemo } from "react";
import { useSecureStorage } from "@/hooks";
import { Question, QuizState } from "@/types/quiz";

export const TIMER_DURATION = 30;
export const STORAGE_KEY = "quiz-state";

export function useQuiz(questions: readonly Question[]) {
    const initialState = useMemo(
        (): QuizState => ({
            currentIndex: 0,
            answers: Array(questions.length).fill(null),
            timeLeft: TIMER_DURATION,
            isTimerMode: true,
            isCompleted: false,
            sessionKey: crypto.randomUUID(),
            startTime: Date.now(),
            timeElapsed: 0,
            streak: 0,
            isPaused: false,
        }),
        [questions.length]
    );

    const [state, setState] = useSecureStorage<QuizState>(STORAGE_KEY, initialState);
    const timerRef = useRef<NodeJS.Timeout>();
    const lastTickRef = useRef<number>(Date.now());

    const handleTimerTick = useCallback(() => {
        if (state.isPaused || state.isCompleted) return;

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
                timeLeft: Math.max(0, prev.timeLeft - 1),
                timeElapsed: prev.timeElapsed + delta,
            };
        });
    }, [questions.length, setState, state.isCompleted, state.isPaused]);

    useEffect(() => {
        if (state.isCompleted || state.isPaused) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            return;
        }

        timerRef.current = setInterval(handleTimerTick, 1000);
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [handleTimerTick, state.isCompleted, state.isPaused]);

    const actions = useMemo(
        () => ({
            handleAnswer: (answerId: string) => {
                setState((prev) => {
                    const currentQuestion = questions[prev.currentIndex];
                    if (!currentQuestion) return prev;

                    const isCorrect = answerId === currentQuestion.correctAnswer;
                    const newAnswers = [...prev.answers];
                    newAnswers[prev.currentIndex] = answerId;

                    const nextIndex = prev.currentIndex + 1;
                    const isCompleted = prev.isTimerMode && nextIndex >= questions.length;

                    return {
                        ...prev,
                        answers: newAnswers,
                        currentIndex: prev.isTimerMode ? nextIndex : prev.currentIndex,
                        timeLeft: TIMER_DURATION,
                        isCompleted,
                        streak: isCorrect ? prev.streak + 1 : 0,
                        timeElapsed: isCompleted ? Date.now() - prev.startTime : prev.timeElapsed,
                    };
                });
            },

            navigateToQuestion: (index: number) => {
                if (index < 0 || index >= questions.length) return;

                if (!state.isTimerMode && !state.isPaused) {
                    setState((prev) => ({
                        ...prev,
                        currentIndex: index,
                        timeLeft: TIMER_DURATION,
                    }));
                }
            },

            toggleTimer: (enabled: boolean) => {
                setState((prev) => ({
                    ...prev,
                    isTimerMode: enabled,
                    timeLeft: TIMER_DURATION,
                }));
            },

            togglePause: () => {
                setState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
                lastTickRef.current = Date.now();
            },

            resetQuiz: () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
                setState({
                    ...initialState,
                    sessionKey: crypto.randomUUID(),
                    startTime: Date.now(),
                });
            },

            finishQuiz: () => {
                setState((prev) => ({
                    ...prev,
                    isCompleted: true,
                    timeElapsed: Date.now() - prev.startTime,
                }));
            },
        }),
        [questions, setState, initialState, state.isTimerMode]
    );

    const stats = useMemo(
        () => ({
            score: state.answers.reduce((total, answer, index) => total + (answer === questions[index]?.correctAnswer ? 1 : 0), 0),
            progress: Math.min(((state.currentIndex + 1) / questions.length) * 100, 100),
            remaining: Math.max(questions.length - (state.currentIndex + 1), 0),
            avgTimePerQuestion: state.currentIndex > 0 ? Math.round(state.timeElapsed / state.currentIndex) : 0,
            isLastQuestion: state.currentIndex === questions.length - 1,
            currentQuestion: questions[state.currentIndex],
        }),
        [questions, state]
    );

    return {
        state,
        ...actions,
        ...stats,
    };
}
