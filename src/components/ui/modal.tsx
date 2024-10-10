"use client";

import type { Dispatch, SetStateAction } from "react";

import { useMediaQuery } from "@/hooks";
import { cn } from "@/lib/utils";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";

type ModalProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
    showModal?: boolean;
    setShowModal?: Dispatch<SetStateAction<boolean>>;
    onClose?: () => void;
    desktopOnly?: boolean;
    preventDefaultClose?: boolean;
};

export function Modal({ title, children, className, showModal = false, setShowModal, onClose, desktopOnly = false, preventDefaultClose = false }: ModalProps) {
    const router = useRouter();
    const { isMobile } = useMediaQuery();

    const closeModal = (dragged = false) => {
        if (preventDefaultClose && !dragged) return;

        onClose?.();
        setShowModal ? setShowModal(false) : router.back();
    };

    if (isMobile && !desktopOnly) {
        return (
            <Drawer.Root open={showModal} onOpenChange={(open) => !open && closeModal(true)}>
                <Drawer.Overlay className="fixed inset-0 z-50 bg-foreground/70" />
                <Drawer.Portal>
                    <Drawer.Content className={cn("bg-background border-t border flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px] z-50", className)}>
                        <div className="sticky top-0 z-20 my-3 flex w-full  flex-col items-center justify-center gap-2 rounded-t-[10px] bg-inherit">
                            <div className="h-1 w-12 rounded-full bg-border" />
                            {title && <Drawer.Title className="text-center text-lg font-bold">{title}</Drawer.Title>}
                        </div>
                        <div className="h-fit overflow-auto pb-12">{children}</div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        );
    }

    return (
        <Dialog.Root open={showModal} onOpenChange={(open) => !open && closeModal()}>
            <Dialog.Portal>
                <Dialog.Overlay id="modal-backdrop" className="fixed inset-0 z-40 animate-fade-in bg-background/50 backdrop-blur-md" />
                <Dialog.Content
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    className={cn(
                        "animate-scale-in fixed inset-0 z-40 m-auto h-fit max-h-[calc(100vh-40px)] w-full max-w-md overflow-auto  border border-secondary-dark bg-background p-0 shadow-xl sm:rounded-2xl",
                        className
                    )}
                >
                    {title && <Dialog.Title className="sticky top-0 z-20 flex h-12 w-full items-center justify-center rounded-t-2xl border-b bg-background text-lg font-bold">{title}</Dialog.Title>}
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
