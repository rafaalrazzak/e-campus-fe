"use client";

import { ChevronDown } from "lucide-react";

type SelectProps = {
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    value: string;
    placeholder?: string;
};

export const Select: React.FC<SelectProps> = ({ options, onChange, value, placeholder }) => {
    return (
        <div className="relative inline-block w-full">
            <select
                className="block w-full appearance-none rounded-md border border-border bg-background px-4 py-2 pr-8 text-sm leading-tight hover:border-secondary focus:outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                <ChevronDown size={16} />
            </div>
        </div>
    );
};
