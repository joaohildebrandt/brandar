import { cn } from '../../../utils/style';

import { useStore } from '../../../core/hooks/use-store';
import styles from './styles.module.css';

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
      role="button"
      tabIndex={0}
      className={cn(styles.item, className)}
      style={{
        ...style,
        ...layoutStyle,
      }}
    />
  );
};
