"use server";

import { revalidatePath } from "next/cache";

import { startWorkoutSession } from "@/app/_lib/api/fetch-generated";
import { getWorkoutDayPath } from "@/app/_lib/routes";

export const startWorkoutSessionAction = async (workoutPlanId: string, workoutDayId: string) => {
  const response = await startWorkoutSession(workoutPlanId, workoutDayId);

  if (response.status !== 201) {
    throw new Error(response.data.error);
  }

  revalidatePath(getWorkoutDayPath(workoutPlanId, workoutDayId));
};
