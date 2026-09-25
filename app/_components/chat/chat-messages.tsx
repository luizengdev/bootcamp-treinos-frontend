"use client";

import type { ChatStatus, UIMessage } from "ai";
import { useEffect, useRef } from "react";
import { Streamdown } from "streamdown";

import { ChatMessage } from "./chat-message";

const WELCOME_MESSAGE = "Olá! Sou sua IA personal. Como posso ajudar com seu treino hoje?";

interface ChatMessagesProps {
  messages: UIMessage[];
  status: ChatStatus;
}

const getMessageText = (message: UIMessage) =>
  message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

export const ChatMessages = ({ messages, status }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const isStreaming = status === "streaming";
  const isWaitingResponse = status === "submitted";
  const hasError = status === "error";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  return (
    <div className="flex w-full flex-1 flex-col overflow-y-auto pb-5">
      <ChatMessage role="assistant">{WELCOME_MESSAGE}</ChatMessage>
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
      <div ref={bottomRef} />
    </div>
  );
};
