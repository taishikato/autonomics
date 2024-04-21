"use client";

import { toast } from "sonner";
import { ResumeTestButton } from "./resume-test-button";
import { resumeTest } from "@/actions/resume-test";

export const ResumeTestForm = ({ testId }: { testId: string }) => {
  return (
    <form
      action={async () => {
        const result = await resumeTest(testId);

        if (result.status === "error") {
          toast.error(result.message);
          return;
        }

        toast.success("Resumed successfully");
      }}
    >
      <ResumeTestButton />
    </form>
  );
};
