import { type Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserAuthForm } from "./_components/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { APP_NAME } from "@/utils/consts";
import { MemoLogo } from "@/components/common-logo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Authentication | ${APP_NAME}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
  },
};

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen h-full w-full">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "inline-flex lg:hidden m-3 text-sm"
        )}
      >
        <MoveLeft className="h-4 w-4 mr-2" /> Go back
      </Link>
      <div className="md:h-screen container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 pt-24 md:pt-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <MemoLogo className="relative z-20" />
          {/* <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div> */}
        </div>
        <div className="lg:p-8 md:h-full">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden lg:inline-flex text-sm"
            )}
          >
            <MoveLeft className="h-4 w-4 mr-2" /> Go back
          </Link>
          <div className="flex justify-center items-center h-full">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Sign up / Log in
                </h1>
                <p className="text-sm text-muted-foreground">
                  Start by signing in with your Google account
                </p>
              </div>
              <UserAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                {/* <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "} */}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
