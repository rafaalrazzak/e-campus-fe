/**
 * Cryptographic utilities for secure data handling
 */

// Constants for encryption
const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;
const IV_LENGTH = 12;
const TAG_LENGTH = 128;

/**
 * Generates a secure cryptographic key
 * @returns A base64 encoded secure key
 */
export const generateKeyQuiz = async (): Promise<string> => {
    try {
        // Generate a direct AES-GCM key
        const key = await crypto.subtle.generateKey(
            {
                name: ALGORITHM,
                length: KEY_LENGTH,
            },
            true,
            ["encrypt", "decrypt"]
        );

        // Export key as raw bytes
        const exportedKey = await crypto.subtle.exportKey("raw", key);
        const keyBytes = new Uint8Array(exportedKey);

        // Return base64 encoded key
        return btoa(String.fromCharCode(...keyBytes));
    } catch (error) {
        console.error("Key generation failed:", error);
        throw new Error("Failed to generate secure key");
    }
};

/**
 * Encrypts data using AES-GCM
 * @param data Data to encrypt
 * @param keyBase64 Base64 encoded encryption key
 * @returns Encrypted data as base64 string
 */
export const encrypt = async (data: any, keyBase64: string): Promise<string> => {
    try {
        // Decode key from base64
        const keyBytes = Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0));

        // Import key
        const key = await crypto.subtle.importKey("raw", keyBytes, ALGORITHM, false, ["encrypt"]);

        // Generate IV
        const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

        // Prepare data
        const encoder = new TextEncoder();
        const dataString = JSON.stringify({
            data,
            timestamp: new Date().getTime(),
        });
        const dataBytes = encoder.encode(dataString);

        // Encrypt
        const encryptedBytes = await crypto.subtle.encrypt(
            {
                name: ALGORITHM,
                iv,
                tagLength: TAG_LENGTH,
            },
            key,
            dataBytes
        );

        // Combine IV and encrypted data
        const result = new Uint8Array(iv.length + encryptedBytes.byteLength);
        result.set(iv);
        result.set(new Uint8Array(encryptedBytes), iv.length);

        // Return as base64
        return btoa(String.fromCharCode(...result));
    } catch (error) {
        console.error("Encryption failed:", error);
        throw new Error("Failed to encrypt data");
    }
};

/**
 * Decrypts data using AES-GCM
 * @param encryptedBase64 Base64 encoded encrypted data
 * @param keyBase64 Base64 encoded encryption key
 * @returns Decrypted data
 */
export const decrypt = async (encryptedBase64: string, keyBase64: string): Promise<any> => {
    try {
        // Decode key and encrypted data from base64
        const keyBytes = Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0));
        const encryptedBytes = Uint8Array.from(atob(encryptedBase64), (c) => c.charCodeAt(0));

        // Extract IV and encrypted data
        const iv = encryptedBytes.slice(0, IV_LENGTH);
        const data = encryptedBytes.slice(IV_LENGTH);

        // Import key
        const key = await crypto.subtle.importKey("raw", keyBytes, ALGORITHM, false, ["decrypt"]);

        // Decrypt
        const decryptedBytes = await crypto.subtle.decrypt(
            {
                name: ALGORITHM,
                iv,
                tagLength: TAG_LENGTH,
            },
            key,
            data
        );

        // Parse decrypted data
        const decoder = new TextDecoder();
        const decryptedString = decoder.decode(decryptedBytes);
        const parsed = JSON.parse(decryptedString);

        // Check expiration (24 hours)
        const now = new Date().getTime();
        if (now - parsed.timestamp > 24 * 60 * 60 * 1000) {
            throw new Error("Data has expired");
        }

        return parsed.data;
    } catch (error) {
        console.error("Decryption failed:", error);
        throw new Error("Failed to decrypt data");
    }
};

// Type definitions for better type safety
export interface EncryptedData {
    data: any;
    timestamp: number;
}
