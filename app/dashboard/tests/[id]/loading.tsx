import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-background flex items-center justify-center min-h-screen h-full">
      <Loader className="size-10 animate-spin text-foreground" />
    </div>
  );
}
