import { DashboardLayout } from "@/components/common/dashboard/layout";
import { CourseContent } from "./client";

export default async function Page() {
    return (
        <DashboardLayout title="Mata Kuliah">
            <CourseContent />
        </DashboardLayout>
    );
}
