"use client";

import type { StoryComponent } from "@/components/ui/story/types";

import { BaseComponentStory, BaseStory } from "@/components/ui/story/base";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TabsExample: React.FC<{ defaultValue?: string }> = ({ defaultValue }) => (
    <Tabs defaultValue={defaultValue || "tab1"} className="w-[400px]">
        <TabsList>
            <TabsTrigger value="tab1">Account</TabsTrigger>
            <TabsTrigger value="tab2">Password</TabsTrigger>
            <TabsTrigger value="tab3">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
            <h3 className="text-lg font-semibold">Account</h3>
            <p>Manage your account settings and preferences.</p>
        </TabsContent>
        <TabsContent value="tab2">
            <h3 className="text-lg font-semibold">Password</h3>
            <p>Change your password and security settings.</p>
        </TabsContent>
        <TabsContent value="tab3">
            <h3 className="text-lg font-semibold">Settings</h3>
            <p>Customize your application settings.</p>
        </TabsContent>
    </Tabs>
);

const tabsStories: StoryComponent<{ defaultValue?: string }>[] = [
    {
        title: "Default Tabs",
        component: TabsExample,
        props: {},
        code: `
<Tabs defaultValue="tab1" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Password</TabsTrigger>
    <TabsTrigger value="tab3">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <h3 className="text-lg font-semibold">Account</h3>
    <p>Manage your account settings and preferences.</p>
  </TabsContent>
  <TabsContent value="tab2">
    <h3 className="text-lg font-semibold">Password</h3>
    <p>Change your password and security settings.</p>
  </TabsContent>
  <TabsContent value="tab3">
    <h3 className="text-lg font-semibold">Settings</h3>
    <p>Customize your application settings.</p>
  </TabsContent>
</Tabs>`,
    },
    {
        title: "Tabs with Different Default Tab",
        component: TabsExample,
        props: { defaultValue: "tab2" },
        code: `
<Tabs defaultValue="tab2" className="w-[400px]">
  {/* Same content as above */}
</Tabs>`,
    },
];

const TabsShowcase: React.FC<{ stories: StoryComponent<{ defaultValue?: string }>[] }> = ({ stories }) => (
    <>
        {stories.map((story, index) => (
            <BaseComponentStory key={index} {...story} />
        ))}
    </>
);

export const TabsDesigns: React.FC = () => <BaseStory title="Tabs Component Showcase" tabs={[{ label: "Default", content: <TabsShowcase stories={tabsStories} /> }]} />;
