"use client";

import { Button } from "@/components/ui/button";
import { Loader, CirclePause } from "lucide-react";
import { useFormStatus } from "react-dom";

export const PauseTestButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="self-start"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      variant="destructive"
    >
      {pending ? (
        <Loader className="size-4 mr-2 animate-spin" />
      ) : (
        <CirclePause className="size-4 mr-2" />
      )}
      Pause testing
    </Button>
  );
};
