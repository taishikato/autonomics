"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./submit-button";
import { updateTestSettings } from "@/actions/update-test-settings";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { DeleteTestButton } from "./delete-test-button";
import { deleteTest } from "@/actions/delete-test";
import { redirect } from "next/navigation";

type TestWithPatterns = {
  id: string;
  name: string;
  description: string | null;
  patterns: {
    id: string;
    is_default: boolean;
    text: string | null;
  }[];
};

export const UpdateForm = ({ test }: { test: TestWithPatterns }) => {
  return (
    <div className="w-full md:w-96 px-6 md:px-0 mx-auto space-y-10">
      <form
        className="space-y-8"
        action={async (formData) => {
          const result = await updateTestSettings(formData, test.id);

          if (result.status === "error") {
            toast.error(result.message);
            return;
          }

          toast.success("Updated successfully");
        }}
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name*
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={test.name}
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Description
          </Label>
          <Textarea defaultValue={test.description ?? ""} name="description" />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Default value*
          </Label>
          <Input
            defaultValue={test.patterns.find((p) => p.is_default)?.text ?? ""}
            name="default_value"
            required
            placeholder="Try it for free"
          />
        </div>

        <SubmitButton />
      </form>
      <Separator />
      <form
        action={async () => {
          if (!confirm("Are you sure to delete this test?")) return;

          const result = await deleteTest(test.id);

          if (result.status === "error") {
            toast.error(result.message);
            return;
          }

          toast.success("Deleted successfully");

          redirect("/dashboard");
        }}
      >
        <DeleteTestButton />
      </form>
    </div>
  );
};
