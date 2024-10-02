import { ListInfoCalendar } from "@/components/home/calendar";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="flex flex-col p-8 w-full bg-center rounded-b-3xl text-white relative overflow-clip gap-8">
        <Image src="https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero" fill className="brightness-50 object-cover bg-center -z-10" />

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold flex flex-col">
            Selamat datang di E-Campus STT Nurul Fikri
          </h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>

        <button className="bg-primary text-primary-foreground p-4 rounded-lg">Get Started</button>
      </section>

      <main className="flex flex-col justify-center flex-1 px-4 py-8 gap-8">

        <section className="flex divide-x divide-border py-8 items-center justify-center w-full gap-4 bg-white border drop-shadow-lg rounded-3xl px-8">
          <Link href="/vision-mission" className="px-4">
            Visi Misi
          </Link>
          <Link href="/majors" className="px-4">
            Program Studi
          </Link>
          <Link href="/curriculum" className="px-4">
            Kurikulum
          </Link>
        </section>

        <section className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            Kalendar Akademik
          </h1>

          {/* Calendar */}

          <div className="flex flex-col gap-4">
            <ListInfoCalendar title="Semester Genap" date="12 Januari 2022" />
            <ListInfoCalendar title="Semester Genap" date="12 Januari 2022" />
            <ListInfoCalendar title="Semester Genap" date="12 Januari 2022" />
          </div>
        </section>

        <section className="flex flex-col gap-4 bg-white border px-4 py-2 rounded-2xl">
          <h1 className="text-xl font-bold">Informasi Prodi</h1>

          <div>
            <h2 className="font-semibold">Teknik Informatika</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
          </div>
        </section>

        <section className="flex flex-col gap-4 bg-white border px-4 py-2 rounded-2xl">
          <h1 className="text-xl font-bold">Informasi Umum</h1>

          <div>
            <h2 className="font-semibold">Teknik Informatika</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
          </div>
        </section>

        <section>
          <div className="flex justify-between">
            <div>
              <span className="font-light">
                Tetap Update
              </span>
              <h1 className="font-bold">
                Berita Terbaru
              </h1>
            </div>
            {/* Button */}
          </div>
        </section>


      </main>
    </>
  );
}
