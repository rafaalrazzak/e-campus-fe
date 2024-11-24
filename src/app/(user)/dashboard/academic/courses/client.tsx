"use client";

import React, { useCallback, useMemo, useState, useTransition } from "react";
import { useRouterStuff } from "@/hooks";
import { MOCK_COURSES } from "@/lib/mocks";
import { getDayName } from "@/lib/utils";
import { CourseHeader, CourseSearch, CourseFiltersBar, CourseList, CourseFilters } from "@/components/common/course";
import { Course } from "@/types/course";
import { useDebounceValue } from "@/hooks";

const FILTER_SETTINGS = [
    {
        id: "groupBy",
        label: "Grup Berdasarkan",
        type: "radio" as const,
        options: [
            { value: "none", label: "None" },
            { value: "date", label: "Date" },
        ],
    },
    {
        id: "sortBy",
        label: "Urutkan Berdasarkan",
        type: "radio" as const,
        options: [
            { value: "none", label: "None" },
            { value: "progress", label: "Progress" },
        ],
    },
];

const TOTAL_COURSES = MOCK_COURSES.length;
const COMPLETED_COUNT = MOCK_COURSES.reduce((count, course) => (course.progress === 100 ? count + 1 : 0), 0);

const useCoursesFilter = (initialFilters: Partial<CourseFilters>) => {
    const [filters, setFilters] = useState(initialFilters);
    const [isPending, startTransition] = useTransition();

    // Memoize the search term to prevent unnecessary recalculations
    const debouncedSearch = useDebounceValue(filters.search || "", 300);

    const processedCourses = useMemo(() => {
        // Only filter if there's a search term
        const filtered = debouncedSearch
            ? MOCK_COURSES.filter((course) => {
                  const term = debouncedSearch.toLowerCase();
                  return course.subjectName.toLowerCase().includes(term) || course.instructor.toLowerCase().includes(term);
              })
            : MOCK_COURSES;

        // Sort if needed
        const sorted = filters.sortBy === "progress" ? [...filtered].sort((a, b) => b.progress - a.progress) : filtered;

        // Group if needed
        if (filters.groupBy !== "date") {
            return { All: sorted };
        }

        // Use reduce for single pass grouping
        return sorted.reduce(
            (groups, course) => {
                const dayName = getDayName(new Date(course.date));
                if (!groups[dayName]) groups[dayName] = [];
                groups[dayName].push(course);
                return groups;
            },
            {} as Record<string, Course[]>
        );
    }, [debouncedSearch, filters.sortBy, filters.groupBy]);

    return {
        filters,
        setFilters,
        processedCourses,
        isPending,
    };
};

const CourseGroup = React.memo(({ group, courses, showGroupHeader }: { group: string; courses: Course[]; showGroupHeader: boolean }) => (
    <div key={group}>
        {showGroupHeader && <h2 className="text-lg font-semibold mb-2">{group === "All" ? "All Schedules" : `Hari ${group}`}</h2>}
        <CourseList courses={courses} />
    </div>
));
CourseGroup.displayName = "CourseGroup";

export const CourseListPage: React.FC = () => {
    const { searchParamsObj, queryParams } = useRouterStuff();

    const initialFilters: Partial<CourseFilters> = {
        search: searchParamsObj.search || "",
        groupBy: (searchParamsObj.groupBy as CourseFilters["groupBy"]) || "none",
        sortBy: (searchParamsObj.sortBy as CourseFilters["sortBy"]) || "none",
        view: "all",
    };

    const { filters, setFilters, processedCourses, isPending } = useCoursesFilter(initialFilters);

    // Memoize handlers to prevent unnecessary re-renders
    const handleSearchChange = useCallback(
        (value: string) => {
            queryParams({ set: { search: value }, replace: true });
            setFilters((prev) => ({ ...prev, search: value }));
        },
        [queryParams]
    );

    const handleFilterChange = useCallback(
        <K extends keyof CourseFilters>(key: K, value: Partial<CourseFilters>[K]) => {
            queryParams({ set: { [key]: value || "" }, replace: true });
            setFilters((prev) => ({ ...prev, [key]: value }));
        },
        [queryParams]
    );

    return (
        <div className="p-4 flex flex-col gap-4">
            <CourseHeader title="Mata Kuliah Saya" completed={COMPLETED_COUNT} total={TOTAL_COURSES} />

            <div className="flex justify-between gap-2">
                <CourseSearch value={filters.search || ""} onChange={handleSearchChange} disabled={isPending} />
                <CourseFiltersBar filtersOptions={FILTER_SETTINGS} filters={filters} onChange={handleFilterChange} />
            </div>

            <div className="space-y-4">
                {Object.entries(processedCourses).map(([group, courses]) => (
                    <CourseGroup key={group} group={group} courses={courses} showGroupHeader={filters.groupBy === "date"} />
                ))}
            </div>
        </div>
    );
};
