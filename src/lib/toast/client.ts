"use client";

import type { toastVariants } from "@/components/ui";
import type { VariantProps } from "class-variance-authority";

import { Cookies } from "@/constants";
import { toast } from "@/hooks/use-toast";

import "client-only";

import { useEffect } from "react";

export type ToastOptions = {
    type: VariantProps<typeof toastVariants>["variant"];
    description?: string;
    action?: {
        type: "copy";
        text: string;
    };
};

export function ToastAlertContainer() {
    useEffect(() => {
        const checkAlert = setInterval(() => {
            if (document.visibilityState === "hidden") return;

            if (document.cookie.includes(Cookies.TOAST)) {
                let cookieValue = document.cookie
                    ?.split("; ")
                    .find((row) => row.startsWith(`${Cookies.TOAST}=`))
                    ?.split("=")[1];

                cookieValue = decodeURIComponent(cookieValue ?? "");
                if (!cookieValue) return;

                const messages = JSON.parse(cookieValue) as {
                    message: string;
                    options: ToastOptions;
                    description?: string;
                }[];

                for (const data of messages) {
                    const type = data.options.type;
                    const message = data.message;
                    const description = data.description;

                    toast({
                        variant: type,
                        title: message,
                        description,
                    });
                }

                document.cookie = `${Cookies.TOAST}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
        }, 1000);

        return () => {
            clearInterval(checkAlert);
        };
    }, []);

    return null;
}
