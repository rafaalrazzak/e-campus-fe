import { Navbar } from "@/components/common";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="mx-auto flex flex-col gap-8 pb-8">{children}</main>
        </>
    );
}
