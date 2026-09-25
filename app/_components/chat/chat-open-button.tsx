"use client";

import { Sparkles } from "lucide-react";

import { useChatSearchParams } from "@/app/_hooks/use-chat-search-params";
import { Button } from "@/components/ui/button";

export const ChatOpenButton = () => {
  const [, setChatSearchParams] = useChatSearchParams();

  return (
    <Button
      type="button"
      aria-label="Personal IA"
      onClick={() => setChatSearchParams({ isChatOpen: true })}
      className="size-auto rounded-full p-4 hover:bg-primary"
    >
      <Sparkles className="size-6" />
    </Button>
  );
};
