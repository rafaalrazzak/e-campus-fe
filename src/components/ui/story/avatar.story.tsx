import type { StoryComponent } from "@/components/ui/story/types";
import type { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

const variantStories: StoryComponent<AvatarProps>[] = [
    {
        title: "Default Avatar",
        component: Avatar,
        props: { children: <AvatarFallback>NA</AvatarFallback> },
        code: "<Avatar><AvatarFallback>NA</AvatarFallback></Avatar>",
    },
    {
        title: "With Image",
        component: Avatar,
        props: { children: <AvatarImage src="https://via.placeholder.com/150" alt="Avatar" /> },
        code: '<Avatar><AvatarImage src="https://via.placeholder.com/150" alt="Avatar" /></Avatar>',
    },
    {
        title: "With Fallback",
        component: Avatar,
        props: {
            children: (
                <>
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback>NA</AvatarFallback>
                </>
            ),
        },
        code: '<Avatar><AvatarImage src="" alt="Avatar" /><AvatarFallback>NA</AvatarFallback></Avatar>',
    },
];

const AvatarShowcase: React.FC<{ stories: StoryComponent<AvatarProps>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

const AvatarDesigns: React.FC = () => <BaseStory title="Avatar Component Showcase" tabs={[{ label: "Default", content: <AvatarShowcase stories={variantStories} /> }]} />;

export { AvatarDesigns };
