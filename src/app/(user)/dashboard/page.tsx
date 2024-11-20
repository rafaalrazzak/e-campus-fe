import type { SubjectCardProps } from "@/components/common";

import Modals from "@/app/(user)/dashboard/modals";
import { SeeScheduleClient } from "@/app/(user)/dashboard/see-schedule-client";
import { TransportationClient } from "@/app/(user)/dashboard/transportation-client";
import { Hero, Section, SubjectCard } from "@/components/common";
import { CourseCard } from "@/components/common/course";
import { Button } from "@/components/ui";
import { URLS } from "@/constants/urls";

import { BookOpen, CalendarDaysIcon } from "lucide-react";

const subjects: SubjectCardProps[] = [
    {
        status: "done",
        duration: "90 min",
        attendance: "Hadir",
        timeRange: "09:00 - 10:30",
        subject: "Web Development",
        topic: "Introduction to React",
        instructor: "Dr. Smith",
        room: "Room 101",
        participants: 20,
        linkCourse: URLS.dashboard.accademic.courses.detail("web-development"),
    },
    {
        status: "active",
        duration: "90 min",
        attendance: "Belum Hadir",
        timeRange: "11:00 - 12:30",
        subject: "Database Systems",
        topic: "SQL Fundamentals",
        instructor: "Prof. Ilham Kurniawan Situmorang",
        room: "Room 202",
        participants: 25,
        linkCourse: URLS.dashboard.accademic.courses.detail("database-systems"),
    },
    {
        status: "inactive",
        duration: "90 min",
        attendance: "Belum Hadir",
        timeRange: "14:00 - 15:30",
        subject: "Artificial Intelligence",
        topic: "Machine Learning Basics",
        instructor: "Dr. Lee",
        room: "Room 303",
        participants: 18,
        linkCourse: URLS.dashboard.accademic.courses.detail("artificial-intelligence"),
    },
];

export default function Page() {
    return (
        <Modals>
            <Hero className="items-start gap-8 text-start" onlyImage>
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-primary">Jadwal Kuliah Hari Ini</h1>
                        <SeeScheduleClient />
                    </div>
                    <Button asLink href={URLS.dashboard.schedule} variant="secondary-primary" leftIcon={<CalendarDaysIcon size={16} />}>
                        Lihat Jadwal
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject, index) => (
                        <SubjectCard key={index} {...subject} />
                    ))}
                </div>
            </Hero>

            <main className="container flex flex-col gap-8 px-4">
                <TransportationClient />

                <Section
                    title="Mata Kuliah"
                    button={
                        <Button asLink href={URLS.dashboard.accademic.courses.base} size="sm" variant="secondary-primary" leftIcon={<BookOpen size={16} />}>
                            Lihat Mata Kuliah
                        </Button>
                    }
                >
                    <CourseCard name="Web Development" instructor="Dr. Smith" day={1} timeStart="09:00" duration={120} progress={50} />
                </Section>
            </main>
        </Modals>
    );
}
