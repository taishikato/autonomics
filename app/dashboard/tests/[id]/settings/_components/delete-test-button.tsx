"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export const DeleteTestButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" disabled={pending} aria-disabled={pending}>
      {pending && <Loader className="size-4 mr-2 animate-spin" />}Delete
    </Button>
  );
};
