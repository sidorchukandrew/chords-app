import dayjs from 'dayjs';

export function isPast(date) {
  if (!date) return false;
  return dayjs(date).isBefore(new Date(), 'date');
}

export function format(date, formatString) {
  if (!date || !format) return '';

  return dayjs(date).format(formatString);
}

export function isToday(date) {
  return dayjs().isSame(date, 'day');
}

export function sortDates(dateA, dateB) {
  return dayjs(dateA).isAfter(dayjs(dateB)) ? 1 : -1;
}

export function getTimeFromDate(date) {
  if (!date) return '';
  date = dayjs(date);
  if (date.hour() !== 0 || date.minute() !== 0) {
    return date.format('h:mma');
  } else {
    return null;
  }
}
