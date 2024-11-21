import { cn } from "@/lib/utils";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

export type InputProps = {
    label?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, leftIcon, rightIcon, ...props }, ref) => {
    const inputId = React.useId();
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-muted-foreground">
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">{leftIcon}</div>}
                <input
                    ref={ref}
                    type={inputType}
                    id={inputId}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        leftIcon && "pl-10",
                        (rightIcon || isPassword) && "pr-10",
                        className
                    )}
                    {...props}
                />
                {rightIcon && !isPassword && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</div>}
                {isPassword && (
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-2 hover:bg-transparent focus:ring-0 focus:ring-offset-0"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOffIcon className="size-4 text-muted-foreground" /> : <EyeIcon className="size-4 text-muted-foreground" />}
                    </button>
                )}
            </div>
        </div>
    );
});

Input.displayName = "Input";

export { Input };
