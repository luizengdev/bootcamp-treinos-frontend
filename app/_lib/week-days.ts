import type { GetHomeData200TodayWorkoutDayWeekDay } from "@/app/_lib/api/fetch-generated";

export const WEEK_DAY_LABELS: Record<GetHomeData200TodayWorkoutDayWeekDay, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export const WEEK_DAY_INITIALS = ["D", "S", "T", "Q", "Q", "S", "S"];

export const WEEK_DAYS_BY_INDEX: GetHomeData200TodayWorkoutDayWeekDay[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export const getMondayFirstWeekDayIndex = (weekDay: GetHomeData200TodayWorkoutDayWeekDay) =>
  (WEEK_DAYS_BY_INDEX.indexOf(weekDay) + 6) % 7;
