import { AccordionDesigns } from "@/components/ui/story/accourdion";
import { BadgeDesigns } from "@/components/ui/story/badge.story";
import { ButtonDesings } from "@/components/ui/story/button.story";

const DesignPage: React.FC = () => (
    <div className="container mx-auto my-8 flex flex-col gap-8 px-4">
        <AccordionDesigns />
        <ButtonDesings />
        <BadgeDesigns />
    </div>
);

export default DesignPage;
