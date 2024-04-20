"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";

export const CreateTestButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending && <Loader className="h-4 w-4 mr-2 animate-spin" />}
      Create test
    </Button>
  );
};
