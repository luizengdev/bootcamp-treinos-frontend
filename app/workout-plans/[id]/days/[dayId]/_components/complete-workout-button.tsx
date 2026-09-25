"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { completeWorkoutSessionAction } from "../_actions/complete-workout-session";

interface CompleteWorkoutButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
}

export const CompleteWorkoutButton = ({
  workoutPlanId,
  workoutDayId,
  sessionId,
}: CompleteWorkoutButtonProps) => {
  const [isCompleting, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() =>
      completeWorkoutSessionAction({ workoutPlanId, workoutDayId, sessionId }),
    );
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={isCompleting}
      className="h-auto w-full rounded-full py-3 font-heading text-sm leading-none font-semibold text-foreground"
    >
      Marcar como concluído
    </Button>
  );
};
