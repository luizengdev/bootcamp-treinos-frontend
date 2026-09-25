import dayjs from "dayjs";
import { Calendar, ChartNoAxesColumn, House, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";

import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { getWorkoutDayPath } from "@/app/_lib/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavigationItem = "home" | "calendar";

interface BottomNavigationProps {
  activeItem: NavigationItem;
}

const getItemClassName = (isActive: boolean) =>
  cn(
    "size-auto rounded-full p-3 hover:bg-transparent",
    isActive ? "text-foreground" : "text-muted-foreground/65",
  );

const inactiveItemClassName = getItemClassName(false);

export const BottomNavigation = async ({ activeItem }: BottomNavigationProps) => {
  const homeData = await getHomeData(dayjs().format("YYYY-MM-DD"));
  const calendarHref =
    homeData.status === 200
      ? getWorkoutDayPath(homeData.data.activeWorkoutPlanId, homeData.data.todayWorkoutDay.id)
      : "/";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-center gap-6 rounded-t-[20px] border border-border bg-background px-6 py-4">
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href="/" aria-label="Início" />}
        className={getItemClassName(activeItem === "home")}
      >
        <House className="size-6" />
      </Button>
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href={calendarHref} aria-label="Calendário" />}
        className={getItemClassName(activeItem === "calendar")}
      >
        <Calendar className="size-6" />
      </Button>
      <Button
        type="button"
        aria-label="Personal IA"
        className="size-auto rounded-full p-4 hover:bg-primary"
      >
        <Sparkles className="size-6" />
      </Button>
      <Button type="button" variant="ghost" aria-label="Estatísticas" className={inactiveItemClassName}>
        <ChartNoAxesColumn className="size-6" />
      </Button>
      <Button type="button" variant="ghost" aria-label="Perfil" className={inactiveItemClassName}>
        <UserRound className="size-6" />
      </Button>
    </nav>
  );
};
