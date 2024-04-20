"use server";

import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};
