import { getToolName, isToolUIPart, type UIMessage } from "ai";

export const hasCompletedToolCall = (messages: UIMessage[], toolName: string) =>
  messages.some((message) =>
    message.parts.some(
      (part) =>
        isToolUIPart(part) && getToolName(part) === toolName && part.state === "output-available",
    ),
  );
