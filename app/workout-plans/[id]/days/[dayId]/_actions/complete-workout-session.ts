"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

import { updateWorkoutSession } from "@/app/_lib/api/fetch-generated";
import { getWorkoutDayPath } from "@/app/_lib/routes";

interface CompleteWorkoutSessionInput {
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
}

export const completeWorkoutSessionAction = async ({
  workoutPlanId,
  workoutDayId,
  sessionId,
}: CompleteWorkoutSessionInput) => {
  const response = await updateWorkoutSession(workoutPlanId, workoutDayId, sessionId, {
    completedAt: dayjs().toISOString(),
  });

  if (response.status !== 200) {
    throw new Error(response.data.error);
  }

  revalidatePath(getWorkoutDayPath(workoutPlanId, workoutDayId));
};
