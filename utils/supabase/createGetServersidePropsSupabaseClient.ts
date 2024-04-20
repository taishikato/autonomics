import { type GetServerSidePropsContext } from "next";
import {
  createServerClient,
  type CookieOptions,
  serialize,
} from "@supabase/ssr";
import type { Database } from "@/types/supabase";

export const createGetServersidePropsSupabaseClient = (
  context: GetServerSidePropsContext
) => {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return context.req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          context.res.setHeader("Set-Cookie", serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          context.res.setHeader("Set-Cookie", serialize(name, "", options));
        },
      },
    }
  );

  return supabase;
};
