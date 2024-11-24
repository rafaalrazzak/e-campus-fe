import { Separator } from "@/components/ui";
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
        <SidebarInset>
            <header className={cn("flex h-16 shrink-0 items-center", withBreadcrumb ? "border-b h-24" : "border-b-0")}>
                <div className="flex flex-col gap-2 px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h1 className="text-lg font-semibold line-clamp-1">{title}</h1>
                    </div>
                    {withBreadcrumb && <BreadcrumbPath />}
                </div>
            </header>

            <div className={cn("flex flex-1 flex-col gap-4", withPadding && "p-4", className)}>{children}</div>
        </SidebarInset>
    );
}
