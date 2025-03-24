import { set } from 'date-fns';

export const snapToGrid = (position: number, height: number, snap: number) => {
  const minutePixels = height / 60;
  const snapPixels = minutePixels * snap;
  return Math.round(position / snapPixels) * snapPixels;
};

export const pixelsToTime = (
  position: number,
  height: number,
  date: Date,
  startHour: number,
) => {
  const hourOffset = position / height;

  const hoursTotal = startHour + hourOffset;
  const hours = Math.floor(hoursTotal);
  const minutes = Math.round((hoursTotal - hours) * 60);

  const result = set(date, { hours, minutes });

  return result;
};

export const timeToPixels = (height: number, date: Date, startHour: number) => {
  const hours = date.getHours() - startHour;
  const minutes = date.getMinutes();

  return (hours + minutes / 60) * height;
};
