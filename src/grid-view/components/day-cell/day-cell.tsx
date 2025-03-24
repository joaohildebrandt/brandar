import { format, isToday as isTodayDate } from 'date-fns';
import { createContext, memo, useContext, useMemo } from 'react';

import { cn } from '../../../utils/style';

import styles from './styles.module.css';

const DayCellContext = createContext({} as { isToday: boolean; day: Date });

const useDayCell = () => {
  const context = useContext(DayCellContext);

  if (!context) {
    throw new Error('useDayCell must be used within a DayCellContext.Provider');
  }

  return context;
};

export const DayCellDay = memo(
  ({
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) => {
    const { day, isToday } = useDayCell();

    return (
      <div
        data-is-today-date={isToday}
        className={cn(styles.dayCellDay, className)}
        {...props}
      >
        {format(day, 'd')}
      </div>
    );
  },
);

export const DayCellWeekDay = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  const { day, isToday } = useDayCell();

  return (
    <div
      data-is-today-date={isToday}
      className={cn(styles.dayCellWeekDay, className)}
      {...props}
    >
      {format(day, 'EEE')}
    </div>
  );
};

type DayCellProps = {
  day: Date;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const DayCell = memo(
  ({ day, className, children, ...props }: DayCellProps) => {
    const isToday = useMemo(() => isTodayDate(day), [day]);

    return (
      <DayCellContext.Provider value={{ day, isToday }}>
        <div
          {...props}
          data-is-today-date={isToday}
          className={cn(
            styles.dayCell,
            isToday ? 'bg-blue-50' : 'bg-gray-50',
            className,
          )}
        >
          {children}
        </div>
      </DayCellContext.Provider>
    );
  },
);
