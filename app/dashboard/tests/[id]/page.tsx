import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Pencil } from "lucide-react";

export default async function TestsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data, error: fetchTestError } = await supabase
    .from("tests")
    .select("name, description, patterns (is_default, text)")
    .match({
      id: params.id,
    });

  if (fetchTestError) redirect("/dashboard");

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="pl-3">{data[0].name}</span>
        </h1>
        <Link
          href={`/dashboard/tests/${params.id}/settings`}
          className={buttonVariants({ size: "icon", variant: "outline" })}
        >
          <Pencil className="size-5" />
        </Link>
      </div>
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
    </>
  );
}
