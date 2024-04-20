"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
// import { usePostHog } from "posthog-js/react";
import { memo } from "react";

const LogoutForm = () => {
  // const posthog = usePostHog();

  return (
    <form
      action={async () => {
        // posthog.reset();
        await logout();
      }}
      className="w-full"
    >
      <Button
        size="sm"
        variant="ghost"
        type="submit"
        className="w-full justify-start"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Logout</span>
      </Button>
    </form>
  );
};

export const MemoLogoutForm = memo(LogoutForm);
