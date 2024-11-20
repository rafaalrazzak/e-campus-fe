export enum CourseStatus {
    Inactive = "inactive",
    Active = "active",
    Done = "done",
}

export enum CourseAttendance {
    Present = "Present",
    Absent = "Absent",
    NotYetPresent = "Not Yet Present",
    Excused = "Excused",
    Sick = "Sick",
}

export enum CourseContentType {
    Document = "document",
    Video = "video",
    Task = "task",
    Quiz = "quiz",
}

export type Course = {
    id: string;
    date: Date;
    subjectName: string;
    code: string;
    topic: string;
    room: string;
    instructor: string;
    duration: number;
    status: CourseStatus;
    attendance: CourseAttendance;
    participants: number;
    linkCourse: string;
    progress: number;
};

export type CourseContent = {
    id: string;
    title: string;
    type: CourseContentType;
    category: string;
    done: boolean;
    date: string;
    dueTime?: Date;
    openTime?: Date;
};
