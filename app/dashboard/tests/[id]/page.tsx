import Link from "next/link";
import { redirect } from "next/navigation";
import { Pencil, CircleCheck, CircleAlert } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { StartTestForm } from "./_components/start-test-form";
import { PauseTestForm } from "./_components/pause-test-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ResumeTestForm } from "./_components/resume-test-form";

export default async function TestsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error: fetchTestError } = await supabase
    .from("tests")
    .select(
      "id, name, description, purpose, is_on, patterns (id, text, display_count, click_count)"
    )
    .match({
      id: params.id,
    });

  if (fetchTestError) redirect("/dashboard");

  const { data: projectData, error: fetchProjectError } = await supabase
    .from("projects")
    .select("website_description")
    .match({
      user_id: user.id,
    });

  if (fetchProjectError) redirect("/dashboard");

  if (projectData.length === 0) {
    toast.error("You need to set the description for your website");
    redirect("/dashboard");
  }

  const isPurposeSet = Boolean(data[0].purpose && data[0].purpose.length > 0);
  const isWebsiteDescriptionSet = Boolean(
    projectData.length > 0 &&
      projectData[0].website_description &&
      projectData[0].website_description.length > 0
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          <span>{data[0].name}</span>
        </h1>
        <Link
          href={`/dashboard/tests/${params.id}/settings`}
          className={buttonVariants({ size: "icon", variant: "outline" })}
        >
          <Pencil className="size-5" />
        </Link>
      </div>
      <div className="border rounded-xl p-6 space-y-8">
        <div className="space-y-2">
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            ID
          </div>
          <div>{params.id}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Description
          </div>
          <div>
            {data[0].description && data[0].description.length > 0
              ? data[0].description
              : "No description"}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Purpose
          </div>
          <div>
            {data[0].purpose && data[0].purpose.length > 0
              ? data[0].purpose
              : "No purpose for this test yet"}
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="font-bold text-base md:text-xl flex items-center gap-x-3">
            {data[0].is_on && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            )}

            <div>
              {data[0].is_on
                ? "Test is currently underway"
                : "Let's start testing!"}
            </div>
          </div>
          {!data[0].is_on && (
            <>
              <div className="space-y-1">
                {isPurposeSet ? (
                  <div className="flex items-center">
                    <CircleCheck className="size-4 mr-2 text-green-500" />
                    <span className="text-sm">
                      You set the purpose of this CTA button
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CircleAlert className="size-4 mr-2 text-yellow-500" />
                    <span className="text-sm">
                      You need to set the purpose of this CTA button
                    </span>
                    <Link
                      href={`/dashboard/tests/${params.id}/settings`}
                      className={cn(buttonVariants({ size: "sm" }), "ml-5")}
                    >
                      Set the purpose
                    </Link>
                  </div>
                )}

                {isWebsiteDescriptionSet ? (
                  <div className="flex items-center">
                    <CircleCheck className="size-4 mr-2 text-green-500" />
                    <span className="text-sm">
                      You set the description for your website
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CircleAlert className="size-4 mr-2 text-yellow-500" />
                    <span className="text-sm">
                      You need to set the description for your website
                    </span>
                    <Link
                      href="/dashboard"
                      className={cn(buttonVariants({ size: "sm" }), "ml-5")}
                    >
                      Set the description
                    </Link>
                  </div>
                )}
              </div>

              {isPurposeSet && isWebsiteDescriptionSet && (
                <div className="text-muted-foreground">
                  When you click the button below, we're gonna generate 2 texts
                  for your CTA button.
                </div>
              )}
            </>
          )}
        </div>
        {data[0].is_on ? (
          <PauseTestForm testId={data[0].id} />
        ) : (
          data[0].purpose &&
          data[0].purpose.length > 0 &&
          projectData.length > 0 &&
          projectData[0].website_description &&
          projectData[0].website_description.length > 0 &&
          (data[0].patterns.length > 0 ? (
            <ResumeTestForm testId={data[0].id} />
          ) : (
            <StartTestForm
              testId={data[0].id}
              purpose={data[0].purpose}
              websiteDescription={projectData[0].website_description}
            />
          ))
        )}
      </div>
      {data[0].patterns.length > 0 && (
        <>
          <div className="font-semibold text-base md:text-lg mt-6">
            Test patterns
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Text</TableHead>
                <TableHead>Display count</TableHead>
                <TableHead>Click count</TableHead>
                <TableHead>ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data[0].patterns.map((pattern) => {
                return (
                  <TableRow key={pattern.id}>
                    <TableCell>
                      <div className="flex items-center">{pattern.text}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {pattern.display_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {pattern.click_count}
                      </div>
                    </TableCell>
                    <TableCell className="self-start">
                      <div className="flex items-center self-start text-sm rounded-full">
                        <div className="bg-accent px-2 py-1 rounded-full">
                          {pattern.id}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}
