// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { corsHeaders } from "../_shared/cors.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";

const randomChoice = () => Math.random() < 0.5 ? 0 : 1;

Deno.serve(async (req) => {
  try {
    // This is needed if you're planning to invoke your function from a browser.
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const { testId } = await req.json();

    // get patterns for the test
    const { data } = await supabaseAdmin.from("patterns").select("id, text")
      .match({
        test_id: testId,
        is_active: true,
      });

    if (!data || data.length === 0) {
      throw new Error("There is no active patters for this Test");
    }

    // pick one
    const patternToReturn = data[randomChoice()];

    // count up show count for this pattern
    try {
      supabaseAdmin.rpc("increment_pattern_display_count", {
        x: 1,
        patternid: patternToReturn.id,
      }).then((res) => {
        if (res.error) console.error(res.error.message);
      });
    } catch (err) {
      console.error("increment_pattern_display_count error", err);
    }

    return new Response(
      JSON.stringify(patternToReturn),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const errorMessage = (err as Error).message;

    console.error(errorMessage);

    return new Response(
      JSON.stringify({ status: "error", message: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
