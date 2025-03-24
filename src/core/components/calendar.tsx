import { createContext } from "react";

import { initialize, type CalendarClient } from "../../../core/store";

type CalendarProps = {
  client?: CalendarClient;
  children: React.ReactNode;
};

export const CalendarContext = createContext<CalendarProps["client"] | null>(
  null,
);

export const Calendar = ({ client, children }: CalendarProps) => {
  return (
    <CalendarContext.Provider value={client ?? initialize()}>
      {children}
    </CalendarContext.Provider>
  );
};
