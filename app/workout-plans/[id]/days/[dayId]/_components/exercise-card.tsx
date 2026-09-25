import { CircleQuestionMark, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ExerciseBadge } from "./exercise-badge";

interface ExerciseCardProps {
  name: string;
  sets: number;
  reps: number;
  restTimeInSeconds: number;
}

export const ExerciseCard = ({ name, sets, reps, restTimeInSeconds }: ExerciseCardProps) => {
  const setsLabel = sets === 1 ? "série" : "séries";

  return (
    <div className="flex w-full flex-col gap-3 rounded-[12px] border border-border p-5">
      <div className="flex w-full items-center justify-between">
        <h3 className="font-heading text-base leading-[1.4] font-semibold text-foreground">
          {name}
        </h3>
        <Button
          type="button"
          variant="ghost"
          aria-label={`Ajuda sobre ${name}`}
          className="size-5 p-0 text-foreground hover:bg-transparent"
        >
          <CircleQuestionMark className="size-5" />
        </Button>
      </div>
      <div className="flex items-start gap-1.5">
        <ExerciseBadge>
          {sets} {setsLabel}
        </ExerciseBadge>
        <ExerciseBadge>{reps} reps</ExerciseBadge>
        <ExerciseBadge>
          <Zap strokeWidth={1.5} />
          {restTimeInSeconds}s
        </ExerciseBadge>
      </div>
    </div>
  );
};
