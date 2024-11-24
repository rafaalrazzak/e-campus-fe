import { faker } from "@faker-js/faker";
import { addDays } from "date-fns";
import { URLS } from "@/constants/urls";
import { Course, CourseStatus, CourseAttendance, CourseContent, CourseContentType } from "@/types/course";
import { Task } from "@/types/task";
import { formatDate } from "./utils";

const SUBJECTS = ["Computer Science", "Mathematics", "Physics", "English"] as const;
const COURSE_CODES = ["CS101", "MATH202", "PHYS303", "ENG404"] as const;
const TOPICS = ["Introduction to Programming", "Calculus", "Quantum Physics", "English Literature"] as const;
const ROOMS = ["Lecture Hall A", "Lecture Hall B", "Lecture Hall C"] as const;
const DURATIONS = [60, 90, 120] as const;
const CONTENT_CATEGORIES = ["Homework", "Quiz", "Assignment", "Project"] as const;

const generateTimeRemaining = (deadline: Date): string => {
    const diff = deadline.getTime() - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} hari ${hours} jam`;
    if (hours > 0) return `${hours} jam ${minutes} menit`;
    return `${minutes} menit`;
};

// Generator functions
export const generateRandomCourse = (count: number): Course[] =>
    Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        date: faker.date.between({
            from: new Date(),
            to: addDays(new Date(), 7),
        }),
        subjectName: faker.helpers.arrayElement(SUBJECTS),
        code: faker.helpers.arrayElement(COURSE_CODES),
        topic: faker.helpers.arrayElement(TOPICS),
        room: faker.helpers.arrayElement(ROOMS),
        instructor: faker.person.fullName(),
        duration: faker.helpers.arrayElement(DURATIONS),
        status: faker.helpers.enumValue(CourseStatus),
        attendance: faker.helpers.enumValue(CourseAttendance),
        participants: faker.number.int({ min: 10, max: 99 }),
        linkCourse: URLS.dashboard.accademic.courses.detail(faker.lorem.slug()),
        progress: faker.number.int({ min: 0, max: 100 }),
    }));

export const generateRandomCourseContent = (count: number): CourseContent[] =>
    Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        type: faker.helpers.enumValue(CourseContentType),
        category: faker.helpers.arrayElement(CONTENT_CATEGORIES),
        done: faker.datatype.boolean(),
        date: faker.date.recent().toISOString(),
        dueTime: faker.datatype.boolean() ? faker.date.recent() : undefined,
        openTime: faker.datatype.boolean() ? faker.date.recent() : undefined,
    }));

export const generateRandomTask = (count: number): Task[] =>
    Array.from({ length: count }, () => {
        const subject = faker.helpers.arrayElement(SUBJECTS);
        const deadline = faker.date.soon();

        return {
            id: faker.string.uuid(),
            title: `${faker.helpers.arrayElement(CONTENT_CATEGORIES)} ${faker.number.int({ min: 1, max: 10 })} - ${subject}`,
            type: faker.helpers.arrayElement(["file", "text"]),
            fileNameFormat: "{{task_title}}_{{student_id}}_{{student_name}}",
            allowedFileTypes: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            description: faker.lorem.paragraph(),
            subject,
            lecture: faker.person.fullName(),
            deadline: formatDate(deadline, true),
            timeRemaining: generateTimeRemaining(deadline),
            important: [
                "Maksimal ukuran file: 10 MB",
                "Hanya menerima file PDF, DOC, DOCX",
                faker.helpers.arrayElement(["Gunakan format penulisan yang benar", "Sertakan nomor halaman", "Tambahkan daftar isi", "Sertakan referensi dalam format APA"]),
                faker.helpers.arrayElement(["Kerjakan sendiri", "Jangan plagiat", "Jangan mencontek", "Jangan berdiskusi dengan teman", "Jangan menyalin dari internet"]),
            ],
            createdAt: faker.date.past().toISOString(),
            points: faker.number.int({ min: 10, max: 100 }),
        };
    });

// Pre-generated mock data
export const MOCK_COURSES = generateRandomCourse(20).sort((a, b) => a.date.getTime() - b.date.getTime());

export const MOCK_COURSE_CONTENT = generateRandomCourseContent(10).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const MOCK_COURSE = {
    ...MOCK_COURSES[0],
    content: MOCK_COURSE_CONTENT,
};

export const MOCK_TASK = generateRandomTask(1)[0];

export const MOCK_TASKS = generateRandomTask(10).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
