import { atom } from "nanostores";
import type { PreinitializedWritableAtom } from "nanostores";

import { merge } from "../../utils/object";

import { onSetMemo } from "../../helpers/store";
import type { DeepPartial } from "../../types";
import type { CalendarConfig } from "../calendar/types";
import type { GridViewConfig } from "./types";

const DEFAULT_CONFIG: GridViewConfig = {
  cell: { hour: { height: 80, width: 60 } },
  dragging: { snapToGrid: 15 },
  item: { duration: 30 },
  itemGroup: { reservedSpace: 15 },
  allDayItemGroup: { reservedSpace: 15 },
};
//TODO: separate even more this config store to avoid re-render on computed properties

export type GridViewStore = {
  config: PreinitializedWritableAtom<GridViewConfig>;
  scrollToCurrentTime: PreinitializedWritableAtom<boolean>;
};

export const generateGridViewStore = () => {
  const config = atom<GridViewConfig>(DEFAULT_CONFIG);
  const scrollToCurrentTime = atom<boolean>(false);

  onSetMemo([config, scrollToCurrentTime]);

  return {
    config,
    scrollToCurrentTime,
  };
};

export const generateGridViewActions = (store: GridViewStore) => {
  const setConfig = (config: DeepPartial<GridViewConfig>) => {
    store.config.set(merge(store.config.get(), config));
  };

  const startScrollToCurrentTime = () => {
    store.scrollToCurrentTime.set(true);
  };

  const resetScrollToCurrentTime = () => {
    store.scrollToCurrentTime.set(false);
  };

  return {
    setConfig,
    startScrollToCurrentTime,
    resetScrollToCurrentTime,
  };
};
