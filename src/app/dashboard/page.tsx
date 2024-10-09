import { Hero } from "@/components/common/hero";
import { Section } from "@/components/common/section";
import SubjectCard, { SubjectCardProps } from "@/components/common/subject";
import { TransportationCard, TransportationCardProps } from "@/components/common/transportation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { CalendarDaysIcon, MapPinIcon, Search } from "lucide-react";

const subjects: SubjectCardProps[] = [
  {
    status: "done",
    duration: "90 min",
    attendance: "Hadir",
    timeRange: "09:00 - 10:30",
    subject: "Web Development",
    topic: "Introduction to React",
    instructor: "Dr. Smith",
    room: "Room 101",
    participants: 20,
  },
  {
    status: "active",
    duration: "90 min",
    attendance: "Belum Hadir",
    timeRange: "11:00 - 12:30",
    subject: "Database Systems",
    topic: "SQL Fundamentals",
    instructor: "Prof. Johnson",
    room: "Room 202",
    participants: 25,
  },
  {
    status: "inactive",
    duration: "90 min",
    attendance: "Belum Hadir",
    timeRange: "14:00 - 15:30",
    subject: "Artificial Intelligence",
    topic: "Machine Learning Basics",
    instructor: "Dr. Lee",
    room: "Room 303",
    participants: 18,
  },
];

const transportationData: TransportationCardProps[] = [
  {
    title: "Transportasi Umum",
    travelTime: "30 menit",
    timeRange: "14:00 - 14:30",
    routes: [
      {
        placeName: "Stasiun Bojonggede",
        travelTime: "20 menit",
        arrivalTime: "14:16",
      },
      {
        placeName: "Stasiun Citayam",
        travelTime: "20 menit",
        arrivalTime: "14:19",
        badge: "Transit",
      },
      {
        placeName: "Stasiun Depok",
        travelTime: "20 menit",
        arrivalTime: "14:27",
      },
      {
        placeName: "Stasiun Depokbaru",
        travelTime: "20 menit",
        arrivalTime: "14:28",
      },
      {
        placeName: "Stasiun Pondokcina",
        travelTime: "20 menit",
        arrivalTime: "14:31",
      },
      {
        placeName: "Stasiun Univ. Indonesia",
        travelTime: "20 menit",
        arrivalTime: "14:34",
      },
    ],
  },
  {
    title: "Transportasi Pribadi",
    travelTime: "15 menit",
    timeRange: "14:00 - 14:15",
    routes: [
      { placeName: "Rumah", travelTime: "10 menit", arrivalTime: "14:10" },
      { placeName: "Kampus", travelTime: "5 menit", arrivalTime: "14:15" },
    ],
  },
];

export default function Page() {
  return (
    <>
      <Hero className="items-start gap-8 text-start" onlyImage>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary">Jadwal Hari Ini</h1>
            <p className="text-lg">{formatDate(new Date())}</p>
          </div>
          <Button
            variant="secondary-primary"
            leftIcon={<CalendarDaysIcon size={16} />}
          >
            Lihat Semua Jadwal
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, index) => (
            <SubjectCard key={index} {...subject} />
          ))}
        </div>
      </Hero>

      <main className="container px-4">
        <Section title="Transportasi menuju kampus">
          <div className="flex flex-col gap-4">
            <Input
              leftIcon={<Search size={16} />}
              placeholder="Cari lokasi Anda"
            />

            <Button
              variant="secondary"
              size="sm"
              leftIcon={<MapPinIcon size={16} />}
            >
              Lokasi Saat Ini
            </Button>
          </div>

          {transportationData.map((transport, index) => (
            <TransportationCard key={index} {...transport} />
          ))}
        </Section>
      </main>
    </>
  );
}
