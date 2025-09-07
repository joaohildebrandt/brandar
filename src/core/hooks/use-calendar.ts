import { useEffect } from "react";
import type { CalendarItem } from "../../../core/store/calendar-item/types";
import type {
  CalendarConfig,
  CalendarPeriod,
} from "../../../core/store/calendar/types";

import type { DeepPartial } from "../../../core/types";
import { useAction } from "./use-action";
import { useStore } from "./use-store";

type UseCalendarOptions = {
  period?: CalendarPeriod;
  items?: CalendarItem[];
  config?: DeepPartial<CalendarConfig>;
};

export const useCalendar = (
  options: UseCalendarOptions = {
    items: [],
    period: { period: 1, type: "week" },
  },
) => {
  const date = useStore((state) => state.calendar.date);
  const nextPeriod = useStore((state) => state.calendar.nextPeriod);
  const previousPeriod = useStore((state) => state.calendar.previousPeriod);
  const actions = useAction();

  useEffect(() => {
    if (options.items) {
      actions.calendarItem.setItems(options?.items);
    }
    if (options.period) {
      actions.calendar.setPeriod(options?.period);
    }
    if (options?.config) actions.calendar.setConfig(options?.config);
  }, []);

  return {
    nextPeriod,
    previousPeriod,
    ...actions.calendar,
    // ...actions.calendarItem,
  };
};
