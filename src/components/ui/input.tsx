import { cn } from "@/lib/utils";

import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    return (
        <div className="relative w-full">
            {leftIcon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">{leftIcon}</span>}
            <input
                ref={ref}
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    leftIcon ? "pl-10" : "",
                    rightIcon ? "pr-10" : "",
                    className
                )}
                {...props}
            />
            {rightIcon && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</span>}
        </div>
    );
});
Input.displayName = "Input";

export { Input };
