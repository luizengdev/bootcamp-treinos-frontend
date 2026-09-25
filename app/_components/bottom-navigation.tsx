import dayjs from "dayjs";
import { Calendar, ChartNoAxesColumn, House, UserRound } from "lucide-react";
import Link from "next/link";

import { ChatOpenButton } from "@/app/_components/chat/chat-open-button";
import { Chatbot } from "@/app/_components/chat/chatbot";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { getWorkoutDayPath } from "@/app/_lib/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavigationItem = "home" | "calendar" | "stats" | "profile";

interface BottomNavigationProps {
  activeItem: NavigationItem;
}

const getItemClassName = (isActive: boolean) =>
  cn(
    "size-auto rounded-full p-3 hover:bg-transparent",
    isActive ? "text-foreground" : "text-muted-foreground/65",
  );

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
      <ChatOpenButton />
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href="/stats" aria-label="Estatísticas" />}
        className={getItemClassName(activeItem === "stats")}
      >
        <ChartNoAxesColumn className="size-6" />
      </Button>
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href="/profile" aria-label="Perfil" />}
        className={getItemClassName(activeItem === "profile")}
      >
        <UserRound className="size-6" />
      </Button>
      <Chatbot />
    </nav>
  );
};
