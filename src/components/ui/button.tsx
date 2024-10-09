"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted text-muted-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        dark: "bg-dark text-dark-foreground",
        outline:
          "border border-border bg-background hover:bg-primary hover:text-primary-foreground",
        ghost: "hover:bg-primary hover:text-primary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        transparent: "hover:bg-primary/10",
        "success-outline": "border-success text-success",
        "destructive-outline": "border-destructive text-destructive",
        "warning-outline": "border-warning text-warning",
        "primary-outline": "border-primary text-primary",
        "secondary-outline": "border-secondary text-secondary",
        "muted-outline": "border-muted text-muted",
        "dark-outline": "border-dark text-dark",
        "secondary-success": "bg-secondary text-success",
        "secondary-destructive": "bg-secondary text-destructive",
        "secondary-warning": "bg-secondary text-warning",
        "secondary-muted": "bg-secondary text-muted",
        "secondary-dark": "bg-secondary text-dark",
        "secondary-primary": "bg-secondary text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        none: "h-auto",
        full: "w-full px-4 py-2",
        fit: "w-fit px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & (
    | {
        asLink?: false;
        href?: never;
        target?: never;
        disabled?: boolean;
        formAction?: (formData: FormData) => void;
      }
    | {
        asLink: true;
        href: string;
        target?: "_blank" | "_self" | "_parent" | "_top";
        type?: never;
        disabled?: never;
        formAction?: never;
        textToCopy?: never;
        onClick?: (
          event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ) => void;
      }
  );

type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href"> &
  Partial<Pick<LinkProps, "href">>;

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      asLink = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? motion(Slot) : asLink ? motion(Link) : motion.button;

    const baseClasses = cn(
      buttonVariants({ variant, size, className }),
      "overflow-hidden relative",
    );

    return (
      <Comp
        // @ts-ignore - `asChild` is not a valid prop for `motion`
        ref={ref}
        whileHover={{ scale: 0.98, opacity: 0.9 }}
        type={asLink ? undefined : "button"}
        className={baseClasses}
        whileTap={{ scale: 0.95, opacity: 0.6 }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-1">
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </span>
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
