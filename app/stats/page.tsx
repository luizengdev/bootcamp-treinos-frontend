import dayjs from "dayjs";
import { CircleCheck, CirclePercent, Hourglass } from "lucide-react";
import { redirect } from "next/navigation";

import { AppHeader } from "@/app/_components/app-header";
import { BottomNavigation } from "@/app/_components/bottom-navigation";
import { SectionHeader } from "@/app/_components/section-header";
import { StatCard } from "@/app/_components/stat-card";
import { getStats } from "@/app/_lib/api/fetch-generated";
import { requireOnboarding } from "@/app/_lib/require-onboarding";

import { ConsistencyHeatmap } from "./_components/consistency-heatmap";
import { StreakBanner } from "./_components/streak-banner";
import { DATE_FORMAT, getConsistencyMonths, getConsistencyStartDate } from "./_lib/consistency-months";

const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

const formatTotalTime = (totalTimeInSeconds: number) => {
  const hours = Math.floor(totalTimeInSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor((totalTimeInSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  return `${hours}h${String(minutes).padStart(2, "0")}m`;
};

const StatsPage = async () => {
  const today = dayjs().format(DATE_FORMAT);
  const [, stats] = await Promise.all([
    requireOnboarding(),
    getStats({ from: getConsistencyStartDate(today), to: today }),
  ]);

  if (stats.status === 401) redirect("/auth");
  if (stats.status !== 200) {
    throw new Error("Failed to fetch stats");
  }

  const { workoutStreak, consistencyByDay, completedWorkoutsCount, conclusionRate, totalTimeInSeconds } =
    stats.data;

  return (
    <main className="flex min-h-svh flex-col items-center bg-background pb-32">
      <AppHeader />

      <section className="flex w-full flex-col items-start px-5">
        <StreakBanner streak={workoutStreak} />
      </section>

      <section className="flex w-full flex-col items-start gap-3 p-5">
        <SectionHeader title="Consistência" />
        <ConsistencyHeatmap months={getConsistencyMonths(today)} consistencyByDay={consistencyByDay} />
        <div className="grid w-full grid-cols-2 gap-3">
          <StatCard icon={CircleCheck} value={String(completedWorkoutsCount)} label="Treinos Feitos" />
          <StatCard
            icon={CirclePercent}
            value={`${Math.round(conclusionRate * 100)}%`}
            label="Taxa de conclusão"
          />
          <StatCard
            icon={Hourglass}
            value={formatTotalTime(totalTimeInSeconds)}
            label="Tempo Total"
            className="col-span-2"
          />
        </div>
      </section>

      <BottomNavigation activeItem="stats" />
    </main>
  );
};

export default StatsPage;
