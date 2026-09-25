"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  message: z.string().trim().min(1),
});

type ChatInputFormValues = z.infer<typeof formSchema>;

interface ChatInputFormProps {
  isDisabled: boolean;
  onSubmit: (message: string) => void;
}

export const ChatInputForm = ({ isDisabled, onSubmit }: ChatInputFormProps) => {
  const form = useForm<ChatInputFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const handleSubmit = ({ message }: ChatInputFormValues) => {
    onSubmit(message);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full items-center gap-2 border-t border-border p-5"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Digite sua mensagem"
                  autoComplete="off"
                  className="h-auto rounded-full border-secondary bg-secondary px-4 py-3 font-heading text-sm placeholder:text-muted-foreground aria-invalid:border-secondary aria-invalid:ring-0 md:text-sm"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          aria-label="Enviar mensagem"
          disabled={isDisabled}
          className="size-10.5 rounded-full p-2.5"
        >
          <ArrowUp className="size-5" />
        </Button>
      </form>
    </Form>
  );
};
