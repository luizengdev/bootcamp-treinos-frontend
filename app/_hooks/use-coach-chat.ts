import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useCallback } from "react";

const chatTransport = new DefaultChatTransport({
  api: `${process.env.NEXT_PUBLIC_API_URL}/ai`,
  credentials: "include",
});

export const useCoachChat = () => {
  const { messages, sendMessage, status } = useChat({ transport: chatTransport });
  const isBusy = status === "submitted" || status === "streaming";

  const sendTextMessage = useCallback(
    (text: string) => {
      sendMessage({ text });
    },
    [sendMessage],
  );

  return { messages, status, isBusy, sendTextMessage };
};
