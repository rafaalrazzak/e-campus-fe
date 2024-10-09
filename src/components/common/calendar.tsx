import { Calendar, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

type Event = {
    date: Date;
    title: string;
};

type AcademicCalendarProps = {
    events: Event[];
};

export const AcademicCalendar: React.FC<AcademicCalendarProps> = ({ events }) => {
    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="-m-4 bg-primary p-4 text-primary-foreground">
                <CardTitle className="text-2xl font-bold">Kalender Akademik</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
                <Calendar events={events} />
            </CardContent>
        </Card>
    );
};
