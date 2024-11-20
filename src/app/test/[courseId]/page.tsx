"use client";

import { Badge, Button } from "@/components/ui";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAutoRefreshQR } from "@/hooks/use-auto-refresh-qr";
import { QRSessionData } from "@/lib/qr";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface AutoRefreshQRDisplayProps {
    courseId: string;
    className?: string;
}

export function AutoRefreshQRDisplay({ courseId, className }: AutoRefreshQRDisplayProps) {
    const { qrCode, isExpired, timeLeft, error, refreshQR } = useAutoRefreshQR(courseId);

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div className="relative">
                {qrCode && (
                    <div className="aspect-square w-full max-w-sm mx-auto">
                        <QRCodeSVG value={qrCode} className="w-full h-full" level="H" size={300} />
                    </div>
                )}

                <div className="absolute top-2 right-2">
                    <Badge variant={isExpired ? "destructive" : "primary"}>{timeLeft}s</Badge>
                </div>
            </div>

            {isExpired && (
                <Button onClick={refreshQR} className="w-full" variant="outline">
                    Refresh QR Code
                </Button>
            )}

            <p className="text-sm text-center text-muted-foreground">QR code refreshes automatically every minute</p>
        </div>
    );
}

export default function AttendancePage() {
    const { courseId } = useParams();
    const [mode, setMode] = useState<"display" | "scan">("display");

    const handleAttendanceScan = async (sessionData: QRSessionData) => {
        try {
            // Send attendance record to your API
            await fetch("/api/attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sessionData),
            });

            // toast.success("Attendance recorded successfully");
        } catch (error) {
            // toast.error("Failed to record attendance");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <AutoRefreshQRDisplay courseId={courseId as string} />
        </div>
    );
}
