import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
}

export const SectionHeader = ({ title, actionLabel }: SectionHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between leading-[1.4] whitespace-nowrap">
      <h2 className="font-heading text-lg leading-[1.4] font-semibold text-foreground">{title}</h2>
      {actionLabel && (
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 font-heading text-xs leading-[1.4] font-normal text-primary"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
