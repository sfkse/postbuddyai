import { formatDistanceToNow } from "date-fns";

export const formatToXDaysAgo = (date: Date) => {
  // Calculate the distance to now
  const formattedDistance = formatDistanceToNow(date, { addSuffix: true });

  return formattedDistance;
};

