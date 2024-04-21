"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import { useEffect } from "react";
hljs.registerLanguage("javascript", javascript);

export const HowItWorksSection = ({ testId }: { testId: string }) => {
  const exampleCode = `
// get text for the CTA button
const response = await fetch(${process.env.NEXT_PUBLIC_GET_TEXT_API}, {
  method: "POST",
  body: JSON.stringify({
    testId: ${testId}
  })
});

const pickedPattern = await response.json();

<button
  onClick={() => {
    // count up the click count for the picked up text (pattern)
    fetch(${process.env.NEXT_PUBLIC_CLICK_MEASURE_API}, {
      method: "POST",
      body: JSON.stringify({
        testId: ${testId}
        paternId: pickedPattern.id,
      }),
    }).then(res => console.log(res))
  }}
>
  {pickedPattern.text}
</button>
`;

  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full justify-start gap-x-3 md:w-1/2"
          )}
        >
          How does it work?
        </AccordionTrigger>
        <AccordionContent className="p-3 bg-muted rounded-md">
          <div>
            <ul>
              <li>
                - When activating the test for the first time, AI automatically
                generates two texts for the CTA button and initiates the test.
              </li>
              <li>- Every seven days, AI generates new text.</li>
              <li>
                - Automatically replaces the text with the lower CTR from the
                previous test.
              </li>
              <li>- Automatically starts the test with the new text.</li>
            </ul>

            <div className="font-semibold text-lg mt-4">
              How to get a text for your CTA button and measure the clicks?
            </div>
            <pre className="break-all p-2 bg-background mt-2 rounded-md">
              <code className="javascript break-all">{exampleCode}</code>
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
