import type { BaseCalendarItem } from "@/components/ui";

import { Calendar, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

type AcademicCalendarProps = {
    events: BaseCalendarItem[];
};

export const AcademicCalendar: React.FC<AcademicCalendarProps> = ({ events }) => {
    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="-m-4 bg-primary p-4 text-primary-foreground">
                <CardTitle className="text-2xl font-bold">Kalender Akademik</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
                <Calendar items={events} />
            </CardContent>
        </Card>
    );
};
