import { DashboardLayout } from "@/components/common/dashboard/layout";
import { CourseListPage } from "./client";
import { Suspense } from "react";

export default async function Page() {
    return (
        <DashboardLayout title="Mata Kuliah">
            <Suspense>
                <CourseListPage />
            </Suspense>
        </DashboardLayout>
    );
}
