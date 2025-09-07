import { atom, computed } from "nanostores";
import type { PreinitializedWritableAtom, ReadableAtom } from "nanostores";

import { merge } from "../../utils/object";

import {
  generateDayForPeriod,
  generateDaysForPeriod,
  generateNextPeriod,
  generatePreviousPeriod,
  generateWeek,
} from "../../helpers/calendar";
import { onSetMemo } from "../../helpers/store";
import type { DeepPartial } from "../../types";
import { CalendarPeriodTypeEnum } from "./types";
import type { CalendarConfig, CalendarPeriod } from "./types";

const DEFAULT_CONFIG: CalendarConfig = {
  startHour: 0,
  accessors: {
    start: "start",
    end: "end",
  },
  timeGrid: {
    defaultDurationMinutes: 15,
  },
};

const DEFAULT_PERIOD: CalendarPeriod = {
  period: 1,
  type: CalendarPeriodTypeEnum.WEEK,
};

export type CalendarStore = {
  config: PreinitializedWritableAtom<CalendarConfig>;
  period: PreinitializedWritableAtom<CalendarPeriod>;
  date: PreinitializedWritableAtom<Date>;
  hours: PreinitializedWritableAtom<number[]>;
  days: ReadableAtom<Date[]>;
  week: ReadableAtom<string[]>;
  nextPeriod: ReadableAtom<{ start: Date; end: Date }>;
  previousPeriod: ReadableAtom<{ start: Date; end: Date }>;
};

export const generateCalendarStore = (): CalendarStore => {
  const date = atom(new Date());
  const period = atom(DEFAULT_PERIOD);
  //TODO: separate even more config store to avoid re-render on computed properties
  const config = atom(DEFAULT_CONFIG);
  const hours = atom(Array.from({ length: 24 }, (_, i) => i));
  const days = computed([date, period], (date, period) =>
    generateDaysForPeriod(date, period),
  );
  const week = atom(generateWeek());

  const previousPeriod = computed([date, period], (date, period) =>
    generateDayForPeriod(generatePreviousPeriod(date, period), period),
  );

  const nextPeriod = computed([date, period], (date, period) =>
    generateDayForPeriod(generateNextPeriod(date, period), period),
  );

  onSetMemo([date, period, config, hours, days, previousPeriod, nextPeriod]);

  return {
    config,
    period,
    date,
    days,
    week,
    hours,
    nextPeriod,
    previousPeriod,
  };
};

export const generateCalendarActions = (store: CalendarStore) => {
  const setConfig = (config: DeepPartial<CalendarConfig>) => {
    store.config.set(merge(store.config.get(), config));
  };

  const setPeriod = (period: CalendarPeriod) => {
    store.period.set(period);
  };

  const goToNextPeriod = () => {
    const date = generateNextPeriod(store.date.get(), store.period.get());
    store.date.set(date);
  };

  const goToPreviousPeriod = () => {
    const date = generatePreviousPeriod(store.date.get(), store.period.get());
    store.date.set(date);
  };

  const goToToday = () => {
    store.date.set(new Date());
  };

  const goTo = (date: Date) => {
    store.date.set(date);
  };

  return {
    goTo,
    goToToday,
    goToPreviousPeriod,
    goToNextPeriod,
    setPeriod,
    setConfig,
  };
};
