"use client";

import React, { useMemo, useState, useEffect } from "react";
import { addDays, startOfWeek, isSameDay, isToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, dateFormat } from "@/lib/utils";
import { Schedule } from "@/types/schedule";
import { useIsMobile } from "@/hooks/use-mobile";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MOBILE_DAYS = 3;
const DESKTOP_DAYS = 7;

const ScheduleEvent = React.memo(({ event }: { event: Schedule }) => (
    <div className="absolute inset-0 m-1 p-1 bg-primary/10 text-primary text-xs rounded overflow-hidden hover:bg-primary/30 cursor-pointer" style={{ height: `${(event.duration / 60) * 100}%` }}>
        <div className="text-secondary-foreground">
            {dateFormat(event.date, "HH:mm")} - {dateFormat(new Date(event.date.getTime() + event.duration * 60000), "HH:mm")}
        </div>
        <div className="font-medium truncate">{event.subjectName}</div>
        <div className="text-xs truncate">{event.room}</div>
    </div>
));

const DayHeader = React.memo(({ day }: { day: Date }) => (
    <div className="flex items-center justify-center gap-2 h-full">
        <span className="text-sm text-secondary-foreground">{dateFormat(day, "EEE")}</span>
        <div className={cn("flex items-center justify-center w-8 h-8 rounded-full", isToday(day) ? "bg-primary text-white font-semibold" : "hover:bg-secondary")}>{dateFormat(day, "d")}</div>
    </div>
));

const TimeColumn = React.memo(({ hour }: { hour: number }) => (
    <div className="sticky left-0 bg-white z-10 pr-2 py-3 text-center">
        <span className="text-xs text-secondary-foreground">{hour.toString().padStart(2, "0")}:00</span>
    </div>
));

export const WeeklyCalendar = ({ events = [] }: { events: Schedule[] }) => {
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const isMobile = useIsMobile();

    const startAtWeek = useMemo(() => startOfWeek(currentDate), [currentDate]);

    const days = useMemo(() => {
        return Array.from({ length: isMobile ? MOBILE_DAYS : DESKTOP_DAYS }, (_, i) => addDays(startAtWeek, i));
    }, [startAtWeek, isMobile]);

    const weekSchedule = useMemo(() => events.filter((event) => days.some((day) => isSameDay(event.date, day))), [events, days]);

    const navigateDate = (direction: "prev" | "next") => {
        setCurrentDate((prev) => addDays(prev, direction === "next" ? (isMobile ? MOBILE_DAYS : DESKTOP_DAYS) : -(isMobile ? MOBILE_DAYS : DESKTOP_DAYS)));
    };

    const gridColumns = isMobile ? "grid-cols-[60px_repeat(3,1fr)]" : "grid-cols-[80px_repeat(7,1fr)]";

    return (
        <div className="w-full h-full relative">
            <div className="p-4 flex-shrink-0 border-b space-y-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle className="text-xl font-semibold">{dateFormat(currentDate, "MMMM yyyy")}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => navigateDate("next")}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    {weekSchedule.length > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                            {weekSchedule.length} Jadwal
                        </Badge>
                    )}
                </div>

                <div className={cn("grid", gridColumns, "h-12")}>
                    <div className="flex items-center justify-center">
                        <div className="text-xs text-secondary-foreground">Jam</div>
                    </div>
                    {days.map((day, i) => (
                        <DayHeader key={i} day={day} />
                    ))}
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-15rem)] p-4">
                <div className={cn("grid", gridColumns)}>
                    {HOURS.map((hour) => (
                        <React.Fragment key={hour}>
                            <TimeColumn hour={hour} />
                            {days.map((day, dayIndex) => (
                                <div
                                    key={`${hour}-${dayIndex}`}
                                    className={cn("relative border-b border-l h-16", isToday(day) && "bg-primary/5", hour === 0 && "border-t", "hover:bg-secondary-foreground/5")}
                                >
                                    {weekSchedule
                                        .filter((event) => isSameDay(event.date, day) && event.date.getHours() === hour)
                                        .map((event, i) => (
                                            <ScheduleEvent key={`${event.id}-${i}`} event={event} />
                                        ))}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default WeeklyCalendar;
