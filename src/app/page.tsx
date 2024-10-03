import BlogCard from "@/components/common/blog";
import { AcademicCalendar } from "@/components/common/calendar";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      },
      {
        title: "Sistem Informasi",
        description: "Program studi yang menggabungkan teknologi informasi dengan proses bisnis.",
      },
    ],
  },
  {
    title: "Informasi Umum",
    items: [
      {
        title: "Pendaftaran Mahasiswa Baru",
        description: "Informasi tentang jadwal dan prosedur pendaftaran mahasiswa baru.",
      },
      {
        title: "Beasiswa",
        description: "Berbagai program beasiswa yang tersedia untuk mahasiswa.",
      },
    ],
  },
];

const blogPosts = [
  {
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
    icon: "🎓",
    date: "Senin, 19 Agustus 2024, 09:30",
    title: "Jadwal Wisuda Periode Agustus 2024",
    content: "Pengumuman jadwal dan tata cara pelaksanaan wisuda untuk periode Agustus 2024.",
    links: [
      { text: "Jadwal Wisuda Agustus 2024.pdf", url: "#" },
    ],
  },
  {
    icon: "🏆",
    date: "Jumat, 16 Agustus 2024, 14:00",
    title: "Prestasi Mahasiswa dalam Kompetisi Nasional",
    content: "Selamat kepada mahasiswa STT Nurul Fikri yang telah meraih juara dalam kompetisi programming tingkat nasional.",
    links: [
      { text: "Daftar Pemenang Kompetisi.pdf", url: "#" },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="relative h-[50vh] flex flex-col justify-center items-center text-center text-white p-8 overflow-hidden rounded-b-3xl">
        <Image
          src="https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero"
          fill
          className="object-cover object-center brightness-50"
        />
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-bold">
            Selamat datang di<br />E-Campus STT Nurul Fikri
          </h1>
          <p className="max-w-md mx-auto">
            Membangun masa depan melalui pendidikan teknologi yang inovatif dan berkualitas.
          </p>
          <Button size="lg" className="mt-4">
            Mulai Sekarang
          </Button>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 space-y-12">
        <Card className="bg-white shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <nav className="flex items-center justify-center divide-x divide-border">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 size-full text-sm hover:bg-gray-100 transition-colors duration-200 flex-1 text-center"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AcademicCalendar />
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
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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
      </main>
    </>
  );
}