import dayjs from "dayjs";
import Link from "next/link";

import { BottomNavigation } from "@/app/_components/bottom-navigation";
import { ConsistencyCard } from "@/app/_components/consistency-card";
import { HomeBanner } from "@/app/_components/home-banner";
import { SectionHeader } from "@/app/_components/section-header";
import { WorkoutDayCard } from "@/app/_components/workout-day-card";
import { WorkoutStreak } from "@/app/_components/workout-streak";
import { requireOnboarding } from "@/app/_lib/require-onboarding";
import { getWorkoutDayPath } from "@/app/_lib/routes";

const Home = async () => {
  const today = dayjs().format("YYYY-MM-DD");
  const { homeData, trainData } = await requireOnboarding();
  const { activeWorkoutPlanId, todayWorkoutDay, workoutStreak, consistencyByDay } = homeData;

  return (
    <main className="flex min-h-svh flex-col items-center bg-background pb-32">
      <HomeBanner userName={trainData.userName} />

      <section className="flex w-full flex-col items-start gap-3 px-5 pt-5">
        <SectionHeader title="Consistência" actionLabel="Ver histórico" />
        <div className="flex w-full items-center justify-center gap-3">
          <ConsistencyCard consistencyByDay={consistencyByDay} today={today} />
          <WorkoutStreak streak={workoutStreak} />
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-3 p-5">
        <SectionHeader title="Treino de Hoje" actionLabel="Ver treinos" />
        <Link
          href={getWorkoutDayPath(activeWorkoutPlanId, todayWorkoutDay.id)}
          className="w-full"
        >
          <WorkoutDayCard
            name={todayWorkoutDay.name}
            weekDay={todayWorkoutDay.weekDay}
            estimatedDurationInSeconds={todayWorkoutDay.estimatedDurationInSeconds}
            exercisesCount={todayWorkoutDay.exercisesCount}
            coverImageUrl={todayWorkoutDay.coverImageUrl}
          />
        </Link>
      </section>

      <BottomNavigation activeItem="home" />
    </main>
  );
};

export default Home;
