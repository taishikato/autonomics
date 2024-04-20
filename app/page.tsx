import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { createAdminClient } from "@/utils/supabase/createAdminSupabaseClient";

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
    <div>
      <Link href="/login" className={buttonVariants()}>
        Login
      </Link>
    </div>
  );
}
