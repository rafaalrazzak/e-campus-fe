import { Button, Card, CardContent, CardFooter, CardTitle, Progress } from "@/components/ui";
import { getDayName, getTimeRange } from "@/lib/utils";
import { Course } from "@/types/course";
import { CalendarDays, Clock, BookOpen, User } from "lucide-react";
import React from "react";

export const CourseCard: React.FC<Course> = ({ subjectName, instructor, date, duration, progress, linkCourse }) => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-3">
                <CardTitle className="line-clamp-1">{subjectName}</CardTitle>

                <div className="flex flex-col gap-2 text-secondary-foreground">
                    <div className="flex items-center gap-1">
                        <User size={16} /> {instructor}
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} /> {getDayName(date)}
                        <Clock size={16} /> {getTimeRange(date, duration)}
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
                <Button asLink href={linkCourse} size="full" variant="secondary-primary" leftIcon={<BookOpen size={16} />}>
                    Lihat Detail
                </Button>
            </CardFooter>
        </Card>
    );
};
