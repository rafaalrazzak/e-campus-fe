import type { CalendarProps } from "@/components/ui/calendar";
import type { StoryComponent } from "@/components/ui/story/types";

import { Calendar } from "@/components/ui/calendar";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

const calendarStories: StoryComponent<CalendarProps<false>>[] = [
    {
        title: "Calendar with Events",
        component: Calendar,
        props: {
            items: [
                {
                    date: new Date(2024, 9, 15), // Example date (15 October 2024)
                    title: "Math Class",
                },
                {
                    date: new Date(2024, 9, 16),
                    title: "Physics Class",
                },
                {
                    date: new Date(2024, 9, 17),
                    title: "Chemistry Class",
                },
            ],
            isSubject: false,
        },
        code: `<Calendar
    items={[
        { date: new Date(2024, 9, 15), title: "Math Class" },
        { date: new Date(2024, 9, 16), title: "Physics Class" },
        { date: new Date(2024, 9, 17), title: "Chemistry Class" },
    ]}
    isSubject={false}
/>`,
    },
    {
        title: "Calendar without Events",
        component: Calendar,
        props: {
            items: [],
            isSubject: false,
        },
        code: `<Calendar items={[]} isSubject={false} />`,
    },
];

const CalendarShowcase: React.FC<{ stories: StoryComponent<CalendarProps<false>>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

const CalendarDesigns: React.FC = () => <BaseStory title="Calendar Component Showcase" tabs={[{ label: "Default", content: <CalendarShowcase stories={calendarStories} /> }]} />;

export { CalendarDesigns };
