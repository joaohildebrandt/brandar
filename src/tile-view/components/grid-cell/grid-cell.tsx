import { cn } from "../../../utils/style";

import styles from "./styles.module.css";

type GridCellProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const GridCell = (props: GridCellProps) => {
  return <div {...props} className={cn(styles.gridCell)} />;
};
