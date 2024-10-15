"use client";

import type { SelectProps } from "@/components/ui";
import type { StoryComponent } from "@/components/ui/story/types";

import { Select } from "@/components/ui";
import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";

import React, { useState } from "react";

const SelectStory: React.FC<SelectProps> = ({ value, ...props }) => {
    const [selectedOption, setSelectedOption] = useState(value || "");

    return (
        <div className="flex flex-col items-start gap-4">
            <Select {...props} value={selectedOption} onChange={setSelectedOption} />
            <p>Selected: {selectedOption || "None"}</p>
        </div>
    );
};

const selectStories: StoryComponent<SelectProps>[] = [
    {
        title: "Default Select",
        component: SelectStory,
        props: {
            options: [
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
            ],
            value: "",
            placeholder: "Select an option",
        },
        code: `
<Select
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]}
  value={selectedOption}
  onChange={setSelectedOption}
  placeholder="Select an option"
/>`,
    },
    {
        title: "With Pre-selected Option",
        component: SelectStory,
        props: {
            options: [
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
            ],
            value: "option1",
            placeholder: "Select an option",
        },
        code: `
<Select
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]}
  value="option1"
  onChange={setSelectedOption}
  placeholder="Select an option"
/>`,
    },
];

const SelectShowcase: React.FC<{ stories: StoryComponent<SelectProps>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

const SelectDesigns: React.FC = () => <BaseStory title="Select Component Showcase" tabs={[{ label: "Default", content: <SelectShowcase stories={selectStories} /> }]} />;

export { SelectDesigns };
