import { endOfDay, format, isSameDay, startOfDay } from 'date-fns';

import type { CalendarItem } from '../store/calendar-item/types';
import type { CalendarConfig } from '../store/calendar/types';
import { toDate } from '../utils/date';

export const isAllDay = (start: Date, end: Date) => {
  return (
    !isSameDay(start, end) ||
    (isSameDay(start, end) &&
      start.getHours() === 0 &&
      start.getMinutes() === 0 &&
      end.getHours() === 23 &&
      end.getMinutes() >= 45)
  );
};

const isItemInPeriod = (
  item: CalendarItem,
  start: Date,
  end: Date,
  accessors: CalendarConfig['accessors'],
) => {
  const startDate = toDate(item[accessors.start]);
  const endDate = toDate(item[accessors.end]);

  if (!startDate || !endDate) {
    return false;
  }

  return (
    (startDate >= start && startDate <= end) ||
    (endDate && endDate >= start && endDate <= end) ||
    (endDate && startDate <= start && endDate >= end)
  );
};

export const getItems = (
  items: CalendarItem[],
  start: Date,
  end: Date,
  accessors: CalendarConfig['accessors'],
) => {
  return items.filter((item) => {
    const startDate = toDate(item[accessors.start]);
    const endDate = toDate(item[accessors.end]);

    if (!startDate || !endDate || !isItemInPeriod(item, start, end, accessors))
      return false;

    return !isAllDay(startDate, endDate);
  });
};

export const getItemsAllDay = (
  items: CalendarItem[],
  start: Date,
  end: Date,
  accessors: CalendarConfig['accessors'],
) => {
  return items.filter((item) => {
    const startDate = toDate(item[accessors.start]);
    const endDate = toDate(item[accessors.end]);

    if (!startDate || !endDate || !isItemInPeriod(item, start, end, accessors))
      return false;

    return isAllDay(startDate, endDate);
  });
};

export const getItemsNoEnding = (
  items: CalendarItem[],
  start: Date,
  end: Date,
  accessors: CalendarConfig['accessors'],
) => {
  return items.filter((item) => {
    const hasEndDate = Boolean(toDate(item[accessors.end]));

    if (hasEndDate) return false;

    return isItemInPeriod(item, start, end, accessors);
  });
};

export const getItemsByDay = (
  items: readonly CalendarItem[],
  day: Date,
  accessors: CalendarConfig['accessors'],
) => {
  return items.filter((item) => {
    const start = toDate(item[accessors.start]);
    const end = toDate(item[accessors.end]);

    if (!start || !end) return false;

    return (
      !isAllDay(start, end) && start >= startOfDay(day) && end <= endOfDay(day)
    );
  });
};

export const getItemsByDate = (
  items: readonly CalendarItem[],
  accessors: CalendarConfig['accessors'],
) => {
  return items.reduce<Record<string, CalendarItem[]>>((accumulator, item) => {
    const start = toDate(item[accessors.start]);
    const end = toDate(item[accessors.end]);

    if (!start || !end || isAllDay(start, end)) return accumulator;

    const date = format(start, 'dd-MM-yyyy');

    const data = accumulator[date];
    if (!data) accumulator[date] = [item];
    if (data) data.push(item);

    return accumulator;
  }, {});
};
