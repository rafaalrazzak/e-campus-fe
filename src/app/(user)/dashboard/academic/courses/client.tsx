"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui";
import { CourseCard, CourseProps } from "@/components/common/course";
import { FilterBar } from "@/components/common/filters/filter-bar";
import { getDayName } from "@/lib/utils";

type GroupByType = "none" | "date";
type SortByType = "none" | "progress";

interface Filters {
    groupBy: GroupByType;
    sortBy: SortByType;
}

const SAMPLE_CONTENT: CourseProps[] = [
    { name: "Pemrograman Web 1", instructor: "Ilham", day: 1, timeStart: "09:00", duration: 90, progress: 50 },
    { name: "Algoritma dan Struktur Data", instructor: "Ilham", day: 2, timeStart: "12:00", duration: 90, progress: 75 },
];

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
const groupByDay = (content: CourseProps[]): Record<number, CourseProps[]> =>
    content.reduce(
        (acc, item) => {
            (acc[item.day] ||= []).push(item);
            return acc;
        },
        {} as Record<number, CourseProps[]>
    );

const sortByProgress = (content: CourseProps[]): CourseProps[] => [...content].sort((a, b) => b.progress - a.progress);

export const CourseContent: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({ groupBy: "none", sortBy: "none" });

    // Apply sorting and grouping based on filters
    let displayedContent = SAMPLE_CONTENT;
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

            <section className="flex flex-col gap-4">
                {Object.entries(groupedContent).map(([group, items]) => (
                    <div key={group}>
                        {filters.groupBy === "date" && <h2 className="text-lg font-semibold mb-2">{getDayName(Number(group))}</h2>}
                        <div className="grid md:grid-cols-2 gap-4">
                            {items.map((item, idx) => (
                                <CourseCard key={idx} {...item} />
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};
