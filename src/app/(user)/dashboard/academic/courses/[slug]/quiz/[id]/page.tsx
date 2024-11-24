import { DashboardLayout } from "@/components/common/dashboard/layout";
import { Quiz } from "@/components/common/quiz";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <DashboardLayout title="Kuis" withPadding withBreadcrumb>
            <Quiz />
        </DashboardLayout>
    );
}
