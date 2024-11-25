"use client";

import { useMediaQuery } from "@/hooks";
import { cn } from "@/lib/utils";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React from "react";
import { Drawer } from "vaul";

export type ModalProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
    showModal: boolean;
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    onClose?: () => void;
    desktopOnly?: boolean;
    preventDefaultClose?: boolean;
};

type ContentProps = {
    title?: string;
    children: React.ReactNode;
    className?: string;
};

 const DrawerContent: React.FC<ContentProps> = ({ title, children, className }) => (
    <Drawer.Content className={cn("bg-background border-t flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px] z-50", className)}>
        <div className="sticky top-0 z-20 my-3 flex w-full flex-col items-center justify-center gap-2 rounded-t-[10px] bg-inherit">
            <div className="h-1 w-12 rounded-full bg-border" />
            {title && <Drawer.Title className="text-center text-lg font-bold">{title}</Drawer.Title>}
        </div>
        <div className="h-fit overflow-auto pb-12">{children}</div>
    </Drawer.Content>
);

const DialogContent: React.FC<ContentProps> = ({ title, children, className }) => (
    <Dialog.Content
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
        onCloseAutoFocus={(e: Event) => e.preventDefault()}
        className={cn(
            "animate-scale-in fixed inset-0 z-40 m-auto h-fit max-h-[calc(100vh-240px)] w-fix max-w-[calc(100dvh-240px)] border border-secondary-dark bg-background p-0 shadow-xl sm:rounded-2xl overflow-hidden flex flex-col",
            className
        )}
    >
        {title && <Dialog.Title className="flex h-12 w-full shrink-0 items-center justify-center border-b bg-background text-lg font-bold">{title}</Dialog.Title>}
        {children}
    </Dialog.Content>
);

export const Modal: React.FC<ModalProps> = ({ title, children, className, showModal, setShowModal, onClose, desktopOnly = false, preventDefaultClose = false }) => {
    const router = useRouter();
    const { isMobile } = useMediaQuery();

    const closeModal = React.useCallback(
        (dragged: boolean = false) => {
            if (preventDefaultClose && !dragged) return;
            onClose?.();
            setShowModal ? setShowModal(false) : router.back();
        },
        [preventDefaultClose, onClose, setShowModal, router]
    );

    if (isMobile && !desktopOnly) {
        return (
            <Drawer.Root open={showModal} onOpenChange={(open: boolean) => !open && closeModal(true)}>
                <Drawer.Overlay className="fixed inset-0 z-50 bg-foreground/70" />
                <Drawer.Portal>
                    <DrawerContent title={title} className={className}>
                        {children}
                    </DrawerContent>
                </Drawer.Portal>
            </Drawer.Root>
        );
    }

    return (
        <Dialog.Root open={showModal} onOpenChange={(open: boolean) => !open && closeModal()}>
            <Dialog.Portal>
                <Dialog.Overlay id="modal-backdrop" className="fixed inset-0 z-40 animate-fade-in bg-background/50 backdrop-blur-md" />
                <DialogContent title={title} className={className}>
                    {children}
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
