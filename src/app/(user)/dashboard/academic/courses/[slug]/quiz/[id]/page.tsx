import { Quiz } from "@/components/common/quiz";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <div className="container p-4">
            <Quiz />
        </div>
    );
}
