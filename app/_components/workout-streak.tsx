import Image from "next/image";

interface WorkoutStreakProps {
  streak: number;
}

export const WorkoutStreak = ({ streak }: WorkoutStreakProps) => {
  return (
    <div className="flex items-center gap-2 self-stretch rounded-[12px] bg-streak/8 px-5 py-2">
      <Image src="/fire-icon.svg" alt="" width={15.4979} height={20} />
      <span className="font-heading text-base leading-[1.15] font-semibold text-foreground">
        {streak}
      </span>
    </div>
  );
};
