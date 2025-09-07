import { memo } from "react";
import { cn } from "../../../utils/style";

import { useStore } from "../../../core/hooks/use-store";
import style from "./styles.module.css";

type TimeGridProps = {
  className?: string;
  children: (props: {
    days: Date[];
    hours: readonly number[];
  }) => React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

export const TimeGrid = memo(
  ({ className, children, ...props }: TimeGridProps) => {
    const days = useStore((state) => state.calendar.days);
    const hours = useStore((state) => state.calendar.hours);

    return (
      <div
        {...props}
        className={cn(style.timeGrid, className)}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${days.length}, 1fr)`,
          width: "100%",
        }}
      >
        {children({
          days,
          hours,
        })}
      </div>
    );
  },
);
