import { Separator } from "@/components/ui";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardLayout({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-lg font-semibold">{title}</h1>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 pb-4">{children}</div>
        </SidebarInset>
    );
}
