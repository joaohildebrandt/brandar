import { computed } from 'nanostores';
import type { ReadableAtom } from 'nanostores';

import { calculateLayout } from '../../helpers/all-day-item-group/all-day-item-group';
import type { CalculateLayoutResult } from '../../helpers/all-day-item-group/types';
import { onSetMemo } from '../../helpers/store';
import type { CalendarItemStore } from '../calendar-item/calendar-item-store';
import type { CalendarStore } from '../calendar/calendar-store';
import type { GridViewStore } from '../grid-view/grid-view-store';

export type AllDayItemGroupStore = {
  layout: ReadableAtom<CalculateLayoutResult>;
};

export const generateAllDayItemGroupStore = (
  calendar: CalendarStore,
  gridView: GridViewStore,
  calendarItem: CalendarItemStore,
) => {
  const layout = computed(
    [calendarItem.itemsAllDay, calendar.days, calendar.config, gridView.config],
    (items, days, calendarConfig, gridViewConfig) =>
      calculateLayout(items, days, {
        ...calendarConfig.accessors,
        reservedSpace: gridViewConfig.itemGroup.reservedSpace,
      }),
  );

  onSetMemo([layout]);

  return {
    layout,
  };
};

export const generateAllDayItemGroupActions = () => {
  return {};
};
