"use client";

import { toast } from "sonner";
import { pauseTest } from "@/actions/pause-test";
import { PauseTestButton } from "./pause-test-button";

export const PauseTestForm = ({ testId }: { testId: string }) => {
  return (
    <form
      action={async () => {
        await pauseTest(testId);
        toast.success("Successfuly paused.");
      }}
    >
      <PauseTestButton />
    </form>
  );
};
