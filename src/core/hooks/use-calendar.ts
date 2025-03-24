import { useEffect } from "react";
import type { CalendarItem } from "../../../core/store/calendar-item/types";
import type { CalendarConfig } from "../../../core/store/calendar/types";

import type { DeepPartial } from "../../../core/types";
import { useAction } from "./use-action";
import { useStore } from "./use-store";

type UseCalendarOptions = {
  items: CalendarItem[];
  config?: DeepPartial<CalendarConfig>;
};

export const useCalendar = (options: UseCalendarOptions = { items: [] }) => {
  const nextPeriod = useStore((state) => state.calendar.nextPeriod);
  const previouPeriod = useStore((state) => state.calendar.previousPeriod);
  const actions = useAction();

  useEffect(() => {
    if (options.items) {
      actions.calendarItem.setItems(options?.items);
    }
    if (options?.config) actions.calendar.setConfig(options?.config);
  }, [options?.items, options?.config, actions]);

  return {
    nextPeriod,
    previouPeriod,
    ...actions.calendar,
    // ...actions.calendarItem,
  };
};
