import { AccordionDesigns } from "@/components/ui/story/accourdion";
import { AvatarDesigns } from "@/components/ui/story/avatar.story";
import { BadgeDesigns } from "@/components/ui/story/badge.story";
import { ButtonDesings } from "@/components/ui/story/button.story";
import { CalendarDesigns } from "@/components/ui/story/calendar.story";
import { CardDesigns } from "@/components/ui/story/card.story";

const DesignPage: React.FC = () => (
    <div className="container mx-auto my-8 flex flex-col gap-8 px-4">
        <AccordionDesigns />
        <AvatarDesigns />
        <BadgeDesigns />
        <ButtonDesings />
        <CalendarDesigns />
        <CardDesigns />
    </div>
);

export default DesignPage;
