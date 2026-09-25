"use client";

import { ChatHeader } from "@/app/_components/chat/chat-header";
import { ChatInputForm } from "@/app/_components/chat/chat-input-form";
import { ChatMessages } from "@/app/_components/chat/chat-messages";
import { useCoachChat } from "@/app/_hooks/use-coach-chat";
import { hasCompletedToolCall } from "@/app/_lib/chat-tools";

import { AccessAppButton } from "./access-app-button";
import { OnboardingCompleteCta } from "./onboarding-complete-cta";
import { OnboardingStartButton } from "./onboarding-start-button";
import { OnboardingWelcome } from "./onboarding-welcome";

const START_MESSAGE = "Começar!";

interface OnboardingChatProps {
  hasTrainData: boolean;
  hasActiveWorkoutPlan: boolean;
}

export const OnboardingChat = ({ hasTrainData, hasActiveWorkoutPlan }: OnboardingChatProps) => {
  const { messages, status, isBusy, sendTextMessage } = useCoachChat();
  const hasMessages = messages.length > 0;
  const isTrainDataReady = hasTrainData || hasCompletedToolCall(messages, "updateUserTrainData");
  const isWorkoutPlanReady =
    hasActiveWorkoutPlan || hasCompletedToolCall(messages, "createWorkoutPlan");
  const isOnboardingComplete = isTrainDataReady && isWorkoutPlanReady;

  return (
    <main className="flex h-svh w-full flex-col bg-background">
      <ChatHeader
        action={isOnboardingComplete && <AccessAppButton>Acessar FIT.AI</AccessAppButton>}
      />
      <ChatMessages
        messages={messages}
        status={status}
        footer={isOnboardingComplete && !isBusy && hasMessages && <OnboardingCompleteCta />}
      >
        <OnboardingWelcome />
        {!hasMessages && (
          <OnboardingStartButton label={START_MESSAGE} onClick={() => sendTextMessage(START_MESSAGE)} />
        )}
      </ChatMessages>
      <ChatInputForm isDisabled={isBusy} onSubmit={sendTextMessage} />
    </main>
  );
};
