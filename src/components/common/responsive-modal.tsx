import * as React from "react";
import { useMediaQuery } from "@/hooks";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogPortal, DialogOverlay, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerPortal, DrawerOverlay, DrawerClose, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    showClose?: boolean;
    forceDesktop?: boolean;
    preventScroll?: boolean;
}

const ModalContent = React.memo(function ModalContent({ children, className, showClose, onClose }: Omit<ModalProps, "open" | "onOpenChange"> & { onClose?: () => void }) {
    return (
        <div className={cn("flex h-full flex-col", className)}>
            <ScrollArea className="flex-1">
                <div className="p-4">{children}</div>
            </ScrollArea>
            {showClose && onClose && (
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            )}
        </div>
    );
});

export function Modal({ open, onOpenChange, title, description, children, className, showClose = false, forceDesktop = false, preventScroll = true }: ModalProps) {
    const { device } = useMediaQuery();

    React.useEffect(() => {
        if (!preventScroll || !open) return;

        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [open, preventScroll]);

    const handleOpenChange = React.useCallback(
        (newOpen: boolean) => {
            onOpenChange(newOpen);
        },
        [onOpenChange]
    );

    const sharedProps = {
        title,
        description,
        children,
        className,
        showClose,
    };

    if (device === "desktop" || forceDesktop) {
        return (
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className={className}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && <DialogDescription className="mt-1.5 text-sm text-muted-foreground">{description}</DialogDescription>}
                    </DialogHeader>
                    <ModalContent {...sharedProps} onClose={() => handleOpenChange(false)} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={handleOpenChange}>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent className={cn("flex flex-col", className)}>
                    <DrawerHeader className="p-0">
                        {title && (
                            <div className="border-b bg-background px-4 py-3">
                                <DrawerTitle className="text-lg font-semibold leading-none tracking-tight">{title}</DrawerTitle>
                                {description && <DrawerDescription className="mt-1.5 text-sm text-muted-foreground">{description}</DrawerDescription>}
                            </div>
                        )}
                    </DrawerHeader>
                    <ModalContent {...sharedProps} onClose={() => handleOpenChange(false)} />
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    );
}
