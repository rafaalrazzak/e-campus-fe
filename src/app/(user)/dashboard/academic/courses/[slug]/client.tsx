"use client";

import React, { useState, useMemo } from "react";
import { Progress, Badge, Card, CardHeader } from "@/components/ui";
import { FilterBar } from "@/components/common/filters/filter-bar";
import { FileText, Video, CheckCircle, Calendar, Layers, FileCode, PenTool, Grid2x2, LayoutList } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { URLS } from "@/constants/urls";

// Types
type ContentType = "document" | "video" | "task" | "quiz";
type LayoutType = "grid" | "list";
type GroupByType = "category" | "type" | "date" | "none";
type ViewType = "all" | "active" | "completed";

interface ContentItem {
    id: string;
    title: string;
    type: ContentType;
    category: string;
    done: boolean;
    date: string;
    dueTime?: Date;
    openTime?: Date;
}

interface CourseFilters {
    view: ViewType;
    groupBy: GroupByType;
    layout: LayoutType;
}

// Constants
const ICONS: Record<ContentType | "calendar" | "layers", JSX.Element> = {
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

const SAMPLE_CONTENT: ContentItem[] = [
    // Sample data
    { id: "doc1", title: "Kontrak Perkuliahan", type: "document", category: "Week 1: Introduction", done: true, date: "2024-03-01" },
    { id: "vid1", title: "Instalasi XAMPP", type: "video", category: "Week 1: Introduction", done: true, date: "2024-03-01" },
    { id: "quiz1", title: "Quiz: Git Basics", type: "quiz", category: "Week 2: Version Control", done: false, date: "2024-03-08", openTime: new Date("2024-03-01"), dueTime: new Date("2024-03-10") },
    { id: "task1", title: "Create Your First Webpage", type: "task", category: "Week 3: HTML Basics", done: false, date: "2024-03-15", dueTime: new Date("2024-03-20") },
    { id: "doc2", title: "HTML Fundamentals", type: "document", category: "Week 3: HTML Basics", done: false, date: "2024-03-15" },
];

// Helper Functions
const filterContent = (content: ContentItem[], filters: CourseFilters) =>
    content.filter((item) => {
        const isAccessible = !item.openTime || item.openTime <= new Date();
        return filters.view === "all" ? isAccessible : filters.view === "active" ? isAccessible && !item.done : item.done;
    });

const groupContent = (content: ContentItem[], groupBy: GroupByType) =>
    content.reduce(
        (acc, item) => {
            const groupTitle = getGroupTitle(item, groupBy);
            if (!acc[groupTitle]) acc[groupTitle] = [];
            acc[groupTitle].push(item);
            return acc;
        },
        {} as Record<string, ContentItem[]>
    );

const getGroupTitle = (item: ContentItem, groupBy: GroupByType): string => {
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

const getGroupIcon = (groupTitle: string): JSX.Element =>
    groupTitle.includes("document") ? ICONS.document : groupTitle.includes("video") ? ICONS.video : groupTitle.includes("quiz") ? ICONS.quiz : groupTitle.includes("task") ? ICONS.task : ICONS.layers;

// Components
const CourseHeader: React.FC = () => {
    const totalItems = SAMPLE_CONTENT.length;
    const completedItems = SAMPLE_CONTENT.filter((item) => item.done).length;

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Pemrograman Web 1</h1>
            <p className="text-muted-foreground">PWEB1 • Dr. John Doe</p>
            <Progress value={(completedItems / totalItems) * 100} className="h-2" />
            <p className="text-sm text-secondary-foreground mt-2">
                {completedItems} of {totalItems} items completed
            </p>
        </div>
    );
};

const ContentItem: React.FC<{ item: ContentItem }> = ({ item }) => (
    <Link href={URLS.dashboard.accademic.courses.dynamicPage("test", item.type, item.id)} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-sm">
        <div className="flex items-center gap-3">
            <div className="shrink-0">{ICONS[item.type]}</div>
            <div className="flex flex-col">
                <span className="font-medium">{item.title}</span>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground items-center">
                    <span>{formatDate(new Date(item.date))}</span>
                    {item.openTime && (
                        <Badge variant="muted" size="xs" className="bg-green-100 text-green-800">
                            Open: {formatDate(item.openTime, true)}
                        </Badge>
                    )}
                    {item.dueTime && (
                        <Badge variant="muted" size="xs" className="bg-red-100 text-red-800">
                            Due: {formatDate(item.dueTime, true)}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
        {item.done && <CheckCircle className="w-5 h-5 text-emerald-500" />}
    </Link>
);

const ContentGroup: React.FC<{ title: string; items: ContentItem[]; layout: LayoutType }> = ({ title, items, layout }) => (
    <Card>
        <CardHeader className="flex gap-2 flex-row items-center border-b pb-4">
            {getGroupIcon(title)}
            <h2 className="font-semibold">{title}</h2>
            <span className="text-muted-foreground text-sm ml-2">({items.length})</span>
        </CardHeader>
        <div className={layout === "list" ? "flex flex-col gap-2" : "grid grid-cols-1 md:grid-cols-2 gap-2"}>
            {items.map((item) => (
                <ContentItem key={item.id} item={item} />
            ))}
        </div>
    </Card>
);

export function CourseContent() {
    const [filters, setFilters] = useState<CourseFilters>({ view: "all", groupBy: "category", layout: "grid" });

    const filteredAndGroupedContent = useMemo(() => {
        const filtered = filterContent(SAMPLE_CONTENT, filters);
        const grouped = groupContent(filtered, filters.groupBy);
        return filters.groupBy === "date" ? Object.fromEntries(Object.entries(grouped).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())) : grouped;
    }, [filters]);

    return (
        <>
            <div className="border-b p-4">
                <CourseHeader />
                <div className="flex justify-end">
                    <FilterBar filters={filters} settings={FILTER_SETTINGS} onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))} variant="popover" />
                </div>
            </div>
            <div className="p-4 flex flex-col gap-8">
                {Object.entries(filteredAndGroupedContent).map(([group, items]) => (
                    <ContentGroup key={group} title={group} items={items} layout={filters.layout} />
                ))}
            </div>
        </>
    );
}
