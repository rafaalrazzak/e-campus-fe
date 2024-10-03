"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

interface Event {
  date: Date
  title: string
}

export function AcademicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 5, 1)) // June 2023
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 5, 22)) // June 22, 2023

  const events: Event[] = [
    { date: new Date(2023, 5, 15), title: "End of Semester" },
    { date: new Date(2023, 5, 22), title: "Summer Break Starts" },
    { date: new Date(2024, 4, 12), title: "Pengajuan Cuti Kuliah" }
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return Array.from(
      { length: 42 },
      (_, i) => {
        const day = i - (firstDay - 1)
        const currentMonthDay = day > 0 && day <= daysInMonth
        return currentMonthDay ? new Date(year, month, day) : null
      }
    )
  }

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1))
  }

  const hasEvent = (date: Date) => {
    return events.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    )
  }

  const calendarDays = getDaysInMonth(currentDate)

  return (
    <Card className="w-full max-w-md shadow-lg overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-2xl font-bold">Kalender Akademik</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {DAYS.map((day) => (
            <div key={day} className="text-center font-bold text-sm text-gray-500">
              {day}
            </div>
          ))}
          {calendarDays.map((date, index) => (
            <button
              key={index}
              onClick={() => date && setSelectedDate(date)}
              className={`
                relative text-center p-2 rounded-full text-sm
                ${!date ? 'invisible' : 'hover:bg-gray-100'}
                ${date && date.toDateString() === selectedDate.toDateString() ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                ${date && date.toDateString() === new Date().toDateString() ? "border border-primary" : ""}
              `}
              disabled={!date}
            >
              {date?.getDate()}
              {date && hasEvent(date) && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {events
            .filter(event => 
              event.date.getMonth() === currentDate.getMonth() &&
              event.date.getFullYear() === currentDate.getFullYear()
            )
            .map((event, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm bg-secondary p-2 rounded">
                <div className="w-1 h-4 bg-blue-500 rounded"></div>
                <div className="font-medium">{event.title}</div>
                <div className="text-gray-500">
                  {event.date.toLocaleDateString("en-US", { day: "numeric", month: "long" })}
                </div>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  )
}