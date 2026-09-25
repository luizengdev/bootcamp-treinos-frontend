import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

interface ExerciseBadgeProps {
  children: ReactNode;
}

export const ExerciseBadge = ({ children }: ExerciseBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className="h-[22px] rounded-full bg-border px-2.5 py-[5px] font-heading text-xs leading-none font-semibold text-muted-foreground uppercase [&>svg]:size-3.5!"
    >
      {children}
    </Badge>
  );
};
