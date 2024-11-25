import { DashboardLayout } from "@/components/common/dashboard/layout";
import { TaskManagement } from "./client";
import { Suspense } from "react";

export default async function Page() {
    return (
        <DashboardLayout title="Tugas">
            <Suspense>
                <TaskManagement />
            </Suspense>
        </DashboardLayout>
    );
}
