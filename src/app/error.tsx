"use client";

import { Navbar } from "@/components/common";
import { Button } from "@/components/ui";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="relative items-center justify-center h-vh overflow-hidden">
            <Navbar />
            <div className="flex flex-col h-full text-secondary-foreground">
                <h2 className="mb-4 text-2xl font-semibold">Sepertinya terjadi kesalahan.</h2>
                <Button onClick={reset}>Coba lagi</Button>
            </div>
        </div>
    );
}
