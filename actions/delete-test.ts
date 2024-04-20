"use server";

import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { revalidatePath } from "next/cache";

export const deleteTest = async (testId: string) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("tests")
    .update({
      is_deleted: true,
    })
    .match({ id: testId });

  if (error) return { status: "error", message: error.message };

  revalidatePath("/dashboard");

  return { status: "success" };
};
