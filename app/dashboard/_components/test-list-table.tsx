"use client";

import type { Tables } from "@/types/supabase";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CreateTestForm } from "./create-test-form";

export const TestListTable = ({
  tests,
}: {
  tests: Pick<Tables<"tests">, "id" | "name">[];
}) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Tests</CardTitle>
        <CardDescription>A list of the tests you created.</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-5" variant="secondary">
              <Plus className="size-4 mr-2" />
              Add Test
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <CreateTestForm />
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test) => {
              return (
                <TableRow
                  key={test.id}
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/dashboard/tests/${test.id}`);
                  }}
                >
                  <TableCell>
                    <div className="font-medium">{test.name}</div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
