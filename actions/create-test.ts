"use server";

import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { revalidatePath } from "next/cache";

export const createTest = async (formData: FormData) => {
  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;

  if (!name)
    return {
      status: "error",
      message: "name can't be empty",
    };

  const supabase = createClient();
  const { data, error: testInsertError } = await supabase
    .from("tests")
    .insert({ name, description })
    .select("id")
    .single();

  if (testInsertError)
    return {
      status: "error",
      message: testInsertError.message,
    };

  revalidatePath("/dashboard");

  return {
    status: "success",
    testId: data.id,
  };
};
