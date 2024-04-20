import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateTestForm } from "./_components/create-test-form";

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Tests</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no tests
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start testing your CTA button text here.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">Add Test</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <CreateTestForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
