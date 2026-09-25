"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label="Voltar"
      onClick={() => router.back()}
      className="size-6 p-0 text-foreground hover:bg-transparent"
    >
      <ChevronLeft className="size-6" />
    </Button>
  );
};
