import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date, detailed = false) {
    return format(date, detailed ? "iiii, dd MMM yyyy, HH:mm" : "iiii, dd MMMM yyyy", {
        locale: id,
    });
}

export const formatDay = (date: Date) => format(date, "EEEE", { locale: id });

export const formatTime = (date: Date) => format(date, "HH:mm", { locale: id });

export const getDayName = (day: number) => {
    const dayNames = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    return dayNames[day] || "Tidak Diketahui";
};
