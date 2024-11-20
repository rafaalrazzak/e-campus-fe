import { URLS } from "@/constants/urls";
import { CourseAttendance, Course, CourseStatus, CourseContent, CourseContentType } from "@/types/course";
import { faker } from "@faker-js/faker";
import { addDays } from "date-fns";

export const generateRandomCourse = (count: number): Course[] =>
    Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        date: faker.date.between({
            from: new Date(),
            to: addDays(new Date(), 7),
        }),
        subjectName: faker.helpers.arrayElement(["Computer Science", "Mathematics", "Physics", "English"]),
        code: faker.helpers.arrayElement(["CS101", "MATH202", "PHYS303", "ENG404"]),
        topic: faker.helpers.arrayElement(["Introduction to Programming", "Calculus", "Quantum Physics", "English Literature"]),
        room: faker.helpers.arrayElement(["Lecture Hall A", "Lecture Hall B", "Lecture Hall C"]),
        instructor: faker.person.fullName(),
        duration: faker.helpers.arrayElement([60, 90, 120]),
        status: faker.helpers.enumValue(CourseStatus),
        attendance: faker.helpers.enumValue(CourseAttendance),
        participants: faker.number.int({
            min: 10,
            max: 99,
        }),
        linkCourse: URLS.dashboard.accademic.courses.detail(faker.lorem.slug()),
        progress: faker.number.int({
            min: 0,
            max: 100,
        }),
    }));

export const generateRandomCourseContent = (count: number): CourseContent[] =>
    Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        type: faker.helpers.enumValue(CourseContentType),
        category: faker.helpers.arrayElement(["Homework", "Quiz", "Assignment", "Project"]),
        done: faker.datatype.boolean(),
        date: faker.date.recent().toISOString(),
        dueTime: faker.datatype.boolean() ? faker.date.recent() : undefined,
        openTime: faker.datatype.boolean() ? faker.date.recent() : undefined,
    }));

export const MOCK_COURSES: Course[] = generateRandomCourse(20).sort((a, b) => a.date.getTime() - b.date.getTime());
export const MOCK_COURSE_CONTENT: CourseContent[] = generateRandomCourseContent(10).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const MOCK_COURSE = {
    ...MOCK_COURSES[0],
    content: MOCK_COURSE_CONTENT,
};
