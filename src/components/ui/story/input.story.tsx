"use client";

import type { InputProps } from "@/components/ui";
import type { StoryComponent } from "@/components/ui/story/types";

import { Input } from "@/components/ui";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

import { Search, User } from "lucide-react";

const inputStories: StoryComponent<InputProps>[] = [
    {
        title: "Default Input",
        component: Input,
        props: {
            placeholder: "Enter text...",
        },
        code: `<Input placeholder="Enter text..." />`,
    },
    {
        title: "Input with Left Icon",
        component: Input,
        props: {
            placeholder: "Username",
            leftIcon: <User />,
        },
        code: `<Input placeholder="Username" leftIcon={<User />} />`,
    },
    {
        title: "Input with Right Icon",
        component: Input,
        props: {
            placeholder: "Search...",
            rightIcon: <Search />,
        },
        code: `<Input placeholder="Search..." rightIcon={<Search />} />`,
    },
    {
        title: "Input with Both Icons",
        component: Input,
        props: {
            placeholder: "Search username...",
            leftIcon: <User />,
            rightIcon: <Search />,
        },
        code: `<Input placeholder="Search username..." leftIcon={<FiUser />} rightIcon={<FiSearch />} />`,
    },
];

const InputShowcase: React.FC<{ stories: StoryComponent<InputProps>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

const InputDesigns: React.FC = () => <BaseStory title="Input Component Showcase" tabs={[{ label: "Default", content: <InputShowcase stories={inputStories} /> }]} />;

export { InputDesigns };
