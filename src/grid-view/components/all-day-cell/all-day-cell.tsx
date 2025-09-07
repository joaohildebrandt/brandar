import { memo } from "react";
import { cn } from "../../../utils/style";

import styles from "./styles.module.css";

type AllDayCellProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const AllDayCell = memo((props: AllDayCellProps) => {
  return <div {...props} className={cn(styles.allDayCell, props.className)} />;
});
