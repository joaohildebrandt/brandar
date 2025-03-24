import { cn } from "../../../utils/style";

import styles from "./styles.module.css";
import { useStore } from "../../../core/hooks/use-store";

type ItemProps = {
  id: string;
  day: Date;
} & React.HTMLAttributes<HTMLDivElement>;

export const Item = ({ id, className, style, ...rest }: ItemProps) => {
  const { styles: layoutStyles } = useStore(
    (state) => state.timeGridItem.layout,
  );

  const layoutStyle = layoutStyles[id];

  if (!layoutStyle) return null;

  return (
    <div
      {...rest}
      className={cn(styles.item, className)}
      style={{
        ...style,
        ...layoutStyle,
      }}
    />
  );
};
