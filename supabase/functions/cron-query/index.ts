// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";

Deno.serve(async () => {
  const { error } = await supabaseAdmin.from("users").select("id", {
    count: "exact",
  }).limit(1);

  if (error) {
    console.error(error.message);

    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({ status: "success" }),
    { headers: { "Content-Type": "application/json" } },
  );
});
