"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "@/hooks/api/use-session";
import { cn } from "@/lib/utils";
import { navLinks, NavLink } from "@/constants/contents";
import { Bell, LogOut, Menu, Settings } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
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
import { URLS } from "@/constants/urls";

const Logo: React.FC = () => (
    <Link href="/" className="flex items-center" prefetch={false}>
        <Image src="/logo.svg" alt="Acme Inc" width={32} height={32} />
        <span className="sr-only">Acme Inc</span>
    </Link>
);

const UserNavigation: React.FC<{
    isMobile?: boolean;
    className?: string;
}> = ({ isMobile, className }) => {
    const session = useSession();

    if (!session) {
        return (
            <Button asLink href={URLS.login} variant="primary" className={cn("hidden lg:flex w-full", isMobile && "flex lg:hidden")}>
                Login
            </Button>
        );
    }

    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    {session && (
                        <div className="flex gap-2 items-center">
                            <Avatar>
                                <AvatarImage src={session.photo_url} alt={session.name} width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                                <AvatarFallback>
                                    <span>{session.name[0]}</span>
                                </AvatarFallback>
                            </Avatar>

                            {isMobile && <span className="text-sm">{session.name}</span>}
                        </div>
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{session.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{session.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/notifications">
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={(event: Event) => {
                            event.preventDefault(); /* signOut(); */
                        }}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

interface NavItemProps extends NavLink {
    children?: NavLink[];
}

const NavItem: React.FC<NavItemProps> = ({ href, label, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    if (children) {
        return (
            <NavigationMenuItem>
                <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {children.map((child) => (
                            <li key={child.label}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={child.href}
                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                        <div className="text-sm font-medium leading-none">{child.label}</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{child.description}</p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem>
            <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive && "text-primary")}>{label}</NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    );
};

const DesktopNav: React.FC = () => (
    <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
            {navLinks.map((link) => (
                <NavItem key={link.label} {...link} />
            ))}
        </NavigationMenuList>
    </NavigationMenu>
);

const MobileNavItem: React.FC<NavItemProps> = ({ href, label, children }) => {
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
                <Menu className="h-6 w-6" />
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
                <UserNavigation isMobile />
            </div>
        </SheetContent>
    </Sheet>
);

export const Navbar: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Logo />
                <DesktopNav />
                <div className="flex items-center gap-4">
                    <UserNavigation className="hidden lg:flex" />
                    <MobileNav />
                </div>
            </div>
        </header>
    );
};
