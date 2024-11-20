import { Schedule } from "@/types/schedule";
import { faker } from "@faker-js/faker";
import { addDays } from "date-fns";

const generateRandomSchedule = (count: number): Schedule[] =>
    Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        date: faker.date.between({
            from: new Date(),
            to: addDays(new Date(), 7),
        }),
        subjectName: faker.helpers.arrayElement(["CS101", "MATH202", "PHYS303", "ENG404"]),
        room: faker.helpers.arrayElement(["Lecture Hall A", "Lecture Hall B", "Lecture Hall C"]),
        instructor: faker.person.fullName(),
        duration: faker.helpers.arrayElement([60, 90, 120]),
    }));

export const MOCK_SCHEDULE: Schedule[] = generateRandomSchedule(20);
