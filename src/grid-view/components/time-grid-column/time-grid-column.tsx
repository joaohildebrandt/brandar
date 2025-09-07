import { createContext, memo, useContext } from "react";

import { cn } from "../../../utils/style";

import { useStore } from "../../../core/hooks/use-store";
import styles from "./styles.module.css";

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
      <TimeGridColumnContext.Provider value={{ day }}>
        <div
          {...props}
          className={cn(styles.timeGridColumn, className)}
          data-time-grid-column="true"
        >
          {children}
        </div>
      </TimeGridColumnContext.Provider>
    );
  },
);
