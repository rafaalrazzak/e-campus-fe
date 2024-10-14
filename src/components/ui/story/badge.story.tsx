"use client";

import type { BadgeProps } from "@/components/ui";
import type { StoryComponent } from "@/components/ui/story/types";

import { Badge } from "@/components/ui";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

import { ArrowRight, Plus } from "lucide-react";

// Variant stories for Badge component
const variantStories: StoryComponent<BadgeProps>[] = [
    {
        title: "Primary Badge",
        component: Badge,
        props: { children: "Primary Badge" },
        code: "<Badge>Primary Badge</Badge>",
    },
    {
        title: "Secondary Badge",
        component: Badge,
        props: { variant: "secondary", children: "Secondary Badge" },
        code: '<Badge variant="secondary">Secondary Badge</Badge>',
    },
    {
        title: "Muted Badge",
        component: Badge,
        props: { variant: "muted", children: "Muted Badge" },
        code: '<Badge variant="muted">Muted Badge</Badge>',
    },
    {
        title: "Success Badge",
        component: Badge,
        props: { variant: "success", children: "Success Badge" },
        code: '<Badge variant="success">Success Badge</Badge>',
    },
    {
        title: "Warning Badge",
        component: Badge,
        props: { variant: "warning", children: "Warning Badge" },
        code: '<Badge variant="warning">Warning Badge</Badge>',
    },
    {
        title: "Destructive Badge",
        component: Badge,
        props: { variant: "destructive", children: "Destructive Badge" },
        code: '<Badge variant="destructive">Destructive Badge</Badge>',
    },
    {
        title: "Dark Badge",
        component: Badge,
        props: { variant: "dark", children: "Dark Badge" },
        code: '<Badge variant="dark">Dark Badge</Badge>',
    },
    {
        title: "Outline Badge",
        component: Badge,
        props: { variant: "outline", children: "Outline Badge" },
        code: '<Badge variant="outline">Outline Badge</Badge>',
    },
    {
        title: "Success Outline Badge",
        component: Badge,
        props: { variant: "success-outline", children: "Success Outline Badge" },
        code: '<Badge variant="success-outline">Success Outline Badge</Badge>',
    },
    {
        title: "Destructive Outline Badge",
        component: Badge,
        props: { variant: "destructive-outline", children: "Destructive Outline Badge" },
        code: '<Badge variant="destructive-outline">Destructive Outline Badge</Badge>',
    },
    {
        title: "Warning Outline Badge",
        component: Badge,
        props: { variant: "warning-outline", children: "Warning Outline Badge" },
        code: '<Badge variant="warning-outline">Warning Outline Badge</Badge>',
    },
    {
        title: "Primary Outline Badge",
        component: Badge,
        props: { variant: "primary-outline", children: "Primary Outline Badge" },
        code: '<Badge variant="primary-outline">Primary Outline Badge</Badge>',
    },
    {
        title: "Secondary Outline Badge",
        component: Badge,
        props: { variant: "secondary-outline", children: "Secondary Outline Badge" },
        code: '<Badge variant="secondary-outline">Secondary Outline Badge</Badge>',
    },
    {
        title: "Muted Outline Badge",
        component: Badge,
        props: { variant: "muted-outline", children: "Muted Outline Badge" },
        code: '<Badge variant="muted-outline">Muted Outline Badge</Badge>',
    },
    {
        title: "Dark Outline Badge",
        component: Badge,
        props: { variant: "dark-outline", children: "Dark Outline Badge" },
        code: '<Badge variant="dark-outline">Dark Outline Badge</Badge>',
    },
    {
        title: "Secondary Success Badge",
        component: Badge,
        props: { variant: "secondary-success", children: "Secondary Success Badge" },
        code: '<Badge variant="secondary-success">Secondary Success Badge</Badge>',
    },
    {
        title: "Secondary Destructive Badge",
        component: Badge,
        props: { variant: "secondary-destructive", children: "Secondary Destructive Badge" },
        code: '<Badge variant="secondary-destructive">Secondary Destructive Badge</Badge>',
    },
    {
        title: "Secondary Warning Badge",
        component: Badge,
        props: { variant: "secondary-warning", children: "Secondary Warning Badge" },
        code: '<Badge variant="secondary-warning">Secondary Warning Badge</Badge>',
    },
    {
        title: "Secondary Muted Badge",
        component: Badge,
        props: { variant: "secondary-muted", children: "Secondary Muted Badge" },
        code: '<Badge variant="secondary-muted">Secondary Muted Badge</Badge>',
    },
    {
        title: "Secondary Dark Badge",
        component: Badge,
        props: { variant: "secondary-dark", children: "Secondary Dark Badge" },
        code: '<Badge variant="secondary-dark">Secondary Dark Badge</Badge>',
    },
    {
        title: "Secondary Primary Badge",
        component: Badge,
        props: { variant: "secondary-primary", children: "Secondary Primary Badge" },
        code: '<Badge variant="secondary-primary">Secondary Primary Badge</Badge>',
    },
];

// Size stories for Badge component
const sizeStories: StoryComponent<BadgeProps>[] = [
    {
        title: "Default Size",
        component: Badge,
        props: { children: "Default Size" },
        code: "<Badge>Default Size</Badge>",
    },
    {
        title: "Small Badge",
        component: Badge,
        props: { size: "sm", children: "Small Badge" },
        code: '<Badge size="sm">Small Badge</Badge>',
    },
    {
        title: "Large Badge",
        component: Badge,
        props: { size: "lg", children: "Large Badge" },
        code: '<Badge size="lg">Large Badge</Badge>',
    },
];

// Utility stories for Badge component
const utilityStories: StoryComponent<BadgeProps>[] = [
    {
        title: "With Left Icon",
        component: Badge,
        props: { leftIcon: <Plus size={16} />, children: "Add Item" },
        code: "<Badge leftIcon={<Plus size={16} />}>Add Item</Badge>",
    },
    {
        title: "With Right Icon",
        component: Badge,
        props: { rightIcon: <ArrowRight size={16} />, children: "Next" },
        code: "<Badge rightIcon={<ArrowRight size={16} />}>Next</Badge>",
    },
    {
        title: "Disabled Badge",
        component: Badge,
        props: { children: "Disabled Badge" },
        code: "<Badge disabled>Disabled Badge</Badge>",
    },
];

// Showcase component to display stories
const BadgeShowcase: React.FC<{ stories: StoryComponent<BadgeProps>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

// Main component to organize stories into tabs
const BadgeDesigns: React.FC = () => (
    <BaseStory
        title="Badge Component Showcase"
        tabs={[
            { label: "Variants", content: <BadgeShowcase stories={variantStories} /> },
            { label: "Sizes", content: <BadgeShowcase stories={sizeStories} /> },
            { label: "Utilities", content: <BadgeShowcase stories={utilityStories} /> },
        ]}
    />
);

export { BadgeDesigns };
