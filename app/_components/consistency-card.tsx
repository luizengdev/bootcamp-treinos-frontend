import dayjs from "dayjs";

import { ConsistencyDay } from "@/app/_components/consistency-day";
import type { GetHomeData200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import { WEEK_DAY_INITIALS } from "@/app/_lib/week-days";

interface ConsistencyCardProps {
  consistencyByDay: GetHomeData200ConsistencyByDay;
  today: string;
}

const getMondayFirstIndex = (date: string) => (dayjs(date).day() + 6) % 7;

export const ConsistencyCard = ({ consistencyByDay, today }: ConsistencyCardProps) => {
  const days = Object.entries(consistencyByDay).sort(
    ([dateA], [dateB]) => getMondayFirstIndex(dateA) - getMondayFirstIndex(dateB),
  );

  return (
    <div className="flex flex-1 items-center justify-between rounded-[12px] border border-border p-5">
      {days.map(([date, { workoutDayCompleted, workoutDayStarted }]) => (
        <ConsistencyDay
          key={date}
          label={WEEK_DAY_INITIALS[dayjs(date).day()]}
          isCompleted={workoutDayCompleted}
          isStarted={workoutDayStarted}
          isToday={date === today}
        />
      ))}
    </div>
  );
};
