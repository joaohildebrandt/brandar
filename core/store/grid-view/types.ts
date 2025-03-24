export type GridViewConfig = {
  cell: {
    hour: {
      height: number;
      width: number;
    };
  };
  dragging: {
    snapToGrid: number;
  };
  item: {
    duration: number;
  };
  itemGroup: {
    reservedSpace: number;
  };
  allDayItemGroup: {
    reservedSpace: number;
  };
};
