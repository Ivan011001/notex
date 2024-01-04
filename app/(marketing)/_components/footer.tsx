import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="z-50 flex items-center w-full p-6 bg-background dark:bg-[#1f1f1f]">
      <Logo />
      <div
        className="md:ml-auto w-full justify-between 
        md:justify-end flex items-center gap-x-2 text-muted-foreground"
      >
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
      </div>
    </div>
  );
};
