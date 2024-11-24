import { DashboardLayout } from "@/components/common/dashboard/layout";
import { TaskSubmissionForm } from "./client";

export default function SubmitTaskPage() {
    return (
        <DashboardLayout title="Kirim Tugas" withPadding>
            <TaskSubmissionForm />
        </DashboardLayout>
    );
}
