import Image from "next/image";

import { Button } from "@/components/ui/button";

interface HomeBannerProps {
  userName: string;
}

export const HomeBanner = ({ userName }: HomeBannerProps) => {
  const firstName = userName.split(" ")[0];

  return (
    <section className="relative flex h-[296px] w-full shrink-0 flex-col items-start justify-between overflow-hidden rounded-b-[20px] bg-foreground px-5 pt-5 pb-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/home-banner.jpg"
          alt=""
          width={2731}
          height={4096}
          preload
          className="absolute top-[-64.07%] left-0 h-[184.2%] w-full max-w-none object-cover"
        />
        <div className="absolute inset-0 bg-linear-[242.47deg] from-transparent from-[34.457%] to-foreground" />
      </div>

      <p className="relative font-display text-[22px] leading-[1.15] text-background uppercase">
        Fit.ai
      </p>

      <div className="relative flex w-full items-end justify-between">
        <div className="flex flex-col items-start gap-1.5 whitespace-nowrap">
          <h1 className="font-heading text-2xl leading-[1.05] font-semibold text-background">
            Olá, {firstName}
          </h1>
          <p className="font-heading text-sm leading-[1.15] text-background/70">
            Bora treinar hoje?
          </p>
        </div>
        <Button
          type="button"
          className="h-auto rounded-full px-4 py-2 font-heading text-sm leading-none font-semibold"
        >
          Bora!
        </Button>
      </div>
    </section>
  );
};
