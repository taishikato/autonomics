<a href="https://autonomics.vercel.app/">
  <img alt="Autonomics" src="https://github.com/taishikato/autonomics/assets/980588/57c2b6ac-2782-4f0a-84aa-7dd7c4a25d77">
</a>


# Autonomics

Autonomics is a platform aimed at creating websites that perform self-optimization.

As a first step, Autonomics is currently focusing on using AI to automatically and continuously optimize CTA buttons on landing pages through A/B testing.

It comes in two parts:

1. **Autonomics Dashboard** - an open-source dashboard to manage your AB testings.
2. **Autonomics API** - an open-source APIs to fetch/update your AB testings.

## Tech stack

- Supabase - Auth, Database, Edge Functions
- Next.js - for the dashboard
- Vercel - hosting the dashboard

## Features


Currently, Autonomics does one simple thing:

It continuously automates A/B testing of CTA buttons using AI. Every seven days after starting an A/B test, the AI compares the CTR (Click-Through Rate) of the two current CTA button texts being used. It automatically excludes the text with the lower CTR from the test, creates a new text, and begins a new A/B test with the text that had the higher CTR in the previous test.

## Demo

You can check the quick demo here: https://youtu.be/lVsIGvQyIwM?si=XDYBdsN1MNuFT877
