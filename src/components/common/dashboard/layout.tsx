"use client";

import { Separator } from "@/components/ui";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BreadcrumbPath } from "../breadcrumb";

export function DashboardLayout({
    title,
    children,
    className,
    withPadding = false,
    withBreadcrumb = false,
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
    withPadding?: boolean;
    withBreadcrumb?: boolean;
}) {
    return (
        <SidebarInset className="max-h-[90vh] flex flex-col">
            <header className={cn("flex shrink-0 border-b", withBreadcrumb ? "h-24" : "h-16")}>
                <div className="flex flex-col justify-center gap-2 px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h1 className="text-lg font-semibold line-clamp-1">{title}</h1>
                    </div>
                    {withBreadcrumb && <BreadcrumbPath />}
                </div>
            </header>

            <ScrollArea className="flex-1">
                <ScrollBar />
                <div className={cn("flex flex-col gap-4", withPadding && "p-4", className)}>{children}</div>
            </ScrollArea>
        </SidebarInset>
    );
}
