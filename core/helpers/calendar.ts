import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';

import { enUS } from 'date-fns/locale';
import type { CalendarPeriod } from '../store/calendar/types';
import { CalendarPeriodTypeEnum } from '../store/calendar/types';

export const generateNextPeriod = (date: Date, period: CalendarPeriod) => {
  const handlers = {
    [CalendarPeriodTypeEnum.DAY]: (date: Date, value: number) =>
      addDays(date, value),
    [CalendarPeriodTypeEnum.WEEK]: (date: Date, value: number) =>
      addWeeks(date, value),
    [CalendarPeriodTypeEnum.MONTH]: (date: Date, value: number) =>
      addMonths(date, value),
    [CalendarPeriodTypeEnum.YEAR]: (date: Date, value: number) =>
      addYears(date, value),
  };

  return handlers[period.type](date, period.period);
};

export const generatePreviousPeriod = (
  date: Date,
  period: CalendarPeriod,
): Date => {
  const handlers = {
    [CalendarPeriodTypeEnum.DAY]: (date: Date, value: number) =>
      subDays(date, value),
    [CalendarPeriodTypeEnum.WEEK]: (date: Date, value: number) =>
      subWeeks(date, value),
    [CalendarPeriodTypeEnum.MONTH]: (date: Date, value: number) =>
      subMonths(date, value),
    [CalendarPeriodTypeEnum.YEAR]: (date: Date, value: number) =>
      subYears(date, value),
  };

  return handlers[period.type](date, period.period);
};

export const generateDayForPeriod = (date: Date, period: CalendarPeriod) => {
  const { period: value, type } = period;

  const handlers = {
    [CalendarPeriodTypeEnum.DAY]: {
      start: (d: Date) => startOfDay(d),
      end: (d: Date, v: number) => endOfDay(addDays(d, v - 1)),
    },
    [CalendarPeriodTypeEnum.WEEK]: {
      start: (d: Date) => startOfWeek(d),
      end: (d: Date, v: number) => endOfWeek(addWeeks(d, v - 1)),
    },
    [CalendarPeriodTypeEnum.MONTH]: {
      start: (d: Date) => startOfWeek(startOfMonth(d)),
      end: (d: Date, v: number) => endOfWeek(endOfMonth(addMonths(d, v - 1))),
    },
    [CalendarPeriodTypeEnum.YEAR]: {
      start: (d: Date) => startOfWeek(startOfMonth(startOfYear(d))),
      end: (d: Date, v: number) =>
        endOfWeek(endOfMonth(endOfYear(addYears(d, v - 1)))),
    },
  };

  const handler = handlers[type];

  const start = handler.start(date);
  const end = handler.end(date, value);

  return { start, end };
};

export const generateDaysForPeriod = (
  date: Date,
  period: CalendarPeriod,
): Date[] => {
  const { start, end } = generateDayForPeriod(date, period);

  return eachDayOfInterval({ start, end });
};

export const generateWeek = (): string[] => {
  return generateDaysForPeriod(new Date(), {
    type: CalendarPeriodTypeEnum.WEEK,
    period: 1,
  }).map((day) => format(day, 'EEE', { locale: enUS }));
};
