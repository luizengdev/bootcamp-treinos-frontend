import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import { BottomNavigation } from "@/app/_components/bottom-navigation";
import { ConsistencyCard } from "@/app/_components/consistency-card";
import { HomeBanner } from "@/app/_components/home-banner";
import { SectionHeader } from "@/app/_components/section-header";
import { WorkoutDayCard } from "@/app/_components/workout-day-card";
import { WorkoutStreak } from "@/app/_components/workout-streak";
import { getHomeData, getUserTrainData } from "@/app/_lib/api/fetch-generated";
import { getWorkoutDayPath } from "@/app/_lib/routes";

const Home = async () => {
  const today = dayjs().format("YYYY-MM-DD");
  const [homeData, trainData] = await Promise.all([getHomeData(today), getUserTrainData()]);

  if (homeData.status === 401) redirect("/auth");
  if (homeData.status === 404) redirect("/onboarding");
  if (homeData.status !== 200) {
    throw new Error("Failed to fetch home data");
  }

  if (trainData.status !== 200) {
    throw new Error("Failed to fetch user train data");
  }
  if (!trainData.data) redirect("/onboarding");

  const { todayWorkoutDay, workoutStreak, consistencyByDay } = homeData.data;

  return (
    <main className="flex min-h-svh flex-col items-center bg-background pb-32">
      <HomeBanner userName={trainData.data.userName} />

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
          href={getWorkoutDayPath(homeData.data.activeWorkoutPlanId, todayWorkoutDay.id)}
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
