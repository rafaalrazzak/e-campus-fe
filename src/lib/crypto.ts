export const generateKeyQuiz = () => {
    const timestamp = new Date().getTime().toString();
    return btoa(`quiz-key-${timestamp}`);
};

export const encrypt = (data: any, key: string): string => {
    try {
        const jsonString = JSON.stringify(data);
        const encodedData = btoa(jsonString);
        const checksum = btoa(
            Array.from(jsonString)
                .reduce((sum, char) => sum + char.charCodeAt(0), 0)
                .toString()
        );
        return btoa(
            JSON.stringify({
                data: encodedData,
                checksum,
                timestamp: new Date().getTime(),
            })
        );
    } catch (error) {
        console.error("Encryption error:", error);
        throw new Error("Failed to encrypt data");
    }
};

export const decrypt = (encryptedData: string, key: string): any => {
    try {
        const parsed = JSON.parse(atob(encryptedData));
        const { data, checksum, timestamp } = parsed;

        // Verify data integrity
        const decodedData = atob(data);
        const calculatedChecksum = btoa(
            Array.from(decodedData)
                .reduce((sum, char) => sum + char.charCodeAt(0), 0)
                .toString()
        );

        if (checksum !== calculatedChecksum) {
            throw new Error("Data integrity check failed");
        }

        // Verify timestamp (optional: expire after 24 hours)
        const now = new Date().getTime();
        if (now - timestamp > 24 * 60 * 60 * 1000) {
            throw new Error("Data has expired");
        }

        return JSON.parse(decodedData);
    } catch (error) {
        console.error("Decryption error:", error);
        throw new Error("Failed to decrypt data");
    }
};
