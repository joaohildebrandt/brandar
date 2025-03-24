import { differenceInDays, endOfDay, isSameDay, startOfDay } from 'date-fns';

import type { CalendarItem } from '../../store/calendar-item/types';
import type { CalendarConfig } from '../../store/calendar/types';
import type { GridViewConfig } from '../../store/grid-view/types';
import { toDate } from '../../utils/date';

import type { LayoutCalculationResult, TimeSlot } from './types';

const sortAllDayItems = (
  items: readonly CalendarItem[],
  accessors: CalendarConfig['accessors'],
) => {
  return [...items].sort((a, b) => {
    const aStart = toDate(a[accessors.start]);
    const bStart = toDate(b[accessors.start]);

    if (!aStart || !bStart) return 0;
    // Compare start dates
    if (aStart.getTime() !== bStart.getTime()) {
      return aStart.getTime() - bStart.getTime();
    }

    const aEnd = a[accessors.end] ? toDate(a[accessors.end]) : aStart;
    const bEnd = b[accessors.end] ? toDate(b[accessors.end]) : bStart;

    if (!aEnd || !bEnd) return 0;

    // If they start at the same time, longer events go first
    return differenceInDays(bEnd, bStart) - differenceInDays(aEnd, aStart);
  });
};

const findDayIndex = (days: Date[], targetDate: Date, isStart: boolean) => {
  for (
    let i = isStart ? 0 : days.length - 1;
    isStart ? i < days.length : i >= 0;
    isStart ? i++ : i--
  ) {
    if (
      isSameDay(days[i], targetDate) ||
      (isStart && i === 0 && targetDate < days[i]) ||
      (!isStart && i === days.length - 1 && targetDate > days[i])
    ) {
      return i;
    }
  }

  return isStart ? 0 : days.length - 1;
};

const findAvailableRowIndex = (
  rows: TimeSlot[][],
  eventStart: Date,
  eventEnd: Date,
) => {
  for (let i = 0; i < rows.length; i++) {
    const hasOverlap = rows[i].some(
      (existing) => eventStart <= existing.end && eventEnd >= existing.start,
    );

    if (!hasOverlap) {
      return i;
    }
  }

  return rows.length;
};

export const calculateLayout = (
  items: readonly CalendarItem[],
  days: Date[],
  config: CalendarConfig['accessors'] & GridViewConfig['allDayItemGroup'],
) => {
  const periodStart = startOfDay(days[0]);
  const periodEnd = endOfDay(days[days.length - 1]);

  const sortedItems = sortAllDayItems(items, {
    start: config.start,
    end: config.end,
  });

  const { layoutResult } = sortedItems.reduce<LayoutCalculationResult>(
    (accumulator, item) => {
      const itemStart = toDate(item[config.start]);
      const itemEnd = toDate(item[config.end]);

      if (!itemStart) return accumulator;

      const itemStartOfDay = startOfDay(itemStart);
      const itemEndOfDay = itemEnd
        ? endOfDay(itemEnd)
        : endOfDay(itemStartOfDay);

      const rowIndex = findAvailableRowIndex(
        accumulator.rows,
        itemStartOfDay,
        itemEndOfDay,
      );

      const updatedRows = [...accumulator.rows];
      if (!updatedRows[rowIndex]) {
        updatedRows[rowIndex] = [];
      }
      updatedRows[rowIndex] = [
        ...updatedRows[rowIndex],
        { start: itemStartOfDay, end: itemEndOfDay },
      ];

      const visibleStart =
        itemStartOfDay < periodStart ? periodStart : itemStartOfDay;
      const visibleEnd = itemEndOfDay > periodEnd ? periodEnd : itemEndOfDay;

      const startDayIndex = findDayIndex(days, visibleStart, true);
      const endDayIndex = findDayIndex(days, visibleEnd, false);

      const cellWidthPercentage = Math.round(
        100 / (endDayIndex - startDayIndex + 1),
      );
      const maxWidth =
        config.reservedSpace > 0
          ? `calc(100% - ${(config.reservedSpace * cellWidthPercentage) / 100}%)`
          : '100%';

      const itemLayout = {
        gridColumnStart: startDayIndex + 1,
        gridColumnEnd: endDayIndex + 2,
        gridRowStart: rowIndex + 1,
        rowIndex,
        zIndex: 30 + rowIndex,
        maxWidth,
      };

      if (
        (typeof item.id !== 'string' && typeof item.id !== 'number') ||
        !item.id
      )
        return accumulator;

      return {
        rows: updatedRows,
        layoutResult: {
          ...accumulator.layoutResult,
          [item.id]: itemLayout,
        },
      };
    },
    { rows: [], layoutResult: {} },
  );

  return layoutResult;
};
