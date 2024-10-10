"use client";

import type { Dispatch, SetStateAction } from "react";

import { Calendar, Modal } from "@/components/ui";
import { useScheduleModalContext } from "@/hooks/contexts";

import { useCallback, useMemo } from "react";

type ScheduleModalProps = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

export function ScheduleModal({ showModal, setShowModal }: ScheduleModalProps) {
    return (
        <Modal showModal={showModal} setShowModal={setShowModal} className="max-w-screen-lg" title="Jadwal Perkuliahan">
            <div className="grid max-h-[95vh] w-full gap-6 overflow-auto p-4">
                <Calendar />
            </div>
        </Modal>
    );
}

export function useScheduleModal() {
    const { showScheduleModal, setShowScheduleModal, toggleScheduleModal } = useScheduleModalContext();

    const MemoizedScheduleModal = useCallback(() => <ScheduleModal showModal={showScheduleModal} setShowModal={setShowScheduleModal} />, [showScheduleModal, setShowScheduleModal]);

    return useMemo(
        () => ({
            showScheduleModal,
            setShowScheduleModal,
            handleToggleScheduleModal: toggleScheduleModal,
            ScheduleModal: MemoizedScheduleModal,
        }),
        [showScheduleModal, setShowScheduleModal, toggleScheduleModal, MemoizedScheduleModal]
    );
}
