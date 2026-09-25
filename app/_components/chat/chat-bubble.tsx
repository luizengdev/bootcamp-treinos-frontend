import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  role: "user" | "assistant";
  children: ReactNode;
}

export const ChatBubble = ({ role, children }: ChatBubbleProps) => (
  <div
    className={cn(
      "max-w-full min-w-0 rounded-[12px] p-3 font-heading text-sm leading-[1.4] break-words",
      role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground",
    )}
  >
    {children}
  </div>
);
