import { useState, useEffect, useCallback, useRef } from "react";
import { encrypt, decrypt, generateKeyQuiz } from "@/lib/crypto";
import { createHash } from "crypto";

interface SecureData<T> {
    value: T;
    timestamp: number;
    hash: string;
}

interface ValidationResult {
    isValid: boolean;
    error?: string;
}

type Validator<T> = (value: T) => ValidationResult;

/**
 * A secure storage hook that provides encryption, validation, and auto-cleanup
 * @param key - Storage key
 * @param initialValue - Default value
 * @param validator - Optional validation function
 * @param expirationHours - Data expiration time in hours (default: 12)
 */
export function useSecureStorage<T>(key: string, initialValue: T, validator?: Validator<T>, expirationHours = 12) {
    const storageKey = useRef(`secure_${key}`);
    const encryptionKey = useRef<string | null>(null);
    const [value, setValue] = useState<T>(initialValue);

    // Generate secure hash for data integrity using Bun's crypto
    const generateHash = useCallback((data: T, timestamp: number): string => {
        const content = JSON.stringify({ data, timestamp });
        return createHash("sha256").update(content).digest("hex");
    }, []);

    // Initialize encryption key
    useEffect(() => {
        const initKey = async () => {
            if (!encryptionKey.current && typeof window !== "undefined") {
                try {
                    encryptionKey.current = await generateKeyQuiz();
                } catch (error) {
                    console.error("Encryption key generation failed:", error);
                }
            }
        };
        initKey();
    }, []);

    // Load and validate stored data
    const loadStoredData = useCallback(async () => {
        if (!encryptionKey.current || typeof window === "undefined") return;

        try {
            const stored = localStorage.getItem(storageKey.current);
            if (!stored) return;

            const decrypted = (await decrypt(stored, encryptionKey.current)) as SecureData<T>;

            // Validate data integrity and expiration
            const isValid =
                decrypted &&
                decrypted.value &&
                decrypted.timestamp &&
                Date.now() - decrypted.timestamp < expirationHours * 3600000 &&
                generateHash(decrypted.value, decrypted.timestamp) === decrypted.hash;

            if (!isValid) throw new Error("Invalid or expired data");

            // Run custom validation if provided
            if (validator) {
                const validation = validator(decrypted.value);
                if (!validation.isValid) throw new Error(validation.error);
            }

            setValue(decrypted.value);
        } catch (error) {
            if (typeof window !== "undefined") {
                localStorage.removeItem(storageKey.current);
            }
            setValue(initialValue);
        }
    }, [initialValue, validator, expirationHours, generateHash]);

    // Update stored value
    const updateValue = useCallback(
        async (newValue: T | ((prev: T) => T)) => {
            if (!encryptionKey.current || typeof window === "undefined") return;

            try {
                const valueToStore = newValue instanceof Function ? newValue(value) : newValue;

                // Validate new value
                if (validator) {
                    const validation = validator(valueToStore);
                    if (!validation.isValid) {
                        throw new Error(validation.error || "Validation failed");
                    }
                }

                const timestamp = Date.now();
                const hash = generateHash(valueToStore, timestamp);

                const secureData: SecureData<T> = {
                    value: valueToStore,
                    timestamp,
                    hash,
                };

                const encrypted = await encrypt(secureData, encryptionKey.current);
                localStorage.setItem(storageKey.current, encrypted);
                setValue(valueToStore);
            } catch (error) {
                console.error("Storage update failed:", error);
                throw error;
            }
        },
        [value, validator, generateHash]
    );

    // Initial load
    useEffect(() => {
        loadStoredData();
    }, [loadStoredData]);

    // Cleanup expired data
    useEffect(() => {
        const cleanup = () => loadStoredData();
        const interval = setInterval(cleanup, 300000); // Check every 5 minutes
        return () => clearInterval(interval);
    }, [loadStoredData]);

    return [value, updateValue] as const;
}
