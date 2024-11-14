export interface FilterOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

export interface FilterSetting {
    id: string;
    label: string;
    type: "select" | "radio" | "switch" | "button";
    description?: string;
    options?: FilterOption[];
}
