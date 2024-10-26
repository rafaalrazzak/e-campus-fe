import type { ToastOptions } from "@/lib/toast/client";

import { Cookies } from "@/constants";

import { cookies } from "next/headers";

import "server-only";

export async function serverToast(message: string, options: ToastOptions) {
    let alerts: string[] = [];

    const cookiesStore = await cookies();

    const previousAlertCookie = cookiesStore.get(Cookies.TOAST);

    if (previousAlertCookie) {
        alerts = JSON.parse(previousAlertCookie.value);
    }

    cookiesStore.set({
        name: Cookies.TOAST,
        httpOnly: false,
        value: JSON.stringify([
            ...alerts,
            {
                message,
                description: options.description,
                options,
            },
        ]),
    });
}

serverToast.success = (message: string, options?: Omit<ToastOptions, "type">) => serverToast(message, { ...options, type: "success" });
serverToast.error = (message: string, options?: Omit<ToastOptions, "type">) => serverToast(message, { ...options, type: "destructive" });
serverToast.info = (message: string, options?: Omit<ToastOptions, "type">) => serverToast(message, { ...options, type: "primary" });
serverToast.warning = (message: string, options?: Omit<ToastOptions, "type">) => serverToast(message, { ...options, type: "warning" });
