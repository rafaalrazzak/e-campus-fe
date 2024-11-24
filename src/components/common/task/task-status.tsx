import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { Calendar, Clock, AlertCircle, Award, User, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useState, memo } from "react";

type TaskProps = Pick<Task, "description" | "deadline" | "timeRemaining" | "points" | "lecture" | "important">;

interface InfoItemProps {
    icon: JSX.Element;
    title: string;
    content: React.ReactNode;
    isExpandable?: boolean;
}

const splitIntoParagraphs = (text: string) =>
    text.split("\n").map((paragraph, idx) => (
        <p key={idx} className="text-sm text-muted-foreground">
            {paragraph}
        </p>
    ));

const InfoItem = memo(function InfoItem({ icon, title, content, isExpandable = false }: InfoItemProps) {
    const [isExpanded, setIsExpanded] = useState(!isExpandable);

    const toggleExpansion = () => {
        if (isExpandable) {
            setIsExpanded((prev) => !prev);
        }
    };

    const contentElement = typeof content === "string" ? <div className="space-y-2 py-1">{splitIntoParagraphs(content)}</div> : content;

    return (
        <div className="flex items-start space-x-2">
            <div className="mt-0.5 shrink-0">{icon}</div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="font-medium">{title}</p>
                    {isExpandable && (
                        <button onClick={toggleExpansion} className="p-1 hover:bg-muted rounded-full transition-colors" aria-label={isExpanded ? "Collapse section" : "Expand section"}>
                            {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                        </button>
                    )}
                </div>
                <div className={cn("overflow-hidden transition-all duration-200", { "max-h-96": isExpanded, "max-h-0": !isExpanded })}>{contentElement}</div>
            </div>
        </div>
    );
});

const ICON_STYLE = "h-5 w-5 text-muted-foreground" as const;

type TaskInfoConfig = (InfoItemProps | undefined)[];

const generateTaskInfo = ({ description, deadline, timeRemaining, points, lecture, important }: TaskProps): TaskInfoConfig => [
    description
        ? {
              icon: <FileText className={ICON_STYLE} />,
              title: "Deskripsi",
              content: description,
              isExpandable: true,
          }
        : undefined,
    {
        icon: <Calendar className={ICON_STYLE} />,
        title: "Tenggat Waktu",
        content: deadline,
    },
    {
        icon: <Clock className={ICON_STYLE} />,
        title: "Sisa Waktu",
        content: timeRemaining,
    },
    points
        ? {
              icon: <Award className={ICON_STYLE} />,
              title: "Poin",
              content: `${points} point`,
          }
        : undefined,
    lecture
        ? {
              icon: <User className={ICON_STYLE} />,
              title: "Dosen",
              content: lecture,
          }
        : undefined,
    important
        ? {
              icon: <AlertCircle className={ICON_STYLE} />,
              title: "Catatan Penting",
              content: (
                  <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      {important.map((note, index) => (
                          <li key={index}>{note}</li>
                      ))}
                  </ul>
              ),
          }
        : undefined,
];

export const TaskStatus = memo(function TaskStatus(props: TaskProps) {
    const taskInfo = generateTaskInfo(props).filter((info): info is InfoItemProps => info !== undefined);

    return (
        <Card className="sticky top-4">
            <CardHeader>
                <CardTitle>Informasi Tugas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {taskInfo.map((info, index) => (
                    <InfoItem key={index} {...info} />
                ))}
            </CardContent>
        </Card>
    );
});
