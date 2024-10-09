"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  QrCodeIcon,
  UsersIcon,
  CheckCircleIcon,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "inactive" | "active" | "done";
type Attendance = "Hadir" | "Tidak Hadir" | "Belum Hadir" | "Izin" | "Sakit";

export interface SubjectCardProps {
  status: Status;
  duration: string;
  attendance: Attendance;
  timeRange: string;
  subject: string;
  topic: string;
  instructor: string;
  room: string;
  participants: number;
  onScan?: () => void;
}

interface InfoItemProps {
  icon: ReactNode;
  text: string | number;
  color?: "secondary" | "dark" | "primary" | "success";
  size?: "sm" | "lg";
  bold?: boolean;
}

const InfoItem = ({
  icon,
  text,
  size,
  bold,
  color = "secondary",
}: InfoItemProps) => (
  <div
    className={cn(
      "flex items-center gap-2",
      {
        "text-muted-foreground": color === "secondary",
        "text-dark": color === "dark",
        "text-primary-foreground": color === "primary",
        "text-success-foreground": color === "success",
      },
      {
        "text-sm": size === "sm",
        "text-lg": size === "lg",
      },
    )}
  >
    {icon}
    <span className={cn("font-medium", bold && "font-semibold")}>{text}</span>
  </div>
);

const statusConfig: Record<
  Status,
  {
    color: string;
    text: string;
    badgeVariant: BadgeProps["variant"];
    textColor: string;
  }
> = {
  inactive: {
    color: "bg-secondary",
    text: "Belum Dimulai",
    badgeVariant: "secondary-dark",
    textColor: "text-secondary-foreground",
  },
  active: {
    color: "bg-primary",
    text: "Sedang Dimulai",
    badgeVariant: "secondary-primary",
    textColor: "text-primary-foreground",
  },
  done: {
    color: "bg-success",
    text: "Selesai",
    badgeVariant: "secondary-success",
    textColor: "text-success-foreground",
  },
};

const SubjectCard = ({
  status,
  duration,
  attendance,
  timeRange,
  subject,
  topic,
  instructor,
  room,
  participants,
  onScan,
}: SubjectCardProps) => {
  const { color, text, badgeVariant, textColor } = statusConfig[status];

  return (
    <Card>
      <CardHeader className={cn("-m-4 p-4", color, textColor)}>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-xl font-bold">{subject}</CardTitle>
          <Badge size="sm" variant={badgeVariant} className="text-xs font-semibold shrink-0">
            {text}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="my-4 space-y-4">
        <div className="flex items-center justify-between">
          <InfoItem
            icon={<ClockIcon className="size-5" />}
            text={timeRange}
            color="dark"
            size="lg"
            bold
          />
          <Badge size="sm" variant={attendance === "Hadir" ? "success" : "warning"} className="shrink-0">
            {attendance}
          </Badge>
        </div>

        <p className="line-clamp-2 text-lg font-medium">{topic}</p>

        <div className="grid grid-cols-2 gap-y-2">
          <InfoItem icon={<User className="size-4" />} text={instructor} />
          <InfoItem icon={<MapPinIcon className="size-4" />} text={room} />
          <InfoItem
            icon={<UsersIcon className="size-4" />}
            text={`${participants} mahasiswa/i`}
          />
          <InfoItem
            icon={<CalendarIcon className="size-4 text-muted-foreground" />}
            text={duration}
          />
        </div>
      </CardContent>

      <CardFooter>
        {status === "done" ? (
          <Button variant="outline" size="full" disabled>
            <CheckCircleIcon className="mr-2 size-4" />
            Kehadiran Tercatat
          </Button>
        ) : (
          <Button
            variant={status === "active" ? "primary" : "secondary"}
            size="full"
            onClick={onScan}
            disabled={status !== "active"}
          >
            <QrCodeIcon className="mr-2 size-4" />
            {status === "active" ? "Scan Kehadiran" : "Belum Dapat Scan"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;
