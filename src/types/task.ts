export interface Task {
    id: string;
    title: string;
    type: "file" | "text";
    description: string;
    subject: string;
    lecture: string;
    deadline: string;
    timeRemaining: string;
    important: string[];
    createdAt: string;
    points: number;
    allowedFileTypes?: string[];
    fileNameFormat?: string;
}
