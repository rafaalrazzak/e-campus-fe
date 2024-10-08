"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
  description?: string;
  children?: Omit<NavLink, "children">[];
};

const navLinks: NavLink[] = [
  { href: "/", label: "Beranda" },
  {
    href: "/academic",
    label: "Akademik",
    children: [
      {
        href: "/academic/learn",
        label: "Belajar",
        description: "Belajar di kelas dan daring",
      },
      {
        href: "/academic/academic-calendar",
        label: "Kalender Akademik",
        description: "Kalender akademik untuk semester ini",
      },
      {
        href: "/academic/academic-schedule",
        label: "Jadwal Kuliah",
        description: "Jadwal kuliah untuk semester ini",
      },
      {
        href: "/academic/academic-syllabus",
        label: "Silabus",
        description: "Silabus mata kuliah yang diajarkan",
      },
    ],
  },
  {
    href: "/study",
    label: "Prodi",
    children: [
      {
        href: "/study/teknik-informatika",
        label: "Teknik Informatika",
        description: "Program studi Teknik Informatika",
      },
      {
        href: "/study/sistem-informasi",
        label: "Sistem Informasi",
        description: "Program studi Sistem Informasi",
      },
      {
        href: "/study/bisnis-digital",
        label: "Bisnis Digital",
        description: "Program studi Bisnis Digital",
      },
    ],
  },
  {
    href: "/research",
    label: "Riset",
    children: [
      {
        href: "/research/study",
        label: "Penelitian",
        description: "Penelitian yang dilakukan oleh dosen dan mahasiswa",
      },

      {
        href: "/research/devotion",
        label: "Pengabdian Masyarakat",
        description:
          "Pengabdian kepada masyarakat yang dilakukan oleh dosen dan mahasiswa",
      },
    ],
  },
];

const Logo: React.FC = () => (
  <Link href="/" className="flex items-center" prefetch={false}>
    <Image src="/logo.svg" alt="Acme Inc" width={32} height={32} />
    <span className="sr-only">Acme Inc</span>
  </Link>
);

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        className={cn(
          "group block select-none space-y-1 rounded-[1rem] p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/80 focus:bg-primary focus:text-primary-foreground",
          className,
        )}
        href={props.href!}
        {...props}
      >
        <h2 className="text-sm font-medium leading-none group-hover:text-white">
          {title}
        </h2>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-white/80">
          {children}
        </p>
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
                      <ListItem
                        key={child.label}
                        title={child.label}
                        href={child.href}
                      >
                        {child.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === link.href && "text-primary",
                  )}
                >
                  {link.label}
                </NavigationMenuLink>
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
          <AccordionTrigger
            className={cn("text-sm", isActive && "text-primary")}
          >
            {label}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {children.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  className={cn(
                    "py-2 pl-4 text-sm transition-colors hover:text-primary",
                    pathname === child.href && "text-primary",
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </>
      ) : (
        <Link
          href={href}
          className={cn(
            "flex h-10 items-center justify-between py-2 text-sm transition-colors hover:text-primary",
            isActive && "text-primary",
          )}
        >
          {label}
        </Link>
      )}
    </AccordionItem>
  );
};

const MobileNav: React.FC = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden"
        aria-label="Open navigation menu"
      >
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
        <Button variant="primary" className="w-full">
          Login
        </Button>
      </div>
    </SheetContent>
  </Sheet>
);

export const Navbar: React.FC = () => {
  return (
    <header className="container sticky top-0 z-50 mx-auto w-full border-b border-border bg-background px-4">
      <div className="container flex h-16 items-center justify-between">
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
