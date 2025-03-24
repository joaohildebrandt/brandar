import { format } from 'date-fns';

export const toDate = (date: unknown) => {
  if (date instanceof Date) return date;
  if (typeof date === 'string') return new Date(date);
  return undefined;
};

export const toFormattedDate = (date: Date) => {
  return format(date, 'dd-MM-yyyy').toString();
};
