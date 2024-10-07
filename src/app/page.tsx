import BlogCard from "@/components/common/blog";
import { AcademicCalendar } from "@/components/common/calendar";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Car, ChevronRight, ForkKnife, LandPlot, Laptop, Monitor, MoonStar, Presentation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/vision-mission", text: "Visi Misi" },
  { href: "/majors", text: "Program Studi" },
  { href: "/curriculum", text: "Kurikulum" },
];

const infoSections = [
  {
    title: "Informasi Prodi",
    items: [
      {
        title: "Teknik Informatika",
        description: "Program studi yang fokus pada pengembangan software dan sistem informasi.",
        link: "/program-studi/teknik-informatika", // Link for more details
      },
      {
        title: "Sistem Informasi",
        description: "Program studi yang menggabungkan teknologi informasi dengan proses bisnis.",
        link: "/program-studi/sistem-informasi", // Link for more details
      },
      {
        title: "Bisnis Digital",
        description: "Program studi yang memadukan teknologi informasi dengan manajemen bisnis.",
        link: "/program-studi/bisnis-digital", // Link for more details
      },
    ],
  },
  {
    title: "Informasi Umum",
    items: [
      {
        title: "Pendaftaran Mahasiswa Baru",
        description: "Informasi tentang jadwal dan prosedur pendaftaran mahasiswa baru.",
        link: "/pendaftaran-mahasiswa-baru", // Link for more details
      },
      {
        title: "Beasiswa",
        description: "Berbagai program beasiswa yang tersedia untuk mahasiswa.",
        link: "/beasiswa", // Link for more details
      },
    ],
  },
];

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
    links: [
      { text: "Jadwal Wisuda Agustus 2024.pdf", url: "#" },
    ],
  },
  {
    author: "Admin",
    icon: "🏆",
    date: "Jumat, 16 Agustus 2024, 14:00",
    title: "Prestasi Mahasiswa dalam Kompetisi Nasional",
    content: "Selamat kepada mahasiswa STT Nurul Fikri yang telah meraih juara dalam kompetisi programming tingkat nasional.",
    links: [
      { text: "Daftar Pemenang Kompetisi.pdf", url: "#" },
    ],
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

const facilities = [
  {
    icon: <Laptop className="text-primary shrink-0 size-6" />,
    title: "Laboratorium Komputer",
    description: "Laboratorium komputer yang dilengkapi dengan perangkat dan software terkini.",
  },
  {
    icon: <Book className="text-primary shrink-0 size-6" />,
    title: "Perpustakaan",
    description: "Perpustakaan yang menyediakan berbagai koleksi buku dan jurnal terkini.",
  },
  {
    icon: <ForkKnife className="text-primary shrink-0 size-6" />,
    title: "Kantin",
    description: "Kantin yang menyediakan berbagai makanan dan minuman untuk memenuhi kebutuhan mahasiswa.",
  },
  {
    icon: <Monitor className="text-primary shrink-0 size-6" />,
    title: "Ruang Kelas",
    description: "Ruang kelas yang nyaman dan dilengkapi dengan perangkat multimedia.",
  },
  {
    icon: <Presentation className="text-primary shrink-0 size-6" />,
    title: "Auditorium",
    description: "Auditorium yang dilengkapi dengan perangkat audio visual untuk kegiatan seminar dan workshop.",
  },
  {
    title: "Lapangan Olahraga",
    description: "Lapangan olahraga yang dapat digunakan untuk berbagai kegiatan olahraga.",
    icon: <LandPlot className="text-primary shrink-0 size-6" />,
  },
  {
    title: "Masjid dan Musholla",
    description: "Tempat ibadah untuk melaksanakan shalat dan kegiatan keagamaan lainnya.",
    icon: <MoonStar className="text-primary shrink-0 size-6" />,
  },
  {
    title: "Parkir Kendaraan",
    description: "Area parkir kendaraan yang luas untuk memudahkan mahasiswa dan dosen dalam parkir.",
    icon: <Car className="text-primary shrink-0 size-6" />,
  }
];

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="relative h-[50vh] flex flex-col justify-center items-center text-center text-white p-8 overflow-hidden rounded-b-3xl">
        <Image
          src="https://assets.siakadcloud.com/uploads/sttnurulfikri/bgaplikasi/1405.jpg"
          alt="Hero"
          fill
          className="object-cover object-center brightness-[0.3]"
        />
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-bold">
            Selamat datang di<br />E-Campus STT Nurul Fikri
          </h1>
          <p className="max-w-lg mx-auto text-balance">
            Membangun masa depan melalui pendidikan teknologi yang inovatif dan berkualitas.
          </p>
          <Button variant="primary" size="lg">Daftar Sekarang</Button>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 gap-12 flex flex-col">
        <Card className="overflow-hidden p-0">
          <CardContent>
            <nav className="flex items-center justify-center divide-x divide-border w-full">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex-1 text-sm text-center hover:bg-muted transition-colors duration-200 px-2 py-4"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AcademicCalendar events={events} />

          <div className="space-y-8">
            {infoSections.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.title}>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <Button asLink variant="link" size="none" href={item.link}>
                        Lihat Selengkapnya
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <section className="bg-gradient-to-b from-primary to-transparent -mx-4 md:mx-0 p-4 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center">
            <div className="text-primary-foreground">
              <span className="text-sm">Fasilitas</span>
              <h2 className="text-2xl font-bold">Kampus STT Nurul Fikri</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities.map((facility) => (
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-sm text-gray-500">Tetap Update</span>
              <h2 className="text-2xl font-bold">Berita Terbaru</h2>
            </div>
            <Button variant="outline">Lihat Semua</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </section>

        <section className=" p-8 rounded-2xl border gap-8 flex flex-col">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold">Riset dan Penelitian</h2>
            <p className="text-center max-w-lg">
              STT Nurul Fikri memiliki berbagai program riset dan penelitian yang dilakukan oleh dosen dan mahasiswa.
            </p>
            <Button variant="outline" size="lg">Lihat Selengkapnya</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Program Riset</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Informasi tentang program riset yang sedang berlangsung di STT Nurul Fikri.
                </p>
                <Button variant="outline" size="sm">Lihat Selengkapnya</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publikasi Ilmiah</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Daftar publikasi ilmiah yang dihasilkan oleh dosen dan mahasiswa STT Nurul Fikri.
                </p>
                <Button variant="outline" size="sm">Lihat Selengkapnya</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}