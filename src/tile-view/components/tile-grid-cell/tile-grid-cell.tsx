import { cn } from "../../../utils/style";

import styles from "./styles.module.css";

type TileGridCellProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const TileGridCell = (props: TileGridCellProps) => {
  return <div {...props} className={cn(styles.tileGridCell)} />;
};
