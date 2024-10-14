import type { StoryComponent } from "@/components/ui/story/types";
import type { AccordionMultipleProps, AccordionSingleProps } from "@radix-ui/react-accordion";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

const accordionStories: StoryComponent<AccordionSingleProps | AccordionMultipleProps>[] = [
    {
        title: "Default Accordion",
        component: Accordion,
        props: {
            type: "single",
            children: (
                <>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>This is the content for Item 1.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>This is the content for Item 2.</AccordionContent>
                    </AccordionItem>
                </>
            ),
        },
        code: `
<Accordion>
    <AccordionItem value="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>This is the content for Item 1.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>This is the content for Item 2.</AccordionContent>
    </AccordionItem>
</Accordion>
`,
    },
    {
        title: "Multiple Items Open",
        component: Accordion,
        props: {
            type: "multiple",
            children: (
                <>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>This is the content for Item 1.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>This is the content for Item 2.</AccordionContent>
                    </AccordionItem>
                </>
            ),
        },
        code: `
<Accordion type="multiple">
    <AccordionItem value="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>This is the content for Item 1.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>This is the content for Item 2.</AccordionContent>
    </AccordionItem>
</Accordion>
`,
    },
    {
        title: "Custom Accordion Styles",
        component: Accordion,
        props: {
            type: "single",
            children: (
                <>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="bg-blue-500 text-white">Custom Item 1</AccordionTrigger>
                        <AccordionContent>This is the content for Custom Item 1.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="bg-green-500 text-white">Custom Item 2</AccordionTrigger>
                        <AccordionContent>This is the content for Custom Item 2.</AccordionContent>
                    </AccordionItem>
                </>
            ),
        },
        code: `
<Accordion>
    <AccordionItem value="item-1">
        <AccordionTrigger className="bg-blue-500 text-white">Custom Item 1</AccordionTrigger>
        <AccordionContent>This is the content for Custom Item 1.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger className="bg-green-500 text-white">Custom Item 2</AccordionTrigger>
        <AccordionContent>This is the content for Custom Item 2.</AccordionContent>
    </AccordionItem>
</Accordion>
`,
    },
];

const AccordionShowcase: React.FC<{ stories: StoryComponent<AccordionSingleProps | AccordionMultipleProps>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

const AccordionDesigns: React.FC = () => <BaseStory title="Accordion Component Showcase" tabs={[{ label: "Default", content: <AccordionShowcase stories={accordionStories} /> }]} />;

export { AccordionDesigns };
