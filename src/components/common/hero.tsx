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
        "relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden rounded-b-3xl p-8 text-center text-white",
        className,
      )}
    >
      <Image
        src="https://assets.siakadcloud.com/uploads/sttnurulfikri/bgaplikasi/1405.jpg"
        alt="Hero"
        fill
        className="-z-10 object-cover object-center brightness-[0.2]"
      />
      <div className="container relative mx-auto flex flex-col justify-center gap-8">
        {!onlyImage && (
          <div className="flex flex-col gap-6 text-center">
            <h1 className="text-4xl font-bold">
              Selamat datang di
              <br />
              E-Campus STT Nurul Fikri
            </h1>
            <p className="mx-auto max-w-lg">
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
