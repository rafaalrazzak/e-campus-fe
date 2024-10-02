import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'About' },
  { href: '#', label: 'Services' },
  { href: '#', label: 'Contact' },
];

const NavLink: React.FC<NavLink> = ({ href, label }) => (
  <Link
    href={href}
    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
    prefetch={false}
  >
    {label}
  </Link>
);

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Link href="#" className={`flex items-center ${className}`} prefetch={false}>
    <Image src="/logo.svg" alt="Acme Inc" width={32} height={32} />
    <span className="sr-only">Acme Inc</span>
  </Link>
);

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const Navbar: React.FC = () => {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b border-border sticky top-0 bg-white z-50">
      <div className="flex items-center lg:hidden w-full justify-between">
        <Logo />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className='w-full'>
            <nav className="grid gap-2 py-6">
              {navLinks.map((link) => (
                <NavLink key={link.label} {...link} />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <Logo className="hidden lg:flex" />
      <nav className="ml-auto hidden lg:flex gap-6 w-full">
        {navLinks.map((link) => (
          <NavLink key={link.label} {...link} />
        ))}
      </nav>
    </header>
  );
};