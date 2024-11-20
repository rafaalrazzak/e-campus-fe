export interface QRPayload {
    courseId: string;
    sessionId: string;
    timestamp: number;
    expiresAt: number;
    nonce: string;
    signature: string;
}

export interface QRSessionData {
    courseId: string;
    sessionId: string;
    timestamp: string;
    deviceInfo?: {
        userAgent: string;
        platform: string;
    };
}

export interface AttendanceRecord {
    courseId: string;
    studentId: string;
    timestamp: string;
}
