import type { ButtonProps } from "@/components/ui";
import type { StoryComponent } from "@/components/ui/story/types";

import { Button } from "@/components/ui";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

import { ArrowRight, Plus } from "lucide-react";

const variantStories: StoryComponent<ButtonProps>[] = [
    {
        title: "Primary Button",
        component: Button,
        props: { children: "Primary Button" },
        code: "<Button>Primary Button</Button>",
    },
    {
        title: "Secondary Button",
        component: Button,
        props: { variant: "secondary", children: "Secondary Button" },
        code: '<Button variant="secondary">Secondary Button</Button>',
    },
    {
        title: "Muted Button",
        component: Button,
        props: { variant: "muted", children: "Muted Button" },
        code: '<Button variant="muted">Muted Button</Button>',
    },
    {
        title: "Success Button",
        component: Button,
        props: { variant: "success", children: "Success Button" },
        code: '<Button variant="success">Success Button</Button>',
    },
    {
        title: "Warning Button",
        component: Button,
        props: { variant: "warning", children: "Warning Button" },
        code: '<Button variant="warning">Warning Button</Button>',
    },
    {
        title: "Destructive Button",
        component: Button,
        props: { variant: "destructive", children: "Destructive Button" },
        code: '<Button variant="destructive">Destructive Button</Button>',
    },
    {
        title: "Dark Button",
        component: Button,
        props: { variant: "dark", children: "Dark Button" },
        code: '<Button variant="dark">Dark Button</Button>',
    },
    {
        title: "Outline Button",
        component: Button,
        props: { variant: "outline", children: "Outline Button" },
        code: '<Button variant="outline">Outline Button</Button>',
    },
    {
        title: "Ghost Button",
        component: Button,
        props: { variant: "ghost", children: "Ghost Button" },
        code: '<Button variant="ghost">Ghost Button</Button>',
    },
    {
        title: "Link Button",
        component: Button,
        props: { variant: "link", children: "Link Button" },
        code: '<Button variant="link">Link Button</Button>',
    },
    {
        title: "Transparent Button",
        component: Button,
        props: { variant: "transparent", children: "Transparent Button" },
        code: '<Button variant="transparent">Transparent Button</Button>',
    },
    {
        title: "Success Outline Button",
        component: Button,
        props: { variant: "success-outline", children: "Success Outline Button" },
        code: '<Button variant="success-outline">Success Outline Button</Button>',
    },
    {
        title: "Destructive Outline Button",
        component: Button,
        props: { variant: "destructive-outline", children: "Destructive Outline Button" },
        code: '<Button variant="destructive-outline">Destructive Outline Button</Button>',
    },
    {
        title: "Warning Outline Button",
        component: Button,
        props: { variant: "warning-outline", children: "Warning Outline Button" },
        code: '<Button variant="warning-outline">Warning Outline Button</Button>',
    },
    {
        title: "Primary Outline Button",
        component: Button,
        props: { variant: "primary-outline", children: "Primary Outline Button" },
        code: '<Button variant="primary-outline">Primary Outline Button</Button>',
    },
    {
        title: "Secondary Outline Button",
        component: Button,
        props: { variant: "secondary-outline", children: "Secondary Outline Button" },
        code: '<Button variant="secondary-outline">Secondary Outline Button</Button>',
    },
    {
        title: "Muted Outline Button",
        component: Button,
        props: { variant: "muted-outline", children: "Muted Outline Button" },
        code: '<Button variant="muted-outline">Muted Outline Button</Button>',
    },
    {
        title: "Dark Outline Button",
        component: Button,
        props: { variant: "dark-outline", children: "Dark Outline Button" },
        code: '<Button variant="dark-outline">Dark Outline Button</Button>',
    },
    {
        title: "Secondary Success Button",
        component: Button,
        props: { variant: "secondary-success", children: "Secondary Success Button" },
        code: '<Button variant="secondary-success">Secondary Success Button</Button>',
    },
    {
        title: "Secondary Destructive Button",
        component: Button,
        props: { variant: "secondary-destructive", children: "Secondary Destructive Button" },
        code: '<Button variant="secondary-destructive">Secondary Destructive Button</Button>',
    },
    {
        title: "Secondary Warning Button",
        component: Button,
        props: { variant: "secondary-warning", children: "Secondary Warning Button" },
        code: '<Button variant="secondary-warning">Secondary Warning Button</Button>',
    },
    {
        title: "Secondary Muted Button",
        component: Button,
        props: { variant: "secondary-muted", children: "Secondary Muted Button" },
        code: '<Button variant="secondary-muted">Secondary Muted Button</Button>',
    },
    {
        title: "Secondary Dark Button",
        component: Button,
        props: { variant: "secondary-dark", children: "Secondary Dark Button" },
        code: '<Button variant="secondary-dark">Secondary Dark Button</Button>',
    },
    {
        title: "Secondary Primary Button",
        component: Button,
        props: { variant: "secondary-primary", children: "Secondary Primary Button" },
        code: '<Button variant="secondary-primary">Secondary Primary Button</Button>',
    },
];

const sizeStories: StoryComponent<ButtonProps>[] = [
    {
        title: "Default Size",
        component: Button,
        props: { children: "Default Size" },
        code: "<Button>Default Size</Button>",
    },
    {
        title: "Small Button",
        component: Button,
        props: { size: "sm", children: "Small Button" },
        code: '<Button size="sm">Small Button</Button>',
    },
    {
        title: "Large Button",
        component: Button,
        props: { size: "lg", children: "Large Button" },
        code: '<Button size="lg">Large Button</Button>',
    },
];

const utilityStories: StoryComponent<ButtonProps>[] = [
    {
        title: "Rounded Full",
        component: Button,
        props: { rounded: "full", children: "Rounded Full" },
        code: '<Button rounded="full">Rounded Full</Button>',
    },
    {
        title: "No Rounded",
        component: Button,
        props: { rounded: "none", children: "No Rounded" },
        code: '<Button rounded="none">No Rounded</Button>',
    },
    {
        title: "No Border",
        component: Button,
        props: { border: "none", children: "No Border" },
        code: '<Button border="none">No Border</Button>',
    },
    {
        title: "With Left Icon",
        component: Button,
        props: { leftIcon: <Plus size={16} />, children: "Add Item" },
        code: "<Button leftIcon={<Plus size={16} />}>Add Item</Button>",
    },
    {
        title: "With Right Icon",
        component: Button,
        props: { rightIcon: <ArrowRight size={16} />, children: "Next" },
        code: "<Button rightIcon={<ArrowRight size={16} />}>Next</Button>",
    },
    {
        title: "Disabled Button",
        component: Button,
        props: { disabled: true, children: "Disabled Button" },
        code: "<Button disabled>Disabled Button</Button>",
    },
    {
        title: "Link Button",
        component: Button,
        props: { asLink: true, href: "https://example.com", target: "_blank", children: "External Link" },
        code: '<Button asLink href="https://example.com" target="_blank">External Link</Button>',
    },
];

const ButtonShowcase: React.FC<{ stories: StoryComponent<ButtonProps>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

const ButtonDesings: React.FC = () => (
    <BaseStory
        title="Button Component Showcase"
        tabs={[
            { label: "Variants", content: <ButtonShowcase stories={variantStories} /> },
            { label: "Sizes", content: <ButtonShowcase stories={sizeStories} /> },
            { label: "Utilities", content: <ButtonShowcase stories={utilityStories} /> },
        ]}
    />
);

export { ButtonDesings };
