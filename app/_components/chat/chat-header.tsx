import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface ChatHeaderProps {
  action?: ReactNode;
}

export const ChatHeader = ({ action }: ChatHeaderProps) => (
  <header className="flex w-full items-center justify-between border-b border-border p-5">
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center rounded-full border border-primary/8 bg-primary/8 p-3">
        <Sparkles className="size-4.5 text-primary" />
      </div>
      <div className="flex flex-col justify-center gap-1.5">
        <h2 className="font-heading text-base leading-[1.05] font-semibold text-foreground">
          Coach AI
        </h2>
        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-success" />
          <span className="font-heading text-xs leading-[1.15] text-primary">Online</span>
        </div>
      </div>
    </div>
    {action}
  </header>
);
