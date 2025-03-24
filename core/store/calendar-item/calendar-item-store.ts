import { atom, computed } from 'nanostores';
import type { PreinitializedWritableAtom, ReadableAtom } from 'nanostores';

import {
  getItems,
  getItemsAllDay,
  getItemsByDate,
  getItemsNoEnding,
} from '../../helpers/calendar-item';
import { onSetMemo } from '../../helpers/store';
import type { CalendarStore } from '../calendar/calendar-store';
import type { CalendarItem } from './types';

export type CalendarItemStore = {
  _items: PreinitializedWritableAtom<CalendarItem[]>;
  items: ReadableAtom<CalendarItem[]>;
  itemsAllDay: ReadableAtom<CalendarItem[]>;
  itemsNoEnding: ReadableAtom<CalendarItem[]>;
  itemsByDate: ReadableAtom<Record<string, CalendarItem[] | []>>;
};

export const generateCalendarItemStore = (
  calendar: CalendarStore,
): CalendarItemStore => {
  const _items = atom<CalendarItem[]>([]);
  const items = computed(
    [_items, calendar.days, calendar.config],
    (items, days, config) => {
      const start = days.at(0);
      const end = days.at(-1);

      if (!start || !end) return [];

      return getItems(items, start, end, config.accessors);
    },
  );
  const itemsAllDay = computed(
    [_items, calendar.days, calendar.config],
    (items, days, config) => {
      const start = days.at(0);
      const end = days.at(-1);

      if (!start || !end) return [];

      return getItemsAllDay(items, start, end, config.accessors);
    },
  );
  const itemsNoEnding = computed(
    [_items, calendar.days, calendar.config],
    (items, days, config) => {
      const start = days.at(0);
      const end = days.at(-1);

      if (!start || !end) return [];

      return getItemsNoEnding(items, start, end, config.accessors);
    },
  );
  const itemsByDate = computed([_items, calendar.config], (items, config) => {
    return getItemsByDate(items, config.accessors);
  });

  onSetMemo([_items, items, itemsAllDay, itemsNoEnding, itemsByDate]);

  return {
    _items,
    items,
    itemsAllDay,
    itemsNoEnding,
    itemsByDate,
  };
};

export const generateCalendarItemActions = (store: CalendarItemStore) => {
  const setItems = (items: CalendarItem[]) => {
    store._items.set(items);
  };

  return {
    setItems,
  };
};
