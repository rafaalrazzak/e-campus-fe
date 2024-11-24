import Modals from "@/app/(user)/dashboard/modals";
import { SeeScheduleClient } from "@/app/(user)/dashboard/see-schedule-client";
import { TransportationClient } from "@/app/(user)/dashboard/transportation-client";
import { Hero, Section, SubjectCard } from "@/components/common";
import { CourseCard } from "@/components/common/course";
import { Button } from "@/components/ui";
import { URLS } from "@/constants/urls";

import { BookOpen, CalendarDaysIcon } from "lucide-react";
import { DashboardLayout } from "@/components/common/dashboard/layout";
import { generateRandomCourse } from "@/lib/mocks";

export default function Page() {
    return (
        <DashboardLayout title="Dashboard">
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
                        {generateRandomCourse(3).map((subject, index) => (
                            <SubjectCard key={index} {...subject} />
                        ))}
                    </div>
                </Hero>

                <main className="container flex flex-col gap-8 p-4">
                    <TransportationClient />

                    <Section
                        title="Mata Kuliah"
                        button={
                            <Button asLink href={URLS.dashboard.accademic.courses.base} size="sm" variant="secondary-primary" leftIcon={<BookOpen size={16} />}>
                                Lihat Mata Kuliah
                            </Button>
                        }
                    >
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {generateRandomCourse(3).map((subject, index) => (
                                <CourseCard key={index} {...subject} />
                            ))}
                        </div>
                    </Section>
                </main>
            </Modals>
        </DashboardLayout>
    );
}
