import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/utils/supabase/createAdminSupabaseClient";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { count, error } = await supabase
      .from("users")
      .select("id", { count: "exact" })
      .match({ id: user.id });

    if (error || count === null) {
      redirect("/login");
    }

    if (count === 0) {
      const supabaseAdmin = createAdminClient();
      const { error } = await supabaseAdmin.from("users").insert({
        id: user.id,
        email: user.email,
      });
    }

    return redirect("/dashboard");
  }

  return (
    <>
      <Hero />
      <Footer className="mt-12" />
    </>
  );
}
