import { AnimatedBackground } from "@/components/common";
import { Button } from "@/components/ui";

export default function NotFound() {
    return (
        <div className="flex h-dvh flex-col items-center justify-center overflow-hidden text-secondary-foreground">
            <AnimatedBackground className="fixed" />
            <img src="/falling.svg" width={300} alt="Source: popsy.co" />
            <h1 className="text-5xl font-bold">404</h1>
            <p className="text-xl">Halaman tidak ditemukan</p>
            <Button asLink href="/" className="mt-6">
                Kembali ke Beranda
            </Button>
        </div>
    );
}
