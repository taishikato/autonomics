"use client";

import { startTest } from "@/actions/start-test";
import { StartTestButton } from "./start-test-button";

export const StartTestForm = ({ testId }: { testId: string }) => {
  return (
    <form
      action={async () => {
        await startTest(testId);
      }}
    >
      <StartTestButton />
    </form>
  );
};
