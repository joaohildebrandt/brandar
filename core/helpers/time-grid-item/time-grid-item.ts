//TODO: improve this file later

import type { CalendarItem } from '../../store/calendar-item/types';
import type { TimeGridItemGroupLayout } from '../../store/time-grid-item/types';
import { toDate } from '../../utils/date';
import type {
  ItemOverlapGroup,
  ItemRenderPosition,
  NormalizedItem,
  SlotAssignment,
  TimeGridItemLayoutConfig,
} from './types';

// Cache for parsed dates and time calculations - immutable interface
const dateCache = new Map<string, NormalizedItem>();
const positionCache = new Map<string, ItemRenderPosition>();

const createCacheKey = (
  item: CalendarItem,
  accessors: { start: string; end: string },
): string => `${item.id}-${item[accessors.start]}-${item[accessors.end]}`;

const createPositionCacheKey = (
  item: NormalizedItem,
  rowHeight: number,
): string => `${item.id}-${item.startMinutes}-${item.endMinutes}-${rowHeight}`;

const parseItemTime = (
  item: CalendarItem,
  accessors: { start: string; end: string },
): NormalizedItem | null => {
  const start = toDate(item[accessors.start]);
  const end = toDate(item[accessors.end]);

  if (!start || !end) return null;

  return {
    id: String(item.id),
    start,
    end,
    startMinutes: start.getHours() * 60 + start.getMinutes(),
    endMinutes: end.getHours() * 60 + end.getMinutes(),
    original: item,
  };
};

const getItemTimeOptimized = (
  item: CalendarItem,
  accessors: { start: string; end: string },
): NormalizedItem | null => {
  const cacheKey = createCacheKey(item, accessors);
  const cached = dateCache.get(cacheKey);

  if (cached) return cached;

  const parsed = parseItemTime(item, accessors);
  if (parsed) dateCache.set(cacheKey, parsed);

  return parsed;
};

const timeToPosition = (
  hour: number,
  minutes: number,
  rowHeight: number,
): number => {
  const hourPosition = hour * rowHeight;
  const minutesPosition = (minutes * rowHeight) / 60;
  return hourPosition + minutesPosition;
};

const calculateItemPosition = (
  item: NormalizedItem,
  rowHeight: number,
): ItemRenderPosition => {
  const top = timeToPosition(
    item.start.getHours(),
    item.start.getMinutes(),
    rowHeight,
  );
  const bottom = timeToPosition(
    item.end.getHours(),
    item.end.getMinutes(),
    rowHeight,
  );

  return {
    top,
    height: bottom - top - 2,
  };
};

// Memoized position calculation
const getItemPosition = (
  item: NormalizedItem,
  rowHeight: number,
): ItemRenderPosition => {
  const cacheKey = createPositionCacheKey(item, rowHeight);
  const cached = positionCache.get(cacheKey);

  if (cached) return cached;

  const position = calculateItemPosition(item, rowHeight);
  positionCache.set(cacheKey, position);

  return position;
};

const doItemsOverlap = (a: NormalizedItem, b: NormalizedItem): boolean =>
  a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes;

// Functional approach to finding overlap groups using reduce
const findOverlapGroupsDeclarative = (
  items: readonly NormalizedItem[],
): readonly ItemOverlapGroup[] => {
  if (items.length <= 1) return items.map((item) => [item]);

  const sortedItems = [...items].sort(
    (a, b) => a.startMinutes - b.startMinutes,
  );

  return sortedItems.reduce<{
    readonly groups: readonly ItemOverlapGroup[];
    readonly processed: ReadonlySet<string>;
  }>(
    (acc, currentItem) => {
      if (acc.processed.has(currentItem.id)) return acc;

      // Find all items that overlap with current item using functional approach
      const overlappingItems = sortedItems.filter(
        (item) =>
          !acc.processed.has(item.id) &&
          (item.id === currentItem.id || doItemsOverlap(currentItem, item)),
      );

      const newProcessed = new Set(
        Array.from(acc.processed).concat(
          overlappingItems.map((item) => item.id),
        ),
      );

      return {
        groups: [...acc.groups, overlappingItems],
        processed: newProcessed,
      };
    },
    { groups: [], processed: new Set() },
  ).groups;
};

// Pure function for column assignment using reduce
const assignItemsToColumns = (group: ItemOverlapGroup): SlotAssignment => {
  if (group.length === 1) {
    return {
      slots: new Map([[group[0].id, 0]]),
      totalColumns: 1,
    };
  }

  const sortedGroup = [...group].sort(
    (a, b) => a.startMinutes - b.startMinutes || b.endMinutes - a.endMinutes,
  );

  const result = sortedGroup.reduce<{
    readonly columns: readonly (readonly NormalizedItem[])[];
    readonly slots: ReadonlyMap<string, number>;
  }>(
    (acc, event) => {
      // Find first available column using functional approach
      const availableColumnIndex = acc.columns.findIndex((column) => {
        const lastInColumn = column[column.length - 1];
        return lastInColumn.endMinutes <= event.startMinutes;
      });

      const columnIndex =
        availableColumnIndex >= 0 ? availableColumnIndex : acc.columns.length;

      // Create new columns array with the event added
      const newColumns = acc.columns.map((column, index) =>
        index === columnIndex ? [...column, event] : column,
      );

      // Add new column if needed
      const finalColumns =
        columnIndex >= acc.columns.length
          ? [...newColumns, [event]]
          : newColumns;

      return {
        columns: finalColumns,
        slots: new Map(Array.from(acc.slots).concat([[event.id, columnIndex]])),
      };
    },
    { columns: [], slots: new Map() },
  );

  return {
    slots: result.slots,
    totalColumns: result.columns.length,
  };
};

// Pure function to create style for single item
const createSingleItemStyle = (
  item: NormalizedItem,
  position: ItemRenderPosition,
) => ({
  position: 'absolute' as const,
  top: position.top,
  height: position.height,
  left: '0%',
  width: '100%',
  zIndex: 30,
});

// Pure function to create style for overlapping items
const createOverlappingItemStyle = (
  item: NormalizedItem,
  position: ItemRenderPosition,
  columnIndex: number,
  totalColumns: number,
) => {
  const width = 100 / totalColumns;
  const left = columnIndex * width;

  return {
    position: 'absolute' as const,
    top: position.top,
    height: position.height,
    left: `${left}%`,
    width: `${width}%`,
    zIndex: 30,
  };
};

// Pure function to process a single overlap group
const processOverlapGroup = (
  group: ItemOverlapGroup,
  positions: ReadonlyMap<string, ItemRenderPosition>,
): [string, any][] => {
  if (group.length === 1) {
    const item = group[0];
    const position = positions.get(item.id);

    return position ? [[item.id, createSingleItemStyle(item, position)]] : [];
  }

  const { slots, totalColumns } = assignItemsToColumns(group);

  return group
    .map((item) => {
      const columnIndex = slots.get(item.id);
      const position = positions.get(item.id);

      return columnIndex !== undefined && position
        ? [
            item.id,
            createOverlappingItemStyle(
              item,
              position,
              columnIndex,
              totalColumns,
            ),
          ]
        : null;
    })
    .filter((entry): entry is [string, any] => entry !== null);
};

//  group items by date
const groupItemsByDate = (
  items: readonly NormalizedItem[],
): ReadonlyMap<string, readonly NormalizedItem[]> =>
  items.reduce((acc, item) => {
    const dateKey = item.start.toDateString();
    const existingItems = acc.get(dateKey) ?? [];
    return new Map(acc).set(dateKey, [...existingItems, item]);
  }, new Map<string, readonly NormalizedItem[]>());

// Cache management
const manageCaches = (): void => {
  if (dateCache.size > 1000) dateCache.clear();
  if (positionCache.size > 1000) positionCache.clear();
};

// Main function - composed of pure functions
export const calculateTimeGridItemLayout = (
  items: readonly CalendarItem[],
  config: TimeGridItemLayoutConfig,
): TimeGridItemGroupLayout => {
  // Early exits
  if (items.length === 0) return { styles: {}, totalColumns: 0 };

  // Side effect isolated
  manageCaches();

  // Parse and normalize items
  const normalizedItems = items
    .map((item) => getItemTimeOptimized(item, config.accessors))
    .filter((item): item is NormalizedItem => item !== null);

  if (normalizedItems.length === 0) return { styles: {}, totalColumns: 0 };

  // Group by date
  const itemsByDate = groupItemsByDate(normalizedItems);

  // Process each day and collect results
  const { styles, maxColumns } = Array.from(itemsByDate.values())
    .filter((dayItems) => dayItems.length > 0)
    .reduce<{
      readonly styles: Record<string, any>;
      readonly maxColumns: number;
    }>(
      (acc, dayItems) => {
        // Create position map for this day
        const positions = new Map(
          dayItems.map((item) => [
            item.id,
            getItemPosition(item, config.rowHeight),
          ]),
        );

        // Find overlap groups and process them
        const groups = findOverlapGroupsDeclarative(dayItems);

        const dayStyles = groups
          .flatMap((group) => processOverlapGroup(group, positions))
          .reduce(
            (styles, [itemId, style]) => ({ ...styles, [itemId]: style }),
            {},
          );

        const dayMaxColumns = Math.max(
          ...groups.map((group) =>
            group.length === 1 ? 1 : assignItemsToColumns(group).totalColumns,
          ),
        );

        return {
          styles: { ...acc.styles, ...dayStyles },
          maxColumns: Math.max(acc.maxColumns, dayMaxColumns),
        };
      },
      { styles: {}, maxColumns: 0 },
    );

  return {
    styles,
    totalColumns: Math.max(maxColumns, 1),
  };
};
