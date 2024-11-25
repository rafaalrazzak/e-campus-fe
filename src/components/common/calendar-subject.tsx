import React, { useMemo, useState } from "react";
import { Calendar } from "@/components/ui";
import { SubjectCalendarCard } from "@/components/common";
import type { SubjectCalendarCardProps } from "@/components/common";
import { formatDate } from "@/lib/utils";

export type CalendarItem = {
    date: Date;
    title: string;
};

type SubjectCalendarProps = {
    items: (SubjectCalendarCardProps | CalendarItem)[];
    isSubject?: boolean;
    onItemClick?: (item: SubjectCalendarCardProps | CalendarItem) => void;
};

const CalendarItem = ({ item, isSubject, onClick }: { item: SubjectCalendarCardProps | CalendarItem; isSubject: boolean; onClick?: (item: SubjectCalendarCardProps | CalendarItem) => void }) => {
    if (isSubject && "subject" in item) {
        return <SubjectCalendarCard {...(item as SubjectCalendarCardProps)} onClick={() => onClick?.(item)} />;
    }

    return (
        <div className="flex items-center space-x-2 rounded bg-muted p-2 text-sm">
            <div className="h-4 w-1 rounded bg-primary" />
            <div className="flex w-full items-center justify-between gap-2 font-medium">
                <span className="line-clamp-2">{(item as CalendarItem).title}</span>
                <span className="shrink-0 text-muted-foreground">
                    {item.date.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>
        </div>
    );
};

export const SubjectCalendar = ({ items, isSubject = false, onItemClick }: SubjectCalendarProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Get highlighted dates from items
    const highlightedDates = useMemo(() => items.map((item) => item.date), [items]);

    // Filter items for selected date
    const selectedItems = useMemo(() => {
        if (!selectedDate) return [];
        return items.filter((item) => item.date.toDateString() === selectedDate.toDateString());
    }, [items, selectedDate]);

    return (
        <div className="space-y-4">
            <Calendar highlightedDates={highlightedDates} onDateSelect={setSelectedDate} />

            {selectedDate && (
                <div className="mt-4 space-y-4">
                    {selectedItems.length === 0 ? (
                        <div className="text-center text-muted-foreground">Tidak ada kegiatan</div>
                    ) : (
                        <>
                            {isSubject && (
                                <div className="flex flex-col">
                                    <span className="text-xs text-secondary-foreground">Jadwal kelas</span>
                                    <span className="text-lg font-bold">{formatDate(selectedDate)}</span>
                                </div>
                            )}
                            <div className="flex flex-col gap-4">
                                {selectedItems.map((item, index) => (
                                    <CalendarItem key={index} item={item} isSubject={isSubject} onClick={onItemClick} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
