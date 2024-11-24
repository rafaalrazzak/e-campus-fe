import { ComponentProps } from "react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { Settings2 } from "lucide-react";
import { FilterControl } from "./filter-control";
import { FilterSetting } from "./types";

interface FilterBarProps<T extends Record<string, any>> extends Omit<ComponentProps<"div">, "onChange"> {
    filters: T;
    settings: FilterSetting[];
    onChange: <K extends keyof T>(key: K, value: T[K]) => void;
    variant?: "inline" | "popover";
}

export const FilterBar = <T extends Record<string, any>>({ filters, settings, onChange, variant = "inline", className, ...props }: FilterBarProps<T>) => {
    const content = (
        <div className="space-y-4" {...props}>
            {settings.map((setting) => (
                <FilterControl key={String(setting.id)} setting={setting} value={filters[setting.id]} onChange={(value) => onChange(setting.id, value)} />
            ))}
        </div>
    );

    if (variant === "popover") {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="fit" leftIcon={<Settings2 className="w-4 h-4" />} className="px-4 shrink-0">
                        Pengaturan
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">{content}</PopoverContent>
            </Popover>
        );
    }

    return content;
};
