import type { CalendarItem } from '../../../../core/store/calendar-item/types';

export interface ItemGroupProps {
  children: (props: { items: CalendarItem[] }) => React.ReactNode;
}
