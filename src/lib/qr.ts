export interface QRPayload {
    courseId: string;
    sessionId: string;
    timestamp: number;
    expiresAt: number;
    nonce: string;
    signature: string;
}

export interface AutoRefreshConfig {
    refreshInterval: number; // in milliseconds
    validityDuration: number; // in milliseconds
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

export class QRGenerator {
    private readonly secretKey: string;
    private readonly encoder: TextEncoder;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
        this.encoder = new TextEncoder();
    }

    async generatePayload(courseId: string): Promise<string> {
        const timestamp = Date.now();
        const sessionId = crypto.randomUUID();
        const nonce = crypto.randomUUID();
        const expiresAt = timestamp + 60000; // 1 minute expiry

        const payload: Omit<QRPayload, "signature"> = {
            courseId,
            sessionId,
            timestamp,
            expiresAt,
            nonce,
        };

        console.log(payload);

        const signature = await this.sign(payload);

        return btoa(
            JSON.stringify({
                ...payload,
                signature,
            })
        );
    }

    private async sign(data: object): Promise<string> {
        const message = this.encoder.encode(JSON.stringify(data));
        const key = await crypto.subtle.importKey("raw", this.encoder.encode(this.secretKey), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);

        const signature = await crypto.subtle.sign("HMAC", key, message);
        return btoa(String.fromCharCode(...new Uint8Array(signature)));
    }
}
