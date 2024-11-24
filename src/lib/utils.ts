import { DOCUMENT_MIME_TYPES } from "@/constants";
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

export const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return [hours && `${hours} jam`, mins && `${mins} menit`].filter(Boolean).join(" ");
};

export const getDayName = (date: Date) => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[date.getDay()] || "Tidak Diketahui";
};

export const getTimeRange = (start: Date, duration: number) => {
    const end = new Date(start.getTime() + duration * 60000);
    return `${dateFormat(start, "HH:mm")} - ${dateFormat(end, "HH:mm")}`;
};

export const getFileExtension = (mimeType: string): string => {
    const mimeToExtension: Record<string, string> = {
        [DOCUMENT_MIME_TYPES.PDF]: ".pdf",
        [DOCUMENT_MIME_TYPES.DOC]: ".doc",
        [DOCUMENT_MIME_TYPES.DOCX]: ".docx",
        [DOCUMENT_MIME_TYPES.PPT]: ".ppt",
        [DOCUMENT_MIME_TYPES.PPTX]: ".pptx",
        [DOCUMENT_MIME_TYPES.XLS]: ".xls",
        [DOCUMENT_MIME_TYPES.XLSX]: ".xlsx",
        [DOCUMENT_MIME_TYPES.JPEG]: ".jpg",
        [DOCUMENT_MIME_TYPES.PNG]: ".png",
        [DOCUMENT_MIME_TYPES.SVG]: ".svg",
    };
    return mimeToExtension[mimeType] || "";
};
