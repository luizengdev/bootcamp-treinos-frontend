import { ChatBubble } from "@/app/_components/chat/chat-bubble";

const WELCOME_MESSAGES = [
  "Bem-vindo ao FIT.AI! 🎉",
  "O app que vai transformar a forma como você treina. Aqui você monta seu plano de treino personalizado, acompanha sua evolução com estatísticas detalhadas e conta com uma IA disponível 24h para te guiar em cada exercício.",
  "Tudo pensado para você alcançar seus objetivos de forma inteligente e consistente.",
  "Vamos configurar seu perfil?",
];

export const OnboardingWelcome = () => (
  <div className="flex w-full flex-col items-start gap-3 pt-5 pr-15 pl-5">
    {WELCOME_MESSAGES.map((message) => (
      <ChatBubble key={message} role="assistant">
        {message}
      </ChatBubble>
    ))}
    <div className="h-7.5" />
  </div>
);
