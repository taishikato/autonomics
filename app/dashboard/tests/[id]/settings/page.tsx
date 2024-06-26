import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { redirect } from "next/navigation";
import { UpdateForm } from "./_components/update-form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function TestsIdSettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const testWithPatternsQuery = supabase
    .from("tests")
    .select("id, name, description, purpose, patterns (id, text)")
    .match({
      id: params.id,
    });

  const { data, error: fetchTestError } = await testWithPatternsQuery;

  if (fetchTestError) redirect("/dashboard");

  return (
    <div>
      <h1 className="text-lg font-semibold md:text-2xl border-b mb-6 pb-6">
        <span className="pl-3">Settings</span>
      </h1>
      <Link
        href={`/dashboard/tests/${params.id}`}
        className={cn(buttonVariants({ variant: "ghost" }), "mb-8 md:mb-3")}
      >
        <MoveLeft className="size-4 mr-2" />
        Go back
      </Link>
      <UpdateForm test={data[0]} />
    </div>
  );
}
