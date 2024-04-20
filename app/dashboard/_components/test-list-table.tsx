"use client";

import type { Tables } from "@/types/supabase";
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
import { useRouter } from "next/navigation";

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
