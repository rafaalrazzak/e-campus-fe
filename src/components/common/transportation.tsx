"use client";

import { Badge, Button, Card, CardContent, CardFooter, CardTitle } from "@/components/ui";

import { motion } from "framer-motion";
import { ChevronDown, Leaf, Route } from "lucide-react";
import { useState } from "react";

export type TransportationCardProps = {
    title: string;
    travelTime: string;
    timeRange: string;
    isReduceCarbon?: boolean;
    routes: RouteTransportationProps[];
};

export type RouteTransportationProps = {
    placeName: string;
    travelTime: string;
    arrivalTime: string;
    badge?: string;
};

export function TransportationCard({ title, travelTime, timeRange, isReduceCarbon, routes }: TransportationCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleRoutes = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <Card className="flex flex-col gap-4">
            <CardContent className="flex flex-col gap-4">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col gap-1">
                        <CardTitle className="flex items-center gap-2 text-xl font-bold">
                            {title}

                            {isReduceCarbon && <Badge variant="success" size="sm" leftIcon={<Leaf size={16} />} />}
                        </CardTitle>
                        <Badge variant="secondary" size="fit">
                            Waktu tempuh {travelTime}
                        </Badge>
                    </div>
                    <Badge variant="dark" size="sm">
                        {timeRange}
                    </Badge>
                </div>

                <p className="text-sm text-secondary-foreground">Waktu tempuh dan rute ke kampus STT Nurul Fikri dari lokasi Anda. Selalu pertimbangkan waktu tempuh agar tidak terlambat.</p>

                <hr />

                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                    }}
                >
                    {routes.map((route, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="flex gap-2">
                                    <span className="font-semibold">{route.placeName}</span>
                                    {route.badge && (
                                        <Badge variant="secondary" size="none" className="px-4 py-1">
                                            {route.badge}
                                        </Badge>
                                    )}
                                </div>
                                <span className="text-sm text-gray-600">{route.travelTime}</span>
                            </div>

                            <span>{route.arrivalTime}</span>
                        </div>
                    ))}
                </motion.div>
            </CardContent>
            <CardFooter>
                <Button
                    size="full"
                    variant="secondary-primary"
                    leftIcon={<Route size={16} />}
                    onClick={toggleRoutes}
                    rightIcon={<ChevronDown size={16} className={`transition-transform${isOpen ? "rotate-180" : ""}`} />}
                >
                    Lihat Rute
                </Button>
            </CardFooter>
        </Card>
    );
}
