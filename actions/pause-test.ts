"use server";

import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { revalidatePath } from "next/cache";

export const pauseTest = async (testId: string) => {
  const supabase = createClient();
  const { error: testPauseError } = await supabase
    .from("tests")
    .update({
      is_on: false,
    })
    .match({ id: testId });

  if (testPauseError)
    return {
      status: "error",
      message: testPauseError.message,
    };

  revalidatePath(`/dashboard/tests/${testId}`, "page");

  return { status: "success" };
};
