"use client";

import type { NavLink } from "@/constants/contents";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Button,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    Sheet,
    SheetContent,
    SheetTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui";
import { navLinks } from "@/constants/contents";
import { cn } from "@/lib/utils";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Logo: React.FC = () => (
    <Link href="/" className="flex items-center" prefetch={false}>
        <Image src="/logo.svg" alt="Acme Inc" width={32} height={32} />
        <span className="sr-only">Acme Inc</span>
    </Link>
);

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => (
    <li>
        <NavigationMenuLink asChild>
            <Link
                ref={ref}
                href={props.href!}
                className={cn(
                    "group block select-none space-y-1 rounded-[1rem] p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/80 focus:bg-primary focus:text-primary-foreground",
                    className
                )}
                {...props}
            >
                <h2 className="text-sm font-medium leading-none group-hover:text-white">{title}</h2>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-white/80">{children}</p>
            </Link>
        </NavigationMenuLink>
    </li>
));
ListItem.displayName = "ListItem";

const DesktopNav: React.FC = () => {
    const pathname = usePathname();

    return (
        <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
                {navLinks.map((link) => (
                    <NavigationMenuItem key={link.label}>
                        {link.children ? (
                            <>
                                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {link.children.map((child) => (
                                            <ListItem key={child.label} title={child.label} href={child.href}>
                                                {child.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <Link href={link.href} legacyBehavior passHref>
                                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === link.href && "text-primary")}>{link.label}</NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const MobileNavItem: React.FC<NavLink> = ({ href, label, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <AccordionItem value={label} className="border-none">
            {children ? (
                <>
                    <AccordionTrigger className={cn("text-sm", isActive && "text-primary")}>{label}</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col space-y-2">
                            {children.map((child) => (
                                <Link key={child.label} href={child.href} className={cn("py-2 pl-4 text-sm transition-colors hover:text-primary", pathname === child.href && "text-primary")}>
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </>
            ) : (
                <Link href={href} className={cn("flex h-10 items-center justify-between py-2 text-sm transition-colors hover:text-primary", isActive && "text-primary")}>
                    {label}
                </Link>
            )}
        </AccordionItem>
    );
};

const MobileNav: React.FC = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation menu">
                <Menu className="size-6" />
            </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs p-0">
            <nav className="mt-6 px-4">
                <Accordion type="single" collapsible className="w-full">
                    {navLinks.map((link) => (
                        <MobileNavItem key={link.label} {...link} />
                    ))}
                </Accordion>
            </nav>
            <div className="mt-6 border-t border-border p-4">
                <Button variant="primary" className="w-full">
                    Login
                </Button>
            </div>
        </SheetContent>
    </Sheet>
);

export const Navbar: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 mx-auto w-full border-b border-border bg-background px-4">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Logo />
                <DesktopNav />
                <div className="flex items-center gap-4">
                    <Button variant="primary" className="hidden lg:inline-flex">
                        Login
                    </Button>
                    <MobileNav />
                </div>
            </div>
        </header>
    );
};
