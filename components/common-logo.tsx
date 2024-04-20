import { cn } from "@/lib/utils";
import { memo } from "react";
import { APP_NAME } from "@/utils/consts";
import { RefreshCcwDot } from "lucide-react";

const Logo = ({
  className = "",
  showLogo = true,
}: {
  className?: string;
  showLogo?: boolean;
}) => {
  return (
    <div className={cn("flex items-center text-lg font-medium", className)}>
      {showLogo && <RefreshCcwDot className="mr-2 h-5 w-5 text-gray-900" />}
      {APP_NAME}
    </div>
  );
};

export const MemoLogo = memo(Logo);
