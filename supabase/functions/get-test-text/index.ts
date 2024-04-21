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
  supabaseAdmin.rpc("increment_pattern_show_count", {
    x: 1,
    patternid: patternToReturn.id
  }).then(res => {
    console.log(res)
  })

  return new Response(
    JSON.stringify(patternToReturn),
    { headers: { "Content-Type": "application/json" } },
  )
})

