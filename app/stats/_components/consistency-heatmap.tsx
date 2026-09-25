import { ConsistencySquare } from "@/app/_components/consistency-square";
import type { GetStats200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";

import type { ConsistencyMonth } from "../_lib/consistency-months";
import { HeatmapScrollArea } from "./heatmap-scroll-area";

interface ConsistencyHeatmapProps {
  months: ConsistencyMonth[];
  consistencyByDay: GetStats200ConsistencyByDay;
}

export const ConsistencyHeatmap = ({ months, consistencyByDay }: ConsistencyHeatmapProps) => {
  return (
    <HeatmapScrollArea>
      {months.map((month) => (
        <div key={month.key} className="flex shrink-0 flex-col items-start justify-center gap-1.5">
          <p className="font-heading text-xs leading-[1.4] whitespace-nowrap text-muted-foreground">
            {month.label}
          </p>
          <div className="flex items-start gap-1">
            {month.weeks.map((week, weekIndex) => (
              <div key={`${month.key}-${weekIndex}`} className="flex flex-col items-start gap-1">
                {week.map((date, dayIndex) =>
                  date ? (
                    <ConsistencySquare
                      key={date}
                      isCompleted={consistencyByDay[date]?.workoutDayCompleted ?? false}
                      isStarted={consistencyByDay[date]?.workoutDayStarted ?? false}
                    />
                  ) : (
                    <div key={`${month.key}-${weekIndex}-${dayIndex}`} className="size-5 shrink-0" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </HeatmapScrollArea>
  );
};
