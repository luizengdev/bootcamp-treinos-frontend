import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { ChatBubble } from "./chat-bubble";

interface ChatMessageProps {
  role: "user" | "assistant";
  children: ReactNode;
}

export const ChatMessage = ({ role, children }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full pt-5",
        isUser ? "justify-end pr-5 pl-15" : "justify-start pr-15 pl-5",
      )}
    >
      <ChatBubble role={role}>{children}</ChatBubble>
    </div>
  );
};
