import { AcademicCalendar, BlogCard, Hero } from "@/components/common";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { landingFacilities, landingInfoSections, landingImportantLink, landingResearch } from "@/constants/contents";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
    {
        author: "Admin",
        icon: "📅",
        date: "Kamis, 22 Agustus 2024, 10:49",
        title: "Info Dosen Pembimbing Tugas Akhir Semester Ganjil 2024/2025",
        content: "Informasi tentang dosen pembimbing tugas akhir semester ganjil 2024/2025 telah tersedia. Silakan cek link berikut untuk pedoman bimbingan.",
        links: [
            { text: "Pengumuman lulusan semster genap20232.pdf", url: "#" },
            { text: "Pedoman bimbingan tugas akhir.pdf", url: "#" },
        ],
    },
    {
        author: "Admin",
        icon: "🎓",
        date: "Senin, 19 Agustus 2024, 09:30",
        title: "Jadwal Wisuda Periode Agustus 2024",
        content: "Pengumuman jadwal dan tata cara pelaksanaan wisuda untuk periode Agustus 2024.",
        links: [{ text: "Jadwal Wisuda Agustus 2024.pdf", url: "#" }],
    },
    {
        author: "Admin",
        icon: "🏆",
        date: "Jumat, 16 Agustus 2024, 14:00",
        title: "Prestasi Mahasiswa dalam Kompetisi Nasional",
        content: "Selamat kepada mahasiswa STT Nurul Fikri yang telah meraih juara dalam kompetisi programming tingkat nasional.",
        links: [{ text: "Daftar Pemenang Kompetisi.pdf", url: "#" }],
    },
];

const events = [
    { date: new Date(2024, 7, 1), title: "Semester Ganjil Dimulai" },
    { date: new Date(2024, 7, 15), title: "Pembagian Kelas" },
    { date: new Date(2024, 7, 30), title: "Pengumuman Beasiswa" },
    { date: new Date(2024, 8, 1), title: "Semester Genap Dimulai" },
    { date: new Date(2024, 8, 15), title: "Pembagian Kelas" },
    { date: new Date(2024, 8, 30), title: "Pengumuman Beasiswa" },
];

export default function Home() {
    return (
        <>
            <Hero />
            <main className="container mx-auto flex flex-col gap-8 px-4">
                <Card className="overflow-hidden p-0">
                    <CardContent>
                        <nav className="flex w-full items-center justify-center divide-x divide-border">
                            {landingImportantLink.map((link) => (
                                <Link key={link.href} href={link.href} className="flex-1 px-2 py-4 text-center text-sm transition-colors duration-200 hover:bg-muted">
                                    {link.text}
                                </Link>
                            ))}
                        </nav>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <AcademicCalendar events={events} />

                    <div className="flex flex-col gap-8">
                        {landingInfoSections.map((section) => (
                            <Card key={section.title}>
                                <CardHeader>
                                    <CardTitle>{section.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {section.items.map((item) => (
                                        <div key={item.title}>
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="text-sm text-secondary-foreground">{item.description}</p>
                                            <Button asLink variant="link" size="none" href={item.link} rightIcon={<ChevronRight className="size-4" />}>
                                                Lihat Selengkapnya
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <section className="-mx-4 flex flex-col gap-4 rounded-2xl bg-gradient-to-b from-primary to-transparent p-4 md:mx-0">
                    <div className="flex items-center">
                        <div className="text-primary-foreground">
                            <span className="text-sm">Fasilitas</span>
                            <h2 className="text-2xl font-bold">Kampus STT Nurul Fikri</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {landingFacilities.map((facility) => (
                            <Card key={facility.title}>
                                <CardContent className="flex items-center gap-4">
                                    {facility.icon}
                                    <div>
                                        <h3 className="font-semibold">{facility.title}</h3>
                                        <p className="text-sm text-muted-foreground">{facility.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <span className="text-sm text-gray-500">Tetap Update</span>
                            <h2 className="text-2xl font-bold">Berita Terbaru</h2>
                        </div>
                        <Button variant="outline">Lihat Semua</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {blogPosts.map((post, index) => (
                            <BlogCard key={index} {...post} />
                        ))}
                    </div>
                </section>

                <section className="flex flex-col gap-8 rounded-2xl border p-8">
                    <div className="flex flex-col items-center space-y-4">
                        <h2 className="text-2xl font-bold">Riset dan Penelitian</h2>
                        <p className="max-w-lg text-center">STT Nurul Fikri memiliki berbagai program riset dan penelitian yang dilakukan oleh dosen dan mahasiswa.</p>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                        {landingResearch.map((research, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{research.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p>{research.description}</p>
                                </CardContent>

                                <CardFooter>
                                    <Button asLink href={research.link} variant="outline" size="full">
                                        Lihat Selengkapnya
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
