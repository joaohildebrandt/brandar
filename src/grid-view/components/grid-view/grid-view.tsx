import { cn } from "../../../utils/style";

import styles from "./styles.module.css";

type GridViewProps = React.HTMLAttributes<HTMLDivElement>;

export const GridView = ({ className, children, ...props }: GridViewProps) => {
  return (
    <div {...props} className={cn(styles.gridView, className)}>
      {children}
    </div>
  );
};
