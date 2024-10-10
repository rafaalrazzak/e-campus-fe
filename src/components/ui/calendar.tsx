"use client";

import type { SubjectCalendarCardProps } from "@/components/common";

import { SubjectCalendarCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"] as const;
const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"] as const;

export type BaseCalendarItem = {
    date: Date;
    title: string;
};

type CalendarProps<T extends boolean> = {
    isSubject?: T;
    items: T extends true ? SubjectCalendarCardProps[] : BaseCalendarItem[];
    onItemClick?: (item: T extends true ? SubjectCalendarCardProps : BaseCalendarItem) => void;
};

const CalendarItem = <T extends boolean>({
    item,
    isSubject,
    onItemClick,
}: {
    item: T extends true ? SubjectCalendarCardProps : BaseCalendarItem;
    isSubject: T;
    onItemClick?: CalendarProps<T>["onItemClick"];
}) => {
    if (isSubject) {
        return <SubjectCalendarCard {...(item as SubjectCalendarCardProps)} onClick={onItemClick as (item: SubjectCalendarCardProps) => void} />;
    }

    return (
        <div className="flex items-center space-x-2 rounded bg-muted p-2 text-sm">
            <div className="h-4 w-1 rounded bg-primary" />
            <div className="flex w-full justify-between gap-2 font-medium">
                <span className="line-clamp-1">{(item as BaseCalendarItem).title}</span>
                <span className="shrink-0 text-muted-foreground">{item.date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
        </div>
    );
};

export const Calendar = <T extends boolean>({ items, onItemClick, isSubject = false as T }: CalendarProps<T>) => {
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [viewMode, setViewMode] = useState<"month" | "list" | "monthSelect" | "yearSelect">("month");

    const navigate = useCallback(
        (increment: number) => {
            setCurrentDate((date) => {
                if (viewMode === "yearSelect") {
                    return new Date(date.getFullYear() + increment * 12, date.getMonth(), 1);
                } else if (viewMode === "monthSelect") {
                    return new Date(date.getFullYear() + increment, date.getMonth(), 1);
                }
                return new Date(date.getFullYear(), date.getMonth() + increment, 1);
            });
        },
        [viewMode]
    );

    const filteredItems = useMemo(() => items.filter((item) => item.date.getMonth() === currentDate.getMonth() && item.date.getFullYear() === currentDate.getFullYear()), [items, currentDate]);

    const getDaysInMonth = useCallback((date: Date): Date[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysArray = [];

        // Calculate the number of days to add from the previous month
        let prevMonthDays = firstDay.getDay() - 1; // Adjust for Monday start
        if (prevMonthDays === -1) prevMonthDays = 6; // Sunday should be 6 days back from Monday

        // Add days from previous month
        for (let i = prevMonthDays; i > 0; i--) {
            const prevMonthDay = new Date(year, month, -i + 1);
            daysArray.push(prevMonthDay);
        }

        // Add days of current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            daysArray.push(new Date(year, month, i));
        }

        // Add days from next month to complete the grid
        const remainingDays = 42 - daysArray.length;
        for (let i = 1; i <= remainingDays; i++) {
            daysArray.push(new Date(year, month + 1, i));
        }

        return daysArray;
    }, []);

    const hasItem = useCallback((date: Date) => filteredItems.some((item) => item.date.toDateString() === date.toDateString()), [filteredItems]);

    const renderDayView = useMemo(
        () => (
            <div className="grid grid-cols-7 gap-1">
                {DAYS.map((day) => (
                    <div key={day} className="p-1 text-center text-xs font-bold text-muted-foreground">
                        {day}
                    </div>
                ))}
                {getDaysInMonth(currentDate).map((date, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                            "relative h-8 w-full p-0 text-xs group",
                            date.getMonth() !== currentDate.getMonth() && "text-muted-foreground opacity-50",
                            date.toDateString() === new Date().toDateString() && "font-bold text-primary",
                            selectedDate && date.toDateString() === selectedDate.toDateString() && "bg-primary text-primary-foreground"
                        )}
                    >
                        <div className="flex flex-col items-center justify-center gap-1">
                            <span>{date.getDate()}</span>
                            {hasItem(date) && <span className="size-1 rounded-full bg-destructive group-hover:bg-background" />}
                        </div>
                    </Button>
                ))}
            </div>
        ),
        [currentDate, selectedDate, getDaysInMonth, hasItem]
    );

    const renderListView = useMemo(
        () => (
            <div className="space-y-2">
                {filteredItems.map((item, index) => (
                    <CalendarItem key={index} item={item as T extends true ? SubjectCalendarCardProps : BaseCalendarItem} isSubject={isSubject} onItemClick={onItemClick} />
                ))}
            </div>
        ),
        [filteredItems, isSubject, onItemClick]
    );

    const renderMonthSelect = () => (
        <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, index) => (
                <Button
                    key={month}
                    variant={currentDate.getMonth() === index ? "primary" : "outline"}
                    onClick={() => {
                        setCurrentDate(new Date(currentDate.getFullYear(), index, 1));
                        setViewMode("month");
                    }}
                >
                    {month}
                </Button>
            ))}
        </div>
    );

    const renderYearSelect = () => {
        const currentYear = currentDate.getFullYear();
        const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);

        return (
            <div className="grid grid-cols-3 gap-2">
                {years.map((year) => (
                    <Button
                        key={year}
                        variant={year === currentYear ? "primary" : "outline"}
                        onClick={() => {
                            setCurrentDate(new Date(year, currentDate.getMonth(), 1));
                            setViewMode("monthSelect");
                        }}
                    >
                        {year}
                    </Button>
                ))}
            </div>
        );
    };

    const renderItems = useMemo(() => {
        if (!selectedDate) return null;

        const itemsForSelectedDate = filteredItems.filter((item) => item.date.toDateString() === selectedDate.toDateString());

        return (
            <div className="mt-4 flex flex-col gap-4">
                {isSubject && itemsForSelectedDate.length ? null : <div className="text-center text-muted-foreground">Tidak ada kegiatan</div>}

                {isSubject && itemsForSelectedDate.length ? (
                    <div className="flex flex-col">
                        <span className="text-xs text-secondary-foreground">Jadwal kelas</span>
                        <span className="text-lg font-bold">{formatDate(selectedDate)}</span>
                    </div>
                ) : null}
                <div className="flex flex-col gap-4">
                    {itemsForSelectedDate.map((item, index) => (
                        <CalendarItem key={index} item={item as T extends true ? SubjectCalendarCardProps : BaseCalendarItem} isSubject={isSubject} onItemClick={onItemClick} />
                    ))}
                </div>
            </div>
        );
    }, [selectedDate, filteredItems, isSubject, onItemClick]);

    const toggleViewMode = () => {
        setViewMode((prevMode) => {
            switch (prevMode) {
                case "month":
                case "list":
                    return "monthSelect";
                case "monthSelect":
                    return "yearSelect";
                case "yearSelect":
                    return "month";
                default:
                    return "month";
            }
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Button variant="ghost" className="flex items-center text-lg font-bold" onClick={toggleViewMode}>
                    {viewMode === "yearSelect"
                        ? `${currentDate.getFullYear() - 5} - ${currentDate.getFullYear() + 6}`
                        : viewMode === "monthSelect"
                          ? currentDate.getFullYear().toString()
                          : `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                    <ChevronDown className="ml-1 size-4" />
                </Button>

                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => navigate(1)}>
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
            {viewMode === "month" && renderDayView}
            {viewMode === "list" && renderListView}
            {viewMode === "monthSelect" && renderMonthSelect()}
            {viewMode === "yearSelect" && renderYearSelect()}
            {renderItems}
        </div>
    );
};
