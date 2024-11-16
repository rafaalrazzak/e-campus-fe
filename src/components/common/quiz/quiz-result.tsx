import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Timer } from "lucide-react";

interface QuizResultsProps {
    score: number;
    totalQuestions: number;
    timeElapsed: number;
    avgTimePerQuestion: number;
    onReset: () => void;
}

const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
};

export const QuizResults = memo(({ score, totalQuestions, timeElapsed, avgTimePerQuestion, onReset }: QuizResultsProps) => {
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
                            <span>{formatTime(timeElapsed)}</span>
                        </div>
                        <p className="text-muted-foreground">Average time per question: {(avgTimePerQuestion / 1000).toFixed(1)}s</p>
                    </div>
                </div>
                <Button onClick={onReset} className="w-full">
                    Restart Quiz
                </Button>
            </CardContent>
        </Card>
    );
});

QuizResults.displayName = "QuizResults";
