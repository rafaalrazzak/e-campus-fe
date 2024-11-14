import { Tabs, TabsList, TabsTrigger } from "@/components/ui";

export interface FilterOption<T extends string> {
    value: T;
    label: string;
    icon?: React.ReactNode;
}

interface FilterTabsProps<T extends string> {
    value: T;
    options: FilterOption<T>[];
    onChange: (value: T) => void;
}

export const FilterTabs = <T extends string>({ value, options, onChange }: FilterTabsProps<T>) => {
    return (
        <Tabs value={value} onValueChange={(val) => onChange(val as T)}>
            <TabsList>
                {options.map((option) => (
                    <TabsTrigger key={option.value} value={option.value} className="flex items-center gap-2">
                        {option.icon}
                        {option.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};
