"use client";

import type { SubjectCalendarCardProps } from "@/components/common";

import { SubjectCalendarCard } from "@/components/common";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] as const;
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
        return (
            <div className="flex flex-col gap-3">
                <div>
                    <span className="text-xs text-secondary-foreground">Jadwal kelas</span>
                    <h1 className="font-bold">{formatDate(item.date)}</h1>
                </div>
                <SubjectCalendarCard {...(item as SubjectCalendarCardProps)} onClick={onItemClick as (item: SubjectCalendarCardProps) => void} />
            </div>
        );
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

    const navigateMonth = useCallback((increment: number) => {
        setCurrentDate((date) => new Date(date.getFullYear(), date.getMonth() + increment, 1));
    }, []);

    const filteredItems = useMemo(() => items.filter((item) => item.date.getMonth() === currentDate.getMonth() && item.date.getFullYear() === currentDate.getFullYear()), [items, currentDate]);

    const getDaysInMonth = useCallback((date: Date): Date[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
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

    const renderItems = useMemo(() => {
        if (!selectedDate) return null;

        const itemsForSelectedDate = filteredItems.filter((item) => item.date.toDateString() === selectedDate.toDateString());

        return (
            <div className="mt-4 space-y-2">
                {itemsForSelectedDate.map((item, index) => (
                    <CalendarItem key={index} item={item as T extends true ? SubjectCalendarCardProps : BaseCalendarItem} isSubject={isSubject} onItemClick={onItemClick} />
                ))}
            </div>
        );
    }, [selectedDate, filteredItems, isSubject, onItemClick]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Button variant="ghost" className="flex items-center text-lg font-bold">
                    {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                    <ChevronDown className="ml-1 size-4" />
                </Button>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
            {renderDayView}
            {renderItems}
        </div>
    );
};
