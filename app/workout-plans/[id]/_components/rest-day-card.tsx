import { Zap } from "lucide-react";

import { WeekDayBadge } from "@/app/_components/week-day-badge";
import type { GetWorkoutPlan200WorkoutDaysItemWeekDay } from "@/app/_lib/api/fetch-generated";

interface RestDayCardProps {
  weekDay: GetWorkoutPlan200WorkoutDaysItemWeekDay;
}

export const RestDayCard = ({ weekDay }: RestDayCardProps) => {
  return (
    <div className="flex h-[110px] w-full flex-col items-start justify-between rounded-[12px] bg-border p-5">
      <WeekDayBadge weekDay={weekDay} variant="muted" />
      <div className="flex items-center justify-center gap-2">
        <Zap className="size-5 fill-primary text-primary" />
        <h3 className="font-heading text-2xl leading-[1.05] font-semibold text-foreground">
          Descanso
        </h3>
      </div>
    </div>
  );
};
