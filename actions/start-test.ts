"use server";

import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { revalidatePath } from "next/cache";

export const startTest = async (testId: string) => {
  // generate 2 patterns
  // turn this test on
  const supabase = createClient();

  const { error } = await supabase
    .from("tests")
    .update({
      is_on: true,
    })
    .match({ id: testId });

  if (error)
    return {
      status: "error",
      message: error.message,
    };

  revalidatePath(`/dashboard/tests/${testId}`, "page");

  return { status: "success" };
};
