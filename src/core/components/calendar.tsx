import { createContext } from 'react';

import { type CalendarClient, initialize } from '../../../core/store';

import styles from './calendar.module.css';

type CalendarProps = {
  client?: CalendarClient;
  children: React.ReactNode;
};

export const CalendarContext = createContext<CalendarProps['client'] | null>(
  null,
);

export const Calendar = ({ client, children }: CalendarProps) => {
  return (
    <CalendarContext.Provider value={client ?? initialize()}>
      <div className={styles.calendar}>{children}</div>
    </CalendarContext.Provider>
  );
};
