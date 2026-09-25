"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { startWorkoutSessionAction } from "../_actions/start-workout-session";

interface StartWorkoutButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
}

export const StartWorkoutButton = ({ workoutPlanId, workoutDayId }: StartWorkoutButtonProps) => {
  const [isStarting, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => startWorkoutSessionAction(workoutPlanId, workoutDayId));
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isStarting}
      className="h-auto rounded-full px-4 py-2 font-heading text-sm leading-none font-semibold"
    >
      Iniciar Treino
    </Button>
  );
};
