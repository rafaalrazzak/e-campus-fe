import { AnimatedBackground, Navbar } from "@/components/common";
import { Button } from "@/components/ui";

export default function NotFound() {
    return (
        <div className="relative items-center justify-center h-vh overflow-hidden">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-full text-secondary-foreground">
                <AnimatedBackground className="fixed -z-[1]" />
                <img src="/falling.svg" width={300} alt="Source: popsy.co" />
                <h1 className="text-5xl font-bold">404</h1>
                <p className="text-xl">Halaman tidak ditemukan</p>
                <Button asLink href="/" className="mt-6">
                    Kembali ke Beranda
                </Button>
            </div>
        </div>
    );
}
