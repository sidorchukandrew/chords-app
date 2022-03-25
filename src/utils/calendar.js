import dayjs from 'dayjs';

export function getEightYearsOfMonths() {
  let fortyEightMonthsAgo = dayjs().subtract(48, 'month');
  let numberOfMonthsOnCalendar = 96;
  let months = [];

  for (let i = 0; i < numberOfMonthsOnCalendar; ++i) {
    let nextMonth = fortyEightMonthsAgo.add(i, 'month');
    months.push(nextMonth.format('MMMM YYYY'));
  }

  return months;
}

export function getWeekOne(monthYear) {}

export function getWeekTwo(monthYear) {}

export function getWeekThree(monthYear) {}

export function getWeekFour(monthYear) {}

export function getWeekFive(monthYear) {}

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
