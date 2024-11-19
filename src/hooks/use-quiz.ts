import { useCallback, useRef, useEffect, useMemo } from "react";
import { useSecureStorage } from "@/hooks";
import type { Question, QuizState } from "@/types/quiz";
import { createId } from "@paralleldrive/cuid2";

const TIMER_DURATION = 30;
const TICK_INTERVAL = 1000;

export function useQuiz(questions: readonly Question[]) {
    const initialState = useMemo<QuizState>(
        () => ({
            currentIndex: 0,
            answers: Array(questions.length).fill(null),
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
    const timerRef = useRef<NodeJS.Timeout>();
    const lastTickRef = useRef(Date.now());

    const updateTimer = useCallback(() => {
        const now = Date.now();
        const delta = Math.min(now - lastTickRef.current, TICK_INTERVAL * 2);
        lastTickRef.current = now;

        setState((prev) => {
            if (!prev || prev.isPaused || prev.isCompleted) return prev;

            const timeLeft = Math.max(0, prev.timeLeft - 1);
            const timeElapsed = prev.timeElapsed + delta;

            if (timeLeft <= 0 && prev.isTimerMode) {
                const nextIndex = prev.currentIndex + 1;
                const isCompleted = nextIndex >= questions.length;

                return {
                    ...prev,
                    currentIndex: isCompleted ? prev.currentIndex : nextIndex,
                    timeLeft: TIMER_DURATION,
                    isCompleted,
                    timeElapsed,
                    streak: 0,
                };
            }

            return { ...prev, timeLeft, timeElapsed };
        });
    }, [questions.length, setState]);

    useEffect(() => {
        if (!state?.isCompleted && !state?.isPaused) {
            timerRef.current = setInterval(updateTimer, TICK_INTERVAL);
            return () => clearInterval(timerRef.current);
        }
        clearInterval(timerRef.current);
    }, [updateTimer, state?.isCompleted, state?.isPaused]);

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

                    const newAnswers = [...prev.answers];
                    newAnswers[prev.currentIndex] = answerId;

                    return {
                        ...prev,
                        answers: newAnswers,
                        currentIndex: prev.isTimerMode ? nextIndex : prev.currentIndex,
                        timeLeft: TIMER_DURATION,
                        isCompleted,
                        streak: prev.isTimerMode ? (isCorrect ? prev.streak + 1 : 0) : 0,
                        timeElapsed: isCompleted ? Date.now() - prev.startTime : prev.timeElapsed,
                    };
                });
            },

            navigate: (index: number) => {
                if (!state || state.isTimerMode || state.isPaused || index < 0 || index >= questions.length) return;

                setState(
                    (prev) =>
                        prev && {
                            ...prev,
                            currentIndex: index,
                            timeLeft: TIMER_DURATION,
                        }
                );
            },

            toggleTimer: (enabled: boolean) => {
                setState(
                    (prev) =>
                        prev && {
                            ...prev,
                            isTimerMode: enabled,
                            timeLeft: TIMER_DURATION,
                            streak: 0,
                        }
                );
            },

            togglePause: () => {
                setState((prev) => prev && { ...prev, isPaused: !prev.isPaused });
                lastTickRef.current = Date.now();
            },

            reset: () => {
                clearInterval(timerRef.current);
                setState({
                    ...initialState,
                    sessionKey: createId(),
                    startTime: Date.now(),
                });
            },

            finish: () => {
                setState(
                    (prev) =>
                        prev && {
                            ...prev,
                            isCompleted: true,
                            timeElapsed: Date.now() - prev.startTime,
                        }
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
                canNavigate: false,
                streak: 0,
                showStreak: false,
            };

        const score = state.answers.reduce((total, answer, index) => total + (answer === questions[index]?.correctAnswer ? 1 : 0), 0);

        return {
            score,
            progress: Math.min(((state.currentIndex + 1) / questions.length) * 100, 100),
            remaining: Math.max(questions.length - (state.currentIndex + 1), 0),
            avgTimePerQuestion: state.currentIndex > 0 ? Math.round(state.timeElapsed / state.currentIndex) : 0,
            isLastQuestion: state.currentIndex === questions.length - 1,
            currentQuestion: questions[state.currentIndex],
            canNavigate: !state.isTimerMode && !state.isPaused && !state.isCompleted,
            streak: state.streak,
            showStreak: state.isTimerMode,
        };
    }, [questions, state]);

    return { state, ...actions, ...stats };
}
