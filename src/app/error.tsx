"use client";

import { Button } from "@/components/ui";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen flex-col items-center justify-center text-secondary-foreground">
            <h2 className="mb-4 text-2xl font-semibold">Sepertinya terjadi kesalahan.</h2>
            <Button onClick={reset}>Coba lagi</Button>
        </div>
    );
}
