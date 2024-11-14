import { Button, Card, CardContent, CardFooter, CardTitle, Progress } from "@/components/ui";
import { URLS } from "@/constants/urls";
import { getDayName } from "@/lib/utils";
import { CalendarDays, Clock, BookOpen, User } from "lucide-react";
import React from "react";

const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return [hours && `${hours} jam`, mins && `${mins} menit`].filter(Boolean).join(" ");
};

export interface CourseProps {
    name: string;
    instructor: string;
    day: number; // 1-7 (Monday-Sunday)
    timeStart: string; // e.g., "09:00"
    duration: number; // duration in minutes
    progress: number;
}

export const CourseCard: React.FC<CourseProps> = ({ name, instructor, day, timeStart, duration, progress }) => {
    const endTime = new Date(new Date(`1970-01-01T${timeStart}Z`).getTime() + duration * 60000).toISOString().substring(11, 16);

    return (
        <Card>
            <CardContent className="flex flex-col gap-3">
                <CardTitle className="line-clamp-1">{name}</CardTitle>

                <div className="flex flex-col gap-2 text-secondary-foreground">
                    <div className="flex items-center gap-1">
                        <User size={16} /> {instructor}
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} /> {getDayName(day)}
                        <Clock size={16} /> {timeStart} - {endTime} ({formatDuration(duration)})
                    </div>
                </div>

                <div className="text-muted-foreground">
                    <Progress value={progress} className="w-full h-2 my-2" />
                    <div className="flex justify-between text-xs font-medium">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button asLink href={URLS.dashboard.accademic.courses.detail(name.toLowerCase().replace(/\s/g, "-"))} size="full" variant="secondary-primary" leftIcon={<BookOpen size={16} />}>
                    Lihat Detail
                </Button>
            </CardFooter>
        </Card>
    );
};
