import { cn } from "../../../utils/style";

import styles from "./styles.module.css";

type TileViewProps = React.HTMLAttributes<HTMLDivElement>;

export const TileView = ({ className, children, ...props }: TileViewProps) => {
  return (
    <div {...props} className={cn(styles.tileView, className)}>
      {children}
    </div>
  );
};
