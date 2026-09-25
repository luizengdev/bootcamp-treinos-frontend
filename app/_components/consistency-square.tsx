import { cn } from "@/lib/utils";

interface ConsistencySquareProps {
  isCompleted: boolean;
  isStarted: boolean;
  isToday?: boolean;
}

export const ConsistencySquare = ({ isCompleted, isStarted, isToday = false }: ConsistencySquareProps) => {
  return (
    <div
      className={cn(
        "size-5 shrink-0 rounded-[6px]",
        isCompleted && "bg-primary",
        !isCompleted && isStarted && "bg-primary/20",
        !isCompleted && !isStarted && isToday && "border-[1.6px] border-primary",
        !isCompleted && !isStarted && !isToday && "border border-border",
      )}
    />
  );
};
