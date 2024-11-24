import { DashboardLayout } from "@/components/common/dashboard/layout";
import { DocViewer } from "@/components/common/doc-viewer";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <DashboardLayout title="Dokumen" withBreadcrumb>
            <DocViewer url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
        </DashboardLayout>
    );
}
