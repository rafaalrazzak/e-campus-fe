import { DashboardLayout } from "@/components/common/dashboard/layout";
import { WeeklyCalendar } from "./client";
import { MOCK_COURSES } from "@/lib/mocks";

export default function SchedulePage() {
    return (
        <DashboardLayout title="Jadwal Mingguan">
            <WeeklyCalendar events={MOCK_COURSES} />
        </DashboardLayout>
    );
}
