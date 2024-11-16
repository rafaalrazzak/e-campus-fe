import { memo } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play } from "lucide-react";

interface QuizHeaderProps {
    isTimerMode: boolean;
    isPaused: boolean;
    currentQuestion: number;
    totalQuestions: number;
    streak: number;
    timeLeft: number;
    progress: number;
    onTimerToggle: (enabled: boolean) => void;
    onPauseToggle: () => void;
}

export const QuizHeader = memo(({ isTimerMode, isPaused, currentQuestion, totalQuestions, streak, timeLeft, progress, onTimerToggle, onPauseToggle }: QuizHeaderProps) => (
    <CardHeader>
        <CardTitle className="text-2xl font-bold flex justify-between items-center">
            <span>Quiz</span>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                    <span>Timer mode</span>
                    <Switch checked={isTimerMode} onCheckedChange={onTimerToggle} disabled={currentQuestion > 0} />
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
                    Question {currentQuestion + 1} of {totalQuestions}
                </span>
                {streak > 1 && <span className="text-primary">🔥 Streak: {streak}</span>}
            </div>
            {isTimerMode && (
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{timeLeft}s</span>
                </div>
            )}
        </div>
        <Progress value={progress} className="w-full" />
    </CardHeader>
));

QuizHeader.displayName = "QuizHeader";
