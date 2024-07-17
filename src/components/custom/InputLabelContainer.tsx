import { cn } from "@/lib/utils";
import React from "react";

type LabelInputContainerProps = {
   children: React.ReactNode;
   className?: string;
};

export function LabelInputContainer({ children, className }: LabelInputContainerProps) {
   return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
   );
}
