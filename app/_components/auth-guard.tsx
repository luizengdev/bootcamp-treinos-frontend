"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { authClient } from "@/app/_lib/auth-client";

interface AuthGuardProps {
  children: ReactNode;
  requireAuth: boolean;
  redirectTo: string;
}

export const AuthGuard = ({ children, requireAuth, redirectTo }: AuthGuardProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = Boolean(session);
  const shouldRedirect = !isPending && isAuthenticated !== requireAuth;

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(redirectTo);
    }
  }, [shouldRedirect, redirectTo, router]);

  if (isPending || shouldRedirect) {
    return null;
  }

  return children;
};
