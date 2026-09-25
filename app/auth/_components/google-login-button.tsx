"use client";

import Image from "next/image";
import { useState } from "react";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setHasError(false);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    if (error) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="h-[38px] gap-2 rounded-full bg-background px-6 py-3 font-sans text-sm leading-none font-semibold text-foreground hover:bg-background/90"
      >
        <span className="relative size-4 shrink-0 overflow-clip">
          <span className="absolute inset-[6.25%_7.74%_6.29%_7.81%]">
            <Image src="/google-icon.svg" alt="" fill />
          </span>
        </span>
        Fazer login com Google
      </Button>
      {hasError && (
        <p className="font-heading text-xs text-primary-foreground">
          Não foi possível fazer login. Tente novamente.
        </p>
      )}
    </div>
  );
};
