"use client";

import { Toaster } from "@/components/ui";
import { ScheduleModalProvider } from "@/hooks/contexts";
import { ToastAlertContainer } from "@/lib/toast/client";

type Props = {
    children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
    return (
        <ScheduleModalProvider>
            <Toaster />
            <ToastAlertContainer />
            {children}
        </ScheduleModalProvider>
    );
};
