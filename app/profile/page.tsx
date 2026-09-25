import { BicepsFlexed, Ruler, User, WeightTilde } from "lucide-react";
import { redirect } from "next/navigation";

import { AppHeader } from "@/app/_components/app-header";
import { BottomNavigation } from "@/app/_components/bottom-navigation";
import { StatCard } from "@/app/_components/stat-card";
import { getUserTrainData } from "@/app/_lib/api/fetch-generated";

import { ProfileAvatar } from "./_components/profile-avatar";
import { SignOutButton } from "./_components/sign-out-button";

const GRAMS_PER_KILOGRAM = 1000;

const ProfilePage = async () => {
  const trainData = await getUserTrainData();

  if (trainData.status === 401) redirect("/auth");
  if (trainData.status !== 200) {
    throw new Error("Failed to fetch user train data");
  }
  if (!trainData.data) redirect("/onboarding");

  const { userName, weightInGrams, heightInCentimeters, bodyFatPercentage, age } = trainData.data;
  const weightInKilograms = Number((weightInGrams / GRAMS_PER_KILOGRAM).toFixed(1));

  return (
    <main className="flex min-h-svh flex-col items-center bg-background pb-32">
      <AppHeader />

      <section className="flex w-full flex-col items-center justify-center gap-5 p-5">
        <div className="flex w-full items-center gap-3">
          <ProfileAvatar userName={userName} />
          <div className="flex flex-col items-start justify-center gap-1.5 whitespace-nowrap">
            <h1 className="font-heading text-lg leading-[1.05] font-semibold text-foreground">
              {userName}
            </h1>
            <p className="font-heading text-sm leading-[1.15] text-foreground/70">Plano Básico</p>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3">
          <StatCard icon={WeightTilde} value={String(weightInKilograms)} label="KG" />
          <StatCard icon={Ruler} value={String(heightInCentimeters)} label="CM" />
          <StatCard icon={BicepsFlexed} value={`${bodyFatPercentage}%`} label="GC" />
          <StatCard icon={User} value={String(age)} label="ANOS" />
        </div>

        <SignOutButton />
      </section>

      <BottomNavigation activeItem="profile" />
    </main>
  );
};

export default ProfilePage;
