import Image from "next/image";

import { AuthGuard } from "@/app/_components/auth-guard";

import { GoogleLoginButton } from "./_components/google-login-button";

const AuthPage = () => {
  return (
    <AuthGuard requireAuth={false} redirectTo="/">
      <main className="relative flex min-h-svh flex-1 flex-col overflow-hidden bg-foreground">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src="/login-background.png"
            alt=""
            width={3474}
            height={1954}
            preload
            className="absolute top-[-9.82%] left-[-115.84%] h-full w-[354.25%] max-w-none object-cover"
          />
        </div>

        <Image
          src="/fit-ai-logo.svg"
          alt="FIT.AI"
          width={84.625}
          height={38.407}
          className="absolute top-12 left-1/2 -translate-x-1/2"
        />

        <section className="relative mt-auto flex w-full flex-col items-center gap-[60px] rounded-t-[20px] bg-primary px-5 pt-12 pb-10">
          <div className="flex w-full flex-col items-center gap-6">
            <h1 className="w-full text-center font-heading text-[32px] leading-[1.05] font-semibold text-primary-foreground">
              O app que vai transformar a forma como você treina.
            </h1>
            <GoogleLoginButton />
          </div>
          <p className="font-heading text-xs leading-[1.4] whitespace-nowrap text-primary-foreground/70">
            ©2026 Copyright FIT.AI. Todos os direitos reservados
          </p>
        </section>
      </main>
    </AuthGuard>
  );
};

export default AuthPage;
