import { parseAsBoolean, parseAsString, useQueryStates, type UrlKeys } from "nuqs";

const chatSearchParamsParsers = {
  isChatOpen: parseAsBoolean.withDefault(false),
  chatInitialMessage: parseAsString,
};

const chatSearchParamsUrlKeys: UrlKeys<typeof chatSearchParamsParsers> = {
  isChatOpen: "chat_open",
  chatInitialMessage: "chat_initial_message",
};

export const useChatSearchParams = () =>
  useQueryStates(chatSearchParamsParsers, { urlKeys: chatSearchParamsUrlKeys });
