import { Goal } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";

interface WorkoutPlanBannerProps {
  workoutPlanName: string;
}

export const WorkoutPlanBanner = ({ workoutPlanName }: WorkoutPlanBannerProps) => {
  return (
    <section className="relative flex h-[296px] w-full shrink-0 flex-col items-start justify-between overflow-hidden rounded-b-[20px] bg-foreground px-5 pt-5 pb-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/workout-plan-banner.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-[238.09deg] from-transparent to-foreground/80" />
      </div>

      <p className="relative font-display text-[22px] leading-[1.15] text-background uppercase">
        Fit.ai
      </p>

      <div className="relative flex flex-col items-start gap-3">
        <Badge className="h-auto gap-1 rounded-full px-2.5 py-[5px] font-heading text-xs leading-none font-semibold uppercase [&>svg]:size-4!">
          <Goal />
          {workoutPlanName}
        </Badge>
        <h1 className="font-heading text-2xl leading-[1.05] font-semibold text-background">
          Plano de Treino
        </h1>
      </div>
    </section>
  );
};
