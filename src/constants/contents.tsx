import { URLS } from "@/constants/urls";

import { Book, Car, ForkKnife, LandPlot, Laptop, Monitor, MoonStar, Presentation } from "lucide-react";

export type NavLink = {
    href: string;
    label: string;
    description?: string;
    children?: Omit<NavLink, "children">[];
};

export const navLinks: NavLink[] = [
    { href: "/", label: "Beranda" },
    {
        href: URLS.academnic.base,
        label: "Akademik",
        children: [
            {
                href: URLS.academnic.courses.list,
                label: "Material Pembelajaran",
                description: "Belajar di kelas dan daring",
            },
            {
                href: URLS.academnic.calendar,
                label: "Kalender Akademik",
                description: "Kalender akademik untuk semester ini",
            },
        ],
    },
    {
        href: URLS.major.list,
        label: "Prodi",
        children: [
            {
                href: URLS.major.detail("teknik-informatika"),
                label: "Teknik Informatika",
                description: "Program studi Teknik Informatika",
            },
            {
                href: URLS.major.detail("sistem-informasi"),
                label: "Sistem Informasi",
                description: "Program studi Sistem Informasi",
            },
            {
                href: URLS.major.detail("bisnis-digital"),
                label: "Bisnis Digital",
                description: "Program studi Bisnis Digital",
            },
        ],
    },
    {
        href: URLS.research.list,
        label: "Riset",
        children: [
            {
                href: URLS.research.detail("research"),
                label: "Penelitian",
                description: "Penelitian yang dilakukan oleh dosen dan mahasiswa",
            },

            {
                href: URLS.research.detail("community-service"),
                label: "Pengabdian Masyarakat",
                description: "Pengabdian kepada masyarakat yang dilakukan oleh dosen dan mahasiswa",
            },
        ],
    },
];

/*
 * Landing Page Contents
 */

export const landingFacilities = [
    {
        icon: <Laptop className="size-6 shrink-0 text-primary" />,
        title: "Laboratorium Komputer",
        description: "Laboratorium komputer yang dilengkapi dengan perangkat dan software terkini.",
    },
    {
        icon: <Book className="size-6 shrink-0 text-primary" />,
        title: "Perpustakaan",
        description: "Perpustakaan yang menyediakan berbagai koleksi buku dan jurnal terkini.",
    },
    {
        icon: <ForkKnife className="size-6 shrink-0 text-primary" />,
        title: "Kantin",
        description: "Kantin yang menyediakan berbagai makanan dan minuman untuk memenuhi kebutuhan mahasiswa.",
    },
    {
        icon: <Monitor className="size-6 shrink-0 text-primary" />,
        title: "Ruang Kelas",
        description: "Ruang kelas yang nyaman dan dilengkapi dengan perangkat multimedia.",
    },
    {
        icon: <Presentation className="size-6 shrink-0 text-primary" />,
        title: "Auditorium",
        description: "Auditorium yang dilengkapi dengan perangkat audio visual untuk kegiatan seminar dan workshop.",
    },
    {
        title: "Lapangan Olahraga",
        description: "Lapangan olahraga yang dapat digunakan untuk berbagai kegiatan olahraga.",
        icon: <LandPlot className="size-6 shrink-0 text-primary" />,
    },
    {
        title: "Masjid dan Musholla",
        description: "Tempat ibadah untuk melaksanakan shalat dan kegiatan keagamaan lainnya.",
        icon: <MoonStar className="size-6 shrink-0 text-primary" />,
    },
    {
        title: "Parkir Kendaraan",
        description: "Area parkir kendaraan yang luas untuk memudahkan mahasiswa dan dosen dalam parkir.",
        icon: <Car className="size-6 shrink-0 text-primary" />,
    },
];

export const landingInfoSections = [
    {
        title: "Informasi Prodi",
        items: [
            {
                title: "Teknik Informatika",
                description: "Program studi yang fokus pada pengembangan software dan sistem informasi.",
                link: URLS.major.detail("teknik-informatika"),
            },
            {
                title: "Sistem Informasi",
                description: "Program studi yang menggabungkan teknologi informasi dengan proses bisnis.",
                link: URLS.major.detail("sistem-informasi"),
            },
            {
                title: "Bisnis Digital",
                description: "Program studi yang memadukan teknologi informasi dengan manajemen bisnis.",
                link: URLS.major.detail("bisnis-digital"),
            },
        ],
    },
    {
        title: "Informasi Umum",
        items: [
            {
                title: "Pendaftaran Mahasiswa Baru",
                description: "Informasi tentang jadwal dan prosedur pendaftaran mahasiswa baru.",
                link: "/pendaftaran-mahasiswa-baru",
            },
            {
                title: "Beasiswa",
                description: "Berbagai program beasiswa yang tersedia untuk mahasiswa.",
                link: "/beasiswa",
            },
        ],
    },
];

export const landingImportantLink = [
    { href: URLS.visionMission, text: "Visi Misi" },
    { href: URLS.major.list, text: "Program Studi" },
    { href: URLS.curriculum, text: "Kurikulum" },
];

export const landingResearch = [
    {
        title: "Penelitian",
        description: "Penelitian yang dilakukan oleh dosen dan mahasiswa.",
        link: URLS.research.detail("research"),
    },
    {
        title: "Pengabdian Masyarakat",
        description: "Pengabdian kepada masyarakat yang dilakukan oleh dosen dan mahasiswa.",
        link: URLS.research.detail("community-service"),
    },
];
