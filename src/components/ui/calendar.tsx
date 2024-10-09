"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

type Event = {
    date: Date;
    title: string;
};

type CalendarProps = {
    events?: Event[];
};

type ViewMode = "day" | "month" | "year";

export const Calendar: React.FC<CalendarProps> = ({ events = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<ViewMode>("day");

    const navigateDate = useCallback(
        (direction: "prev" | "next") => {
            setCurrentDate((prevDate) => {
                const newDate = new Date(prevDate);
                switch (viewMode) {
                    case "day":
                        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
                        break;
                    case "month":
                        newDate.setFullYear(newDate.getFullYear() + (direction === "next" ? 1 : -1));
                        break;
                    case "year":
                        newDate.setFullYear(newDate.getFullYear() + (direction === "next" ? 10 : -10));
                        break;
                }
                return newDate;
            });
        },
        [viewMode]
    );

    const getDaysInMonth = useCallback((date: Date): Date[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysArray = [];

        // Add days from previous month to start the calendar on the correct day of the week
        for (let i = 0; i < firstDay.getDay(); i++) {
            const prevMonthDay = new Date(year, month, -i);
            daysArray.unshift(prevMonthDay);
        }

        // Add days of the current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            daysArray.push(new Date(year, month, i));
        }

        // Add days from next month to complete the last week
        const remainingDays = 7 - (daysArray.length % 7);
        if (remainingDays < 7) {
            for (let i = 1; i <= remainingDays; i++) {
                daysArray.push(new Date(year, month + 1, i));
            }
        }

        return daysArray;
    }, []);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear();
        });
    }, [events, currentDate]);

    const hasEvent = useCallback((date: Date) => filteredEvents.some((event) => event.date.toDateString() === date.toDateString()), [filteredEvents]);

    const handleDateSelect = useCallback((date: Date) => {
        setSelectedDate(date);
    }, []);

    const handleViewChange = useCallback(() => {
        setViewMode((prevMode) => {
            switch (prevMode) {
                case "day":
                    return "month";
                case "month":
                    return "year";
                case "year":
                    return "day";
            }
        });
    }, []);

    const handleMonthSelect = useCallback((month: number) => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), month, 1));
        setViewMode("day");
    }, []);

    const handleYearSelect = useCallback((year: number) => {
        setCurrentDate((prevDate) => new Date(year, prevDate.getMonth(), 1));
        setViewMode("month");
    }, []);

    const renderDayView = useMemo(() => {
        const calendarDays = getDaysInMonth(currentDate);

        return (
            <div className="grid grid-cols-7 gap-1">
                {DAYS.map((day) => (
                    <div key={day} className="p-1 text-center text-xs font-bold text-muted-foreground">
                        {day}
                    </div>
                ))}
                {calendarDays.map((date, index) => {
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                    return (
                        <Button
                            key={index}
                            variant="ghost"
                            onClick={() => handleDateSelect(date)}
                            className={cn(
                                "relative h-8 w-full p-0 text-xs",
                                !isCurrentMonth && "text-muted-foreground opacity-50",
                                date.toDateString() === new Date().toDateString() && "font-bold text-primary",
                                date.toDateString() === selectedDate.toDateString() && "bg-primary text-primary-foreground"
                            )}
                        >
                            {date.getDate()}
                            {hasEvent(date) && <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary" />}
                        </Button>
                    );
                })}
            </div>
        );
    }, [currentDate, selectedDate, getDaysInMonth, handleDateSelect, hasEvent]);

    const renderMonthView = useMemo(
        () => (
            <div className="grid grid-cols-3 gap-4">
                {MONTHS.map((month, index) => (
                    <Button key={month} variant="outline" onClick={() => handleMonthSelect(index)} className="h-20">
                        {month}
                    </Button>
                ))}
            </div>
        ),
        [handleMonthSelect]
    );

    const renderYearView = useMemo(() => {
        const startYear = Math.floor(currentDate.getFullYear() / 10) * 10;
        return (
            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 12 }, (_, i) => startYear + i - 1).map((year) => (
                    <Button key={year} variant="outline" onClick={() => handleYearSelect(year)} className="h-20">
                        {year}
                    </Button>
                ))}
            </div>
        );
    }, [currentDate, handleYearSelect]);

    const headerText = useMemo(() => {
        switch (viewMode) {
            case "day":
                return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
            case "month":
                return `${currentDate.getFullYear()}`;
            case "year":
                return `${Math.floor(currentDate.getFullYear() / 10) * 10}s`;
        }
    }, [currentDate, viewMode]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={handleViewChange} className="flex items-center text-lg font-bold">
                    {headerText}
                    <ChevronDown className="ml-1 size-4" />
                </Button>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
            {viewMode === "day" && renderDayView}
            {viewMode === "month" && renderMonthView}
            {viewMode === "year" && renderYearView}

            {viewMode === "day" && filteredEvents.length > 0 && (
                <div className="space-y-2">
                    {filteredEvents.map((event, index) => (
                        <div key={index} className="flex items-center space-x-2 rounded bg-muted p-2 text-sm">
                            <div className="h-4 w-1 rounded bg-primary" />
                            <div className="flex w-full justify-between gap-2 font-medium">
                                <span className="line-clamp-1">{event.title}</span>
                                <span className="shrink-0 text-muted-foreground">
                                    {event.date.toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
