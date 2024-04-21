// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import OpenAI from "https://deno.land/x/openai@v4.38.2/mod.ts";

const apiKey = Deno.env.get("OPENAI_API_KEY");
const openai = new OpenAI({
  apiKey: apiKey,
});

Deno.serve(async (req) => {
  try {
    const { testId, query } = await req.json();

    // generate pattern text
    // Get the prompt from the query string

    // Documentation here: https://github.com/openai/openai-node
    const chatCompletion = await openai.chat.completions.create({
      messages: [{
        role: "system",
        content:
          "You are a product manager for SaaS software with 10 years of experience. You will be provided with a product description and the purpose of teh CTA button on the landing page, and your task is to generate a text for the CTA button. Make an answer concise. Return ONLY the answer.",
      }, {
        role: "user",
        content: query,
      }],
      // Choose model from here: https://platform.openai.com/docs/models
      model: "gpt-4-turbo",
      stream: false,
    });

    const reply = chatCompletion.choices[0].message.content;

    return new Response(
      JSON.stringify({ status: "success", reply }),
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
