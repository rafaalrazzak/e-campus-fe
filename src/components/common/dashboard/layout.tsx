import { Separator } from "@/components/ui";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function DashboardLayout({ title, children, withPadding }: { title: string; children: React.ReactNode; withPadding?: boolean }) {
    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-lg font-semibold line-clamp-1">{title}</h1>
                </div>
            </header>
            <div
                className={cn("flex flex-1 flex-col gap-4 pb-4", {
                    "p-4": withPadding,
                })}
            >
                {children}
            </div>
        </SidebarInset>
    );
}
