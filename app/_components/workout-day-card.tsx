import { Calendar, Dumbbell, Timer } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import type { GetHomeData200TodayWorkoutDayWeekDay } from "@/app/_lib/api/fetch-generated";
import { WEEK_DAY_LABELS } from "@/app/_lib/week-days";

interface WorkoutDayCardProps {
  name: string;
  weekDay: GetHomeData200TodayWorkoutDayWeekDay;
  estimatedDurationInSeconds: number;
  exercisesCount: number;
  coverImageUrl?: string;
  action?: ReactNode;
}

export const WorkoutDayCard = ({
  name,
  weekDay,
  estimatedDurationInSeconds,
  exercisesCount,
  coverImageUrl,
  action,
}: WorkoutDayCardProps) => {
  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);
  const exercisesLabel = exercisesCount === 1 ? "exercício" : "exercícios";

  return (
    <div className="relative flex h-[200px] w-full flex-col items-start justify-between overflow-hidden rounded-[12px] bg-foreground p-5">
      {coverImageUrl && (
        <Image
          src={coverImageUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="pointer-events-none object-cover"
        />
      )}

      <div className="relative flex items-center justify-center gap-1 rounded-full bg-background/16 px-2.5 py-[5px] backdrop-blur-[4px]">
        <Calendar className="size-3.5 text-background" strokeWidth={1.5} />
        <span className="font-heading text-xs leading-none font-semibold text-background uppercase">
          {WEEK_DAY_LABELS[weekDay]}
        </span>
      </div>

      <div className="relative flex w-full items-end justify-between">
        <div className="flex flex-col items-start gap-2">
          <h3 className="font-heading text-2xl leading-[1.05] font-semibold text-background">
            {name}
          </h3>
          <div className="flex items-start gap-2">
            <div className="flex items-center justify-center gap-1">
              <Timer className="size-3.5 text-background" strokeWidth={1.5} />
              <span className="font-heading text-xs leading-[1.4] text-background/70">
                {durationInMinutes}min
              </span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Dumbbell className="size-3.5 text-background" strokeWidth={1.5} />
              <span className="font-heading text-xs leading-[1.4] text-background/70">
                {exercisesCount} {exercisesLabel}
              </span>
            </div>
          </div>
        </div>
        {action}
      </div>
    </div>
  );
};
