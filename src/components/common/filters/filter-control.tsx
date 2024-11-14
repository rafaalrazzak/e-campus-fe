import React from "react";
import { Button, Label, RadioGroup, RadioGroupItem, Select, Switch, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui";
import { HelpCircle } from "lucide-react";
import { FilterSetting } from "./types";

interface FilterLabelProps {
    label: string;
    description?: string;
}

const FilterLabel: React.FC<FilterLabelProps> = ({ label, description }) => (
    <div className="flex items-center gap-2">
        <Label>{label}</Label>
        {description && (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>{description}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )}
    </div>
);

interface FilterControlProps {
    setting: FilterSetting;
    value: any;
    onChange: (value: any) => void;
}

export const FilterControl = ({ setting, value, onChange }: FilterControlProps) => {
    const { type, label, description, options = [] } = setting;

    const renderControl = () => {
        switch (type) {
            case "select":
                return <Select value={value} onChange={onChange} options={options.map((option) => ({ value: option.value, label: option.label }))} />;

            case "radio":
                return (
                    <RadioGroup value={value} onValueChange={onChange}>
                        {options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`${setting.id}-${option.value}`} />
                                <Label htmlFor={`${setting.id}-${option.value}`} className="flex items-center gap-2">
                                    {option.icon}
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            case "switch":
                return (
                    <div className="flex items-center justify-between">
                        <Label>{label}</Label>
                        <Switch checked={value} onCheckedChange={onChange} />
                    </div>
                );

            case "button":
                return (
                    <div className="flex gap-2">
                        {options.map((option) => (
                            <Button key={option.value} variant={value === option.value ? "primary" : "outline"} size="sm" onClick={() => onChange(option.value)} className="flex items-center gap-2">
                                {option.icon}
                                {option.label}
                            </Button>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-2">
            {type !== "switch" && <FilterLabel label={label} description={description} />}
            {renderControl()}
        </div>
    );
};
