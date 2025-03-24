import { memo } from "react";
import { cn } from "../../../utils/style";

import styles from "./styles.module.css";

export const CornerCell = memo(
  ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className={cn(styles.cornerCell, className)} {...props}>
        {children}
      </div>
    );
  },
);
