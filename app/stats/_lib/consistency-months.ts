import "dayjs/locale/pt-br";

import dayjs, { type Dayjs } from "dayjs";

export const DATE_FORMAT = "YYYY-MM-DD";

const MONTHS_COUNT = 3;
const DAYS_IN_WEEK = 7;

export interface ConsistencyMonth {
  key: string;
  label: string;
  weeks: Array<Array<string | null>>;
}

const getMondayOfWeek = (date: Dayjs) => date.subtract((date.day() + 6) % DAYS_IN_WEEK, "day");

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const getMonthWeeks = (monthStart: Dayjs) => {
  const monthEnd = monthStart.endOf("month");
  const weeks: ConsistencyMonth["weeks"] = [];

  for (
    let weekStart = getMondayOfWeek(monthStart);
    !weekStart.isAfter(monthEnd, "day");
    weekStart = weekStart.add(DAYS_IN_WEEK, "day")
  ) {
    weeks.push(
      Array.from({ length: DAYS_IN_WEEK }, (_, dayIndex) => {
        const date = weekStart.add(dayIndex, "day");
        return date.isSame(monthStart, "month") ? date.format(DATE_FORMAT) : null;
      }),
    );
  }

  return weeks;
};

export const getConsistencyStartDate = (today: string) =>
  dayjs(today)
    .subtract(MONTHS_COUNT - 1, "month")
    .startOf("month")
    .format(DATE_FORMAT);

export const getConsistencyMonths = (today: string): ConsistencyMonth[] =>
  Array.from({ length: MONTHS_COUNT }, (_, index) => {
    const monthStart = dayjs(getConsistencyStartDate(today)).add(index, "month");

    return {
      key: monthStart.format("YYYY-MM"),
      label: capitalize(monthStart.locale("pt-br").format("MMM")),
      weeks: getMonthWeeks(monthStart),
    };
  });
