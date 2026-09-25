import dayjs from "dayjs";
import { notFound, redirect } from "next/navigation";

import { BottomNavigation } from "@/app/_components/bottom-navigation";
import { WorkoutDayCard } from "@/app/_components/workout-day-card";
import { getWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { WEEK_DAY_LABELS, WEEK_DAYS_BY_INDEX } from "@/app/_lib/week-days";
import { Button } from "@/components/ui/button";

import { BackButton } from "./_components/back-button";
import { ExerciseCard } from "./_components/exercise-card";
import { StartWorkoutButton } from "./_components/start-workout-button";

const WorkoutDayPage = async ({ params }: PageProps<"/workout-plans/[id]/days/[dayId]">) => {
  const { id: workoutPlanId, dayId: workoutDayId } = await params;
  const workoutDay = await getWorkoutDay(workoutPlanId, workoutDayId);

  if (workoutDay.status === 401) redirect("/auth");
  if (workoutDay.status === 403 || workoutDay.status === 404) notFound();
  if (workoutDay.status !== 200) {
    throw new Error("Failed to fetch workout day");
  }

  const { name, weekDay, estimatedDurationInSeconds, coverImageUrl, exercises, sessions } =
    workoutDay.data;
  const isToday = WEEK_DAYS_BY_INDEX[dayjs().day()] === weekDay;
  const hasSessionInProgress = sessions.some((session) => !session.completedAt);
  const hasCompletedSession = sessions.some((session) => Boolean(session.completedAt));
  const hasNoSession = sessions.length === 0;

  return (
    <main className="flex min-h-svh flex-col items-center bg-background pb-32">
      <section className="flex w-full flex-col items-start gap-5 p-5">
        <div className="flex w-full items-center justify-between">
          <BackButton />
          <h1 className="font-heading text-lg leading-[1.4] font-semibold text-foreground">
            {isToday ? "Treino de Hoje" : WEEK_DAY_LABELS[weekDay]}
          </h1>
          <div className="size-6" />
        </div>

        <WorkoutDayCard
          name={name}
          weekDay={weekDay}
          estimatedDurationInSeconds={estimatedDurationInSeconds}
          exercisesCount={exercises.length}
          coverImageUrl={coverImageUrl}
          action={
            <>
              {hasNoSession && (
                <StartWorkoutButton workoutPlanId={workoutPlanId} workoutDayId={workoutDayId} />
              )}
              {hasCompletedSession && (
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto rounded-full px-4 py-2 font-heading text-sm leading-none font-semibold text-background hover:bg-background/16 hover:text-background"
                >
                  Concluído!
                </Button>
              )}
            </>
          }
        />

        <div className="flex w-full flex-col items-start gap-3">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              sets={exercise.sets}
              reps={exercise.reps}
              restTimeInSeconds={exercise.restTimeInSeconds}
            />
          ))}
        </div>

        {hasSessionInProgress && (
          <Button
            type="button"
            variant="outline"
            className="h-auto w-full rounded-full py-3 font-heading text-sm leading-none font-semibold text-foreground"
          >
            Marcar como concluído
          </Button>
        )}
      </section>

      <BottomNavigation activeItem="calendar" />
    </main>
  );
};

export default WorkoutDayPage;
