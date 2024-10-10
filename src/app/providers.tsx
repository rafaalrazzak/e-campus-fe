"use client";

import { ScheduleModalProvider } from "@/hooks/contexts";

type Props = {
    children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
    return <ScheduleModalProvider>{children}</ScheduleModalProvider>;
};
