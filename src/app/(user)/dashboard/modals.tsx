"use client";

import { useScheduleModal } from "@/components/modals";

export default function Modals({ children }: { children: React.ReactNode }) {
    const { ScheduleModal } = useScheduleModal();
    return (
        <>
            <ScheduleModal />
            {children}
        </>
    );
}
