import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { BottomNavigation } from "@/app/_components/bottom-navigation";
import { WorkoutDayCard } from "@/app/_components/workout-day-card";
import { getWorkoutPlan } from "@/app/_lib/api/fetch-generated";
import { requireOnboarding } from "@/app/_lib/require-onboarding";
import { getWorkoutDayPath } from "@/app/_lib/routes";
import { getMondayFirstWeekDayIndex } from "@/app/_lib/week-days";

import { RestDayCard } from "./_components/rest-day-card";
import { WorkoutPlanBanner } from "./_components/workout-plan-banner";

const WorkoutPlanPage = async ({ params }: PageProps<"/workout-plans/[id]">) => {
  const { id: workoutPlanId } = await params;
  const [, workoutPlan] = await Promise.all([requireOnboarding(), getWorkoutPlan(workoutPlanId)]);

  if (workoutPlan.status === 401) redirect("/auth");
  if (workoutPlan.status === 403 || workoutPlan.status === 404) notFound();
  if (workoutPlan.status !== 200) {
    throw new Error("Failed to fetch workout plan");
  }

  const workoutDays = workoutPlan.data.workoutDays.toSorted(
    (dayA, dayB) => getMondayFirstWeekDayIndex(dayA.weekDay) - getMondayFirstWeekDayIndex(dayB.weekDay),
  );

  return (
    <main className="flex min-h-svh flex-col items-center bg-background pb-32">
      <WorkoutPlanBanner workoutPlanName={workoutPlan.data.name} />

      <section className="flex w-full flex-col items-center gap-3 p-5">
        {workoutDays.map((workoutDay) =>
          workoutDay.isRest ? (
            <RestDayCard key={workoutDay.id} weekDay={workoutDay.weekDay} />
          ) : (
            <Link
              key={workoutDay.id}
              href={getWorkoutDayPath(workoutPlanId, workoutDay.id)}
              className="w-full"
            >
              <WorkoutDayCard
                name={workoutDay.name}
                weekDay={workoutDay.weekDay}
                estimatedDurationInSeconds={workoutDay.estimatedDurationInSeconds}
                exercisesCount={workoutDay.exercisesCount}
                coverImageUrl={workoutDay.coverImageUrl}
              />
            </Link>
          ),
        )}
      </section>

      <BottomNavigation activeItem="calendar" />
    </main>
  );
};

export default WorkoutPlanPage;
