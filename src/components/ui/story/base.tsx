"use client";

import { Button } from "@/components/ui/button";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";

// Base Story component
export const BaseStory: React.FC<{
    title: string;
    tabs: { label: string; content: React.ReactNode }[];
}> = ({ title, tabs }) => {
    const [showAll, setShowAll] = useState(false);

    const handleShowAll = useCallback(() => {
        setShowAll((prev) => !prev);
    }, []);

    return (
        <div className="relative flex flex-col gap-6">
            <h1 className="text-3xl font-bold">{title}</h1>

            {/* Tabs Header */}
            <Tabs defaultValue={tabs[0]?.label || "Tab 1"}>
                <TabsList className="mb-4">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.label} value={tab.label}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Tabs Content */}
                <div className={cn("relative rounded-lg border p-6 transition-all duration-300", showAll ? "max-h-full" : "max-h-72 overflow-hidden")}>
                    {tabs.map((tab) => (
                        <TabsContent key={tab.label} value={tab.label}>
                            {tab.content}
                        </TabsContent>
                    ))}

                    {/* Gradient Overlay */}
                    {!showAll && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />}
                </div>
            </Tabs>

            {/* Show/Hide Button */}
            <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleShowAll}
                    rightIcon={
                        <ChevronDown
                            className={cn("size-4 transform transition-transform", {
                                "rotate-180": showAll,
                            })}
                        />
                    }
                >
                    {showAll ? "Hide All" : "Show All"}
                </Button>
            </div>
        </div>
    );
};

type BaseComponentStoryProps<T> = {
    title: string;
    component: React.ComponentType<T>;
    props?: T;
    code: string;
};

export const BaseComponentStory = <T,>({ title, component: Component, props, code }: BaseComponentStoryProps<T>) => (
    <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Tabs defaultValue="preview">
            <TabsList className="flex w-fit gap-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
                <div className="flex w-fit flex-col gap-4">
                    <Component key={title} {...(props as T)} />
                </div>
            </TabsContent>
            <TabsContent value="code">
                <CodeHighlighter title={title} code={code} language="tsx" />
            </TabsContent>
        </Tabs>
    </div>
);
