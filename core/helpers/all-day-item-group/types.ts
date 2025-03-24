export type Layout = {
  gridRowStart: number;
  gridColumnStart: number;
  gridColumnEnd: number;
  rowIndex: number;
  zIndex: number;
  maxWidth: string;
};

export type TimeSlot = {
  start: Date;
  end: Date;
};

export type ItemGroupConfig = {
  rightReservedSpace?: number;
  accessors: { start: string; end: string };
};

export type LayoutCalculationResult = {
  rows: TimeSlot[][];
  layoutResult: Record<string, Layout>;
};

export type CalculateLayoutResult = Record<string, Layout>;
