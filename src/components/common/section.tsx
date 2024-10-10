export type SectionProps = {
    title: string;
    children: React.ReactNode;
    button?: React.ReactNode;
};

export function Section({ title, children, button }: SectionProps) {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-2xl font-bold text-primary">{title}</h1>
                {button && button}
            </div>
            {children}
        </section>
    );
}
