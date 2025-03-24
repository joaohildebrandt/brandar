import { memo } from 'react';

import styles from './styles.module.css';

import { toFormattedDate } from '../../../../core/utils/date';
import { useStore } from '../../../core/hooks/use-store';
import { useTimeGridColumn } from '../time-grid-column/time-grid-column';

import type { ItemGroupProps } from './types';

export const ItemGroup = memo(({ children }: ItemGroupProps) => {
  const { day } = useTimeGridColumn();
  const {
    itemGroup: { reservedSpace },
  } = useStore((state) => state.gridView.config);
  const itemsByDate = useStore((state) => state.calendarItem.itemsByDate);
  const items = itemsByDate[toFormattedDate(day)];

  if (!items || !items.length) return null;

  return (
    <div
      className={styles.itemGroup}
      style={{
        position: 'absolute',
        right: `${reservedSpace}%`,
      }}
    >
      {children({ items })}
    </div>
  );
});
