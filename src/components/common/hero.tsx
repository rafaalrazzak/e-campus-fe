import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

export type HeroProps = {
  onlyImage?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export function Hero({ onlyImage = false, children, className }: HeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[50vh] flex flex-col justify-center items-center text-center text-white p-8 overflow-hidden rounded-b-3xl",
        className
      )}
    >
      <Image
        src="https://assets.siakadcloud.com/uploads/sttnurulfikri/bgaplikasi/1405.jpg"
        alt="Hero"
        fill
        className="object-cover object-center brightness-[0.2] -z-10"
      />
      <div className="relative gap-8 container mx-auto flex flex-col justify-center">
        {!onlyImage && (
          <div className="text-center flex flex-col gap-6">
            <h1 className="text-4xl font-bold">
              Selamat datang di
              <br />
              E-Campus STT Nurul Fikri
            </h1>
            <p className="max-w-lg mx-auto">
              Membangun masa depan melalui pendidikan teknologi yang inovatif
              dan berkualitas.
            </p>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
