import { useStore } from '../../../core/hooks/use-store';
import { cn } from '../../../utils/style';

import styles from './styles.module.css';

type AllDayItemProps = {
  id: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const AllDayItem = ({
  id,
  className,
  style,
  ...props
}: AllDayItemProps) => {
  const layout = useStore((state) => state.allDayItemGroup.layout)[id];

  if (!layout) {
    return null;
  }

  return (
    <div
      {...props}
      data-all-day-item="true"
      role="button"
      tabIndex={0}
      className={cn(styles.allDayItem, className)}
      style={{
        ...style,
        gridColumnStart: layout.gridColumnStart,
        gridColumnEnd: layout.gridColumnEnd,
        gridRowStart: layout.gridRowStart,
        zIndex: layout.zIndex,
        maxWidth: layout.maxWidth,
      }}
    />
  );
};

AllDayItem.displayName = 'AllDayItem';
