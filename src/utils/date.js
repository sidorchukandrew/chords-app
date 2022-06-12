import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

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

export function breakApartTime(timeText) {
  let hour = timeText.split(':')?.[0];
  let period = timeText.split(' ')?.[1];
  let minutes = timeText.split(' ')?.[0]?.split?.(':')?.[1];
  return {
    hour,
    minutes,
    period,
  };
}

export function combineDateAndTime(date, time) {
  if (date && time) {
    return dayjs(`${date} ${time}`, [
      'YYYY-MM-DD h:mm A',
      'YYYY-MM-DD hh:mm A',
    ]).toDate();
  } else {
    return dayjs(date, 'YYYY-MM-DD').toDate();
  }
}

export function subtractHours(hoursToSubtract, date) {
  return dayjs(date).subtract(hoursToSubtract, 'hour');
}
