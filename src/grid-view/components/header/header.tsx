import { memo } from "react";

import { cn } from "../../../utils/style";

import styles from "./styles.module.css";
import { useStore } from "../../../core/hooks/use-store";

type HeaderProps = {
  children: (props: { days: Date[] }) => React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

export const Header = memo(({ className, children, ...props }: HeaderProps) => {
  const days = useStore((state) => state.calendar.days);

  return (
    <div className={cn(styles.header, className)} {...props}>
      {children({ days })}
    </div>
  );
});
