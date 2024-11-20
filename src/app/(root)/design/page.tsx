import { AccordionDesigns } from "@/components/ui/story/accourdion";
import { AvatarDesigns } from "@/components/ui/story/avatar.story";
import { BadgeDesigns } from "@/components/ui/story/badge.story";
import { ButtonDesings } from "@/components/ui/story/button.story";
import { CalendarDesigns } from "@/components/ui/story/calendar.story";
import { CardDesigns } from "@/components/ui/story/card.story";
import { CodeHighlighterDesigns } from "@/components/ui/story/code-hightlighter.story";
import { InputDesigns } from "@/components/ui/story/input.story";
import { ModalDesigns } from "@/components/ui/story/modal.story";
import { SelectDesigns } from "@/components/ui/story/select.story";
import { TabsDesigns } from "@/components/ui/story/tabs.story";

const DesignPage: React.FC = () => (
    <div className="container my-8 flex flex-col gap-8 px-4">
        <AccordionDesigns />
        <AvatarDesigns />
        <BadgeDesigns />
        <ButtonDesings />
        <CalendarDesigns />
        <CardDesigns />
        <CodeHighlighterDesigns />
        <InputDesigns />
        <ModalDesigns />
        <SelectDesigns />
        <TabsDesigns />
    </div>
);

export default DesignPage;
