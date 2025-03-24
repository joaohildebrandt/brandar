import { computed } from 'nanostores';
import type { ReadableAtom } from 'nanostores';

import { onSetMemo } from '../../helpers/store';

import { calculateTimeGridItemLayout } from '../../helpers/time-grid-item/time-grid-item';

import type { CalendarItemStore } from '../calendar-item/calendar-item-store';
import type { CalendarStore } from '../calendar/calendar-store';
import type { GridViewStore } from '../grid-view/grid-view-store';

import type { TimeGridItemGroupLayout } from './types';

export type TimeGridItemGroupStore = {
  layout: ReadableAtom<TimeGridItemGroupLayout>;
};

export const generateTimeGridItemStore = (
  calendar: CalendarStore,
  calendarItem: CalendarItemStore,
  gridView: GridViewStore,
): TimeGridItemGroupStore => {
  const layout = computed(
    [calendarItem.items, calendar.config, gridView.config],
    (items, calendarConfig, gridViewConfig) =>
      calculateTimeGridItemLayout(items, {
        accessors: calendarConfig.accessors,
        startHour: calendarConfig.startHour,
        reservedSpace: gridViewConfig.itemGroup.reservedSpace,
        rowHeight: gridView.config.get().cell.hour.height,
      }),
  );

  onSetMemo([layout]);

  return {
    layout,
  };
};
