import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export const ChatCloseButton = () => (
  <DialogClose
    render={
      <Button
        type="button"
        variant="ghost"
        aria-label="Fechar chat"
        className="size-6 p-0 text-foreground hover:bg-transparent"
      />
    }
  >
    <X className="size-6" />
  </DialogClose>
);
