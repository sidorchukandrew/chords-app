import dayjs from 'dayjs';

export function isPast(date) {
  if (!date) return false;
  return dayjs(date).isBefore(new Date(), 'date');
}
