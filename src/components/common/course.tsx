import { Button, Badge, CardHeader, Input, Card, CardContent, CardFooter, CardTitle, Progress } from "@/components/ui";
import { formatDate, getDayName, getTimeRange } from "@/lib/utils";
import { Course } from "@/types/course";
import { CalendarDays, Clock, BookOpen, User } from "lucide-react";
import React from "react";
import { FileText, Video, CheckCircle, Calendar, Layers, FileCode, PenTool, Grid2x2, LayoutList, Lock, SearchIcon } from "lucide-react";
import Link from "next/link";
import { FilterBar } from "@/components/common/filters/filter-bar";
import { FilterSetting } from "@/components/common/filters/types";
import { URLS } from "@/constants/urls";

// Types
export interface CourseContent {
    id: string;
    title: string;
    type: "document" | "video" | "task" | "quiz";
    category: string;
    date: string;
    done: boolean;
    openTime?: Date;
    dueTime?: Date;
}

export interface CourseFilters {
    readonly view: "all" | "active" | "completed";
    readonly groupBy: "category" | "type" | "date" | "none";
    readonly layout: "grid" | "list";
    readonly search?: string;
    readonly sortBy?: "none" | "progress";
}

// Constants
export const ICONS = {
    document: <FileText className="w-5 h-5 text-emerald-500" />,
    video: <Video className="w-5 h-5 text-violet-500" />,
    task: <PenTool className="w-5 h-5 text-orange-500" />,
    quiz: <FileCode className="w-5 h-5 text-red-500" />,
    calendar: <Calendar className="w-5 h-5 text-blue-500" />,
    layers: <Layers className="w-5 h-5 text-blue-500" />,
} as const;

export const FILTER_SETTINGS: readonly FilterSetting[] = [
    {
        id: "layout",
        label: "Layout",
        type: "button",
        options: [
            { value: "grid", label: "Grid", icon: <Grid2x2 className="h-4 w-4" /> },
            { value: "list", label: "List", icon: <LayoutList className="h-4 w-4" /> },
        ],
    },
    {
        id: "view",
        label: "View",
        type: "radio",
        options: [
            { value: "all", label: "All Content" },
            { value: "active", label: "In Progress" },
            { value: "completed", label: "Completed" },
        ],
    },
    {
        id: "groupBy",
        label: "Grup Berdasarkan",
        type: "radio",
        options: [
            { value: "none", label: "None" },
            { value: "category", label: "Category" },
            { value: "type", label: "Type" },
            { value: "date", label: "Date" },
        ],
    },
] as const;

// Utility Functions
export const isContentAccessible = (content: CourseContent): boolean => !content.openTime || content.openTime <= new Date();

export const filterContent = (content: readonly CourseContent[], filters: CourseFilters): CourseContent[] => {
    let accessibleContent = content.filter(isContentAccessible);

    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        accessibleContent = accessibleContent.filter((item) => item.title.toLowerCase().includes(searchTerm));
    }

    switch (filters.view) {
        case "active":
            return accessibleContent.filter((item) => !item.done);
        case "completed":
            return accessibleContent.filter((item) => item.done);
        default:
            return accessibleContent;
    }
};

export const getGroupKey = (item: CourseContent, groupBy: CourseFilters["groupBy"]): string => {
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

export const groupContent = (content: readonly CourseContent[], groupBy: CourseFilters["groupBy"]): Readonly<Record<string, readonly CourseContent[]>> => {
    if (groupBy === "none") return { "All Content": content };

    return content.reduce(
        (acc, item) => {
            const key = getGroupKey(item, groupBy);
            return {
                ...acc,
                [key]: [...(acc[key] || []), item],
            };
        },
        {} as Record<string, CourseContent[]>
    );
};

export const CourseCard: React.FC<Course> = ({ subjectName, instructor, date, duration, progress, linkCourse }) => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-3">
                <CardTitle className="line-clamp-1">{subjectName}</CardTitle>

                <div className="flex flex-col gap-2 text-secondary-foreground">
                    <div className="flex items-center gap-1">
                        <User size={16} /> {instructor}
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} /> {getDayName(date)}
                        <Clock size={16} /> {getTimeRange(date, duration)}
                    </div>
                </div>

                <div className="text-muted-foreground">
                    <Progress value={progress} className="w-full h-2 my-2" />
                    <div className="flex justify-between text-xs font-medium">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button asLink href={linkCourse} size="full" variant="secondary-primary" leftIcon={<BookOpen size={16} />}>
                    Lihat Detail
                </Button>
            </CardFooter>
        </Card>
    );
};

export const CourseProgress: React.FC<{
    completed: number;
    total: number;
    className?: string;
}> = ({ completed, total, className }) => (
    <div className={className}>
        <Progress value={(completed / total) * 100} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
            {completed} dari {total} item selesai
        </p>
    </div>
);

export const CourseHeader: React.FC<{
    title: string;
    total: number;
    completed: number;
    code?: string;
    instructor?: string;
}> = ({ title, code, instructor, total, completed }) => (
    <div className="space-y-4">
        <h1 className="text-xl font-semibold">{title}</h1>
        {code && instructor && (
            <p className="text-muted-foreground">
                {code} - {instructor}
            </p>
        )}
        <CourseProgress completed={completed} total={total} />
    </div>
);

export const ContentItem: React.FC<{
    item: CourseContent;
    onSelect?: (id: string) => void;
}> = ({ item, onSelect }) => (
    <Link
        href={URLS.dashboard.accademic.courses.dynamicPage("test", item.type, item.id)}
        onClick={() => onSelect?.(item.id)}
        className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-sm"
    >
        <div className="flex items-center gap-3">
            <span className="shrink-0">{ICONS[item.type]}</span>
            <div>
                <span className="font-medium">{item.title}</span>
                <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(new Date(item.date))}</span>
                    <div className="flex flex-wrap gap-2">
                        {item.openTime && (
                            <Badge variant="muted" size="xs" className="bg-yellow-100 text-yellow-800" leftIcon={<Lock className="size-3" />}>
                                Opens: {formatDate(item.openTime, true)}
                            </Badge>
                        )}
                        {item.dueTime && (
                            <Badge variant="muted" size="xs" className="bg-red-100 text-red-800" leftIcon={<Calendar className="size-3" />}>
                                Due: {formatDate(item.dueTime, true)}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {item.done && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
    </Link>
);

export const ContentGroup: React.FC<{
    title: string;
    items: readonly CourseContent[];
    layout: CourseFilters["layout"];
    onSelectItem?: (id: string) => void;
}> = ({ title, items, layout, onSelectItem }) => (
    <Card>
        <CardHeader className="flex flex-row items-center gap-2">
            {ICONS.layers}
            <h2 className="font-semibold">{title}</h2>
            <span className="text-muted-foreground text-sm ml-2">({items.length})</span>
        </CardHeader>
        <div className={layout === "list" ? "flex flex-col gap-2" : "grid grid-cols-1 md:grid-cols-2 gap-2"}>
            {items.map((item) => (
                <ContentItem key={item.id} item={item} onSelect={onSelectItem} />
            ))}
        </div>
    </Card>
);

export const CourseSearch: React.FC<{
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}> = ({ value, onChange, disabled }) => (
    <Input
        placeholder="Cari kursus..."
        className="size-full lg:max-w-64"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leftIcon={<SearchIcon className="w-4 h-4 text-muted-foreground" />}
        disabled={disabled}
    />
);

export const CourseFiltersBar: React.FC<{
    filtersOptions: FilterSetting[];
    filters: Partial<CourseFilters>;
    onChange: <K extends keyof CourseFilters>(key: K, value: Partial<CourseFilters>[K]) => void;
}> = ({ filters, filtersOptions, onChange }) => <FilterBar filters={filters} onChange={onChange} settings={filtersOptions} variant="popover" />;

export const CourseList: React.FC<{
    courses: readonly Course[];
}> = ({ courses }) => (
    <div className="grid md:grid-cols-2 gap-4">
        {courses.map((course) => (
            <Link key={course.id} href={URLS.dashboard.accademic.courses.detail(course.code)}>
                <Card key={course.id} className="cursor-pointer hover:bg-secondary/50">
                    <CardHeader>
                        <h3 className="font-semibold">{course.subjectName}</h3>
                        <p className="text-sm text-muted-foreground">
                            {course.code} - {course.instructor}
                        </p>

                        <div className="flex gap-1 text-xs text-muted-foreground">
                            <span>Hari {getDayName(course.date)}</span>
                            <span>&#x2022;</span>
                            <span>Jam {getTimeRange(course.date, course.duration)}</span>
                        </div>
                        <CourseProgress completed={Math.floor(course.progress)} total={100} className="mt-2" />
                    </CardHeader>
                </Card>
            </Link>
        ))}
    </div>
);
