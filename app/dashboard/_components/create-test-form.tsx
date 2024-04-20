"use client";

import { createTest } from "@/actions/create-test";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateTestButton } from "./create-test-button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export const CreateTestForm = () => {
  return (
    <form
      action={async (formData) => {
        const result = await createTest(formData);

        if (result.status === "error") {
          toast.error(result.message, { duration: 8000 });
          return;
        }

        toast.success("A new test is created successfully.", {
          duration: 5000,
        });
      }}
    >
      <DialogHeader>
        <DialogTitle>Add test</DialogTitle>
        <DialogDescription>
          Create a test and start measuring the performance of your CTA buttons.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name*
          </Label>
          <Input
            id="name"
            name="name"
            className="col-span-3"
            required
            placeholder="CTA button in the Hero section"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input id="description" name="description" className="col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="purpose" className="text-right">
            Purpose*
          </Label>
          <Textarea
            id="purpose"
            name="purpose"
            className="col-span-3"
            required
            placeholder="This CTA button aims to get as many signups as possible."
          />
        </div>
      </div>
      <DialogFooter>
        <CreateTestButton />
      </DialogFooter>
    </form>
  );
};
