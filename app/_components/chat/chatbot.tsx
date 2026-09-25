"use client";

import { useEffect, useRef } from "react";

import { useChatSearchParams } from "@/app/_hooks/use-chat-search-params";
import { useCoachChat } from "@/app/_hooks/use-coach-chat";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { ChatCloseButton } from "./chat-close-button";
import { ChatHeader } from "./chat-header";
import { ChatInputForm } from "./chat-input-form";
import { ChatMessage } from "./chat-message";
import { ChatMessages } from "./chat-messages";
import { ChatSuggestions } from "./chat-suggestions";

const WELCOME_MESSAGE = "Olá! Sou sua IA personal. Como posso ajudar com seu treino hoje?";
const SUGGESTED_MESSAGES = ["Monte meu plano de treino"];

export const Chatbot = () => {
  const [{ isChatOpen, chatInitialMessage }, setChatSearchParams] = useChatSearchParams();
  const { messages, status, isBusy, sendTextMessage } = useCoachChat();
  const sentInitialMessageRef = useRef<string | null>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (!chatInitialMessage) {
      sentInitialMessageRef.current = null;
      return;
    }
    if (!isChatOpen || sentInitialMessageRef.current === chatInitialMessage) return;

    sentInitialMessageRef.current = chatInitialMessage;
    sendTextMessage(chatInitialMessage);
    setChatSearchParams({ chatInitialMessage: null });
  }, [isChatOpen, chatInitialMessage, sendTextMessage, setChatSearchParams]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) return;
    setChatSearchParams({ isChatOpen: null, chatInitialMessage: null });
  };

  return (
    <Dialog open={isChatOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-label="Coach AI"
        showCloseButton={false}
        overlayClassName="bg-foreground/30 supports-backdrop-filter:backdrop-blur-none"
        className="top-40 right-4 bottom-4 left-4 flex w-auto max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-[20px] bg-background p-0 text-foreground ring-0 sm:max-w-none"
      >
        <ChatHeader action={<ChatCloseButton />} />
        <ChatMessages messages={messages} status={status}>
          <ChatMessage role="assistant">{WELCOME_MESSAGE}</ChatMessage>
        </ChatMessages>
        <div className="flex w-full flex-col gap-3">
          {!hasMessages && (
            <ChatSuggestions suggestions={SUGGESTED_MESSAGES} onSelect={sendTextMessage} />
          )}
          <ChatInputForm isDisabled={isBusy} onSubmit={sendTextMessage} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
