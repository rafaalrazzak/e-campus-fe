import { QuizClient } from "./client";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <div className="container p-4">
            <QuizClient />;
        </div>
    );
}
