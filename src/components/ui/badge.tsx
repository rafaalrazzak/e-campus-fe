import { cn } from "@/lib/utils";

import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "border-foreground text-foreground",
            muted: "bg-muted text-muted-foreground",
            success: "bg-success text-success-foreground",
            warning: "bg-warning text-warning-foreground",
            dark: "bg-dark text-dark-foreground",

            // Outline variants
            "success-outline": "border-success text-success",
            "destructive-outline": "border-destructive text-destructive",
            "warning-outline": "border-warning text-warning",
            "primary-outline": "border-primary text-primary",
            "secondary-outline": "border-secondary text-secondary",
            "muted-outline": "border-muted text-muted",
            "dark-outline": "border-dark text-dark",

            // Secondary status variants (background is secondary, text reflects status)
            "secondary-success": "bg-secondary text-success",
            "secondary-destructive": "bg-secondary text-destructive",
            "secondary-warning": "bg-secondary text-warning",
            "secondary-muted": "bg-secondary text-muted",
            "secondary-dark": "bg-secondary text-dark",
            "secondary-primary": "bg-secondary text-primary",
        },
        size: {
            default: "h-10 px-2.5 py-0.5 text-xs",
            sm: "h-8 px-2 py-0.5 text-xs",
            lg: "h-11 px-3 py-1 text-sm",
            none: "size-auto p-0 text-xs",
            fit: "size-fit px-4 py-2 text-xs",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});

export type BadgeProps = {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof badgeVariants>;

function Badge({ className, variant, size, leftIcon, rightIcon, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
            <span className="flex items-center gap-1">
                {leftIcon && <span>{leftIcon}</span>}
                {props.children}
                {rightIcon && <span>{rightIcon}</span>}
            </span>
        </div>
    );
}

export { Badge, badgeVariants };
