import { memo } from "react";
import { cn } from "../../../utils/style";

export const Container = memo(
  ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    );
  },
);
