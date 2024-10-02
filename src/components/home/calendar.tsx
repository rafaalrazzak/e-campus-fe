import React from 'react';

type ListInfoCalendarProps = {
    title: string;
    date: string;
};

export function ListInfoCalendar({ title, date }: Readonly<ListInfoCalendarProps>) {
    return (
        <div className="flex items-stretch bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="w-1 bg-orange-400 shrink-0" />
            <div className="flex flex-col py-3 px-4">
                <h2 className="text-base font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500">{date}</p>
            </div>
        </div>
    );
}