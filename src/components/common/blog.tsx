import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui";
import { Paperclip } from "lucide-react";
import Link from "next/link";

interface Link {
  text: string;
  url: string;
}

interface BlogCardProps {
  icon: string;
  date: string;
  title: string;
  content: string;
  author: string;
  links: Link[];
}

function CardIcon({ icon }: { icon: string }) {
  return (
    <div className="flex size-10 items-center justify-center p-2">
      <span className="text-lg font-bold">{icon}</span>
    </div>
  );
}

function CardDate({ date }: { date: string }) {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      {date}
    </div>
  );
}

function CardAuthor({ author }: { author: string }) {
  return (
    <div className="flex items-center text-sm font-medium text-gray-600">
      Diposting oleh {author}
    </div>
  );
}

function CardLinks({ links }: { links: Link[] }) {
  return (
    <div className="flex flex-col space-y-2">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <Paperclip className="mr-1 h-4 w-4" />
          <span className="line-clamp-1">{link.text}</span>
        </Link>
      ))}
    </div>
  );
}

export function BlogCard({
  icon,
  date,
  title,
  content,
  author,
  links,
}: BlogCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardIcon icon={icon} />
        <CardDate date={date} />
      </CardHeader>
      <CardContent>
        <CardAuthor author={author} />
        <h2 className="mb-2 text-lg font-bold">{title}</h2>
        <p className="mb-4 text-sm">{content}</p>
      </CardContent>
      <CardFooter>
        <CardLinks links={links} />
      </CardFooter>
    </Card>
  );
}
