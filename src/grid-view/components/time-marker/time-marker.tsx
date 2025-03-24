import { isToday } from 'date-fns';

import { memo, useMemo } from 'react';
import { useStore } from '../../../core/hooks/use-store';

import styles from './styles.module.css';

type TimeMarkerProps = {
  day?: Date;
};

export const TimeMarker = memo(({ day }: TimeMarkerProps) => {
  const date = useStore((state) => state.calendar.date);
  const {
    cell: {
      hour: { height },
    },
  } = useStore((state) => state.gridView.config);

  const isCurrentDay = useMemo(() => isToday(day || date), [day, date]);

  if (!isCurrentDay) {
    return null;
  }

  const top = `${(date.getHours() + date.getMinutes() / 60) * height}px`;

  return (
    <div
      className={styles.wrapper}
      style={{
        top,
      }}
    >
      <div className={styles.line} />
      <div className={styles.dot} />
    </div>
  );
});
