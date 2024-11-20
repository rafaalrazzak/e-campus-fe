"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Send, Clock, MapPin, User, BookOpen } from "lucide-react";
import { format } from "date-fns";
import React from "react";

type SubjectSchedule = {
    id: string;
    date: Date;
    subjectName: string;
    room: string;
    topic: string;
    instructor: string;
    duration: number;
};

const exampleSubjectSchedule: SubjectSchedule[] = [
    { id: "1", date: new Date("2024-10-14T08:00:00Z"), subjectName: "CS101", room: "Lecture Hall A", topic: "Overview of CS fields", instructor: "Prof. Alan Turing", duration: 90 },
    { id: "2", date: new Date("2024-10-14T10:00:00Z"), subjectName: "MATH201", room: "Math Building 101", topic: "Limits and Continuity", instructor: "Dr. Isaac Newton", duration: 120 },
    { id: "3", date: new Date("2024-10-15T09:00:00Z"), subjectName: "CS110", room: "Computer Lab 1", topic: "Basic Python Syntax", instructor: "Ms. Ada Lovelace", duration: 180 },
    { id: "4", date: new Date("2024-10-16T13:00:00Z"), subjectName: "CS210", room: "CS Building 202", topic: "Arrays and Linked Lists", instructor: "Dr. Donald Knuth", duration: 120 },
    { id: "5", date: new Date("2024-10-17T11:00:00Z"), subjectName: "CS220", room: "Tech Center 305", topic: "HTML and CSS Basics", instructor: "Mr. Tim Berners-Lee", duration: 150 },
];

const suggestions = ["Create a balanced schedule", "Optimize for morning classes", "No Friday classes"];

function ScheduleCard({ item }: { item: SubjectSchedule }) {
    return (
        <Card className="mb-4">
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.subjectName}</h3>
                <div className="grid gap-2 text-sm">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{format(item.date, "EEEE, MMMM d, yyyy 'at' h:mm a")}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{item.room}</span>
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{item.instructor}</span>
                    </div>
                    <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>{item.topic}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function WeeklyCalendar({ schedule }: { schedule: SubjectSchedule[] }) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

    return (
        <div className="grid grid-cols-7 gap-1 text-xs">
            <div></div>
            {days.map((day) => (
                <div key={day} className="font-semibold text-center">
                    {day}
                </div>
            ))}
            {hours.map((hour) => (
                <React.Fragment key={hour}>
                    <div className="text-right pr-1">
                        {hour % 12 || 12} {hour < 12 ? "AM" : "PM"}
                    </div>
                    {days.map((day, dayIndex) => (
                        <div key={`${day}-${hour}`} className="border border-gray-200 h-6 relative">
                            {schedule
                                .filter((item) => item.date.getDay() === dayIndex + 1 && item.date.getHours() === hour)
                                .map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 bg-blue-200 text-blue-800 p-1 overflow-hidden"
                                    >
                                        {item.subjectName}
                                    </motion.div>
                                ))}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}

export default function AnimatedScheduleModal() {
    const [schedule, setSchedule] = useState(exampleSubjectSchedule);
    const [isGenerating, setIsGenerating] = useState(false);
    const [input, setInput] = useState("");
    const [showCard, setShowCard] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const generateSchedule = async (userPrompt: string) => {
        setIsGenerating(true);
        setShowCard(false);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const shuffled = [...exampleSubjectSchedule].sort(() => 0.5 - Math.random());
        setSchedule(shuffled);
        setIsGenerating(false);
        setShowCard(true);
        setInput("");
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="flex flex-col gap-4 min-h-screen justify-between">
            <div className="flex-grow overflow-auto flex flex-col gap-4">
                <WeeklyCalendar schedule={schedule} />
                <AnimatePresence>
                    {showCard && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <ScheduleCard item={schedule[0]} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex flex-col space-y-2 sticky bottom-0 px-4">
                {!showCard && (
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                            <Button key={index} variant="outline" size="sm" onClick={() => setInput(suggestion)}>
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                )}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (input.trim()) {
                            generateSchedule(input);
                        }
                    }}
                    className="flex items-center space-x-2"
                >
                    <Input ref={inputRef} placeholder="Describe your ideal schedule..." value={input} onChange={(e) => setInput(e.target.value)} className="flex-grow" disabled={isGenerating} />
                    <Button type="submit" disabled={isGenerating || !input.trim()}>
                        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        <span className="sr-only">Generate Schedule</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}
