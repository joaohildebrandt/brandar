import { useContext } from 'react';
import { useStore as useBaseStore } from '../../../core/adapters/react';

import type { UseStoreSelector } from '../../../core/adapters/react';
import { CalendarContext } from '../components/calendar';

export const useStore = <T>(selector: UseStoreSelector<T>) => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error(
      'useStore must be used within a Calendar component with a client prop',
    );
  }

  return useBaseStore(context.stores, selector);
};
