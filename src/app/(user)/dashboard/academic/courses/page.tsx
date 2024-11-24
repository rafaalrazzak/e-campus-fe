import { DashboardLayout } from "@/components/common/dashboard/layout";
import { CourseListPage } from "./client";

export default async function Page() {
    return (
        <DashboardLayout title="Mata Kuliah">
            <CourseListPage />
        </DashboardLayout>
    );
}
