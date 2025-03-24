import { memo } from 'react';

import type { CalendarItem } from '../../../../core/store/calendar-item/types';
import { useStore } from '../../../core/hooks/use-store';
import { cn } from '../../../utils/style';
import styles from './styles.module.css';

type AllDayItemGroupProps = {
  children: (props: { items: CalendarItem[] }) => React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export const AllDayItemGroup = memo(
  ({ children, className, ...props }: AllDayItemGroupProps) => {
    const days = useStore((state) => state.calendar.days);
    const itemsAllDay = useStore((state) => state.calendarItem.itemsAllDay);

    return (
      <div
        {...props}
        className={cn(styles.allDayItemGroup, className)}
        style={{
          gridTemplateColumns: `repeat(${days.length}, 1fr)`,
          gap: '4px',
        }}
      >
        {children({ items: itemsAllDay })}
      </div>
    );
  },
);
