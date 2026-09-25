"use client";

import type { ChatStatus, UIMessage } from "ai";
import { type ReactNode, useEffect, useRef } from "react";
import { Streamdown } from "streamdown";

import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  messages: UIMessage[];
  status: ChatStatus;
  children?: ReactNode;
  footer?: ReactNode;
}

const getMessageText = (message: UIMessage) =>
  message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

export const ChatMessages = ({ messages, status, children, footer }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const isStreaming = status === "streaming";
  const isWaitingResponse = status === "submitted";
  const hasError = status === "error";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  return (
    <div className="flex w-full flex-1 flex-col overflow-y-auto pb-5">
      {children}
      {messages.map((message, index) => {
        const text = getMessageText(message);
        if (!text) return null;

        if (message.role === "user") {
          return (
            <ChatMessage key={message.id} role="user">
              {text}
            </ChatMessage>
          );
        }

        const isLastMessage = index === messages.length - 1;

        return (
          <ChatMessage key={message.id} role="assistant">
            <Streamdown isAnimating={isStreaming && isLastMessage}>{text}</Streamdown>
          </ChatMessage>
        );
      })}
      {isWaitingResponse && (
        <ChatMessage role="assistant">
          <span className="text-muted-foreground">Digitando...</span>
        </ChatMessage>
      )}
      {hasError && (
        <ChatMessage role="assistant">
          <span className="text-destructive">
            Ocorreu um erro ao enviar sua mensagem. Tente novamente.
          </span>
        </ChatMessage>
      )}
      {footer}
      <div ref={bottomRef} />
    </div>
  );
};
