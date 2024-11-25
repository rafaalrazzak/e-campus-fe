import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { CalendarItem, SubjectCalendar } from "./subject-calendar";

type AcademicCalendarProps = {
    events: CalendarItem[];
};

export const AcademicCalendar: React.FC<AcademicCalendarProps> = ({ events }) => {
    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="-m-4 bg-primary p-4 text-primary-foreground">
                <CardTitle className="text-2xl font-bold">Kalender Akademik</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
                <SubjectCalendar items={events} />
            </CardContent>
        </Card>
    );
};
