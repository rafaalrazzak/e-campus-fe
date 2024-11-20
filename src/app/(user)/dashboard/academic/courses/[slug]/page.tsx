import { DashboardLayout } from "@/components/common/dashboard/layout";
import { CourseDetail } from "./client";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    return (
        <DashboardLayout title={`Mata Kuliah: ${slug}`}>
            <CourseDetail />
        </DashboardLayout>
    );
}
