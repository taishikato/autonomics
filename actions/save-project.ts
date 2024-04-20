"use server";

import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { revalidatePath } from "next/cache";

export const saveProject = async (formData: FormData) => {
  const description = formData.get("description") as string | null;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      status: "error",
      message: "user is null",
    };

  const {
    data,
    count,
    error: projectsFetchError,
  } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: false })
    .match({ user_id: user.id });

  if (projectsFetchError)
    return { status: "error", message: projectsFetchError.message };

  if (count === null) return { status: "error", message: "count is null" };

  if (count > 0) {
    // update
    await supabase
      .from("projects")
      .update({
        website_description: description ?? "",
      })
      .match({
        id: data[0].id,
      });
  } else {
    // insert
    await supabase.from("projects").insert({
      website_description: description ?? "",
    });
  }

  revalidatePath("/dashboard");

  return { status: "success" };
};
