import type { SubjectCardProps } from "@/components/common";

import { TransportationClient } from "@/app/dashboard/transportation-client";
import { Hero, SubjectCard } from "@/components/common";
import { Button } from "@/components/ui";
import { formatDate } from "@/lib/utils";

import { CalendarDaysIcon } from "lucide-react";

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
        linkCourse: "/academic/learn/web-development",
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
        linkCourse: "/academic/learn/database-systems",
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
        linkCourse: "/academic/learn/artificial-intelligence",
    },
];

export default function Page() {
    return (
        <>
            <Hero className="items-start gap-8 text-start" onlyImage>
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-primary">Jadwal Hari Ini</h1>
                        <p className="text-lg">{formatDate(new Date())}</p>
                    </div>
                    <Button variant="secondary-primary" leftIcon={<CalendarDaysIcon size={16} />}>
                        Lihat Semua Jadwal
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((subject, index) => (
                        <SubjectCard key={index} {...subject} />
                    ))}
                </div>
            </Hero>

            <main className="container mx-auto px-4">
                <TransportationClient />
            </main>
        </>
    );
}
