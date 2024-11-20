import Link from "next/link";
import Image from "next/image";

type LogoProps = {
    withLink?: boolean;
};

export const Logo = ({ withLink = false }: LogoProps) => {
    if (withLink) {
        return (
            <Link href="/" className="flex items-center" prefetch={false}>
                <LogoContent />
            </Link>
        );
    }

    return (
        <div className="flex items-center">
            <LogoContent />
        </div>
    );
};

export const LogoContent = () => (
    <>
        <Image src="/logo.svg" alt="Kita" width={32} height={32} priority />
        <span className="sr-only">Kita</span>
    </>
);
