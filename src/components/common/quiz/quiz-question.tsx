import { memo } from "react";
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
    canGoNext: boolean;
    canGoPrevious: boolean;
    onAnswer: (id: string) => void;
    onFinish: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

export const QuizQuestion = memo(({ question, selectedAnswer, isPaused, isLastQuestion, isTimerMode, canGoNext, canGoPrevious, onAnswer, onFinish, onNext, onPrevious }: QuizQuestionProps) => {
    const showNavButtons = !isTimerMode;
    const showFinishButton = (isTimerMode && selectedAnswer !== null && isLastQuestion) || (!isTimerMode && isLastQuestion);

    return (
        <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold">{question.text}</h2>

            <RadioGroup key={question.id} value={selectedAnswer ?? undefined} onValueChange={onAnswer} className="space-y-3">
                {question.options.map((option) => (
                    <div key={option.id} className={`flex items-center space-x-2 rounded-lg border p-4 ${isPaused ? "opacity-50 pointer-events-none" : ""}`}>
                        <RadioGroupItem value={option.id} id={option.id} disabled={isPaused} />
                        <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                            {option.text}
                        </Label>
                    </div>
                ))}
            </RadioGroup>

            <div className="flex justify-between mt-6">
                {showNavButtons && (
                    <>
                        <Button onClick={onPrevious} disabled={!canGoPrevious || isPaused} variant="outline" className="flex items-center gap-2">
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </Button>

                        {!isLastQuestion && (
                            <Button onClick={onNext} disabled={!canGoNext || isPaused || !selectedAnswer} variant="primary" className="flex items-center gap-2">
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        )}
                    </>
                )}

                {showFinishButton && (
                    <Button onClick={onFinish} disabled={!selectedAnswer || isPaused} variant="primary" className="ml-auto">
                        Finish Quiz
                    </Button>
                )}
            </div>
        </CardContent>
    );
});

QuizQuestion.displayName = "QuizQuestion";
