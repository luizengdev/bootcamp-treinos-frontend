import { Button } from "@/components/ui/button";

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const ChatSuggestions = ({ suggestions, onSelect }: ChatSuggestionsProps) => (
  <div className="flex w-full gap-2.5 overflow-x-auto px-5">
    {suggestions.map((suggestion) => (
      <Button
        key={suggestion}
        type="button"
        variant="ghost"
        onClick={() => onSelect(suggestion)}
        className="h-auto rounded-full bg-primary/14 px-4 py-2 font-heading text-sm leading-none font-normal text-foreground hover:bg-primary/20"
      >
        {suggestion}
      </Button>
    ))}
  </div>
);
