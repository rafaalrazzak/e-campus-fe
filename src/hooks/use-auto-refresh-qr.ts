import { AutoRefreshConfig, QRGenerator } from "@/lib/qr";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useAutoRefreshQR = (courseId: string, config: Partial<AutoRefreshConfig> = {}) => {
    const [qrCode, setQRCode] = useState<string>("");
    const [isExpired, setIsExpired] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const generator = useMemo(() => new QRGenerator(process.env.NEXT_PUBLIC_QR_SECRET_KEY || "default-secret"), []);

    const generateNewQR = useCallback(async () => {
        try {
            const newQRCode = await generator.generatePayload(courseId);
            setQRCode(newQRCode);
            setIsExpired(false);
            setTimeLeft(60); // 60 seconds
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate QR code");
            setIsExpired(true);
        }
    }, [courseId, generator]);

    useEffect(() => {
        generateNewQR();

        // Set up auto-refresh interval
        const refreshInterval = setInterval(() => {
            generateNewQR();
        }, 60000); // Refresh every minute

        // Set up countdown timer
        const countdownInterval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsExpired(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(refreshInterval);
            clearInterval(countdownInterval);
        };
    }, [generateNewQR]);

    return {
        qrCode,
        isExpired,
        timeLeft,
        error,
        refreshQR: generateNewQR,
    };
};
