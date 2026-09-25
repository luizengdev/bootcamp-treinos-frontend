import { cn } from "@/lib/utils";

interface ConsistencyDayProps {
  label: string;
  isCompleted: boolean;
  isStarted: boolean;
  isToday: boolean;
}

export const ConsistencyDay = ({ label, isCompleted, isStarted, isToday }: ConsistencyDayProps) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={cn(
          "size-5 rounded-[6px]",
          isCompleted && "bg-primary",
          !isCompleted && isStarted && "bg-primary/20",
          !isCompleted && !isStarted && isToday && "border-[1.6px] border-primary",
          !isCompleted && !isStarted && !isToday && "border border-border",
        )}
      />
      <span className="font-heading text-xs leading-[1.4] text-muted-foreground">{label}</span>
    </div>
  );
};
