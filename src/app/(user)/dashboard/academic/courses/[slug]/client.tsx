"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Progress, Badge, Card, CardHeader, ScrollArea } from "@/components/ui";
import { FilterBar } from "@/components/common/filters/filter-bar";
import { FileText, Video, CheckCircle, Calendar, Lock, PenTool, FileCode, Grid2x2, LayoutList } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { URLS } from "@/constants/urls";
import { MOCK_COURSE } from "@/lib/mocks";
import { CourseContent } from "@/types/course";
import { CourseHeader } from "@/components/common/course";
import { useRouterStuff } from "@/hooks";

// Types and Constants
type CourseFilters = {
    view: "all" | "active" | "completed";
    groupBy: "category" | "type" | "date" | "none";
    layout: "grid" | "list";
};

const CONTENT_ICONS = {
    document: <FileText className="w-5 h-5 text-emerald-500" />,
    video: <Video className="w-5 h-5 text-violet-500" />,
    task: <PenTool className="w-5 h-5 text-orange-500" />,
    quiz: <FileCode className="w-5 h-5 text-red-500" />,
} as const;

const FILTER_SETTINGS = [
    {
        id: "layout",
        label: "Layout",
        type: "button" as const,
        options: [
            { value: "grid", label: "Grid", icon: <Grid2x2 className="h-4 w-4" /> },
            { value: "list", label: "List", icon: <LayoutList className="h-4 w-4" /> },
        ],
    },
    {
        id: "view",
        label: "View",
        type: "radio" as const,
        options: [
            { value: "all", label: "All Content" },
            { value: "active", label: "In Progress" },
            { value: "completed", label: "Completed" },
        ],
    },
    {
        id: "groupBy",
        label: "Group By",
        type: "radio" as const,
        options: [
            { value: "none", label: "None" },
            { value: "category", label: "Category" },
            { value: "type", label: "Type" },
            { value: "date", label: "Date" },
        ],
    },
];

const useContentProcessor = (content: readonly CourseContent[]) => {
    const { searchParamsObj, queryParams } = useRouterStuff();

    const initialFilters: CourseFilters = {
        view: (searchParamsObj.view as CourseFilters["view"]) || "all",
        groupBy: (searchParamsObj.groupBy as CourseFilters["groupBy"]) || "category",
        layout: (searchParamsObj.layout as CourseFilters["layout"]) || "grid",
    };

    const [filters, setFilters] = useState<CourseFilters>(initialFilters);

    const updateFilters = useCallback(
        (key: keyof CourseFilters, value: string) => {
            queryParams({ set: { [key]: value }, replace: true });
            setFilters((prev) => ({ ...prev, [key]: value as any }));
        },
        [queryParams]
    );

    const processedContent = useMemo(() => {
        const isAccessible = (item: CourseContent) => !item.openTime || item.openTime <= new Date();

        const filteredContent = content.filter((item) => {
            const accessible = isAccessible(item);
            switch (filters.view) {
                case "active":
                    return accessible && !item.done;
                case "completed":
                    return item.done;
                default:
                    return accessible;
            }
        });

        if (filters.groupBy === "none") {
            return { "All Content": filteredContent };
        }

        return filteredContent.reduce(
            (groups, item) => {
                const key = (() => {
                    switch (filters.groupBy) {
                        case "category":
                            return item.category;
                        case "type":
                            return `${item.type.charAt(0).toUpperCase()}${item.type.slice(1)}s`;
                        case "date":
                            return formatDate(new Date(item.date));
                        default:
                            return "All Content";
                    }
                })();

                return {
                    ...groups,
                    [key]: [...(groups[key] || []), item],
                };
            },
            {} as Record<string, CourseContent[]>
        );
    }, [content, filters]);

    return {
        filters,
        updateFilters,
        processedContent,
    };
};

const ContentItem = React.memo<{ item: CourseContent }>(({ item }) => (
    <Link href={URLS.dashboard.accademic.courses.dynamicPage("test", item.type, item.id)} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-sm">
        <div className="flex items-center gap-3">
            <span className="shrink-0">{CONTENT_ICONS[item.type]}</span>
            <div>
                <span className="font-medium">{item.title}</span>
                <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(new Date(item.date))}</span>
                    <div className="flex flex-wrap gap-2">
                        {item.openTime && (
                            <Badge variant="muted" size="xs" className="bg-yellow-100 text-yellow-800">
                                <Lock className="size-3 mr-1" />
                                Opens: {formatDate(item.openTime, true)}
                            </Badge>
                        )}
                        {item.dueTime && (
                            <Badge variant="muted" size="xs" className="bg-red-100 text-red-800">
                                <Calendar className="size-3 mr-1" />
                                Due: {formatDate(item.dueTime, true)}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {item.done && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
    </Link>
));
ContentItem.displayName = "ContentItem";

const ContentGroup = React.memo<{
    title: string;
    items: readonly CourseContent[];
    layout: CourseFilters["layout"];
}>(({ title, items, layout }) => (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <h2 className="font-semibold">{title}</h2>
                <span className="text-muted-foreground text-sm">({items.length})</span>
            </div>
        </CardHeader>
        <div className={layout === "list" ? "flex flex-col gap-2" : "grid grid-cols-1 md:grid-cols-2 gap-2"}>
            {items.map((item) => (
                <ContentItem key={item.id} item={item} />
            ))}
        </div>
    </Card>
));
ContentGroup.displayName = "ContentGroup";

export const CourseDetail: React.FC = () => {
    const course = MOCK_COURSE;
    const totalItems = course.content.length;
    const completedItems = course.content.filter((item) => item.done).length;

    const { filters, updateFilters, processedContent } = useContentProcessor(course.content);

    return (
        <div>
            <div className="border-b p-4">
                <CourseHeader title={course.subjectName} code={course.code} instructor={course.instructor} completed={completedItems} total={totalItems} />
                <div className="flex justify-end">
                    <FilterBar filters={filters} onChange={updateFilters} settings={FILTER_SETTINGS} variant="popover" />
                </div>
            </div>
            <ScrollArea className="p-4 h-[calc(100vh-18.5rem)]">
                <div className="space-y-4">
                    {Object.entries(processedContent).map(([group, items]) => (
                        <ContentGroup key={group} title={group} items={items} layout={filters.layout} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
