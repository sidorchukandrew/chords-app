import dayjs from 'dayjs';

export function getFourYearsOfMonths() {
  let fortyEightMonthsAgo = dayjs().subtract(24, 'month');
  let numberOfMonthsOnCalendar = 48;
  let months = [];

  for (let i = 0; i < numberOfMonthsOnCalendar; ++i) {
    let nextMonth = fortyEightMonthsAgo.add(i, 'month');
    months.push({
      month: nextMonth.format('MMMM YYYY'),
      shouldRender: isMonthIndexNearby(i, 24),
    });
  }

  return months;
}

export function getCalendarDates(
  month = dayjs().month(),
  year = dayjs().year(),
) {
  let daysInMonth = dayjs().set('year', year).set('month', month).daysInMonth();
  let calendarWeeks = [[], [], [], [], [], []];
  let calendarWeekNumber = 0;

  calendarWeeks[0] = padLeft(month, year);
  for (let day = 1; day <= daysInMonth; ++day) {
    let date = dayjs().set('year', year).set('month', month).date(day);

    if (isNewWeek(date)) {
      ++calendarWeekNumber;
    }

    calendarWeeks[calendarWeekNumber].push({
      fullDate: date.toDate(),
      dateNumber: day,
      isToday: checkIfIsToday(date),
    });
  }

  calendarWeeks[4] = padRight(calendarWeeks[4], month, year);
  return calendarWeeks;
}

function isNewWeek(date) {
  return date.day() === 0 && date.date() !== 1;
}

function padLeft(month, year) {
  let startOfMonth = dayjs().set('year', year).set('month', month).date(1);
  let numToPad = startOfMonth.day();
  let firstWeek = [];

  while (numToPad-- > 0) {
    firstWeek.push(null);
  }

  return firstWeek;
}

function padRight(calendarWeek, month, year) {
  let endOfMonth = dayjs().set('year', year).set('month', month).endOf('month');
  let numToPad = 6 - endOfMonth.day();

  for (let i = 0; i < numToPad; ++i) {
    calendarWeek.push(null);
  }

  return calendarWeek;
}

function checkIfIsToday(dateInQuestion) {
  return dateInQuestion.isSame(dayjs());
}

export const MONTH_NUMBERS = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export function getEventsForMonth(monthYear, events) {
  let month = monthYear?.split(' ')?.[0];
  let year = monthYear?.split(' ')?.[1];
  let monthDate = dayjs().set('year', year).set('month', MONTH_NUMBERS[month]);

  return events?.filter(event =>
    dayjs(event.start_time).isSame(monthDate, 'month'),
  );
}

export function getEventsForWeek(weekDates, events) {
  let slottedEvents = [[], [], [], [], [], [], []];

  events.forEach(event => {
    let eventDate = dayjs(event.start_time);

    for (let dayIndex = 0; dayIndex < weekDates.length; ++dayIndex) {
      if (
        weekDates[dayIndex] &&
        eventDate.isSame(weekDates[dayIndex].fullDate, 'date')
      ) {
        slottedEvents[dayIndex].push(event);
      }
    }
  });

  return slottedEvents;
}

export function isMonthIndexNearby(indexInQuestion, focalMonthIndex) {
  return (
    indexInQuestion >= focalMonthIndex - 1 &&
    indexInQuestion <= focalMonthIndex + 1
  );
}
