"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, CheckCircle, Pause, Play, Trophy, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/hooks";

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
}

interface RadioState {
    selection?: string;
    lastQuestionIndex: number;
}

interface ResultsCardProps {
    score: number;
    totalQuestions: number;
    timeElapsed: number;
    averageTimePerQuestion: number;
    onReset: () => void;
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        id: 2,
        text: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    {
        id: 3,
        text: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
    },
    {
        id: 4,
        text: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        correctAnswer: 0,
    },
    {
        id: 5,
        text: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        correctAnswer: 0,
    },
];

const ResultsCard = ({ score, totalQuestions, timeElapsed, averageTimePerQuestion, onReset }: ResultsCardProps) => {
    const minutes = Math.floor(timeElapsed / 60000);
    const seconds = Math.floor((timeElapsed % 60000) / 1000);
    const percentage = ((score / totalQuestions) * 100).toFixed(1);

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            <span className="text-xl">
                                Score: {score} out of {totalQuestions}
                            </span>
                        </div>
                        <p className="text-muted-foreground">Percentage: {percentage}%</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Timer className="w-5 h-5" />
                            <span>
                                Time taken: {minutes}m {seconds}s
                            </span>
                        </div>
                        <p className="text-muted-foreground">Average time per question: {(averageTimePerQuestion / 1000).toFixed(1)}s</p>
                    </div>
                </div>
                <Button onClick={onReset} className="w-full">
                    Restart Quiz
                </Button>
            </CardContent>
        </Card>
    );
};

const QuizHeader = ({
    isTimerMode,
    isPaused,
    currentIndex,
    totalQuestions,
    currentStreak,
    timeLeft,
    progressPercentage,
    onTimerModeToggle,
    onPauseToggle,
}: {
    isTimerMode: boolean;
    isPaused: boolean;
    currentIndex: number;
    totalQuestions: number;
    currentStreak: number;
    timeLeft: number;
    progressPercentage: number;
    onTimerModeToggle: (checked: boolean) => void;
    onPauseToggle: () => void;
}) => (
    <CardHeader>
        <CardTitle className="text-2xl font-bold flex justify-between items-center">
            <span>Quiz</span>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                    <span>Timer mode</span>
                    <Switch checked={isTimerMode} onCheckedChange={onTimerModeToggle} disabled={currentIndex > 0} />
                </div>
                {isTimerMode && (
                    <Button variant="outline" size="sm" onClick={onPauseToggle}>
                        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </Button>
                )}
            </div>
        </CardTitle>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="space-x-4">
                <span>
                    Question {currentIndex + 1} of {totalQuestions}
                </span>
                {currentStreak > 1 && <span className="text-primary">🔥 Streak: {currentStreak}</span>}
            </div>
            {isTimerMode && (
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{timeLeft}s</span>
                </div>
            )}
        </div>
        <Progress value={progressPercentage} className="w-full" />
    </CardHeader>
);

export function QuizClient() {
    const {
        state,
        moveToNextQuestion,
        handleAnswerSelect,
        handleQuestionSelect,
        toggleTimerMode,
        resetQuiz,
        calculateScore,
        pauseQuiz,
        resumeQuiz,
        finishQuiz,
        isPaused,
        timeElapsed,
        averageTimePerQuestion,
        isLastQuestion,
        progressPercentage,
        questionsRemaining,
        currentStreak,
    } = useQuiz(QUESTIONS);

    const [radioState, setRadioState] = useState<RadioState>({
        selection: undefined,
        lastQuestionIndex: state.currentIndex,
    });

    useEffect(() => {
        if (state.currentIndex !== radioState.lastQuestionIndex) {
            setRadioState({
                selection: undefined,
                lastQuestionIndex: state.currentIndex,
            });
        }
    }, [state.currentIndex, radioState.lastQuestionIndex]);

    useEffect(() => {
        if (isPaused) {
            setRadioState((prev) => ({
                ...prev,
                selection: undefined,
            }));
        }
    }, [isPaused]);

    const currentQuestion = QUESTIONS[state.currentIndex];
    const isAnswered = state.answers[state.currentIndex] !== null;
    const canMoveNext = !isPaused && isAnswered && !isLastQuestion;
    const canFinish = !isPaused && isAnswered && isLastQuestion;

    const handleAnswer = (value: string) => {
        if (isPaused) return;
        setRadioState((prev) => ({
            ...prev,
            selection: value,
        }));
        handleAnswerSelect(parseInt(value));
    };

    const handleQuestionNavigate = (index: number) => {
        handleQuestionSelect(index);
        setRadioState({
            selection: undefined,
            lastQuestionIndex: index,
        });
    };

    const handleNext = () => {
        moveToNextQuestion();
        setRadioState({
            selection: undefined,
            lastQuestionIndex: state.currentIndex + 1,
        });
    };

    const handleReset = () => {
        resetQuiz();
        setRadioState({
            selection: undefined,
            lastQuestionIndex: 0,
        });
    };

    if (state.isCompleted) {
        return <ResultsCard score={calculateScore() ?? 0} totalQuestions={QUESTIONS.length} timeElapsed={timeElapsed} averageTimePerQuestion={averageTimePerQuestion} onReset={handleReset} />;
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="md:col-span-3">
                    <QuizHeader
                        isTimerMode={state.isTimerMode}
                        isPaused={isPaused}
                        currentIndex={state.currentIndex}
                        totalQuestions={QUESTIONS.length}
                        currentStreak={currentStreak}
                        timeLeft={state.timeLeft}
                        progressPercentage={progressPercentage}
                        onTimerModeToggle={toggleTimerMode}
                        onPauseToggle={isPaused ? resumeQuiz : pauseQuiz}
                    />
                    <CardContent className="space-y-6">
                        <h2 className="text-xl font-semibold">{currentQuestion.text}</h2>
                        <RadioGroup key={state.currentIndex} value={radioState.selection} onValueChange={handleAnswer} className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <div key={index} className={cn("flex items-center space-x-2 rounded-lg border p-4", isPaused && "opacity-50 pointer-events-none")}>
                                    <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isPaused} />
                                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <div className="flex justify-end space-x-2">
                            {!state.isTimerMode && canMoveNext && <Button onClick={handleNext}>Next Question</Button>}
                            {canFinish && (
                                <Button onClick={finishQuiz} variant="primary">
                                    Finish Quiz
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                            {QUESTIONS.map((_, index) => {
                                const isAnswered = state.answers[index] !== null;
                                const isCurrent = state.currentIndex === index;

                                return (
                                    <Button
                                        key={index}
                                        variant={isCurrent ? "primary" : "outline"}
                                        size="sm"
                                        onClick={() => handleQuestionNavigate(index)}
                                        disabled={state.isTimerMode || isPaused}
                                        className={cn("w-full", isAnswered && "text-primary", isCurrent && "text-primary-foreground")}
                                    >
                                        {index + 1}
                                        {isAnswered && <CheckCircle className="w-3 h-3 ml-1" />}
                                    </Button>
                                );
                            })}
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>Questions remaining: {questionsRemaining}</p>
                            <p>Time elapsed: {Math.floor(timeElapsed / 1000)}s</p>
                            {state.currentIndex > 0 && <p>Avg. time per question: {(averageTimePerQuestion / 1000).toFixed(1)}s</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
