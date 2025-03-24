import { useStore as useNanoStore } from '@nanostores/react';
import type { Atom } from 'nanostores';

import type { Stores } from '../store';

export type UseStoreSelector<T> = (stores: Stores) => Atom<T>;

export const useStore = <T>(stores: Stores, selector: UseStoreSelector<T>) => {
  return useNanoStore(selector(stores));
};
