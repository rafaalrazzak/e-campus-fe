import { type ClassValue, clsx } from "clsx";
import { format as formatDateFns } from "date-fns";
import { id } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const dateFormat = (date: Date, pattern: string) => formatDateFns(date, pattern, { locale: id });

export const formatDate = (date: Date, detailed = false) => dateFormat(date, detailed ? "iiii, dd MMM yyyy, HH:mm" : "iiii, dd MMMM yyyy");

export const formatDay = (date: Date) => dateFormat(date, "EEEE");

export const formatTime = (date: Date) => dateFormat(date, "HH:mm");

export const getDayName = (day: number) => {
    const days = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    return days[day] || "Tidak Diketahui";
};
