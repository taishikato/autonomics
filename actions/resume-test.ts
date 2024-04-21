"use server";

import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { revalidatePath } from "next/cache";

export const resumeTest = async (testId: string) => {
  const supabase = createClient();
  const { error: testResumeError } = await supabase
    .from("tests")
    .update({
      is_on: true,
    })
    .match({ id: testId });

  if (testResumeError) {
    return {
      status: "error",
      message: testResumeError.message,
    };
  }

  revalidatePath(`/dashboard/tests/${testId}`, "page");

  return { status: "success" };
};
