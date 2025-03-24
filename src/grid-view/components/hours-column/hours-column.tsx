import { memo } from 'react';
import { useStore } from '../../../core/hooks/use-store';
import { cn } from '../../../utils/style';

import styles from './styles.module.css';

type HoursColumnProps = {
  children: (props: { hours: readonly number[] }) => React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export const HoursColumn = memo(
  ({ className, style, children, ...props }: HoursColumnProps) => {
    const hours = useStore((state) => state.calendar.hours);
    const {
      cell: {
        hour: { width },
      },
    } = useStore((state) => state.gridView.config);

    return (
      <div
        {...props}
        className={cn(styles.hoursColumn, className)}
        style={{ ...style, width }}
      >
        {children({ hours })}
      </div>
    );
  },
);
