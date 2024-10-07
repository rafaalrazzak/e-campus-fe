import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from '../ui/calendar';

interface Event {
  date: Date;
  title: string;
}

interface AcademicCalendarProps {
  events: Event[];
}

export const AcademicCalendar: React.FC<AcademicCalendarProps> = ({ events }) => {

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground -m-4 p-4">
        <CardTitle className="text-2xl font-bold">Kalender Akademik</CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <Calendar
          events={events}
        />
      </CardContent>
    </Card>
  );
};
