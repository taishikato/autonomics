// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const randomChoice = () => Math.random() < 0.5 ? 0 : 1;

type Data = {
  id: string;
  text: string;
  test_id: string;
};

import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";

Deno.serve(async (req) => {
  try {
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
    supabaseAdmin.rpc("increment_pattern_show_count", {
      x: 1,
      patternid: patternToReturn.id,
    }).then((res) => {
      console.log(res);
    });

    return new Response(
      JSON.stringify(patternToReturn),
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
