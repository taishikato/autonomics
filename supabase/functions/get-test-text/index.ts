// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

console.log("Hello from Functions!")

const randomChoice = () => Math.random() < 0.5 ? 0 : 1;

type Data = {
    id: string
    text: string
    test_id: string
  }

import { supabaseAdmin } from "../_shared/supabaseAdmin.ts"

Deno.serve(async (req) => {
  const { testId } = await req.json()

  // get patterns for the test
  const { data } = await supabaseAdmin.from("patterns").select("id, text").match({
    test_id: testId,
    is_active: true
  })

  // pick one
  const patternToReturn = data[randomChoice()]

  // count up show count for this pattern
  const { data: d, error: e } = await supabaseAdmin.rpc("increment_pattern_show_count", {
    x: 1,
    patternid: patternToReturn.id
  });

  return new Response(
    JSON.stringify(patternToReturn),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-test-text' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
