"use client";

import { ChevronDown } from "lucide-react";

type Option = {
    value: string;
    label: string;
};

export type SelectProps = {
    options: Option[];
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
};

export const Select: React.FC<SelectProps> = ({ options, onChange, value, placeholder }) => {
    return (
        <div className="relative inline-block w-full">
            <select
                className="block w-full appearance-none rounded-md border border-border bg-background px-4 py-2 pr-8 text-sm leading-tight focus:border-secondary focus:outline-none"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        </div>
    );
};
