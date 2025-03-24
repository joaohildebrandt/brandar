export type TimeGridItemGroupItemLayoutGridStyle = {
  gridColumnStart: number;
  gridColumnEnd: number;
  gridRowStart: number;
  gridRowEnd: number;
  zIndex: number;
};

export type TimeGridItemGroupLayout = {
  totalColumns: number;
  styles: {
    [itemId: string]: TimeGridItemGroupItemLayoutGridStyle;
  };
};
