import { isToday } from "date-fns";

import { memo, useMemo } from "react";
import { useStore } from "../../../core/hooks/use-store";

type TimeMarkerProps = {
  day?: Date;
};

export const TimeMarker = memo(({ day }: TimeMarkerProps) => {
  const date = useStore((state) => state.calendar.date);
  const {
    cell: {
      hour: { height },
    },
  } = useStore((state) => state.gridView.config);

  const isCurrentDay = useMemo(() => isToday(day || date), [day, date]);

  if (!isCurrentDay) {
    return null;
  }

  const top = `${(date.getHours() + date.getMinutes() / 60) * height}px`;

  return (
    <div
      className="absolute left-0 right-0 flex items-center z-10"
      style={{
        top,
      }}
    >
      <div className="w-2 h-2 rounded-full bg-red-500 ml-1" />
      <div className="h-px bg-red-500 flex-1" />
    </div>
  );
});
