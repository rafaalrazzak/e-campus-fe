import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = {
    label?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, className, ...props }, ref) => {
    return (
        <div className="size-full flex flex-col gap-2">
            {label && <label className="block text-sm font-medium text-muted-foreground">{label}</label>}
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
});
Textarea.displayName = "Textarea";

export { Textarea };