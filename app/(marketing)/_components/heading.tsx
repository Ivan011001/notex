import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Welcome to <span className="underline">Notex</span> - Your Personal Note Manager!
      </h1>
      <h2 className="text-base sm:text-xl md:text-xl font-medium">
        Whether you&apos;re jotting down ideas, making to-do lists, or capturing important
        moments, <span className="font-bold">Notex</span> is here to simplify your
        note-taking experience.
      </h2>
      <Button>
        Start <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};
