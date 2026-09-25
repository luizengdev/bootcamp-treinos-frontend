import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

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
      <div
        className={cn(
          "min-w-0 rounded-[12px] p-3 font-heading text-sm leading-[1.4] break-words",
          isUser ? "bg-primary text-primary-foreground" : "w-full bg-secondary text-foreground",
        )}
      >
        {children}
      </div>
    </div>
  );
};
