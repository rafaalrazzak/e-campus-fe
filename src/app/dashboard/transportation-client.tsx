"use client";

import { Hero } from "@/components/common/hero";
import { Section } from "@/components/common/section";
import {
  TransportationCard,
  TransportationCardProps,
} from "@/components/common/transportation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useRouterStuff } from "@/hooks/use-router-stuff";
import { MapPinIcon, Search } from "lucide-react";

const transportationData: TransportationCardProps[] = [
  {
    title: "Transportasi Umum",
    travelTime: "30 menit",
    timeRange: "14:00 - 14:30",
    isReduceCarbon: true,
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

export function TransportationClient() {
  const { queryParams, searchParamsObj } = useRouterStuff();
  const selectedTransportation = searchParamsObj["transportation"] || "public";

  const filteredTransportationData = transportationData.filter((transport) => {
    if (selectedTransportation === "public") {
      return transport.title === "Transportasi Umum";
    }
    if (selectedTransportation === "private") {
      return transport.title === "Transportasi Pribadi";
    }
    return true;
  });

  return (
    <Section title="Transportasi menuju kampus">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-2">
          <Input
            leftIcon={<Search size={16} />}
            placeholder="Cari lokasi Anda"
            className="grouw"
          />

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<MapPinIcon size={16} />}
            className="shrink-0"
          >
            Lokasi Saat Ini
          </Button>
        </div>

        <Select
          placeholder="Pilih jenis transportasi"
          options={[
            { label: "Transportasi Umum", value: "public" },
            { label: "Transportasi Pribadi", value: "private" },
          ]}
          value={selectedTransportation}
          onChange={(value) => {
            queryParams({
              set: { transportation: value },
              replace: true,
            });
          }}
        />
      </div>

      {filteredTransportationData.map((transport, index) => (
        <TransportationCard key={index} {...transport} />
      ))}
    </Section>
  );
}