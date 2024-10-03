import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CalendarIcon, Paperclip } from "lucide-react"
import Link from "next/link"

interface Link {
  text: string
  url: string
}

interface BlogCardProps {
  icon: string
  date: string
  title: string
  content: string
  links: Link[]
}

function CardIcon({ icon }: { icon: string }) {
  return (
    <div className="p-2 w-10 h-10 flex items-center justify-center">
      <span className="text-lg font-bold">{icon}</span>
    </div>
  )
}

function CardDate({ date }: { date: string }) {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <CalendarIcon className="mr-1 h-4 w-4" />
      {date}
    </div>
  )
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
          <span className="line-clamp-1">
            {link.text}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default function BlogCard({ icon, date, title, content, links }: BlogCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardIcon icon={icon} />
        <CardDate date={date} />
      </CardHeader>
      <CardContent>
        <h2 className="mb-2 text-lg font-bold">{title}</h2>
        <p className="text-sm mb-4">{content}</p>
      </CardContent>
      <CardFooter>
        <CardLinks links={links} />
      </CardFooter>
    </Card>
  )
}