"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight, CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, startOfWeek, isSameMonth, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from "date-fns";
import { id } from "date-fns/locale";

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = Array.from({ length: 12 }, (_, i) => format(new Date(2021, i, 1), "MMMM", { locale: id }));
const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

export type CalendarProps = {
    onDateSelect?: (date: Date) => void;
    highlightedDates?: Date[];
    className?: string;
    showTime?: boolean;
};

export const Calendar: React.FC<CalendarProps> = ({ onDateSelect, highlightedDates = [], className, showTime = false }) => {
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [viewMode, setViewMode] = useState<"calendar" | "months" | "years">("calendar");
    const [selectedHour, setSelectedHour] = useState((selectedDate || currentDate).getHours().toString().padStart(2, "0"));
    const [selectedMinute, setSelectedMinute] = useState((selectedDate || currentDate).getMinutes().toString().padStart(2, "0"));

    const getDaysInMonth = useCallback((date: Date): Date[] => {
        const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
        const end = endOfMonth(date);
        return eachDayOfInterval({ start, end });
    }, []);

    const isHighlighted = useCallback((date: Date) => highlightedDates.some((d) => isSameDay(d, date)), [highlightedDates]);

    const navigate = useCallback(
        (increment: number) => {
            setCurrentDate((date) => {
                const newDate = new Date(date);
                if (viewMode === "years") {
                    newDate.setFullYear(date.getFullYear() + increment * 12);
                } else if (viewMode === "months") {
                    newDate.setFullYear(date.getFullYear() + increment);
                } else {
                    newDate.setMonth(date.getMonth() + increment);
                }
                return newDate;
            });
        },
        [viewMode]
    );

    const handleDateSelect = useCallback(
        (date: Date) => {
            const newDate = new Date(date);
            if (showTime) {
                newDate.setHours(parseInt(selectedHour));
                newDate.setMinutes(parseInt(selectedMinute));
            }
            setSelectedDate(newDate);
            onDateSelect?.(newDate);
        },
        [showTime, selectedHour, selectedMinute, onDateSelect]
    );

    const handleTimeChange = useCallback(
        (type: "hour" | "minute", value: string) => {
            const newDate = new Date(selectedDate || currentDate);
            if (type === "hour") {
                newDate.setHours(parseInt(value));
                setSelectedHour(value);
            } else {
                newDate.setMinutes(parseInt(value));
                setSelectedMinute(value);
            }

            onDateSelect?.(newDate);
        },
        [selectedDate, currentDate, onDateSelect]
    );

    const renderCalendarView = useMemo(
        () => (
            <div className="grid grid-cols-7 gap-1">
                {DAYS.map((day) => (
                    <div key={day} className="p-1 text-center text-xs font-medium text-muted-foreground">
                        {day}
                    </div>
                ))}
                {getDaysInMonth(currentDate).map((date, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        onClick={() => handleDateSelect(date)}
                        className={cn(
                            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                            !isSameMonth(date, currentDate) && "text-muted-foreground opacity-50",
                            isToday(date) && "text-primary",
                            selectedDate && isSameDay(selectedDate, date) && "bg-primary text-primary-foreground",
                            isHighlighted(date) && "ring-2 ring-primary ring-offset-2"
                        )}
                    >
                        {date.getDate()}
                    </Button>
                ))}
            </div>
        ),
        [currentDate, selectedDate, getDaysInMonth, isHighlighted, handleDateSelect]
    );

    const renderMonthsView = useMemo(
        () => (
            <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((month, index) => (
                    <Button
                        key={month}
                        variant={currentDate.getMonth() === index ? "primary" : "ghost"}
                        onClick={() => {
                            setCurrentDate(new Date(currentDate.getFullYear(), index, 1));
                            setViewMode("calendar");
                        }}
                        className="text-sm"
                    >
                        {month}
                    </Button>
                ))}
            </div>
        ),
        [currentDate]
    );

    const renderYearsView = useMemo(() => {
        const currentYear = currentDate.getFullYear();
        const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);

        return (
            <div className="grid grid-cols-3 gap-2">
                {years.map((year) => (
                    <Button
                        key={year}
                        variant={currentDate.getFullYear() === year ? "primary" : "ghost"}
                        onClick={() => {
                            setCurrentDate(new Date(year, currentDate.getMonth(), 1));
                            setViewMode("months");
                        }}
                        className="text-sm"
                    >
                        {year}
                    </Button>
                ))}
            </div>
        );
    }, [currentDate]);

    const toggleViewMode = useCallback(() => {
        setViewMode((current) => {
            switch (current) {
                case "calendar":
                    return "months";
                case "months":
                    return "years";
                case "years":
                    return "calendar";
                default:
                    return "calendar";
            }
        });
    }, []);

    return (
        <div className={cn("w-full space-y-4 p-4", className)}>
            <div className="flex items-center justify-between">
                <Button variant="ghost" className="text-left font-medium" onClick={toggleViewMode}>
                    {viewMode === "years"
                        ? `${currentDate.getFullYear() - 5} - ${currentDate.getFullYear() + 6}`
                        : viewMode === "months"
                          ? currentDate.getFullYear().toString()
                          : format(currentDate, "MMMM yyyy", { locale: id })}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>

                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => navigate(1)}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {viewMode === "calendar" && renderCalendarView}
            {viewMode === "months" && renderMonthsView}
            {viewMode === "years" && renderYearsView}

            {showTime && (
                <div className="flex items-center space-x-2 w-full">
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[120px] justify-start text-left font-normal">
                                {selectedHour}:{selectedMinute}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-0" align="start">
                            <div className="grid grid-cols-2 gap-2 p-2">
                                <Select value={selectedHour} onChange={(value) => handleTimeChange("hour", value)} options={HOURS.map((hour) => ({ value: hour, label: hour }))} />
                                <Select value={selectedMinute} onChange={(value) => handleTimeChange("minute", value)} options={MINUTES.map((minute) => ({ value: minute, label: minute }))} />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        </div>
    );
};
