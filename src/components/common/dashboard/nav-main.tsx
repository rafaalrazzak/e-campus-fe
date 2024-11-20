"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        icon: LucideIcon;
        url?: string;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    const pathname = usePathname();

    const isActiveRoute = (url?: string) => {
        if (!url) return false;
        // Exact match for root path
        if (url === "/" && pathname === "/") return true;
        // Check if current path starts with the item's URL (for nested routes)
        if (url !== "/") return pathname.startsWith(url);
        return false;
    };

    const hasActiveChild = (items?: { url: string }[]) => {
        return items?.some((item) => isActiveRoute(item.url)) ?? false;
    };

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = isActiveRoute(item.url) || hasActiveChild(item.items);

                    return (
                        <Collapsible key={item.title} asChild defaultOpen={isActive}>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={item.title} className={cn(isActive && "bg-primary/5 text-primary font-semibold")}>
                                    <a href={item.url}>
                                        <item.icon className={cn("w-4 h-4", isActive && "text-current")} />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                <ChevronRight className="w-4 h-4" />
                                                <span className="sr-only">Toggle</span>
                                            </SidebarMenuAction>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => {
                                                    const isSubItemActive = isActiveRoute(subItem.url);

                                                    return (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton asChild className={cn(isSubItemActive && "bg-primary text-primary-foreground")}>
                                                                <a href={subItem.url}>
                                                                    <span>{subItem.title}</span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </>
                                ) : null}
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
