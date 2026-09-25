import dayjs from "dayjs";
import { redirect } from "next/navigation";

import { getHomeData, getUserTrainData } from "@/app/_lib/api/fetch-generated";

import { OnboardingChat } from "./_components/onboarding-chat";

const OnboardingPage = async () => {
  const [homeData, trainData] = await Promise.all([
    getHomeData(dayjs().format("YYYY-MM-DD")),
    getUserTrainData(),
  ]);

  if (homeData.status === 401 || trainData.status === 401) redirect("/auth");

  const hasTrainData = trainData.status === 200 && Boolean(trainData.data);
  const hasActiveWorkoutPlan = homeData.status === 200;

  return <OnboardingChat hasTrainData={hasTrainData} hasActiveWorkoutPlan={hasActiveWorkoutPlan} />;
};

export default OnboardingPage;
