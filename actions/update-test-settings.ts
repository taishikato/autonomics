"use server";

import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { revalidatePath } from "next/cache";

export const updateTestSettings = async (
  formData: FormData,
  testId: string
) => {
  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;
  const defaultValue = formData.get("default_value") as string;

  if (!name)
    return {
      status: "error",
      message: "name can't be empty",
    };

  const supabase = createClient();
  const { error: testUpdateError } = await supabase
    .from("tests")
    .update({ name, description })
    .match({ id: testId });

  if (testUpdateError)
    return {
      status: "error",
      message: testUpdateError.message,
    };

  revalidatePath(`/dashboard/tests/${testId}`, "page");

  return {
    status: "success",
  };
};
