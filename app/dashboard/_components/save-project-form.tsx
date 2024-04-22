"use client";

import type { Tables } from "@/types/supabase";
import { saveProject } from "@/actions/save-project";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { SaveProjectButton } from "./save-project-button";
import { toast } from "sonner";

export const SaveProjectForm = ({
  project,
}: {
  project: Pick<Tables<"projects">, "website_description"> | null;
}) => {
  return (
    <form
      action={async (formData) => {
        const result = await saveProject(formData);
        if (result.status === "error") {
          toast.error(result.message);
          return;
        }

        toast.success("Saved successfully.");
      }}
      className="rounded-lg border p-7 space-y-3"
    >
      <div className="flex items-center gap-x-2">
        <h3 className="text-lg font-bold tracking-tight">About your website</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelp className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                This information will be used by AI to generate CTA button text.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Textarea
        required
        name="description"
        placeholder="My website is a SaaS app to help customers sell their digital products faster."
        defaultValue={project?.website_description ?? ""}
      />
      <SaveProjectButton />
    </form>
  );
};
