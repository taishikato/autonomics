import Link from "next/link";
import { redirect } from "next/navigation";
import { Pencil } from "lucide-react";
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

export default async function TestsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data, error: fetchTestError } = await supabase
    .from("tests")
    .select(
      "id, name, description, purpose, is_on, patterns (id, text, click_count)"
    )
    .match({
      id: params.id,
    });

  if (fetchTestError) redirect("/dashboard");

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {data[0].is_on ? (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          ) : (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          )}
          <span className="pl-3">{data[0].name}</span>
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

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="font-bold text-base md:text-xl">
            Let's start testing!
          </div>
          <div className="text-muted-foreground">
            When you click the button below, we're gonna generate 2 texts for
            your CTA button.
          </div>
        </div>
        {data[0].is_on ? (
          <PauseTestForm testId={data[0].id} />
        ) : (
          <StartTestForm testId={data[0].id} />
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
                <TableHead>Click count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data[0].patterns.map((pattern) => {
                return (
                  <TableRow key={pattern.id}>
                    <TableCell>
                      <div className="font-lg flex items-center">
                        {pattern.text}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-lg flex items-center">
                        {pattern.click_count}
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
