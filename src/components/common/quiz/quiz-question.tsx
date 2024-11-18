import { memo, useCallback } from "react";
import { CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { Question } from "@/types/quiz";

interface QuizQuestionProps {
    question: Question;
    selectedAnswer: string | null;
    isPaused: boolean;
    isLastQuestion: boolean;
    isTimerMode: boolean;
    canNavigate: boolean;
    onAnswer: (id: string) => void;
    onFinish: () => void;
    onNavigate: (index: number) => void;
    currentIndex: number;
}

export const QuizQuestion = memo(function QuizQuestion({
    question,
    selectedAnswer,
    isPaused,
    isLastQuestion,
    isTimerMode,
    canNavigate,
    onAnswer,
    onFinish,
    onNavigate,
    currentIndex,
}: QuizQuestionProps) {
    const handlePrevious = useCallback(() => {
        onNavigate(currentIndex - 1);
    }, [currentIndex, onNavigate]);

    const handleNext = useCallback(() => {
        onNavigate(currentIndex + 1);
    }, [currentIndex, onNavigate]);

    const showNavigation = !isTimerMode;
    const showFinish = (isTimerMode && selectedAnswer && isLastQuestion) || (!isTimerMode && isLastQuestion);
    const canGoPrevious = canNavigate && currentIndex > 0;
    const canGoNext = canNavigate && selectedAnswer && !isLastQuestion;

    return (
        <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold leading-tight">{question.text}</h2>

            <RadioGroup key={question.id} value={selectedAnswer ?? undefined} onValueChange={onAnswer} className="space-y-3">
                {question.options.map((option) => (
                    <div
                        key={option.id}
                        className={`flex items-center space-x-2 rounded-lg border p-4 transition-opacity
              ${isPaused ? "opacity-50 pointer-events-none" : "hover:bg-gray-50"}`}
                    >
                        <RadioGroupItem value={option.id} id={option.id} disabled={isPaused} />
                        <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                            {option.text}
                        </Label>
                    </div>
                ))}
            </RadioGroup>

            <div className="flex justify-between mt-6">
                {showNavigation && (
                    <>
                        <Button onClick={handlePrevious} disabled={!canGoPrevious || isPaused} variant="outline" className="flex items-center gap-2">
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </Button>

                        {!isLastQuestion && (
                            <Button onClick={handleNext} disabled={!canGoNext || isPaused} variant="primary" className="flex items-center gap-2">
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        )}
                    </>
                )}

                {showFinish && (
                    <Button onClick={onFinish} disabled={!selectedAnswer || isPaused} variant="primary" className="ml-auto">
                        Finish Quiz
                    </Button>
                )}
            </div>
        </CardContent>
    );
});
