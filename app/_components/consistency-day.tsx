import { ConsistencySquare } from "@/app/_components/consistency-square";

interface ConsistencyDayProps {
  label: string;
  isCompleted: boolean;
  isStarted: boolean;
  isToday: boolean;
}

export const ConsistencyDay = ({ label, isCompleted, isStarted, isToday }: ConsistencyDayProps) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <ConsistencySquare isCompleted={isCompleted} isStarted={isStarted} isToday={isToday} />
      <span className="font-heading text-xs leading-[1.4] text-muted-foreground">{label}</span>
    </div>
  );
};
