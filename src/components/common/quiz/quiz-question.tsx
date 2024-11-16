import { memo } from "react";
import { CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/quiz";

interface QuizQuestionProps {
    question: Question;
    selectedAnswer: string | null;
    isPaused: boolean;
    isLastQuestion: boolean;
    onAnswer: (id: string) => void;
    onFinish: () => void;
}

export const QuizQuestion = memo(({ question, selectedAnswer, isPaused, isLastQuestion, onAnswer, onFinish }: QuizQuestionProps) => (
    <CardContent className="space-y-6">
        <h2 className="text-xl font-semibold">{question.text}</h2>
        <RadioGroup key={question.id} value={selectedAnswer?.toString()} onValueChange={(value) => onAnswer(value)} className="space-y-3">
            {question.options.map((option) => (
                <div key={option.id} className={cn("flex items-center space-x-2 rounded-lg border p-4", isPaused && "opacity-50 pointer-events-none")}>
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} disabled={isPaused} />
                    <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                        {option.text}
                    </Label>
                </div>
            ))}
        </RadioGroup>
        {selectedAnswer !== null && isLastQuestion && (
            <div className="flex justify-end">
                <Button onClick={onFinish} variant="primary">
                    Finish Quiz
                </Button>
            </div>
        )}
    </CardContent>
));

QuizQuestion.displayName = "QuizQuestion";
