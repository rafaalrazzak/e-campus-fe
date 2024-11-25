"use client";

import React from "react";
import { DndContext, type DragEndEvent, useSensors, useSensor, MouseSensor, TouchSensor, DragOverlay, Active } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LayoutList, Kanban, Plus, Calendar as CalendarIcon } from "lucide-react";

// UI Components import
import { Card, Badge } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, generateId } from "@/lib/utils";
import { Modal } from "@/components/common/responsive-modal";
import { useMediaQuery } from "@/hooks";

// Types
const TASK_STATUSES = ["To Do", "In Progress", "Done"] as const;
type TaskStatus = (typeof TASK_STATUSES)[number];

const PRIORITIES = ["Low", "Medium", "High"] as const;
type Priority = (typeof PRIORITIES)[number];

type ViewMode = "list" | "kanban";

interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: Priority;
    dueDate: Date;
}

interface TaskFormData extends Omit<Task, "id"> {}

// Constants
const PRIORITY_STYLES = {
    High: { color: "text-red-600", bg: "bg-red-50" },
    Medium: { color: "text-yellow-600", bg: "bg-yellow-50" },
    Low: { color: "text-green-600", bg: "bg-green-50" },
} as const;

// Components
const TaskCard = React.memo<{ task: Task; onClick: () => void }>(({ task, onClick }) => {
    const priorityStyle = PRIORITY_STYLES[task.priority];

    return (
        <Card className="hover:shadow-md cursor-pointer" onClick={onClick}>
            <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
                </div>
                <Badge variant="secondary-warning">{formatDate(task.dueDate, true)}</Badge>
            </div>
            <div className="flex gap-2 mt-3">
                <Badge variant="secondary">{task.status}</Badge>
                <Badge variant="muted" className={`${priorityStyle.color} ${priorityStyle.bg}`}>
                    {task.priority}
                </Badge>
            </div>
        </Card>
    );
});

TaskCard.displayName = "TaskCard";

const TaskForm: React.FC<{
    initialData?: Task;
    onSubmit: (data: TaskFormData) => void;
    onCancel: () => void;
}> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = React.useState<TaskFormData>(() => ({
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        status: initialData?.status ?? "To Do",
        priority: initialData?.priority ?? "Medium",
        dueDate: initialData?.dueDate ?? new Date(),
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const updateFormField = <K extends keyof TaskFormData>(field: K, value: TaskFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Input id="title" label="Judul" value={formData.title} onChange={(e) => updateFormField("title", e.target.value)} placeholder="Task title" required />
            </div>

            <div className="space-y-2">
                <Textarea id="description" label="Deskripsi" value={formData.description} onChange={(e) => updateFormField("description", e.target.value)} placeholder="Task description" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Select
                    label="Status"
                    value={formData.status}
                    onChange={(value) => updateFormField("status", value as TaskStatus)}
                    options={TASK_STATUSES.map((status) => ({
                        label: status,
                        value: status,
                    }))}
                />

                <Select
                    label="Prioritas"
                    value={formData.priority}
                    onChange={(value) => updateFormField("priority", value as Priority)}
                    options={PRIORITIES.map((priority) => ({
                        label: priority,
                        value: priority,
                    }))}
                />
            </div>

            <Popover>
                <PopoverTrigger label="Tenggat Waktu" asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" leftIcon={<CalendarIcon className="h-4 w-4" />}>
                        {formatDate(formData.dueDate, true)}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar onDateSelect={(date) => updateFormField("dueDate", date)} showTime />
                </PopoverContent>
            </Popover>

            <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Batal
                </Button>
                <Button type="submit">{initialData ? "Ubah" : "Buat"}</Button>
            </div>
        </form>
    );
};

const TaskColumn: React.FC<{
    status: TaskStatus;
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}> = React.memo(({ status, tasks, onTaskClick }) => {
    const { setNodeRef } = useSortable({
        id: `column-${status}`,
        data: { type: "Column", status },
    });

    return (
        <div className="bg-gray-50 rounded-lg p-4" ref={setNodeRef}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">{status}</h3>
                <Badge variant="secondary">{tasks.length}</Badge>
            </div>
            <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className="min-h-[200px]">
                    {tasks.map((task) => (
                        <SortableTaskItem key={task.id} task={task} onTaskClick={onTaskClick} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
});

TaskColumn.displayName = "TaskColumn";

const SortableTaskItem: React.FC<{
    task: Task;
    onTaskClick: (task: Task) => void;
}> = React.memo(({ task, onTaskClick }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-manipulation">
            <TaskCard task={task} onClick={() => onTaskClick(task)} />
        </div>
    );
});

SortableTaskItem.displayName = "SortableTaskItem";

export const TaskManagement: React.FC = () => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [viewMode, setViewMode] = React.useState<ViewMode>("kanban");
    const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [activeTask, setActiveTask] = React.useState<Task | null>(null);
    const { device } = useMediaQuery();

    const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }), useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }));

    const handleDragStart = React.useCallback(
        (event: { active: Active }) => {
            const { active } = event;
            const draggedTask = tasks.find((task) => task.id === active.id);
            if (draggedTask) {
                setActiveTask(draggedTask);
            }
        },
        [tasks]
    );

    const handleDragEnd = React.useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            if (!over) return;

            const activeTask = tasks.find((t) => t.id === active.id);
            if (!activeTask) return;

            if (over.data.current?.type === "Column") {
                const newStatus = over.data.current.status as TaskStatus;
                if (activeTask.status !== newStatus) {
                    setTasks(tasks.map((task) => (task.id === activeTask.id ? { ...task, status: newStatus } : task)));
                }
                return;
            }

            const overTask = tasks.find((t) => t.id === over.id);
            if (!overTask) return;

            const oldIndex = tasks.findIndex((t) => t.id === activeTask.id);
            const newIndex = tasks.findIndex((t) => t.id === overTask.id);

            if (oldIndex !== newIndex) {
                setTasks(arrayMove(tasks, oldIndex, newIndex));
            }

            setActiveTask(null);
        },
        [tasks]
    );

    const handleDragCancel = React.useCallback(() => {
        setActiveTask(null);
    }, []);

    const handleTaskSubmit = (formData: TaskFormData) => {
        if (selectedTask) {
            setTasks(tasks.map((task) => (task.id === selectedTask.id ? { ...task, ...formData } : task)));
        } else {
            const newTask: Task = { ...formData, id: generateId() };
            setTasks([...tasks, newTask]);
        }
        setIsDialogOpen(false);
        setSelectedTask(null);
    };

    const groupedTasks = React.useMemo(() => {
        return TASK_STATUSES.reduce(
            (acc, status) => ({
                ...acc,
                [status]: tasks.filter((task) => task.status === status),
            }),
            {} as Record<TaskStatus, Task[]>
        );
    }, [tasks]);

    return (
        <div className="p-4 flex flex-col gap-4">
            {device === "desktop" && (
                <div className="flex justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <Button variant={viewMode === "list" ? "secondary" : "ghost"} onClick={() => setViewMode("list")} className="flex items-center">
                            <LayoutList className="h-4 w-4 mr-2" />
                            List
                        </Button>
                        <Button variant={viewMode === "kanban" ? "secondary" : "ghost"} onClick={() => setViewMode("kanban")} className="flex items-center">
                            <Kanban className="h-4 w-4 mr-2" />
                            Kanban
                        </Button>
                    </div>
                </div>
            )}

            <Button
                onClick={() => {
                    setSelectedTask(null);
                    setIsDialogOpen(true);
                }}
                size={device === "desktop" ? "lg" : "default"}
                className="fixed bottom-4 right-4"
                leftIcon={<Plus className="h-4 w-4" />}
            >
                Tambah Tugas
            </Button>

            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
                <div className={viewMode === "list" ? "mx-auto space-y-6" : "grid grid-cols-1 md:grid-cols-3 gap-4"}>
                    {Object.entries(groupedTasks).map(([status, statusTasks]) => (
                        <TaskColumn
                            key={status}
                            status={status as TaskStatus}
                            tasks={statusTasks}
                            onTaskClick={(task) => {
                                setSelectedTask(task);
                                setIsDialogOpen(true);
                            }}
                        />
                    ))}
                </div>
                <DragOverlay>
                    {activeTask ? (
                        <div className="transform rotate-3 w-full max-w-md">
                            <TaskCard task={activeTask} onClick={() => {}} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            <Modal
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    setSelectedTask(null);
                }}
                title={selectedTask ? "Edit Tugas" : "Buat Tugas"}
                preventClose
            >
                <TaskForm
                    initialData={selectedTask ?? undefined}
                    onSubmit={handleTaskSubmit}
                    onCancel={() => {
                        setIsDialogOpen(false);
                        setSelectedTask(null);
                    }}
                />
            </Modal>
        </div>
    );
};
