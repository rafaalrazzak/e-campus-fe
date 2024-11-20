"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Progress, Badge, Card, CardHeader, ScrollArea } from "@/components/ui";
import { FilterBar } from "@/components/common/filters/filter-bar";
import { FileText, Video, CheckCircle, Calendar, Layers, FileCode, PenTool, Grid2x2, LayoutList, Lock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { URLS } from "@/constants/urls";
import { MOCK_COURSE } from "@/lib/mocks";
import { CourseContent, CourseContentType } from "@/types/course";

type LayoutType = "grid" | "list";
type GroupByType = "category" | "type" | "date" | "none";
type ViewType = "all" | "active" | "completed";

interface CourseFilters {
    view: ViewType;
    groupBy: GroupByType;
    layout: LayoutType;
}

// Constants
const ICONS: Record<CourseContentType | "calendar" | "layers", JSX.Element> = {
    document: <FileText className="w-5 h-5 text-emerald-500" />,
    video: <Video className="w-5 h-5 text-violet-500" />,
    task: <PenTool className="w-5 h-5 text-orange-500" />,
    quiz: <FileCode className="w-5 h-5 text-red-500" />,
    calendar: <Calendar className="w-5 h-5 text-blue-500" />,
    layers: <Layers className="w-5 h-5 text-blue-500" />,
};

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

// Helper Functions
const filterContent = (content: CourseContent[], { view }: CourseFilters) =>
    content.filter((item) => {
        const isAccessible = !item.openTime || item.openTime <= new Date();
        return view === "all" ? isAccessible : view === "active" ? isAccessible && !item.done : item.done;
    });

const groupContent = (content: CourseContent[], groupBy: GroupByType) =>
    content.reduce<Record<string, CourseContent[]>>((acc, item) => {
        const key = getGroupKey(item, groupBy);
        acc[key] = acc[key] || [];
        acc[key].push(item);
        return acc;
    }, {});

const getGroupKey = (item: CourseContent, groupBy: GroupByType) => {
    switch (groupBy) {
        case "category":
            return item.category;
        case "type":
            return `${item.type.charAt(0).toUpperCase()}${item.type.slice(1)}s`;
        case "date":
            return formatDate(new Date(item.date));
        default:
            return "All Content";
    }
};

// Components
const CourseHeader: React.FC<{ subjectName: string; code: string; instructor: string; total: number; completed: number }> = ({ subjectName, code, instructor, total, completed }) => (
    <div className="space-y-4">
        <h1 className="text-xl font-semibold">{subjectName}</h1>
        <p className="text-muted-foreground">
            {code} - {instructor}
        </p>
        <Progress value={(completed / total) * 100} className="h-2" />
        <p className="text-sm text-secondary-foreground mt-2">
            {completed} dari {total} item selesai
        </p>
    </div>
);

const Content: React.FC<{ item: CourseContent }> = ({ item }) => (
    <Link href={URLS.dashboard.accademic.courses.dynamicPage("test", item.type, item.id)} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-sm">
        <div className="flex items-center gap-3">
            <span className="shrink-0">{ICONS[item.type]}</span>
            <div>
                <span className="font-medium">{item.title}</span>
                <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(new Date(item.date))}</span>

                    <div className="flex flex-wrap gap-2 ">
                        {item.openTime && (
                            <Badge variant="muted" size="xs" className="bg-yellow-100 text-yellow-800" leftIcon={<Lock className="size-3" />}>
                                Dibuka: {formatDate(item.openTime, true)}
                            </Badge>
                        )}
                        {item.dueTime && (
                            <Badge variant="muted" size="xs" className="bg-red-100 text-red-800" leftIcon={<Calendar className="size-3" />}>
                                Tenggat: {formatDate(item.dueTime, true)}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {item.done && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
    </Link>
);

const ContentGroup: React.FC<{ title: string; items: CourseContent[]; layout: LayoutType }> = ({ title, items, layout }) => (
    <Card>
        <CardHeader className="flex flex-row items-center gap-2 ">
            {ICONS.layers}
            <h2 className="font-semibold">{title}</h2>
            <span className="text-muted-foreground text-sm ml-2">({items.length})</span>
        </CardHeader>
        <div className={layout === "list" ? "flex flex-col gap-2" : "grid grid-cols-1 md:grid-cols-2 gap-2"}>
            {items.map((item) => (
                <Content key={item.id} item={item} />
            ))}
        </div>
    </Card>
);

export const CourseDetail: React.FC = () => {
    const [filters, setFilters] = useState<CourseFilters>({ view: "all", groupBy: "category", layout: "grid" });
    const course = MOCK_COURSE;

    const groupedContent = useMemo(() => {
        const filtered = filterContent(course.content, filters);
        const grouped = groupContent(filtered, filters.groupBy);
        return filters.groupBy === "date" ? Object.entries(grouped).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime()) : Object.entries(grouped);
    }, [filters]);

    const totalItems = course.content.length;
    const completedItems = course.content.filter((item) => item.done).length;

    return (
        <div>
            <div className="border-b p-4">
                <CourseHeader total={totalItems} completed={completedItems} {...course} />
                <div className="flex justify-end">
                    <FilterBar filters={filters} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} settings={FILTER_SETTINGS} variant="popover" />
                </div>
            </div>
            <ScrollArea className="h-[calc(100vh-18.5rem)]">
                <div className="space-y-4">
                    {groupedContent.map(([group, items]) => (
                        <ContentGroup key={group} title={group} items={items} layout={filters.layout} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
