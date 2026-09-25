"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setHasError(false);

    const { error } = await authClient.signOut();

    if (error) {
      setHasError(true);
      setIsSigningOut(false);
      return;
    }

    router.replace("/auth");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        onClick={handleSignOut}
        disabled={isSigningOut}
        className="h-auto gap-2 rounded-full px-4 py-2 font-heading text-base leading-none font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        Sair da conta
        <LogOut className="size-4" />
      </Button>
      {hasError && (
        <p className="font-heading text-xs text-destructive">
          Não foi possível sair da conta. Tente novamente.
        </p>
      )}
    </div>
  );
};
