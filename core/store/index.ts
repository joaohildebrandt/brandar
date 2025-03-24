import { generateAllDayItemGroupStore } from './all-day-item-group/all-day-item-group-store';
import {
  generateCalendarItemActions,
  generateCalendarItemStore,
} from './calendar-item/calendar-item-store';
import {
  generateCalendarActions,
  generateCalendarStore,
} from './calendar/calendar-store';
import {
  generateGridViewActions,
  generateGridViewStore,
} from './grid-view/grid-view-store';
import { generateTimeGridItemStore } from './time-grid-item/time-grid-item-store';

export type Stores = {
  calendar: ReturnType<typeof generateCalendarStore>;
  calendarItem: ReturnType<typeof generateCalendarItemStore>;
  gridView: ReturnType<typeof generateGridViewStore>;
  allDayItemGroup: ReturnType<typeof generateAllDayItemGroupStore>;
  timeGridItem: ReturnType<typeof generateTimeGridItemStore>;
};

const initializeStores = (): Stores => {
  const calendar = generateCalendarStore();
  const gridView = generateGridViewStore();
  const calendarItem = generateCalendarItemStore(calendar);
  const timeGridItem = generateTimeGridItemStore(
    calendar,
    calendarItem,
    gridView,
  );
  const allDayItemGroup = generateAllDayItemGroupStore(
    calendar,
    gridView,
    calendarItem,
  );

  return {
    allDayItemGroup,
    calendar,
    calendarItem,
    gridView,
    timeGridItem,
  };
};

const initializeActions = (stores: Stores) => {
  const calendar = generateCalendarActions(stores.calendar);
  const calendarItem = generateCalendarItemActions(stores.calendarItem);
  const gridView = generateGridViewActions(stores.gridView);

  return {
    calendar: {
      ...calendar,
      goToToday: (shouldScroll = false) => {
        calendar.goToToday();
        if (shouldScroll) gridView.startScrollToCurrentTime();
      },
    },
    calendarItem,
    gridView,
  };
};

export type CalendarClient = {
  stores: ReturnType<typeof initializeStores>;
  actions: ReturnType<typeof initializeActions>;
};

export const initialize = () => {
  const stores = initializeStores();
  const actions = initializeActions(stores);

  return {
    stores,
    actions,
  };
};
