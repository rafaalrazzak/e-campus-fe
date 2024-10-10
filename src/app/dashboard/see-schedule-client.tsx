"use client";

import { useScheduleModal } from "@/components/modals";
import { Button } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export function SeeScheduleClient() {
    const { handleToggleScheduleModal } = useScheduleModal();
    return (
        <Button variant="secondary" onClick={handleToggleScheduleModal}>
            <p>{formatDate(new Date())}</p>
        </Button>
    );
}
