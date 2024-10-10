"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";

import { createContext, useCallback, useContext, useState } from "react";

type ScheduleModalContextType = {
    showScheduleModal: boolean;
    setShowScheduleModal: Dispatch<SetStateAction<boolean>>;
    toggleScheduleModal: () => void;
};

const ScheduleModalContext = createContext<ScheduleModalContextType | undefined>(undefined);

export const ScheduleModalProvider = ({ children }: { children: ReactNode }) => {
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    const toggleScheduleModal = useCallback(() => {
        setShowScheduleModal((prev) => !prev);
    }, []);

    return (
        <ScheduleModalContext.Provider
            value={{
                showScheduleModal,
                setShowScheduleModal,
                toggleScheduleModal,
            }}
        >
            {children}
        </ScheduleModalContext.Provider>
    );
};

export const useScheduleModalContext = (): ScheduleModalContextType => {
    const context = useContext(ScheduleModalContext);
    if (!context) {
        throw new Error("useScheduleModalContext must be used within a ScheduleModalProvider");
    }
    return context;
};
