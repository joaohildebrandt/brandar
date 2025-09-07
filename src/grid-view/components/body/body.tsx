import { useEffect, useRef } from "react";

import { useAction } from "../../../core/hooks/use-action";
import { useStore } from "../../../core/hooks/use-store";
import { cn } from "../../../utils/style";

import styles from "./styles.module.css";

export const BodyWrapper = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const {
    cell: {
      hour: { height },
    },
  } = useStore((state) => state.gridView.config);
  const actions = useAction();
  const scrollToCurrentTime = useStore(
    (state) => state.gridView.scrollToCurrentTime,
  );

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToCurrentTime && bodyRef.current) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const scrollPosition = (currentHour + currentMinute / 60) * height - 100;

      bodyRef?.current?.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: "smooth",
      });

      actions.gridView.resetScrollToCurrentTime();
    }
  }, [actions, height, scrollToCurrentTime]);

  return (
    <div className={styles.bodyWrapper} ref={bodyRef}>
      {children}
    </div>
  );
};

export const Body = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn(styles.body, className)}>
      {children}
    </div>
  );
};
