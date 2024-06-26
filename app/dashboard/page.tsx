import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateTestForm } from "./_components/create-test-form";
import { TestListTable } from "./_components/test-list-table";
import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { SaveProjectForm } from "./_components/save-project-form";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: project } = await supabase
    .from("projects")
    .select("website_description")
    .match({
      user_id: user.id,
    });

  if (!project) redirect("/login");

  const { data: tests, error } = await supabase
    .from("tests")
    .select("id, name")
    .match({ user_id: user.id, is_deleted: false })
    .order("created_at", { ascending: false });

  if (error) {
    toast.error(error.message);
    redirect("/login");
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>

      <SaveProjectForm project={project[0]} />

      {tests.length > 0 ? (
        <TestListTable tests={tests} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no tests
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start testing your CTA button text here.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">
                  <Plus className="size-4 mr-2" />
                  Add Test
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <CreateTestForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}
