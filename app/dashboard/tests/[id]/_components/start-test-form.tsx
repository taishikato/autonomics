"use client";

import { toast } from "sonner";
import { startTest } from "@/actions/start-test";
import { StartTestButton } from "./start-test-button";

export const StartTestForm = ({
  testId,
  purpose,
  websiteDescription,
}: {
  testId: string;
  purpose: string;
  websiteDescription: string;
}) => {
  return (
    <form
      action={async () => {
        await startTest(testId, purpose, websiteDescription);

        toast.success("We're gerating texts for your CTA button");
      }}
    >
      <StartTestButton />
    </form>
  );
};
