"use client";

import type { BadgeProps } from "@/components/ui";

import { Badge, Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Course } from "@/types/course";

import { format } from "date-fns";
import { Book, BookOpenText, CalendarIcon, CheckCircleIcon, ClockIcon, MapPinIcon, QrCodeIcon, User, UsersIcon } from "lucide-react";
import { useCallback, type ReactNode } from "react";

export type SubjectCardProps = {
    onScan?: () => void;
} & Course;

type InfoItemProps = {
    icon: ReactNode;
    text: string | number;
    color?: "secondary" | "dark" | "primary" | "success";
    size?: "sm" | "lg";
    bold?: boolean;
};

const InfoItem = ({ icon, text, size, bold, color = "secondary" }: InfoItemProps) => (
    <div
        className={cn(
            "flex items-center gap-1",
            {
                "text-muted-foreground": color === "secondary",
                "text-dark": color === "dark",
                "text-primary-foreground": color === "primary",
                "text-success-foreground": color === "success",
            },
            {
                "text-sm": size === "sm",
                "text-lg": size === "lg",
            }
        )}
    >
        <span className="shrink-0">{icon}</span>
        <span className={cn("line-clamp-1 font-medium", bold && "font-semibold")}>{text}</span>
    </div>
);

const statusConfig: Record<
    Course["status"],
    {
        color: string;
        text: string;
        badgeVariant: BadgeProps["variant"];
        textColor: string;
    }
> = {
    inactive: {
        color: "bg-secondary",
        text: "Belum Dimulai",
        badgeVariant: "secondary-dark",
        textColor: "text-secondary-foreground",
    },
    active: {
        color: "bg-primary",
        text: "Sedang Dimulai",
        badgeVariant: "secondary-primary",
        textColor: "text-primary-foreground",
    },
    done: {
        color: "bg-success",
        text: "Selesai",
        badgeVariant: "secondary-success",
        textColor: "text-success-foreground",
    },
};

export const SubjectCard = ({ status, duration, attendance, subjectName, topic, date, instructor, room, participants, linkCourse, onScan }: SubjectCardProps) => {
    const { color, text, badgeVariant, textColor } = statusConfig[status];

    return (
        <Card>
            <CardHeader className={cn("-m-4 p-4", color, textColor)}>
                <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-xl font-bold">{subjectName}</CardTitle>
                    <Badge size="sm" variant={badgeVariant} className="shrink-0 text-xs font-semibold">
                        {text}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="my-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <InfoItem icon={<ClockIcon className="size-5" />} text={`${format(date, "HH:mm")} - ${format(new Date(date.getTime() + duration * 60000), "HH:mm")}`} color="dark" size="lg" bold />
                    <Badge size="sm" variant={attendance === "Hadir" ? "success" : "warning"} className="shrink-0">
                        {attendance}
                    </Badge>
                </div>

                <p className="line-clamp-2 text-lg font-medium">{topic}</p>

                <div className="grid grid-cols-2 gap-3">
                    <InfoItem icon={<User className="size-4" />} text={instructor} size="sm" />
                    <InfoItem icon={<MapPinIcon className="size-4" />} text={room} size="sm" />
                    <InfoItem icon={<UsersIcon className="size-4" />} text={`${participants} mahasiswa/i`} size="sm" />
                    <InfoItem icon={<CalendarIcon className="size-4 text-muted-foreground" />} text={`${duration} menit`} size="sm" />
                </div>
            </CardContent>

            <CardFooter className="gap-2">
                {status === "done" ? (
                    <Button variant="outline" size="full" disabled className="grow">
                        <CheckCircleIcon className="size-4" />
                        Kehadiran Tercatat
                    </Button>
                ) : (
                    <Button variant={status === "active" ? "primary" : "secondary"} size="full" onClick={onScan} disabled={status !== "active"} className="grow">
                        <QrCodeIcon className="size-4" />
                        {status === "active" ? "Scan Kehadiran" : "Belum Dapat Scan"}
                    </Button>
                )}
                <Button asLink variant="secondary" size="icon" className="shrink-0" href={linkCourse}>
                    <BookOpenText className="size-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export type SubjectCalendarCardProps = {
    subjectName: string;
    duration: number;
    date: Date;
    room: string;
    instructor: string;
    topic: string;
    onClick?: (item: SubjectCalendarCardProps) => void;
};

export const SubjectCalendarCard = ({ subjectName, duration, date, room, instructor, topic, onClick }: SubjectCalendarCardProps) => {
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick({ subjectName, duration, date, room, instructor, topic });
        }
    }, [onClick, subjectName, duration, date, room, instructor, topic]);

    return (
        <Card onClick={handleClick}>
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>{subjectName}</CardTitle>
                <Badge size="xs">{duration} menit</Badge>
            </CardHeader>

            <CardContent className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <User className="size-4 text-muted-foreground" />
                    <span>{instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                    <ClockIcon className="size-4 text-muted-foreground" />
                    <span>
                        {format(date, "HH:mm")} - {format(new Date(date.getTime() + duration * 60000), "HH:mm")}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPinIcon className="size-4 text-muted-foreground" />
                    <span>{room}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Book className="size-4 text-muted-foreground" />
                    <span>{topic}</span>
                </div>
            </CardContent>
        </Card>
    );
};
