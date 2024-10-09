import { cn } from "@/lib/utils";
import { AnimatedBackground } from "@/components/common";

export type HeroProps = {
  onlyImage?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export function Hero({ onlyImage = false, children, className }: HeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden rounded-b-3xl p-8 text-center",
        className,
      )}
    >
      <AnimatedBackground />

      <div className="container relative z-20 mx-auto flex flex-col justify-center gap-8">
        {!onlyImage && (
          <div className="flex flex-col gap-6 text-center">
            <h1 className="text-4xl font-bold text-primary sm:text-5xl md:text-6xl">
              Selamat datang di
              <br />
              E-Campus STT Nurul Fikri
            </h1>
            <p className="mx-auto max-w-lg text-lg text-secondary-foreground sm:text-xl">
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
