"use client";

import type { StoryComponent } from "@/components/ui/story/types";
import type { HTMLAttributes, RefAttributes } from "react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

const cardStories: StoryComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>[] = [
    {
        title: "Card with Content",
        component: Card,
        props: {
            children: (
                <>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>This is a description of the card.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>This is the main content of the card.</p>
                    </CardContent>
                    <CardFooter>
                        <button>Click Me</button>
                    </CardFooter>
                </>
            ),
        },
        code: `<Card>
    <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card.</CardDescription>
    </CardHeader>
    <CardContent>
        <p>This is the main content of the card.</p>
    </CardContent>
    <CardFooter>
        <button>Click Me</button>
    </CardFooter>
</Card>`,
    },
    {
        title: "Card without Footer",
        component: Card,
        props: {
            children: (
                <>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>This card has no footer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>This is the main content of the card.</p>
                    </CardContent>
                </>
            ),
        },
        code: `<Card>
    <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This card has no footer.</CardDescription>
    </CardHeader>
    <CardContent>
        <p>This is the main content of the card.</p>
    </CardContent>
</Card>`,
    },
];

const CardShowcase: React.FC<{ stories: StoryComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

const CardDesigns: React.FC = () => <BaseStory title="Card Component Showcase" tabs={[{ label: "Default", content: <CardShowcase stories={cardStories} /> }]} />;

export { CardDesigns };
