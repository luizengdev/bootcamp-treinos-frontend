import dayjs from "dayjs";
import { redirect } from "next/navigation";

import { getHomeData, getUserTrainData } from "@/app/_lib/api/fetch-generated";

export const requireOnboarding = async () => {
  const today = dayjs().format("YYYY-MM-DD");
  const [homeData, trainData] = await Promise.all([getHomeData(today), getUserTrainData()]);

  if (homeData.status === 401 || trainData.status === 401) redirect("/auth");
  if (homeData.status === 404) redirect("/onboarding");
  if (homeData.status !== 200) {
    throw new Error("Failed to fetch home data");
  }
  if (trainData.status !== 200) {
    throw new Error("Failed to fetch user train data");
  }
  if (!trainData.data) redirect("/onboarding");

  return { homeData: homeData.data, trainData: trainData.data };
};
