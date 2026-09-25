import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface AccessAppButtonProps {
  children: ReactNode;
}

export const AccessAppButton = ({ children }: AccessAppButtonProps) => (
  <Button
    nativeButton={false}
    render={<Link href="/" />}
    className="h-auto rounded-full px-4 py-2 font-heading text-sm leading-none font-semibold hover:bg-primary/90"
  >
    {children}
  </Button>
);
