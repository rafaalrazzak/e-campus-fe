"use client";

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const ITEMS_TO_DISPLAY = 3;

const generateBreadcrumbs = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean);
    return [
        ...segments.map((segment, index) => ({
            label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
            href: `/${segments.slice(0, index + 1).join("/")}`,
        })),
    ];
};

export function BreadcrumbPath() {
    const [open, setOpen] = useState(false);
    const { device } = useMediaQuery();

    const pathname = usePathname();
    const items = generateBreadcrumbs(pathname);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={items[0].href}>{items[0].label}</BreadcrumbLink>
                    <BreadcrumbSeparator />
                </BreadcrumbItem>

                {items.length > ITEMS_TO_DISPLAY ? (
                    <>
                        <BreadcrumbItem>
                            {device === "desktop" ? (
                                <DropdownMenu open={open} onOpenChange={setOpen}>
                                    <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Toggle menu">
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {items.slice(1, -2).map((item, index) => (
                                            <DropdownMenuItem key={index}>
                                                <Button size="fit" asLink variant={item.href === location.pathname ? "primary" : "transparent"} href={item.href}>
                                                    {item.label}
                                                </Button>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Drawer open={open} onOpenChange={setOpen}>
                                    <DrawerTrigger aria-label="Toggle Menu">
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader className="text-left">
                                            <DrawerTitle>Navigasi</DrawerTitle>
                                            <DrawerDescription>Pilih halaman yang ingin Anda kunjungi</DrawerDescription>
                                        </DrawerHeader>
                                        <div className="grid gap-1 px-4 divide-y divide-border">
                                            {items.slice(1, -2).map((item, index) => (
                                                <Link key={index} href={item.href} className="text-sm p-2">
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                        <DrawerFooter className="pt-4">
                                            <DrawerClose asChild>
                                                <Button variant="outline">Tutup</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            )}
                            <BreadcrumbSeparator />
                        </BreadcrumbItem>
                    </>
                ) : null}

                {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {index === items.slice(-ITEMS_TO_DISPLAY + 1).length - 1 ? (
                            <BreadcrumbPage className="max-w-20 truncate md:max-w-none">{item.label}</BreadcrumbPage>
                        ) : (
                            <>
                                <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
                                    <Button asLink size="xs" variant="transparent" href={item.href}>
                                        {item.label}
                                    </Button>
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
