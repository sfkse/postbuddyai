import { formatDistanceToNow } from "date-fns";

export const formatToXDaysAgo = (date: Date) => {
  // Calculate the distance to now
  const formattedDistance = formatDistanceToNow(date, { addSuffix: true });

  return formattedDistance;
};

export const isTimePassed = (date: Date) => {
  const now = new Date();
  return date < now;
};

export const isTimeWithinTheDay = (date: Date) => {
  const now = new Date();
  return date.getDate() === now.getDate();
};

