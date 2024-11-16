import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizProgressProps {
    currentIndex: number;
    answers: (string | null)[];
    isTimerMode: boolean;
    isPaused: boolean;
    remaining: number;
    timeElapsed: number;
    avgTimePerQuestion: number;
    onNavigate: (index: number) => void;
}

export const QuizProgress = memo(({ currentIndex, answers, isTimerMode, isPaused, remaining, timeElapsed, avgTimePerQuestion, onNavigate }: QuizProgressProps) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-bold">Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
                {answers.map((answer, index) => {
                    const isAnswered = answer !== null;
                    const isCurrent = currentIndex === index;

                    return (
                        <Button
                            key={index}
                            variant={isCurrent ? "primary" : "outline"}
                            size="sm"
                            onClick={() => onNavigate(index)}
                            disabled={isTimerMode || isPaused}
                            className={cn("w-full", isAnswered && "text-primary", isCurrent && "text-primary-foreground")}
                        >
                            {index + 1}
                            {isAnswered && <CheckCircle className="w-3 h-3 ml-1" />}
                        </Button>
                    );
                })}
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
                <p>Questions remaining: {remaining}</p>
                <p>Time elapsed: {Math.floor(timeElapsed / 1000)}s</p>
                {currentIndex > 0 && <p>Avg. time per question: {(avgTimePerQuestion / 1000).toFixed(1)}s</p>}
            </div>
        </CardContent>
    </Card>
));

QuizProgress.displayName = "QuizProgress";
