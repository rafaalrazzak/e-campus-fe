import { Badge, Button, Card, CardContent, CardFooter, CardTitle } from "@/components/ui";

import { CalendarDays, Clock, BookOpen, User } from "lucide-react";
import React from "react";

type Course = {
    name: string;
    instructor: string;
    day: string;
    time: string;
    progress: number;
};

export const CourseCard: React.FC<Course> = ({ name, instructor, day, time, progress }) => (
    <Card>
        <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <CardTitle className="line-clamp-1">{name}</CardTitle>
                <Badge variant="secondary" size="xs">
                    Semester 1
                </Badge>
            </div>

            <div className="flex items-center justify-between text-sm text-secondary-foreground">
                <div className="flex items-center gap-1">
                    <User size={14} />
                    {instructor}
                </div>
                <div className="flex gap-2 text-xs">
                    <div className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {day}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {time}
                    </div>
                </div>
            </div>

            <div className="space-y-1 text-muted-foreground">
                <div className="h-2 w-full rounded-full bg-secondary">
                    <div style={{ width: `${progress}%` }} className="h-2 rounded-full bg-primary" />
                </div>
                <div className="flex justify-between text-xs font-medium">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
            </div>
        </CardContent>

        <CardFooter>
            <Button size="full" variant="secondary-primary" leftIcon={<BookOpen size={16} />}>
                Lihat Detail
            </Button>
        </CardFooter>
    </Card>
);
