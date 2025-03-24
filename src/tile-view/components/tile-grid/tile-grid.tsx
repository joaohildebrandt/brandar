import { cn } from "../../../utils/style";

import styles from "./styles.module.css";

type TileGridProps = React.HTMLAttributes<HTMLDivElement>;

export const TileGrid = (props: TileGridProps) => {
  return <div {...props} className={cn(styles.tileGrid)} />;
};
