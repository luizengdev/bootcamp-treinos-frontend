"use client";

import { CircleQuestionMark } from "lucide-react";

import { useChatSearchParams } from "@/app/_hooks/use-chat-search-params";
import { Button } from "@/components/ui/button";

interface ExerciseHelpButtonProps {
  exerciseName: string;
}

export const ExerciseHelpButton = ({ exerciseName }: ExerciseHelpButtonProps) => {
  const [, setChatSearchParams] = useChatSearchParams();

  const handleClick = () => {
    setChatSearchParams({
      isChatOpen: true,
      chatInitialMessage: `Como executar o exercício ${exerciseName} corretamente?`,
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={`Ajuda sobre ${exerciseName}`}
      onClick={handleClick}
      className="size-5 p-0 text-foreground hover:bg-transparent"
    >
      <CircleQuestionMark className="size-5" />
    </Button>
  );
};
