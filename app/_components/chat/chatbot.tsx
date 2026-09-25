"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef } from "react";

import { useChatSearchParams } from "@/app/_hooks/use-chat-search-params";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { ChatHeader } from "./chat-header";
import { ChatInputForm } from "./chat-input-form";
import { ChatMessages } from "./chat-messages";
import { ChatSuggestions } from "./chat-suggestions";

const SUGGESTED_MESSAGES = ["Monte meu plano de treino"];

const chatTransport = new DefaultChatTransport({
  api: `${process.env.NEXT_PUBLIC_API_URL}/ai`,
  credentials: "include",
});

export const Chatbot = () => {
  const [{ isChatOpen, chatInitialMessage }, setChatSearchParams] = useChatSearchParams();
  const { messages, sendMessage, status } = useChat({ transport: chatTransport });
  const sentInitialMessageRef = useRef<string | null>(null);
  const isBusy = status === "submitted" || status === "streaming";
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (!chatInitialMessage) {
      sentInitialMessageRef.current = null;
      return;
    }
    if (!isChatOpen || sentInitialMessageRef.current === chatInitialMessage) return;

    sentInitialMessageRef.current = chatInitialMessage;
    sendMessage({ text: chatInitialMessage });
    setChatSearchParams({ chatInitialMessage: null });
  }, [isChatOpen, chatInitialMessage, sendMessage, setChatSearchParams]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) return;
    setChatSearchParams({ isChatOpen: null, chatInitialMessage: null });
  };

  const handleSendMessage = (text: string) => {
    sendMessage({ text });
  };

  return (
    <Dialog open={isChatOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-foreground/30 supports-backdrop-filter:backdrop-blur-none"
        className="top-40 right-4 bottom-4 left-4 flex w-auto max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-[20px] bg-background p-0 text-foreground ring-0 sm:max-w-none"
      >
        <ChatHeader />
        <ChatMessages messages={messages} status={status} />
        <div className="flex w-full flex-col gap-3">
          {!hasMessages && (
            <ChatSuggestions suggestions={SUGGESTED_MESSAGES} onSelect={handleSendMessage} />
          )}
          <ChatInputForm isDisabled={isBusy} onSubmit={handleSendMessage} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
