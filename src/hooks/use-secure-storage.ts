import { useState, useEffect, useCallback } from "react";
import { encrypt, decrypt, generateKeyQuiz } from "@/lib/crypto";
import { StorageValidation } from "@/types/quiz";

export function useSecureStorage<T>(key: string, initialValue: T, validator?: (value: T) => StorageValidation) {
    // Generate a unique session key
    const [sessionKey] = useState(() => generateKeyQuiz());

    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                const decryptedValue = decrypt(item, sessionKey);

                // Validate the decrypted data if validator provided
                if (validator) {
                    const validation = validator(decryptedValue);
                    if (!validation.isValid) {
                        throw new Error(validation.error || "Invalid data structure");
                    }
                }

                return decryptedValue;
            }
            return initialValue;
        } catch (error) {
            console.warn(`Error reading secure storage:`, error);
            return initialValue;
        }
    });

    // Sync storage across tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key) {
                try {
                    if (e.newValue) {
                        const newValue = decrypt(e.newValue, sessionKey);
                        if (validator) {
                            const validation = validator(newValue);
                            if (!validation.isValid) {
                                throw new Error(validation.error);
                            }
                        }
                        setStoredValue(newValue);
                    }
                } catch (error) {
                    console.error("Storage sync error:", error);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key, sessionKey, validator]);

    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;

                // Validate before storing if validator provided
                if (validator) {
                    const validation = validator(valueToStore);
                    if (!validation.isValid) {
                        throw new Error(validation.error || "Invalid data structure");
                    }
                }

                const encryptedValue = encrypt(valueToStore, sessionKey);
                window.localStorage.setItem(key, encryptedValue);
                setStoredValue(valueToStore);
            } catch (error) {
                console.error("Error setting secure storage:", error);
                throw new Error("Failed to save data securely");
            }
        },
        [key, sessionKey, storedValue, validator]
    );

    return [storedValue, setValue] as const;
}
