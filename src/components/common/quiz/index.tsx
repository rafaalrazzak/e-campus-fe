"use client";

import { Card } from "@/components/ui/card";
import { useQuiz } from "@/hooks";
import { QUESTIONS } from "./constants";
import { QuizResults } from "./quiz-result";
import { QuizHeader } from "./quiz-header";
import { QuizQuestion } from "./quiz-question";
import { QuizProgress } from "./quiz-progress";

export function Quiz() {
    const {
        state,
        handleAnswer,
        navigateToQuestion,
        toggleTimer,
        togglePause,
        resetQuiz,
        finishQuiz,
        nextQuestion,
        previousQuestion,
        score,
        progress,
        remaining,
        avgTimePerQuestion,
        isLastQuestion,
        canGoNext,
        canGoPrevious,
    } = useQuiz(QUESTIONS);

    if (state.isCompleted) {
        return <QuizResults score={score} totalQuestions={QUESTIONS.length} timeElapsed={state.timeElapsed} avgTimePerQuestion={avgTimePerQuestion} onReset={resetQuiz} />;
    }

    const currentQuestion = QUESTIONS[state.currentIndex];

    if (!currentQuestion) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="md:col-span-3">
                <QuizHeader
                    isTimerMode={state.isTimerMode}
                    isPaused={state.isPaused}
                    currentQuestion={state.currentIndex}
                    totalQuestions={QUESTIONS.length}
                    streak={state.streak}
                    timeLeft={state.timeLeft}
                    progress={progress}
                    onTimerToggle={toggleTimer}
                    onPauseToggle={togglePause}
                />
                <QuizQuestion
                    question={currentQuestion}
                    selectedAnswer={state.answers[state.currentIndex]}
                    isPaused={state.isPaused}
                    isLastQuestion={isLastQuestion}
                    isTimerMode={state.isTimerMode}
                    canGoNext={canGoNext}
                    canGoPrevious={canGoPrevious}
                    onAnswer={handleAnswer}
                    onFinish={finishQuiz}
                    onNext={nextQuestion}
                    onPrevious={previousQuestion}
                />
            </Card>
            <QuizProgress
                currentIndex={state.currentIndex}
                answers={state.answers}
                isTimerMode={state.isTimerMode}
                isPaused={state.isPaused}
                remaining={remaining}
                timeElapsed={state.timeElapsed}
                avgTimePerQuestion={avgTimePerQuestion}
                onNavigate={navigateToQuestion}
            />
        </div>
    );
}
