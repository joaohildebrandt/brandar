import type { CalendarItem } from '../../store/calendar-item/types';

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
      position: 'absolute';
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
      position: 'absolute';
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

// === NEW FUNCTIONAL TYPES ===

// Types for normalized items with optimized structure
export type NormalizedItem = {
  readonly id: string;
  readonly start: Date;
  readonly end: Date;
  readonly startMinutes: number;
  readonly endMinutes: number;
  readonly original: CalendarItem;
};

// Position information for rendering
export type ItemRenderPosition = {
  readonly top: number;
  readonly height: number;
};

// Group of overlapping items
export type ItemOverlapGroup = readonly NormalizedItem[];

// Column assignment result for overlapping items
export type SlotAssignment = {
  readonly slots: ReadonlyMap<string, number>;
  readonly totalColumns: number;
};
