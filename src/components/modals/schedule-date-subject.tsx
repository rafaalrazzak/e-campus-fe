"use client";

import type { SubjectCalendarCardProps } from "@/components/common";
import type { Dispatch, SetStateAction } from "react";

import { Calendar, Modal } from "@/components/ui";
import { useScheduleModalContext } from "@/hooks/contexts";

import { useCallback, useMemo } from "react";

type ScheduleModalProps = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

const exampleSubjectSchedule: SubjectCalendarCardProps[] = [
    {
        date: new Date("2024-10-14T08:00:00Z"),
        subjectName: "CS101",
        room: "Lecture Hall A",
        topic: "Overview of CS fields",
        instructor: "Prof. Alan Turing",
        duration: 90,
    },
    {
        date: new Date("2024-10-14T10:00:00Z"),
        subjectName: "MATH201",
        room: "Math Building 101",
        topic: "Limits and Continuity",
        instructor: "Dr. Isaac Newton",
        duration: 120,
    },
    {
        date: new Date("2024-10-15T09:00:00Z"),
        subjectName: "CS110",
        room: "Computer Lab 1",
        topic: "Basic Python Syntax",
        instructor: "Ms. Ada Lovelace",
        duration: 180,
    },
    {
        date: new Date("2024-10-16T13:00:00Z"),
        subjectName: "CS210",
        room: "CS Building 202",
        topic: "Arrays and Linked Lists",
        instructor: "Dr. Donald Knuth",
        duration: 120,
    },
    {
        date: new Date("2024-10-17T11:00:00Z"),
        subjectName: "CS220",
        room: "Tech Center 305",
        topic: "HTML and CSS Basics",
        instructor: "Mr. Tim Berners-Lee",
        duration: 150,
    },
    {
        date: new Date("2024-10-18T14:00:00Z"),
        subjectName: "CS330",
        room: "Info Sciences 401",
        topic: "Relational Database Design",
        instructor: "Dr. Edgar Codd",
        duration: 120,
    },
    {
        date: new Date("2024-10-21T10:00:00Z"),
        subjectName: "CS440",
        room: "AI Lab",
        topic: "Introduction to Machine Learning",
        instructor: "Dr. Geoffrey Hinton",
        duration: 180,
    },
    {
        date: new Date("2024-10-22T09:00:00Z"),
        subjectName: "CS350",
        room: "Networking Lab",
        topic: "OSI Model and TCP/IP",
        instructor: "Dr. Vint Cerf",
        duration: 150,
    },
    {
        date: new Date("2024-10-23T13:00:00Z"),
        subjectName: "CS360",
        room: "Project Room 1",
        topic: "Agile Methodologies",
        instructor: "Ms. Mary Shaw",
        duration: 120,
    },
    {
        date: new Date("2024-10-24T11:00:00Z"),
        subjectName: "CS380",
        room: "Secure Lab 101",
        topic: "Cryptography Basics",
        instructor: "Dr. Bruce Schneier",
        duration: 150,
    },
];

export function ScheduleModal({ showModal, setShowModal }: ScheduleModalProps) {
    return (
        <Modal showModal={showModal} setShowModal={setShowModal} className="max-w-screen-lg" title="Jadwal Perkuliahan">
            <div className="grid max-h-[95vh] w-full gap-6 overflow-auto p-4 md:px-12 md:py-6">
                <Calendar items={exampleSubjectSchedule} isSubject />
            </div>
        </Modal>
    );
}

export function useScheduleModal() {
    const { showScheduleModal, setShowScheduleModal, toggleScheduleModal } = useScheduleModalContext();

    const MemoizedScheduleModal = useCallback(() => <ScheduleModal showModal={showScheduleModal} setShowModal={setShowScheduleModal} />, [showScheduleModal, setShowScheduleModal]);

    return useMemo(
        () => ({
            showScheduleModal,
            setShowScheduleModal,
            handleToggleScheduleModal: toggleScheduleModal,
            ScheduleModal: MemoizedScheduleModal,
        }),
        [showScheduleModal, setShowScheduleModal, toggleScheduleModal, MemoizedScheduleModal]
    );
}
