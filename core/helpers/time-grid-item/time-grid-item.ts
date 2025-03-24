import { toDate } from "../../utils/date";
import type { CalendarItem } from "../../store/calendar-item/types";
import type { TimeGridItemGroupLayout } from "../../store/time-grid-item/types";
import type { TimeGridItemLayoutConfig } from "./types";

const getItemTime = (
  item: CalendarItem,
  accessors: { start: string; end: string },
) => {
  const start = toDate(item[accessors.start]);
  const end = toDate(item[accessors.end]);
  if (!start || !end) return null;

  return {
    id: item.id,
    start,
    end,
    startMinutes: start.getHours() * 60 + start.getMinutes(),
    endMinutes: end.getHours() * 60 + end.getMinutes(),
    original: item,
  };
};

const timeToPosition = (
  hour: number,
  minutes: number,
  { rowHeight }: { rowHeight: number },
) => {
  const hourPosition = hour * rowHeight;
  const minutesPosition = minutes !== 0 ? (minutes * rowHeight) / 60 : 1;
  return hourPosition + minutesPosition;
};

const findOverlapGroups = (items: CalendarItem[]) => {
  const n = items.length;
  const visited = new Array(n).fill(false);
  const groups = [];

  const overlaps = (a, b) =>
    a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes;

  const dfs = (idx, group) => {
    visited[idx] = true;
    group.push(items[idx]);
    for (let j = 0; j < n; j++) {
      if (!visited[j] && overlaps(items[idx], items[j])) {
        dfs(j, group);
      }
    }
  };

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      const group = [];
      dfs(i, group);
      groups.push(group);
    }
  }
  return groups;
};

const slotEvents = (group) => {
  const sorted = [...group].sort(
    (a, b) => a.startMinutes - b.startMinutes || b.endMinutes - a.endMinutes,
  );
  const columns = [];
  const slots = new Map();

  for (const event of sorted) {
    let col = 0;
    for (; col < columns.length; col++) {
      const lastInCol = columns[col][columns[col].length - 1];
      if (lastInCol.endMinutes <= event.startMinutes) {
        break;
      }
    }
    if (!columns[col]) columns[col] = [];
    columns[col].push(event);
    slots.set(event.id, col);
  }

  return {
    slots,
    totalColumns: columns.length,
  };
};

export const calculateTimeGridItemLayout = (
  items: readonly CalendarItem[],
  config: TimeGridItemLayoutConfig,
): TimeGridItemGroupLayout => {
  const normalized = items
    .map((item) => getItemTime(item, config.accessors))
    .filter(Boolean);

  const groups = findOverlapGroups(normalized);

  const styles: Record<string, any> = {};

  for (const group of groups) {
    if (group.length === 1) {
      const item = group[0];
      const top = timeToPosition(
        item.start.getHours(),
        item.start.getMinutes(),
        {
          rowHeight: config.rowHeight,
        },
      );
      const height =
        timeToPosition(item.end.getHours(), item.end.getMinutes(), {
          rowHeight: config.rowHeight,
        }) -
        top -
        2;
      styles[item.id] = {
        position: "absolute",
        top,
        height,
        left: "0%",
        width: "100%",
        zIndex: 30,
      };
    } else {
      const { slots, totalColumns } = slotEvents(group);
      for (const item of group) {
        const col = slots.get(item.id);
        const width = 100 / totalColumns;
        const left = col * width;
        const top = timeToPosition(
          item.start.getHours(),
          item.start.getMinutes(),
          {
            rowHeight: config.rowHeight,
          },
        );
        const height =
          timeToPosition(item.end.getHours(), item.end.getMinutes(), {
            rowHeight: config.rowHeight,
          }) -
          top -
          2;
        styles[item.id] = {
          position: "absolute",
          top,
          height,
          left: `${left}%`,
          width: `${width}%`,
          zIndex: 30,
        };
      }
    }
  }

  return {
    styles,
  };
};
