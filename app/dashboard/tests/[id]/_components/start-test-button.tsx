"use client";

import { Button } from "@/components/ui/button";
import { Loader, WandSparkles } from "lucide-react";
import { useFormStatus } from "react-dom";

export const StartTestButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="self-start"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <Loader className="size-4 mr-2 animate-spin" />
      ) : (
        <WandSparkles className="size-4 mr-2" />
      )}
      Start testing
    </Button>
  );
};
