import { useContext } from 'react';

import { CalendarContext } from '../components/calendar';

export const useAction = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error(
      'useAction must be used within a Calendar component with a client prop',
    );
  }

  return context.actions;
};
