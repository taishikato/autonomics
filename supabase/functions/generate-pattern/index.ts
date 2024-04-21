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

const defaultSystemPrompt =
  "You are a product manager for SaaS software with 10 years of experience. You will be provided with a product description and the purpose of teh CTA button on the landing page, and your task is to generate a text for the CTA button. Make an answer concise. Return ONLY the answer.";

Deno.serve(async (req) => {
  try {
    const { testId, query } = await req.json();

    // fetch existing patterns
    const { data: existingPatterns, error: fetchExistingPatternsError } =
      await supabaseAdmin.from("patterns")
        .select("text").match({
          test_id: testId,
        });

    if (fetchExistingPatternsError) {
      throw new Error(fetchExistingPatternsError.message);
    }

    const existingPatternsText = existingPatterns.reduce((acc, current) => {
      if (acc === null) {
        acc = current.text;
      } else {
        // @ts-ignore shut up
        acc += `,${current.text}`;
      }

      return acc;
    }, null);

    const systemPrompt = existingPatternsText
      ? `${defaultSystemPrompt} Do NOT generate text for CTA buttons that is the same as existing ones. Existing texts: ${existingPatternsText}`
      : defaultSystemPrompt;

    // generate pattern text
    const chatCompletion = await openai.chat.completions.create({
      messages: [{
        role: "system",
        content: systemPrompt,
      }, {
        role: "user",
        content: query,
      }],
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
