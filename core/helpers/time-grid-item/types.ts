import type { CalendarItem } from "../../store/calendar-item/types";

export type TimeGridItemLayoutConfig = {
  accessors: { start: string; end: string };
  rowHeight: number;
  startHour: number;
  reservedSpace?: number;
  containerWidth?: number;
};

export type ItemWithMeta = {
  id: string | number;
  start: Date;
  end: Date;
  original: CalendarItem;
};

export type TimeGridItemLayout = {
  styles: Record<
    string | number,
    {
      position: "absolute";
      top: number;
      left: number;
      width: number;
      height: number;
      zIndex: number;
    }
  >;
};

export type TimeGridItemAbsoluteLayout = {
  containerWidth: number;
  styles: Record<
    string | number,
    {
      position: "absolute";
      top: number;
      left: string;
      width: string;
      height: number;
      zIndex: number;
    }
  >;
};

export type TimeInterval = {
  id: string | number;
  start: Date;
  end: Date;
};

export type OverlapGroup = {
  startTime: number;
  endTime: number;
  items: TimeInterval[];
  count: number;
};

export type ItemPosition = {
  start: number;
  end: number;
};
