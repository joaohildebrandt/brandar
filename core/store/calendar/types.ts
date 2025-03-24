export const CalendarPeriodTypeEnum = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
} as const;

export type CalendarPeriodType =
  (typeof CalendarPeriodTypeEnum)[keyof typeof CalendarPeriodTypeEnum];
export type CalendarPeriodValue = number;

export type CalendarPeriod = {
  period: CalendarPeriodValue;
  type: CalendarPeriodType;
};

export type CalendarConfig = {
  accessors: {
    start: string;
    end: string;
  };
  startHour: number;
  timeGrid: {
    defaultDurationMinutes: number;
  };
};

export type CalendarState = {
  date: Date;
  period: CalendarPeriod;
  config: CalendarConfig;
};
