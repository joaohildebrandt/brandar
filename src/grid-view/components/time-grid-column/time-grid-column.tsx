import { createContext, memo, useContext } from "react";

import { cn } from "../../../utils/style";

import styles from "./styles.module.css";
import { useStore } from "../../../core/hooks/use-store";

type TimeGridColumnProps = { day: Date } & React.HTMLAttributes<HTMLDivElement>;

export const TimeGridColumnContext = createContext<{ day: Date } | null>(null);

export const useTimeGridColumn = () => {
  const context = useContext(TimeGridColumnContext);

  if (!context) {
    throw new Error(
      "useTimeGridColumn should be used within TimeGridColumn component",
    );
  }

  return context;
};

export const TimeGridColumn = memo(
  ({ className, children, day, ...props }: TimeGridColumnProps) => {
    return (
      <div
        {...props}
        className={cn(styles.timeGridColumn, className)}
        data-time-grid-column="true"
      >
        <TimeGridColumnContext value={{ day }}>
          {children}
        </TimeGridColumnContext>
      </div>
    );
  },
);
