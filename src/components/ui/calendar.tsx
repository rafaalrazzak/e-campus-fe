"use client"

import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

interface Event {
  date: Date;
  title: string;
}

interface CalendarProps {
  events?: Event[];
}

type ViewMode = 'day' | 'month' | 'year';

export const Calendar: React.FC<CalendarProps> = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('day');

  const navigateDate = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      switch (viewMode) {
        case 'day':
          newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
          break;
        case 'month':
          newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
          break;
        case 'year':
          newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 10 : -10));
          break;
      }
      return newDate;
    });
  }, [viewMode]);

  const getDaysInMonth = useCallback((date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysArray = [];

    // Add days from previous month to start the calendar on the correct day of the week
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevMonthDay = new Date(year, month, -i);
      daysArray.unshift(prevMonthDay);
    }

    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(year, month, i));
    }

    // Add days from next month to complete the last week
    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        daysArray.push(new Date(year, month + 1, i));
      }
    }

    return daysArray;
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    });
  }, [events, currentDate]);

  const hasEvent = useCallback((date: Date) =>
    filteredEvents.some(event => event.date.toDateString() === date.toDateString()),
    [filteredEvents]);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleViewChange = useCallback(() => {
    setViewMode(prevMode => {
      switch (prevMode) {
        case 'day': return 'month';
        case 'month': return 'year';
        case 'year': return 'day';
      }
    });
  }, []);

  const handleMonthSelect = useCallback((month: number) => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), month, 1));
    setViewMode('day');
  }, []);

  const handleYearSelect = useCallback((year: number) => {
    setCurrentDate(prevDate => new Date(year, prevDate.getMonth(), 1));
    setViewMode('month');
  }, []);

  const renderDayView = useMemo(() => {
    const calendarDays = getDaysInMonth(currentDate);

    return (
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(day => (
          <div key={day} className="text-center font-bold text-xs text-muted-foreground p-1">{day}</div>
        ))}
        {calendarDays.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          return (
            <Button
              key={index}
              variant="ghost"
              onClick={() => handleDateSelect(date)}
              className={cn(
                "h-8 w-full p-0 text-xs relative",
                !isCurrentMonth && "text-muted-foreground opacity-50",
                date.toDateString() === new Date().toDateString() && "text-primary font-bold",
                date.toDateString() === selectedDate.toDateString() && "bg-primary text-primary-foreground"
              )}
            >
              {date.getDate()}
              {hasEvent(date) && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Button>
          );
        })}
      </div>
    );
  }, [currentDate, selectedDate, getDaysInMonth, handleDateSelect, hasEvent]);

  const renderMonthView = useMemo(() => (
    <div className="grid grid-cols-3 gap-4">
      {MONTHS.map((month, index) => (
        <Button
          key={month}
          variant="outline"
          onClick={() => handleMonthSelect(index)}
          className="h-20"
        >
          {month}
        </Button>
      ))}
    </div>
  ), [handleMonthSelect]);

  const renderYearView = useMemo(() => {
    const startYear = Math.floor(currentDate.getFullYear() / 10) * 10;
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 12 }, (_, i) => startYear + i - 1).map(year => (
          <Button
            key={year}
            variant="outline"
            onClick={() => handleYearSelect(year)}
            className="h-20"
          >
            {year}
          </Button>
        ))}
      </div>
    );
  }, [currentDate, handleYearSelect]);

  const headerText = useMemo(() => {
    switch (viewMode) {
      case 'day': return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      case 'month': return `${currentDate.getFullYear()}`;
      case 'year': return `${Math.floor(currentDate.getFullYear() / 10) * 10}s`;
    }
  }, [currentDate, viewMode]);

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={handleViewChange} className="text-lg font-bold flex items-center">
          {headerText}
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => navigateDate('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigateDate('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {viewMode === 'day' && renderDayView}
      {viewMode === 'month' && renderMonthView}
      {viewMode === 'year' && renderYearView}

      {viewMode === 'day' && filteredEvents.length > 0 && (
        <div className="space-y-2">
          {filteredEvents.map((event, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm bg-muted p-2 rounded">
              <div className="w-1 h-4 bg-primary rounded" />
              <div className="font-medium flex justify-between w-full gap-2">
                <span className='line-clamp-1'>
                  {event.title}
                </span>
                <span className='text-muted-foreground shrink-0'>
                  {event.date.toLocaleDateString("id-ID", {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};