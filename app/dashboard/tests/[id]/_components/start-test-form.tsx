"use client";

import { toast } from "sonner";
import { startTest } from "@/actions/start-test";
import { StartTestButton } from "./start-test-button";

export const StartTestForm = ({ testId }: { testId: string }) => {
  return (
    <form
      action={async () => {
        await startTest(testId);
        toast.success("We're gerating texts for your CTA button");
      }}
    >
      <StartTestButton />
    </form>
  );
};
