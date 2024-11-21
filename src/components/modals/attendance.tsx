import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Modal } from "@/components/ui";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

// Types
type ScanStatus = {
    message: string;
    type: "" | "success" | "error";
    data?: AttendanceRecord;
};

type QRPayload = {
    courseId: string;
    sessionId: string;
    timestamp: number;
    expiresAt: number;
    nonce: string;
    signature: string;
};

type AttendanceRecord = {
    courseId: string;
    studentId: string;
    timestamp: string;
};

type QRAttendanceModalProps = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    courseId: string;
    onAttendanceRecord?: (record: AttendanceRecord) => Promise<void>;
};

// Components
const ScanningOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-[90%] absolute">
            {/* Corner borders */}
            <div className="absolute left-0 top-0 w-[45px] h-[46px] border-l-4 border-t-4 border-primary rounded-tl"></div>
            <div className="absolute right-0 top-0 w-[45px] h-[46px] border-r-4 border-t-4 border-primary rounded-tr"></div>
            <div className="absolute left-0 bottom-0 w-[45px] h-[46px] border-l-4 border-b-4 border-primary rounded-bl"></div>
            <div className="absolute right-0 bottom-0 w-[45px] h-[46px] border-r-4 border-b-4 border-primary rounded-br"></div>

            {/* Scanning line */}
            <div className="absolute top-[5%] left-[4%] w-[4px] h-[90%] bg-primary shadow-[0_0_50px_10px_rgba(26,129,203,0.5)] animate-[scanX_1s_ease-in-out_infinite_alternate,scanY_1s_ease-in-out_infinite]"></div>
        </div>
    </div>
);

const QRScanner = ({ onScan, onError }: { onScan: (result: string) => void; onError: (error: unknown) => void }) => (
    <Scanner onScan={(results) => results?.[0]?.rawValue && onScan(results[0].rawValue)} onError={onError} components={{ finder: false }} constraints={{ facingMode: "environment" }} scanDelay={500} />
);

// Validation helper
const isValidQRPayload = (data: unknown): data is QRPayload => {
    if (!data || typeof data !== "object") return false;

    const payload = data as QRPayload;
    return (
        typeof payload.courseId === "string" &&
        typeof payload.sessionId === "string" &&
        typeof payload.timestamp === "number" &&
        typeof payload.expiresAt === "number" &&
        typeof payload.nonce === "string" &&
        typeof payload.signature === "string"
    );
};

export function QRAttendanceModal({ showModal, setShowModal, courseId, onAttendanceRecord }: QRAttendanceModalProps) {
    const [isScanning, setIsScanning] = React.useState(true);
    const [status, setStatus] = React.useState<ScanStatus>({ message: "", type: "" });
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleScan = React.useCallback(
        async (data: string) => {
            if (isProcessing) return;

            try {
                setIsProcessing(true);
                setStatus({ message: "Processing QR code...", type: "" });

                // Parse and validate QR data
                const decodedData: unknown = JSON.parse(atob(data));
                if (!isValidQRPayload(decodedData)) {
                    throw new Error("Invalid QR code format");
                }

                // Validate expiration and course
                if (Date.now() > decodedData.expiresAt) {
                    throw new Error("QR code has expired");
                }
                if (decodedData.courseId !== courseId) {
                    throw new Error("Invalid QR code for this course");
                }

                // Create attendance record
                const record: AttendanceRecord = {
                    courseId: decodedData.courseId,
                    studentId: decodedData.sessionId,
                    timestamp: new Date(decodedData.timestamp).toISOString(),
                };

                await onAttendanceRecord?.(record);

                setStatus({
                    message: "Attendance recorded successfully!",
                    type: "success",
                    data: record,
                });
                setIsScanning(false);
            } catch (error) {
                setStatus({
                    message: error instanceof Error ? error.message : "Failed to process QR code",
                    type: "error",
                });
                setIsScanning(false);
            } finally {
                setIsProcessing(false);
            }
        },
        [courseId, isProcessing, onAttendanceRecord]
    );

    const handleClose = () => {
        setIsScanning(false);
        setStatus({ message: "", type: "" });
        setShowModal(false);
    };

    return (
        <Modal showModal={showModal} setShowModal={handleClose} title="Scan Kehadiran">
            <div className="space-y-4 p-4 md:p-6 size-full">
                {isScanning && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black">
                        <QRScanner
                            onScan={handleScan}
                            onError={(error) => {
                                setStatus({
                                    message: error instanceof Error ? error.message : "Camera error",
                                    type: "error",
                                });
                                setIsScanning(false);
                            }}
                        />
                        <ScanningOverlay />
                    </div>
                )}

                {status.message && (
                    <Alert variant={status.type === "success" ? "success" : "destructive"}>
                        <AlertTitle>{status.type === "success" ? "Attendance Recorded" : "Error"}</AlertTitle>
                        <AlertDescription className="flex items-center gap-2">
                            {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
                            {status.message}
                        </AlertDescription>
                    </Alert>
                )}

                {status.type === "success" && status.data && (
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                            <span className="font-semibold">Course:</span> {status.data.courseId}
                        </p>
                        <p>
                            <span className="font-semibold">Time:</span> {formatDate(new Date(status.data.timestamp), true)}
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );
}

export const useQRAttendanceModal = () => {
    const [showQRModal, setShowQRModal] = React.useState(false);

    const QRModal = React.useCallback(
        ({ courseId, onAttendanceRecord }: Omit<QRAttendanceModalProps, "showModal" | "setShowModal">) => (
            <QRAttendanceModal showModal={showQRModal} setShowModal={setShowQRModal} courseId={courseId} onAttendanceRecord={onAttendanceRecord} />
        ),
        [showQRModal]
    );

    return {
        showQRModal,
        setShowQRModal,
        QRModal,
    };
};
