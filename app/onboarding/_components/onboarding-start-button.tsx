import { Button } from "@/components/ui/button";

interface OnboardingStartButtonProps {
  label: string;
  onClick: () => void;
}

export const OnboardingStartButton = ({ label, onClick }: OnboardingStartButtonProps) => (
  <div className="flex w-full justify-end pt-5 pr-5 pl-15">
    <Button
      type="button"
      onClick={onClick}
      className="h-auto rounded-[12px] p-3 font-heading text-sm leading-[1.4] font-normal hover:bg-primary/90"
    >
      {label}
    </Button>
  </div>
);
