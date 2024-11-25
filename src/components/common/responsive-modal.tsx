import { useMediaQuery } from "@/hooks";
import { cn } from "@/lib/utils";
import { useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerPortal, DrawerOverlay } from "@/components/ui/drawer";
import { ScrollArea } from "../ui";

type BaseModalProps = {
    title?: string;
    children: React.ReactNode;
    className?: string;
};

type ModalProps = BaseModalProps & {
    isOpen: boolean;
    onClose: () => void;
    contentClass?: string;
    lockScroll?: boolean;
    forceDesktop?: boolean;
    preventClose?: boolean;
};

const ModalBody = ({ title, children, className }: BaseModalProps) => (
    <div className={cn("flex h-full flex-col", className)}>
        {title && <DialogTitle className="flex h-12 items-center justify-center border-b bg-background text-lg font-bold">{title}</DialogTitle>}
        <ScrollArea className="flex-1 p-4">{children}</ScrollArea>
    </div>
);

const MobileDrawer = ({ isOpen, onClose, className, children }: Pick<ModalProps, "isOpen" | "onClose" | "className" | "children">) => (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerOverlay className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" />
        <DrawerPortal>
            <DrawerContent className={cn("fixed bottom-0 left-0 right-0 flex min-h-fit max-h-[90vh] flex-col rounded-t-[10px] bg-background", className)}>{children}</DrawerContent>
        </DrawerPortal>
    </Drawer>
);

const DesktopDialog = ({ isOpen, onClose, className, children }: Pick<ModalProps, "isOpen" | "onClose" | "className" | "children">) => (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogPortal>
            <DialogOverlay className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" />
            <DialogContent
                className={cn(
                    "fixed left-[50%] top-[50%] z-50 min-h-fit max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-background shadow-lg duration-200",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
                    "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
                    "sm:rounded-lg",
                    className
                )}
            >
                {children}
            </DialogContent>
        </DialogPortal>
    </Dialog>
);

export function Modal({ children, isOpen, onClose, title, className, contentClass, lockScroll = true, forceDesktop = false, preventClose = false }: ModalProps) {
    const { device } = useMediaQuery();

    useEffect(() => {
        if (!lockScroll || !isOpen) return;

        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, lockScroll]);

    const handleClose = useCallback(() => {
        if (!preventClose) onClose();
    }, [onClose, preventClose]);

    const modalContent = (
        <ModalBody title={title} className={contentClass}>
            {children}
        </ModalBody>
    );

    if (device === "mobile" && !forceDesktop) {
        return (
            <MobileDrawer isOpen={isOpen} onClose={handleClose} className={className}>
                {modalContent}
            </MobileDrawer>
        );
    }

    return (
        <DesktopDialog isOpen={isOpen} onClose={handleClose} className={className}>
            {modalContent}
        </DesktopDialog>
    );
}
