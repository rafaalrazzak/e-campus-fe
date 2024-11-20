"use client";

import React, { useState } from "react";
import { Progress, ScrollArea } from "@/components/ui";
import { CourseCard } from "@/components/common/course";
import { FilterBar } from "@/components/common/filters/filter-bar";
import { getDayName } from "@/lib/utils";
import { MOCK_COURSES } from "@/lib/mocks";
import { Course } from "@/types/course";

type GroupByType = "none" | "date";
type SortByType = "none" | "progress";

interface Filters {
    groupBy: GroupByType;
    sortBy: SortByType;
}

const FILTER_SETTINGS = [
    {
        id: "groupBy",
        label: "Group By",
        type: "radio" as const,
        options: [
            { value: "none", label: "None" },
            { value: "date", label: "Date" },
        ],
    },
    {
        id: "sortBy",
        label: "Sort By",
        type: "radio" as const,
        options: [
            { value: "none", label: "None" },
            { value: "progress", label: "Progress" },
        ],
    },
];

// Helper functions for grouping and sorting content
const groupByDay = (content: Course[]): Record<string, Course[]> =>
    content.reduce(
        (acc, item) => {
            const dayName = getDayName(new Date(item.date));
            (acc[dayName] ||= []).push(item);
            return acc;
        },
        {} as Record<string, Course[]>
    );

const sortByProgress = (content: Course[]): Course[] => [...content].sort((a, b) => b.progress - a.progress);

export const CourseContent: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({ groupBy: "none", sortBy: "none" });

    // Apply sorting and grouping based on filters
    let displayedContent = MOCK_COURSES;
    if (filters.sortBy === "progress") displayedContent = sortByProgress(displayedContent);
    const groupedContent = filters.groupBy === "date" ? groupByDay(displayedContent) : { All: displayedContent };

    return (
        <div className="p-4 flex flex-col gap-4">
            <header className="border-b pb-4">
                <h1 className="text-2xl font-semibold">Mata Kuliah Saya</h1>
                <Progress value={60} className="w-full h-2 my-2" />
                <p className="text-sm text-secondary-foreground">3 dari 5 item selesai</p>
            </header>

            <div className="flex justify-end">
                <FilterBar filters={filters} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} settings={FILTER_SETTINGS} variant="popover" />
            </div>

            <ScrollArea className="p-4 h-[calc(100vh-18.5rem)]">
                <div className="space-y-4">
                    {Object.entries(groupedContent).map(([group, items]) => (
                        <div key={group}>
                            {filters.groupBy === "date" && <h2 className="text-lg font-semibold mb-2">{group === "All" ? "Semua Jadwal" : `Hari ${getDayName(new Date(items[0].date))}`}</h2>}
                            <div className="grid md:grid-cols-2 gap-4">
                                {items.map((item, idx) => (
                                    <CourseCard key={idx} {...item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
