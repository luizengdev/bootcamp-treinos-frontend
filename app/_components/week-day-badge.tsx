import { Calendar } from "lucide-react";

import type { GetHomeData200TodayWorkoutDayWeekDay } from "@/app/_lib/api/fetch-generated";
import { WEEK_DAY_LABELS } from "@/app/_lib/week-days";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WeekDayBadgeProps {
  weekDay: GetHomeData200TodayWorkoutDayWeekDay;
  variant?: "overlay" | "muted";
}

export const WeekDayBadge = ({ weekDay, variant = "overlay" }: WeekDayBadgeProps) => {
  return (
    <Badge
      className={cn(
        "relative h-auto gap-1 rounded-full px-2.5 py-[5px] font-heading text-xs leading-none font-semibold uppercase backdrop-blur-[4px] [&>svg]:size-3.5!",
        variant === "overlay" ? "bg-background/16 text-background" : "bg-foreground/8 text-foreground",
      )}
    >
      <Calendar strokeWidth={1.5} />
      {WEEK_DAY_LABELS[weekDay]}
    </Badge>
  );
};
