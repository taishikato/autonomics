// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";

Deno.serve(async (req) => {
  try {
    const { patternId } = await req.json();

    if (!patternId) {
      throw new Error("patternId can't be empty, null or undefined");
    }

    const { error } = await supabaseAdmin.rpc("increment_pattern_click_count", {
      x: 1,
      patternid: patternId,
    });

    if (error) throw new Error(error.message);

    return new Response(
      JSON.stringify({ status: "success" }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    const errorMessage = (err as Error).message;

    console.error(errorMessage);

    return new Response(
      JSON.stringify({ status: "error", message: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/increment-click' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
