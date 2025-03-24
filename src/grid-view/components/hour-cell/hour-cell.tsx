import { memo, useMemo } from 'react';
import { cn } from '../../../utils/style';

import { useStore } from '../../../core/hooks/use-store';
import styles from './styles.module.css';

type HourCellProps = {
  hour: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const HourCell = memo(({ hour, className, ...props }: HourCellProps) => {
  const {
    cell: {
      hour: { height, width },
    },
  } = useStore((state) => state.gridView.config);

  const formattedHour = useMemo(() => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  }, [hour]);

  return (
    <div
      {...props}
      className={cn(styles.hourCell, className)}
      style={{
        ...props.style,
        height,
        width,
      }}
    >
      {formattedHour}
    </div>
  );
});
