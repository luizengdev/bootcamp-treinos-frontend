import Image from "next/image";

interface StreakBannerProps {
  streak: number;
}

export const StreakBanner = ({ streak }: StreakBannerProps) => {
  const isStreakActive = streak > 0;
  const streakLabel = streak === 1 ? "dia" : "dias";

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-[12px] px-5 py-10">
      <Image
        src={isStreakActive ? "/streak-banner-active.png" : "/streak-banner-inactive.png"}
        alt=""
        fill
        preload
        sizes="(max-width: 768px) 100vw, 768px"
        className="pointer-events-none object-cover"
      />
      <div className="relative flex flex-col items-center gap-3">
        <div className="rounded-full border border-background/12 bg-background/12 p-3 backdrop-blur-[4px]">
          <Image
            src={isStreakActive ? "/streak-fire-active.svg" : "/streak-fire-inactive.svg"}
            alt=""
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-1 whitespace-nowrap text-background">
          <p className="text-center font-heading text-5xl leading-[0.95] font-semibold">
            {streak} {streakLabel}
          </p>
          <p className="font-heading text-base leading-[1.15] opacity-60">Sequência Atual</p>
        </div>
      </div>
    </div>
  );
};
