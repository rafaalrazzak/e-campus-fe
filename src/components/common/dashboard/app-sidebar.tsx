"use client";

import * as React from "react";
import { Calendar, GraduationCap, LayoutDashboard, Settings2 } from "lucide-react";

import { NavMain } from "@/components/common/dashboard/nav-main";
import { NavUser } from "@/components/common/dashboard/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { URLS } from "@/constants/urls";
import { Logo } from "../logo";

const data = {
    user: {
        name: "Kita",
        email: "me@kita.blue",
        avatar: "/kita.svg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: URLS.dashboard.base,
            icon: LayoutDashboard,
        },
        {
            title: "Jadwal Kuliah",
            url: URLS.dashboard.schedule,
            icon: Calendar,
            isActive: true,
        },
        {
            title: "Akademik",
            icon: GraduationCap,
            items: [
                {
                    title: "Pembelajaran",
                    url: URLS.dashboard.accademic.courses.base,
                },
                {
                    title: "Tugas",
                    url: "#",
                },
            ],
        },
        {
            title: "Pengaturan",
            url: "#",
            icon: Settings2,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <Logo />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Kita</span>
                                    <span className="truncate text-xs">University</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
