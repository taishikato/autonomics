"use server";

import { createClient } from "@/utils/supabase/createServerSupabaseClient";
import { revalidatePath } from "next/cache";
import axios from "redaxios";

const PATTERN_GENERATE_API = process.env.PATTERN_GENERATE_API;
if (!PATTERN_GENERATE_API) {
  throw new Error("process.env.PATTERN_GENERATE_API is not defined");
}

const API_SECRET_TOKEN = process.env.API_SECRET_TOKEN;
if (!API_SECRET_TOKEN) {
  throw new Error("process.env.API_SECRET_TOKEN is not defined");
}

export const startTest = async (
  testId: string,
  purpose: string,
  websiteDescription: string,
) => {
  // generate 2 patterns
  const generatedPatterns = [];
  for (let i = 0; i < 2; i++) {
    const { data } = await axios.post(
      `${PATTERN_GENERATE_API}?secret_token=${API_SECRET_TOKEN}`,
      {
        testId,
        query:
          `Product description: ${websiteDescription}. Purpose of the CTA button: ${purpose}. CTA Button: `,
      },
    );

    generatedPatterns.push(data);
  }

  // turn this test on
  const supabase = createClient();

  const { error } = await supabase
    .from("tests")
    .update({
      is_on: true,
    })
    .match({ id: testId });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath(`/dashboard/tests/${testId}`, "page");

  return { status: "success" };
};
