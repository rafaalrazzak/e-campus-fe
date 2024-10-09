export type SectionProps = {
    title: string;
    children: React.ReactNode;
};

export function Section({ title, children }: SectionProps) {
    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
            {children}
        </section>
    );
}
